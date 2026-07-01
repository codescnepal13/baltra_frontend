import axios from "axios";
import { toast } from "react-toastify";

// ─── Environment ──────────────────────────────────────────────────────────
const devEnv = import.meta.env.MODE !== "production";
export const devApiUrl = import.meta.env.VITE_DEV_API;
const prodApiUrl = import.meta.env.VITE_PROD_API;
const baseURL = devEnv ? devApiUrl : prodApiUrl;

const REQUEST_TIMEOUT = 30_000; // 30s — tune per your slowest endpoint (bulk upload/export)
const TOKEN_KEY = "AuthID";
const REFRESH_TOKEN_KEY = "RefreshToken"; // adjust if your backend uses a different name/flow

const validateEnvironment = () => {
  if (devEnv && !devApiUrl) {
    toast.error("Unable to connect: Development API URL missing.");
    return false;
  }
  if (!devEnv && !prodApiUrl) {
    toast.error("Unable to connect: Production API URL missing.");
    return false;
  }
  return true;
};

// ─── Fallback client (env misconfigured) ───────────────────────────────────
const createFallbackClient = () => {
  const rejected = () =>
    Promise.reject(new Error("Invalid environment configuration"));
  return {
    get: rejected,
    post: rejected,
    put: rejected,
    patch: rejected,
    delete: rejected,
    interceptors: {
      request: { use: () => {} },
      response: { use: () => {} },
    },
  };
};

// ─── Token helpers ──────────────────────────────────────────────────────────
const getAccessToken = () => localStorage.getItem(TOKEN_KEY);
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

const setAccessToken = (token) => localStorage.setItem(TOKEN_KEY, token);

const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

const redirectToLogin = () => {
  // Avoid redirect loops if already on login page
  if (!window.location.pathname.includes("/login")) {
    window.location.href = "/login";
  }
};

// ─── Refresh-token queue (prevents parallel refresh calls stampeding) ───────
let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  refreshQueue = [];
};

// ─── Build client ───────────────────────────────────────────────────────────
const buildApiClient = () => {
  const instance = axios.create({
    baseURL,
    timeout: REQUEST_TIMEOUT,
  });

  // ── Request: attach auth header ──
  instance.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // ── Response: centralized access-control + error handling ──
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // ── Network error / no response (server down, CORS, offline) ──
      if (!error.response) {
        if (error.code === "ECONNABORTED") {
          toast.error("Request timed out. Please try again.");
        } else {
          toast.error("Network error. Check your connection and try again.");
        }
        return Promise.reject(error);
      }

      const { status, data } = error.response;
      const serverMessage = data?.message || data?.detail || data?.error;

      switch (status) {
        // ── 401 Unauthorized: attempt silent refresh once, else force logout ──
        case 401: {
          // Don't attempt refresh on the refresh endpoint itself, or if already retried
          if (
            originalRequest._retry ||
            originalRequest.url?.includes("/refresh")
          ) {
            clearSession();
            toast.error("Session expired. Please log in again.");
            redirectToLogin();
            return Promise.reject(error);
          }

          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            clearSession();
            toast.error("Session expired. Please log in again.");
            redirectToLogin();
            return Promise.reject(error);
          }

          originalRequest._retry = true;

          if (isRefreshing) {
            // Queue this request until the in-flight refresh resolves
            return new Promise((resolve, reject) => {
              refreshQueue.push({ resolve, reject });
            })
              .then((newToken) => {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return instance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          isRefreshing = true;
          try {
            // Adjust endpoint/payload/response shape to match your Django backend
            const { data: refreshData } = await axios.post(
              `${baseURL}/auth/refresh/`,
              {
                refresh: refreshToken,
              },
            );
            const newToken = refreshData.access;
            setAccessToken(newToken);
            processQueue(null, newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            clearSession();
            toast.error("Session expired. Please log in again.");
            redirectToLogin();
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        // ── 403 Forbidden: authenticated but lacks permission ──
        case 403:
          toast.error(serverMessage || "You don't have permission to do that.");
          break;

        // ── 404 Not Found ──
        case 404:
          // Usually handled per-call (e.g. "item not found") — avoid noisy global toast here.
          // Uncomment if you want a global fallback:
          // toast.error(serverMessage || "Requested resource not found.");
          break;

        // ── 409 Conflict (e.g. duplicate entry) ──
        case 409:
          toast.error(
            serverMessage || "This action conflicts with existing data.",
          );
          break;

        // ── 422 Unprocessable Entity / validation errors ──
        case 422:
          toast.error(serverMessage || "Please check the submitted data.");
          break;

        // ── 429 Too Many Requests ──
        case 429:
          toast.error("Too many requests. Please slow down and try again.");
          break;

        // ── 500+ Server errors ──
        default:
          if (status >= 500) {
            toast.error("Server error. Please try again shortly.");
          } else {
            toast.error(serverMessage || "Something went wrong.");
          }
      }

      if (devEnv) {
        console.error(`[API ${status}]`, data);
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

// ─── Export ───────────────────────────────────────────────────────────────
const API = validateEnvironment() ? buildApiClient() : createFallbackClient();

export default API;
