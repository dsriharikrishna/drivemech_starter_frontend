// Validate environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  if (typeof window === 'undefined') {
    // Server-side: throw error during build
    throw new Error('NEXT_PUBLIC_API_BASE_URL environment variable is not defined');
  } else {
    // Client-side: use fallback and log warning
    console.error('⚠️ NEXT_PUBLIC_API_BASE_URL is not defined. Using fallback.');
  }
}

const FALLBACK_URL = 'http://localhost:3000';
const API_BASE_URL = BASE_URL || FALLBACK_URL;

const config = {
  BASE_URL: API_BASE_URL,
  Auth: `${API_BASE_URL}/auth`,
  Location: `${API_BASE_URL}/api`,
  Workshop: `${API_BASE_URL}/api`,
  Booking: `${API_BASE_URL}/api`,
  Order: `${API_BASE_URL}/api`,
  Payment: `${API_BASE_URL}/api`,
  User: `${API_BASE_URL}/api`,
  Notification: `${API_BASE_URL}/api`,
};

export default config;