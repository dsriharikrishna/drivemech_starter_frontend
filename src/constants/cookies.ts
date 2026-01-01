/**
 * Cookie Expiry Constants
 * Centralized configuration for cookie expiration times
 */

export const COOKIE_EXPIRY = {
    /** Access token: 15 minutes (1/96 of a day) */
    ACCESS_TOKEN: 1 / 96,

    /** Refresh token: 7 days */
    REFRESH_TOKEN: 7,

    /** Policy ID: 1 day */
    POLICY_ID: 1,

    /** General session: 30 days */
    SESSION: 30,
} as const;

/**
 * Cookie Configuration
 * Security settings for cookies
 */
export const COOKIE_CONFIG = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
} as const;
