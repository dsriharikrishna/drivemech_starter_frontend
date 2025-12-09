import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { API_CONFIG } from "@/services/apiConfig";
import apiService from "@/services/apiService";
import { tokenService } from "@/services/tokenService";
import { AuthResponseData, AuthState, LoginPayload, RefreshTokenResponse, RegisterPayload, VerifyPayload } from "@/types/authTypes";

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
    },

    clearError: (state) => {
      state.error = null;
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

/* ----------------------------------
   EXPORTS
---------------------------------- */
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
