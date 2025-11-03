// Application constants

// API endpoints
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
  },
  VEHICLES: {
    BASE: '/vehicles',
    BY_USER: '/vehicles/user',
  },
  APPOINTMENTS: {
    BASE: '/appointments',
    BY_USER: '/appointments/user',
    BY_MECHANIC: '/appointments/mechanic',
  },
  SERVICES: {
    BASE: '/services',
    BY_CATEGORY: '/services/category',
  },
  TESTIMONIALS: {
    BASE: '/testimonials',
  },
} as const;

// App configuration
export const APP_CONFIG = {
  NAME: 'DriveMech',
  DESCRIPTION: 'Professional automotive repair and maintenance services',
  VERSION: '1.0.0',
  COMPANY_NAME: 'DriveMech Inc.',
  CONTACT_EMAIL: 'support@drivemech.com',
  CONTACT_PHONE: '1-800-DRIVEMECH',
} as const;

// Service categories
export const SERVICE_CATEGORIES = [
  'General Maintenance',
  'Engine Repair',
  'Brake Service',
  'Tire Service',
  'Electrical',
  'AC & Heating',
  'Transmission',
  'Oil Change',
  'Inspection',
  'Other',
] as const;

// Appointment statuses
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// User roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  MECHANIC: 'mechanic',
  ADMIN: 'admin',
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_PARAM: 'page',
  SIZE_PARAM: 'pageSize',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'drivemech_auth_token',
  USER_DATA: 'drivemech_user_data',
  THEME: 'drivemech_theme',
  LANGUAGE: 'drivemech_language',
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  INPUT: 'yyyy-MM-dd',
  INPUT_WITH_TIME: 'yyyy-MM-ddTHH:mm',
  TIME_ONLY: 'HH:mm',
} as const;

