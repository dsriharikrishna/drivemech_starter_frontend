import config from "@/utils/comman";

const BASE_API = config.Auth;

const AUTH_ENDPOINTS = {
  // Authentication
  LOGIN: `${BASE_API}/login`,
  REGISTER: `${BASE_API}/register`,
  LOGOUT: `${BASE_API}/logout`,
  REFRESH_TOKEN: `${BASE_API}/refresh-token`,

  // OTP Operations
  VERIFY_OTP: `${BASE_API}/verify-otp`,
  RESEND_OTP: `${BASE_API}/resend-otp`,

  // MPIN Operations
  CREATE_MPIN: `${BASE_API}/create-mpin`,
  VERIFY_MPIN: `${BASE_API}/verify-mpin`,
  FORGOT_MPIN: `${BASE_API}/forgot-mpin`,
  RESET_MPIN: `${BASE_API}/reset-mpin`,

  // Password Operations
  FORGOT_PASSWORD: `${BASE_API}/forgot-password`,
  RESET_TOKEN_VALIDATION: `${BASE_API}/validate-reset-token`,
  RESET_PASSWORD: `${BASE_API}/reset-password`,

  // User Profile
  PROFILE_DETAILS: `${BASE_API}/profile`,

  // Legacy endpoint (deprecated)
  VERIFY_CODE: `${BASE_API}/verify-code`,
};

export default AUTH_ENDPOINTS;