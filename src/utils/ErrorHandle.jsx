//custom Try Catch Handler

export const tryCatchHandler = async (asyncFunc, args, { rejectWithValue }) => {
  try {
    return await asyncFunc(...args);
  } catch (error) {
    return rejectWithValue({ message: getErrorMessage(error) });
  }
};

// errorUtils.js
export const getErrorMessage = (error) => {
  if (error.code === "ECONNABORTED") {
    return "Request timed out";
  } else if (!error.response) {
    return "Unable to connect to the server";
  } else if (error.message === "Network Error") {
    return "No internet connection";
  } else if (
    error.response.status === 400 &&
    error.response.data?.detail?.includes("Invalid HTTP_HOST")
  ) {
    return "Invalid host. Please contact support or check server configuration.";
  } else if (error.response.status === 404) {
    return "Route not found";
  } else if (error.response.status >= 500) {
    return "Internal Server error";
  } else {
    return error.response?.data?.message || "An error occurred!";
  }
};

export const handleApiError = (error, rejectWithValue) => {
  if (error.response) {
    if (error.response.status === 401) {
      return rejectWithValue({ message: "Unauthorized!!" });
    }
    return rejectWithValue(error.response.data);
  } else if (error.request) {
    if (error.message.includes("Network Error")) {
      return rejectWithValue({
        message:
          "Unable to connect to the server. Please check your network connection.",
      });
    }
    if (error.code === "ECONNABORTED") {
      return rejectWithValue({
        message: "The request timed out. Please try again later.",
      });
    }
  } else {
    return rejectWithValue({
      message: "An unexpected error occurred. Please try again.",
    });
  }
};

export const timeout = (ms) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), ms)
  );
