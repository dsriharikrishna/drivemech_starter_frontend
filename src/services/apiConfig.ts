import config from "@/utils/comman";
import AUTH_ENDPOINTS from "./endpoints/auth.endpoints";

// Type for API endpoints
type EndpointValue = string;

export interface ApiEndpoints {
  [key: string]: EndpointValue;
}

export interface ApiConfig {
  BASE_URL: string;
  ENDPOINTS: Readonly<ApiEndpoints>;
}

const endpoints: ApiEndpoints = {
  ...AUTH_ENDPOINTS,
};

const frozenEndpoints = Object.freeze(endpoints);

const API_CONFIG: ApiConfig = {
  BASE_URL: config.BASE_URL as string,
  ENDPOINTS: frozenEndpoints,
};

// Add nested endpoints for location services
export const LOCATION_ENDPOINTS = {
  LOCATIONS: {
    ALL: '/locations',
    BY_ID: '/locations',
  },
  GARAGES: {
    SEARCH: '/garages/search',
    BY_ID: '/garages',
  },
} as const;

export default API_CONFIG;
export { API_CONFIG };