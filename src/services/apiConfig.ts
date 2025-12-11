import config from "@/utils/comman";
import AUTH_ENDPOINTS from "./endpoints/auth.endpoints";
import LOCATION_ENDPOINTS from "./endpoints/location.endpoints";
import WORKSHOP_ENDPOINTS from "./endpoints/workshop.endpoints";
import BOOKING_ENDPOINTS from "./endpoints/booking.endpoints";
import ORDER_ENDPOINTS from "./endpoints/order.endpoints";
import PAYMENT_ENDPOINTS from "./endpoints/payment.endpoints";
import USER_ENDPOINTS from "./endpoints/user.endpoints";
import NOTIFICATION_ENDPOINTS from "./endpoints/notification.endpoints";

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
  ...LOCATION_ENDPOINTS,
  ...WORKSHOP_ENDPOINTS,
  ...BOOKING_ENDPOINTS,
  ...ORDER_ENDPOINTS,
  ...PAYMENT_ENDPOINTS,
  ...USER_ENDPOINTS,
  ...NOTIFICATION_ENDPOINTS,
};

const frozenEndpoints = Object.freeze(endpoints);

const API_CONFIG: ApiConfig = {
  BASE_URL: config.BASE_URL as string,
  ENDPOINTS: frozenEndpoints,
};

export default API_CONFIG;
export { API_CONFIG };