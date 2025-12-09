  //  USER MODEL
export interface User {
  id: string;
  email: string;
  name: string;              
  isActive: boolean;
  roles: string[];          
  createdAt: string;
}

//  LOADING STATES
export type LoadingState = "idle" | "pending" | "succeeded" | "failed";

//  AUTH STATE (Redux Slice)
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: LoadingState;
  error: string | null;
  lastFetched: number | null;
}

//  LOGIN PAYLOAD
export interface LoginPayload {
  email?: string;
  phone?: string;
  password?: string;
}

//  REGISTER PAYLOAD
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string;
}

//  AUTH RESPONSE (API)
export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

//  REFRESH TOKEN RESPONSE
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// ---------------- VERIFY PAYLOAD (FIXED) ----------------
export interface VerifyPayload {
  email: string;
  code: string;
}