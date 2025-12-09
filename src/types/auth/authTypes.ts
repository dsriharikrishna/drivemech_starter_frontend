// ==================== USER MODEL ====================
export interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  roles: string[];
  createdAt: string;
  // Optional fields for enhanced auth features
  phoneVerified?: boolean;
  emailVerified?: boolean;
  mpinCreated?: boolean;
  phone?: string;
}

// ==================== LOADING STATES ====================
export type LoadingState = "idle" | "pending" | "succeeded" | "failed";

// ==================== AUTH STATE (Redux Slice) ====================
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: LoadingState;
  error: string | null;
  lastFetched: number | null;
  // Enhanced state for auth flows
  otpSent: boolean;
  otpVerified: boolean;
  mpinCreated: boolean;
  verificationMethod: "email" | "phone" | null;
}

// ==================== LOGIN PAYLOADS ====================
export interface LoginPayload {
  email?: string;
  phone?: string;
  password?: string;
}

// ==================== REGISTER PAYLOADS ====================
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string;
}

// ==================== OTP VERIFICATION ====================
export interface OtpVerifyPayload {
  email?: string;
  phone?: string;
  code: string;
}

export interface ResendOtpPayload {
  email?: string;
  phone?: string;
}

export interface OtpVerifyResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

// ==================== MPIN OPERATIONS ====================
export interface CreateMpinPayload {
  mpin: string;
  confirmMpin: string;
}

export interface VerifyMpinPayload {
  email?: string;
  phone?: string;
  mpin: string;
}

export interface ForgotMpinPayload {
  email?: string;
  phone?: string;
}

export interface ResetMpinPayload {
  email?: string;
  phone?: string;
  code: string;
  newMpin: string;
  confirmMpin: string;
}

export interface MpinResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

// ==================== PASSWORD OPERATIONS ====================
export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ValidateResetTokenPayload {
  token: string;
}

// ==================== AUTH RESPONSE (API) ====================
export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// ==================== REFRESH TOKEN RESPONSE ====================
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// ==================== GENERIC RESPONSES ====================
export interface GenericSuccessResponse {
  success: boolean;
  message: string;
}

// ==================== LEGACY VERIFY PAYLOAD ====================
/** @deprecated Use OtpVerifyPayload instead */
export interface VerifyPayload {
  email: string;
  code: string;
}