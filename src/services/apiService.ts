// src/services/apiService.ts
import axios from "axios";
import { API_CONFIG } from "./apiConfig";
import { tokenService } from "./tokenService";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

api.interceptors.request.use((config: any) => {
  const token = tokenService.getAccessToken();
  if (token) {
    config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
  }
  return config;
});

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