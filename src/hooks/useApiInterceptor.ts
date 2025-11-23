// src/hooks/useApiInterceptor.ts
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import api from "@/services/apiService";
import { logout, refreshToken } from "@/store/slicers/authSlicer";

export const useApiInterceptor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Only handle 401 once per request
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Avoid refresh loop
          if (originalRequest.url?.includes("refresh-token")) {
            return Promise.reject(error);
          }

          try {
            console.warn("🔐 Access token expired. Attempting to refresh...");

            const response = await dispatch(refreshToken()).unwrap();

            if (response?.accessToken) {
              // Update header for all next requests
              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${response.accessToken}`;

              console.log("✅ Token refreshed successfully");
              // Retry original request
              return api(originalRequest);
            }
          } catch (refreshError) {
            console.error("❌ Token refresh failed:", refreshError);
            dispatch(logout());
            router.replace("/");
          }
        }

        return Promise.reject(error);
      }
    );

    console.log("✅ API interceptor initialized");

    // Cleanup on unmount
    return () => {
      api.interceptors.response.eject(interceptor);
      console.log("🧹 API interceptor removed");
    };
  }, [dispatch, router]);
};
