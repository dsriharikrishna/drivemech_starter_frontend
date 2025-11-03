// src/services/tokenService.ts
export const tokenService = {
    getAccessToken: (): string | null => {
      if (typeof window === 'undefined') return null;
      try {
        return localStorage.getItem('accessToken') ;
      } catch {
        return null;
      }
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
      try {
        return localStorage.getItem('refreshToken');
      } catch {
        return null;
      }
    },
  
    setRefreshToken: (token: string): void => {
      if (typeof window === 'undefined') return;
      localStorage.setItem('refreshToken', token);
    },
  
    removeRefreshToken: (): void => {
      if (typeof window === 'undefined') return;
      localStorage.removeItem('refreshToken');
    },
  
    clearTokens: (): void => {
      if (typeof window === 'undefined') return;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  };