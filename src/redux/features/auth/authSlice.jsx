import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../../utils/ErrorHandle";
import API from "../../api/api";

/**
 * @typedef {Object} AuthState
 * @property {boolean} isAuthenticated 
 * @property {boolean} adminRoute 
 * @property {boolean} loading 
 * @property {boolean} isLoading 
 * @property {boolean} isProcessing
 * @property {null} isError 
 * @property {null} error 
 * @property {string} message 
 * @property {object|null} customer 
 * @property {object|null} membershipStatus 
 * 
 * 
 
/**
 * @type {AuthState}
 */

//Dispatch Action
//MobileVerify
export const mobileVerify = createAsyncThunk(
  "/auth/mobileVerify",
  async ({ mobileData, enqueueSnackbar, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/customer/requestotp`, mobileData);
      enqueueSnackbar(response.data.message || "Please verify Your OTP!", {
        variant: "success",
      });
      if (response.data.data && response.data.data.is_verified) {
        navigate("/baltra-account-signUp");
      } else {
        navigate("/baltra-account-verify");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//OTPVerify
export const verifyOTP = createAsyncThunk(
  "/auth/verifyOTP",
  async ({ OTPData, enqueueSnackbar, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/customer/verifyotp`, OTPData);
      enqueueSnackbar(response.data.message || "OTP Has been verified!", {
        variant: "success",
      });
      navigate("/baltra-account-signUp");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//register
export const baltraRegister = createAsyncThunk(
  "/baltra-register",
  async ({ registerData, enqueueSnackbar, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/customer/register`, registerData);
      enqueueSnackbar(response.data.message || "Register successful!", {
        variant: "success",
      });
      navigate("/baltra-aboutUs-Page");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//login
export const baltraLogin = createAsyncThunk(
  "/baltra-login",
  async ({ loginData, enqueueSnackbar, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/customer/login`, loginData);
      enqueueSnackbar(response.data.message || "Auth Login success!", {
        variant: "success",
      });
      if (response.data.data && response.data.data.role === "admin") {
        navigate("/baltra-admin-dashboard");
      } else {
        navigate("/baltra-aboutUs-Page");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//forgotPassword
export const forgotPassword = createAsyncThunk(
  "/auth/baltra-forgotPassword",
  async ({ forgotData, enqueueSnackbar, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `/customer/requestpasswordreset`,
        forgotData
      );
      enqueueSnackbar(response.data.message || "Please verify Your OTP!", {
        variant: "success",
      });
      navigate("/baltra-resetOtpVerify");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//verifyResetOTP
export const verifyResetOTP = createAsyncThunk(
  "/auth/baltra-verifyResetOTP",
  async ({ OTPData, enqueueSnackbar, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/customer/resetverifyotp`, OTPData);
      enqueueSnackbar(response.data.message || "OTP has been verified!", {
        variant: "success",
      });
      navigate("/baltra-resetPassword");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//resetPassword
export const resetPassword = createAsyncThunk(
  "/auth/baltra-resetPassword",
  async ({ resetData, enqueueSnackbar, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/customer/resetpassword`, resetData);
      enqueueSnackbar(response.data.message || "Password reset successFully!", {
        variant: "success",
      });
      navigate("/baltra-account-signin");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//getProfile
export const getProfileMe = createAsyncThunk(
  "/auth/getProfile",
  async (__, { rejectWithValue }) => {
    try {
      const response = await API.get(`/customer/getprofiledata`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

// updateProfile
export const updateProfile = createAsyncThunk(
  "/auth/updateProfile",
  async ({ formData, enqueueSnackbar }, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.put(`/customer/updateprofile`, formData);
      enqueueSnackbar(response.data.message || "Profile update successFully!", {
        variant: "success",
      });
      dispatch(getProfileMe());
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//changePassword
export const changePassword = createAsyncThunk(
  "/auth/changePassword",
  async (
    { editPasswordData, enqueueSnackbar, navigate },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await API.put(
        `/customer/changepassword`,
        editPasswordData
      );
      enqueueSnackbar(
        response.data.message || "password changed successFully!",
        {
          variant: "success",
        }
      );
      dispatch(setLogout());
      navigate("/baltra-account-signin");
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

//updateMemberShipStatus
export const updateMemberShipStatus = createAsyncThunk(
  "/auth/updateMemberShipStatus",
  async ({ data, enqueueSnackbar }, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.post(`/customer/enablemembership`, data);
      enqueueSnackbar(
        response.data.message || "membership updated successFully!",
        {
          variant: "success",
        }
      );
      dispatch(getProfileMe());
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: getErrorMessage(error) });
    }
  }
);

const initialState = {
  isAuthenticated: !!localStorage.getItem("AuthID"),
  adminRoute: false,
  loading: false,
  isLoading: false,
  isProcessing: false,
  error: null,
  isError: null,
  message: "",
  customer: null,
  membershipStatus: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     
     * @param {AuthState} state
     */

    clearAuthError: (state) => {
      state.error = null;
      state.isError = null;
    },
    setLogout: (state) => {
      localStorage.removeItem("AuthID");
      state.isAuthenticated = false;
      state.adminRoute = false;
      state.customer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(mobileVerify.pending, (state) => {
        state.loading = true;
      })
      .addCase(mobileVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload.data;
      })
      .addCase(mobileVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload.data;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.customer = action.payload.message;
      })
      .addCase(baltraRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(baltraRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload.data;
        const accessToken = action.payload.token;
        localStorage.setItem("AuthID", accessToken);
        state.isAuthenticated = true;
      })
      .addCase(baltraRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(baltraLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(baltraLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload.data;
        const accessToken = action.payload.token;
        localStorage.setItem("AuthID", accessToken);
        state.isAuthenticated = true;

        if (action.payload.data) {
          state.adminRoute = action.payload.data.role === "admin";
          state.customer = action.payload.data;
        } else {
          state.adminRoute = false;
          state.customer = null;
        }
      })
      .addCase(baltraLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(verifyResetOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyResetOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload.data;
      })
      .addCase(verifyResetOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getProfileMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileMe.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload.data;
      })
      .addCase(getProfileMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customer = action.payload.data;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateMemberShipStatus.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(updateMemberShipStatus.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.membershipStatus = action.payload.data;
      })
      .addCase(updateMemberShipStatus.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearAuthError, setLogout } = authSlice.actions;

export default authSlice.reducer;
