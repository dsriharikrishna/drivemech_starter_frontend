import config from "@/utils/comman";

const BASE_API = config.Auth;

const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_API}/login`,
  LOGOUT: `${BASE_API}/logout`,
  REFRESH_TOKEN: `${BASE_API}/refresh-token`,

  FORGOT_PASSWORD: `${BASE_API}/forgot-password`,
  RESET_TOKEN_VALIDATION: `${BASE_API}/validate-reset-token`,
  RESET_PASSWORD: `${BASE_API}/reset-password`,
  PROFILE_DETAILS: `${BASE_API}/profile`,

};

export default AUTH_ENDPOINTS;