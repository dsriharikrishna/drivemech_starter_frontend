// src/services/apiService.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_CONFIG } from "./apiConfig";
import { tokenService } from "./tokenService";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Enable CSRF protection
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenService.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Token refresh logic will be handled by useApiInterceptor hook
        // This is just a fallback
        return api(originalRequest);
      } catch (refreshError) {
        // Redirect to login or clear tokens
        tokenService.clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout. Please try again.'));
    }

    // Return error with proper message
    const errorData = error.response?.data as { message?: string } | undefined;
    const errorMessage = errorData?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

// Fixed apiDelete - support for body in DELETE requests
export async function apiDelete<T>(url: string, data?: any, config?: any): Promise<T> {
  const res = await api.delete<T>(url, { data, ...config });
  return res.data;
}

// Keep other methods the same
export async function apiGet<T>(url: string, config?: any): Promise<T> {
  const res = await api.get<T>(url, config);
  return res.data;
}

export async function apiPost<T>(url: string, body?: any, config?: any): Promise<T> {
  const res = await api.post<T>(url, body, config);
  return res.data;
}

export async function apiPut<T>(url: string, body?: any, config?: any): Promise<T> {
  const res = await api.put<T>(url, body, config);
  return res.data;
}

export async function apiPatch<T>(url: string, body?: any, config?: any): Promise<T> {
  const res = await api.patch<T>(url, body, config);
  return res.data;
}

export default api;