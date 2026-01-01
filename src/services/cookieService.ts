import Cookies from 'js-cookie';

/**
 * Cookie Utility Service
 * Provides secure cookie management for token storage
 */

// Cookie configuration
const COOKIE_OPTIONS = {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict' as const, // CSRF protection
    path: '/', // Available across entire app
};

const ACCESS_TOKEN_OPTIONS = {
    ...COOKIE_OPTIONS,
    expires: 1 / 96, // 15 minutes (1/96 of a day)
};

const REFRESH_TOKEN_OPTIONS = {
    ...COOKIE_OPTIONS,
    expires: 7, // 7 days
};

export const cookieService = {
    /**
     * Set a cookie
     */
    set: (name: string, value: string, options = COOKIE_OPTIONS) => {
        if (typeof window === 'undefined') return;
        Cookies.set(name, value, options);
    },

    /**
     * Get a cookie
     */
    get: (name: string): string | undefined => {
        if (typeof window === 'undefined') return undefined;
        return Cookies.get(name);
    },

    /**
     * Remove a cookie
     */
    remove: (name: string) => {
        if (typeof window === 'undefined') return;
        Cookies.remove(name, { path: '/' });
    },

    /**
     * Set access token
     */
    setAccessToken: (token: string) => {
        if (typeof window === 'undefined') return;
        Cookies.set('accessToken', token, ACCESS_TOKEN_OPTIONS);
    },

    /**
     * Get access token
     */
    getAccessToken: (): string | undefined => {
        if (typeof window === 'undefined') return undefined;
        return Cookies.get('accessToken');
    },

    /**
     * Set refresh token
     */
    setRefreshToken: (token: string) => {
        if (typeof window === 'undefined') return;
        Cookies.set('refreshToken', token, REFRESH_TOKEN_OPTIONS);
    },

    /**
     * Get refresh token
     */
    getRefreshToken: (): string | undefined => {
        if (typeof window === 'undefined') return undefined;
        return Cookies.get('refreshToken');
    },

    /**
     * Clear all auth tokens
     */
    clearTokens: () => {
        if (typeof window === 'undefined') return;
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('refreshToken', { path: '/' });
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: (): boolean => {
        if (typeof window === 'undefined') return false;
        return !!Cookies.get('accessToken');
    },
};

export default cookieService;
