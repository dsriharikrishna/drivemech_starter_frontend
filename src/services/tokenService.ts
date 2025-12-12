// src/services/tokenService.ts
import cookieService from './cookieService';

/**
 * Token Service
 * Now uses cookies instead of localStorage for better security
 */
export const tokenService = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return cookieService.getAccessToken() || null;
    } catch {
      return null;
    }
  },

  setAccessToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    cookieService.setAccessToken(token);
  },

  removeAccessToken: (): void => {
    if (typeof window === 'undefined') return;
    cookieService.remove('accessToken');
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return cookieService.getRefreshToken() || null;
    } catch {
      return null;
    }
  },

  setRefreshToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    cookieService.setRefreshToken(token);
  },

  removeRefreshToken: (): void => {
    if (typeof window === 'undefined') return;
    cookieService.remove('refreshToken');
  },

  clearTokens: (): void => {
    if (typeof window === 'undefined') return;
    cookieService.clearTokens();
  },

  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return cookieService.isAuthenticated();
  },
};