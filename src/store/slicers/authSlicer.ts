import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { API_CONFIG } from "@/services/apiConfig";
import apiService from "@/services/apiService";
import { tokenService } from "@/services/tokenService";
import {
  AuthResponseData,
  AuthState,
  LoginPayload,
  RefreshTokenResponse,
  RegisterPayload,
  VerifyPayload,
  OtpVerifyPayload,
  ResendOtpPayload,
  OtpVerifyResponse,
  CreateMpinPayload,
  VerifyMpinPayload,
  ForgotMpinPayload,
  ResetMpinPayload,
  MpinResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  ValidateResetTokenPayload,
  GenericSuccessResponse,
} from "@/types/auth/authTypes";

/* ----------------------------------
   INITIAL STATE
---------------------------------- */
const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  loading: "idle",
  error: null,
  lastFetched: null,
  otpSent: false,
  otpVerified: false,
  mpinCreated: false,
  verificationMethod: null,
};

/* ----------------------------------
   THUNKS
---------------------------------- */

/* LOGIN */
export const loginUser = createAsyncThunk<
  AuthResponseData,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiService.post(API_CONFIG.ENDPOINTS.LOGIN, payload);
    const data = res.data.data || res.data;

    tokenService.setAccessToken(data.accessToken);
    tokenService.setRefreshToken(data.refreshToken);

    return data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Login failed");
  }
});

/* REGISTER */
export const registerUser = createAsyncThunk<
  AuthResponseData,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiService.post(API_CONFIG.ENDPOINTS.REGISTER, payload);
    const data = res.data.data || res.data;

    tokenService.setAccessToken(data.accessToken);
    tokenService.setRefreshToken(data.refreshToken);

    return data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Registration failed");
  }
});

/* VERIFY CODE */
export const verifyCode = createAsyncThunk<
  { success: boolean; message?: string },
  VerifyPayload,
  { rejectValue: string }
>("auth/verify", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiService.post(API_CONFIG.ENDPOINTS.VERIFY_CODE, payload);
    return res.data.data || res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Verification failed");
  }
});

/* REFRESH TOKEN */
export const refreshToken = createAsyncThunk<
  RefreshTokenResponse,
  void,
  { state: RootState; rejectValue: string }
>("auth/refresh", async (_, { getState, rejectWithValue }) => {
  try {
    const rt = getState().auth.refreshToken;

    if (!rt) return rejectWithValue("No refresh token");

    const res = await apiService.post(API_CONFIG.ENDPOINTS.REFRESH_TOKEN, {
      refreshToken: rt,
    });

    const data = res.data.data || res.data;

    tokenService.setAccessToken(data.accessToken);
    tokenService.setRefreshToken(data.refreshToken);

    return data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Token refresh failed");
  }
});

/* VERIFY OTP */
export const verifyOtp = createAsyncThunk<
  OtpVerifyResponse,
  OtpVerifyPayload,
  { rejectValue: string }
>("auth/verifyOtp", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiService.post(API_CONFIG.ENDPOINTS.VERIFY_OTP, payload);
    const data = res.data.data || res.data;

    // If tokens are provided, store them
    if (data.accessToken) {
      tokenService.setAccessToken(data.accessToken);
    }
    if (data.refreshToken) {
      tokenService.setRefreshToken(data.refreshToken);
    }

    return data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "OTP verification failed");
  }
});

/* RESEND OTP */
export const resendOtp = createAsyncThunk<
  GenericSuccessResponse,
  ResendOtpPayload,
  { rejectValue: string }
>("auth/resendOtp", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiService.post(API_CONFIG.ENDPOINTS.RESEND_OTP, payload);
    return res.data.data || res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Failed to resend OTP");
  }
});

/* CREATE MPIN */
export const createMpin = createAsyncThunk<
  GenericSuccessResponse,
  CreateMpinPayload,
  { rejectValue: string }
>("auth/createMpin", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiService.post(API_CONFIG.ENDPOINTS.CREATE_MPIN, payload);
    return res.data.data || res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Failed to create MPIN");
  }
});

/* VERIFY MPIN */
export const verifyMpin = createAsyncThunk<
  MpinResponse,
  VerifyMpinPayload,
  { rejectValue: string }
>("auth/verifyMpin", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiService.post(API_CONFIG.ENDPOINTS.VERIFY_MPIN, payload);
    const data = res.data.data || res.data;

    if (data.accessToken) {
      tokenService.setAccessToken(data.accessToken);
    }
    if (data.refreshToken) {
      tokenService.setRefreshToken(data.refreshToken);
    }

    return data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "MPIN verification failed");
  }
});

/* FORGOT PASSWORD */
export const forgotPassword = createAsyncThunk<
  GenericSuccessResponse,
  ForgotPasswordPayload,
  { rejectValue: string }
>("auth/forgotPassword", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiService.post(API_CONFIG.ENDPOINTS.FORGOT_PASSWORD, payload);
    return res.data.data || res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Failed to send reset email");
  }
});

/* VALIDATE RESET TOKEN */
export const validateResetToken = createAsyncThunk<
  GenericSuccessResponse,
  ValidateResetTokenPayload,
  { rejectValue: string }
>("auth/validateResetToken", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiService.post(API_CONFIG.ENDPOINTS.RESET_TOKEN_VALIDATION, payload);
    return res.data.data || res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Invalid or expired reset token");
  }
});

/* RESET PASSWORD */
export const resetPassword = createAsyncThunk<
  GenericSuccessResponse,
  ResetPasswordPayload,
  { rejectValue: string }
>("auth/resetPassword", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiService.post(API_CONFIG.ENDPOINTS.RESET_PASSWORD, payload);
    return res.data.data || res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Failed to reset password");
  }
});

/* FORGOT MPIN */
export const forgotMpin = createAsyncThunk<
  GenericSuccessResponse,
  ForgotMpinPayload,
  { rejectValue: string }
>("auth/forgotMpin", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiService.post(API_CONFIG.ENDPOINTS.FORGOT_MPIN, payload);
    return res.data.data || res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Failed to send MPIN reset code");
  }
});

/* RESET MPIN */
export const resetMpin = createAsyncThunk<
  GenericSuccessResponse,
  ResetMpinPayload,
  { rejectValue: string }
>("auth/resetMpin", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiService.post(API_CONFIG.ENDPOINTS.RESET_MPIN, payload);
    return res.data.data || res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Failed to reset MPIN");
  }
});

/* ----------------------------------
   SLICE
---------------------------------- */

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      tokenService.clearTokens();
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.error = null;
      state.loading = "idle";
      state.otpSent = false;
      state.otpVerified = false;
      state.mpinCreated = false;
      state.verificationMethod = null;
    },

    clearError: (state) => {
      state.error = null;
    },

    setOtpSent: (state, action) => {
      state.otpSent = action.payload;
    },

    setOtpVerified: (state, action) => {
      state.otpVerified = action.payload;
    },

    setMpinCreated: (state, action) => {
      state.mpinCreated = action.payload;
    },

    setVerificationMethod: (state, action) => {
      state.verificationMethod = action.payload;
    },
  },

  extraReducers: (builder) => {
    const pending = (state: AuthState) => {
      state.loading = "pending";
      state.error = null;
    };

    /* LOGIN */
    builder
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = "succeeded";
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.user = payload.user;
        state.lastFetched = Date.now();
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Login failed";
      })

      /* REGISTER */
      .addCase(registerUser.pending, pending)
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = "succeeded";
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.user = payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Registration failed";
      })

      /* VERIFY CODE */
      .addCase(verifyCode.pending, pending)
      .addCase(verifyCode.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Verification failed";
      })

      /* REFRESH TOKEN */
      .addCase(refreshToken.pending, pending)
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.loading = "succeeded";
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = "failed";
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.error = action.payload || "Session expired";
      })

      /* VERIFY OTP */
      .addCase(verifyOtp.pending, pending)
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        state.loading = "succeeded";
        state.otpVerified = true;
        if (payload.accessToken) {
          state.accessToken = payload.accessToken;
        }
        if (payload.refreshToken) {
          state.refreshToken = payload.refreshToken;
        }
        if (payload.user) {
          state.user = payload.user;
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "OTP verification failed";
      })

      /* RESEND OTP */
      .addCase(resendOtp.pending, pending)
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = "succeeded";
        state.otpSent = true;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to resend OTP";
      })

      /* CREATE MPIN */
      .addCase(createMpin.pending, pending)
      .addCase(createMpin.fulfilled, (state) => {
        state.loading = "succeeded";
        state.mpinCreated = true;
      })
      .addCase(createMpin.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to create MPIN";
      })

      /* VERIFY MPIN */
      .addCase(verifyMpin.pending, pending)
      .addCase(verifyMpin.fulfilled, (state, { payload }) => {
        state.loading = "succeeded";
        if (payload.accessToken) {
          state.accessToken = payload.accessToken;
        }
        if (payload.refreshToken) {
          state.refreshToken = payload.refreshToken;
        }
        if (payload.user) {
          state.user = payload.user;
        }
      })
      .addCase(verifyMpin.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "MPIN verification failed";
      })

      /* FORGOT PASSWORD */
      .addCase(forgotPassword.pending, pending)
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to send reset email";
      })

      /* VALIDATE RESET TOKEN */
      .addCase(validateResetToken.pending, pending)
      .addCase(validateResetToken.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(validateResetToken.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Invalid or expired reset token";
      })

      /* RESET PASSWORD */
      .addCase(resetPassword.pending, pending)
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to reset password";
      })

      /* FORGOT MPIN */
      .addCase(forgotMpin.pending, pending)
      .addCase(forgotMpin.fulfilled, (state) => {
        state.loading = "succeeded";
        state.otpSent = true;
      })
      .addCase(forgotMpin.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to send MPIN reset code";
      })

      /* RESET MPIN */
      .addCase(resetMpin.pending, pending)
      .addCase(resetMpin.fulfilled, (state) => {
        state.loading = "succeeded";
        state.mpinCreated = true;
      })
      .addCase(resetMpin.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Failed to reset MPIN";
      });
  },
});

/* ----------------------------------
   SELECTORS
---------------------------------- */
export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  !!state.auth.accessToken;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectOtpSent = (state: RootState) => state.auth.otpSent;
export const selectOtpVerified = (state: RootState) => state.auth.otpVerified;
export const selectMpinCreated = (state: RootState) => state.auth.mpinCreated;
export const selectVerificationMethod = (state: RootState) => state.auth.verificationMethod;

/* ----------------------------------
   EXPORTS
---------------------------------- */
export const {
  logout,
  clearError,
  setOtpSent,
  setOtpVerified,
  setMpinCreated,
  setVerificationMethod,
} = authSlice.actions;

export default authSlice.reducer;
