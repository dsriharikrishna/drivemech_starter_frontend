import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { API_CONFIG } from "@/services/apiConfig";
import apiService from "@/services/apiService";
import { AuthState, AuthResponseData, LoginPayload, User } from "@/types/authTypes";

// Helper functions for localStorage
const storageService = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  },
  setAccessToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', token);
  },
  removeAccessToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
  },
  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  },
  setRefreshToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('refreshToken', token);
  },
  removeRefreshToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('refreshToken');
  },
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
  setUser: (user: User): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user', JSON.stringify(user));
  },
  removeUser: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('user');
  },
  clearAll: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

// Get initial state from localStorage
const getInitialState = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      accessToken: null, 
      refreshToken: null,
      user: null,
      loading: "idle",
      error: null,
      lastFetched: null,
    };
  }

  return {
    accessToken: storageService.getAccessToken(),
    refreshToken: storageService.getRefreshToken(),
    user: storageService.getUser(),
    loading: "idle",
    error: null,
    lastFetched: null,
  };
};

// ---------------- Initial State ----------------
const initialState: AuthState = getInitialState();

// Helper function to parse token strings
const parseToken = (token: any): string | null => {
  if (!token) return null;
  if (typeof token === 'string') {
    // Remove surrounding quotes if present
    return token.replace(/^"|"$/g, '');
  }
  return token;
};

// Helper function to parse user object
const parseUser = (userData: any): User | null => {
  if (!userData) return null;
  
  if (typeof userData === 'string') {
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }
  
  // If it's already an object, use it directly
  return {
    id: userData.userId || userData.id || '',
    email: userData.email || '',
    name: userData.name || "",
    isActive: userData.isActive !== undefined ? userData.isActive : true,
    roles: userData.roles || [],
    createdAt: userData.createdAt || new Date().toISOString(),
  };
};

// ---------------- Thunks ----------------
export const loginUser = createAsyncThunk<
  AuthResponseData,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiService.post(API_CONFIG.ENDPOINTS.LOGIN, credentials);

    // Handle potential stringified response
    const responseData = typeof response.data === 'string' 
      ? JSON.parse(response.data) 
      : response.data;

    const innerData = responseData.data || responseData;

    // Parse tokens and user data
    const accessToken = parseToken(innerData.accessToken);
    const refreshToken = parseToken(innerData.refreshToken);
    const user = parseUser(innerData.user || innerData);

    if (!accessToken) {
      throw new Error("No access token received");
    }

    // Store in localStorage immediately
    if (accessToken) storageService.setAccessToken(accessToken);
    if (refreshToken) storageService.setRefreshToken(refreshToken);
    if (user) storageService.setUser(user);

    // Ensure we return proper AuthResponseData type
    const result: AuthResponseData = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user || {
        id: innerData.userId || '',
        email: innerData.email || '',
        name: innerData.name || "",
        isActive: true,
        roles: [],
        createdAt: new Date().toISOString(),
      }
    };

    return result;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || error.message || "Authentication failed"
    );
  }
});

export const refreshToken = createAsyncThunk<
  { accessToken: string; refreshToken: string },
  void,
  { state: RootState; rejectValue: string }
>(
  "auth/refreshToken",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { refreshToken: currentRefreshToken } = getState().auth;
      const cleanRefreshToken = parseToken(currentRefreshToken);
      
      if (!cleanRefreshToken) {
        return rejectWithValue("No refresh token available");
      }

      const response = await apiService.post(
        API_CONFIG.ENDPOINTS.REFRESH_TOKEN,
        { refreshToken: cleanRefreshToken }
      );

      // Handle potential stringified response
      const responseData = typeof response.data === 'string' 
        ? JSON.parse(response.data) 
        : response.data;

      const innerData = responseData.data || responseData;

      const accessToken = parseToken(innerData.accessToken);
      const newRefreshToken = parseToken(innerData.refreshToken);

      if (!accessToken) {
        throw new Error("No access token received from refresh");
      }

      // Update localStorage with new tokens
      if (accessToken) storageService.setAccessToken(accessToken);
      if (newRefreshToken) storageService.setRefreshToken(newRefreshToken);

      return { 
        accessToken, 
        refreshToken: newRefreshToken || cleanRefreshToken
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Session expired. Please log in again."
      );
    }
  }
);

// ---------------- Slice ----------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // Clear localStorage
      storageService.clearAll();
      
      // Clear Redux state
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.loading = "idle";
      state.error = null;
      state.lastFetched = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: { payload: Partial<User> }) => {
      if (state.user) {
        const updatedUser = { ...state.user, ...action.payload };
        state.user = updatedUser;
        // Update localStorage
        storageService.setUser(updatedUser);
      }
    },
    // New action to sync with localStorage (useful for tab sync)
    syncWithStorage: (state) => {
      state.accessToken = storageService.getAccessToken();
      state.refreshToken = storageService.getRefreshToken();
      state.user = storageService.getUser();
    }
  },
  extraReducers: (builder) => {
    const handlePending = (state: AuthState) => {
      state.loading = "pending";
      state.error = null;
    };

    // Login
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = "succeeded";
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.user = payload.user;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "failed";
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.error = action.payload ?? "Login failed";
        state.lastFetched = Date.now();
      });

    // Refresh Token
    builder
      .addCase(refreshToken.pending, handlePending)
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.loading = "succeeded";
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = "failed";
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.error = action.payload || "Session expired";
        state.lastFetched = Date.now();
      });
  },
});

// ---------------- Selectors ----------------
export const selectAuth = (state: RootState) => state.auth;
export const selectCurrentUser = createSelector([selectAuth], (auth) => auth.user);
export const selectIsAuthenticated = createSelector([selectAuth], (auth) => !!auth.accessToken);
export const selectAuthError = createSelector([selectAuth], (auth) => auth.error);
export const selectAuthLoading = createSelector([selectAuth], (auth) => auth.loading);

// ---------------- Actions & Reducer ----------------
export const { logout, clearError, updateUser, syncWithStorage } = authSlice.actions;
export default authSlice.reducer;