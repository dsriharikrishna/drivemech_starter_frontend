import config from "@/utils/comman";

const BASE_API = config.Workshop;

const WORKSHOP_ENDPOINTS = {
    // Workshop Discovery & Search
    SEARCH_WORKSHOPS: `${BASE_API}/workshops/search`,
    GET_WORKSHOP_BY_ID: `${BASE_API}/workshops/:id`,
    GET_NEARBY_WORKSHOPS: `${BASE_API}/workshops/nearby`,
    GET_FEATURED_WORKSHOPS: `${BASE_API}/workshops/featured`,

    // Workshop Services
    GET_WORKSHOP_SERVICES: `${BASE_API}/workshops/:id/services`,
    GET_SERVICE_PACKAGES: `${BASE_API}/workshops/:id/packages`,
    GET_AVAILABLE_TIME_SLOTS: `${BASE_API}/workshops/:id/time-slots`,

    // Workshop Reviews & Ratings
    GET_WORKSHOP_REVIEWS: `${BASE_API}/workshops/:id/reviews`,
    CREATE_WORKSHOP_REVIEW: `${BASE_API}/workshops/:id/reviews`,

    // Workshop Booking
    CREATE_WORKSHOP_BOOKING: `${BASE_API}/bookings/workshop`,
    GET_WORKSHOP_BOOKING: `${BASE_API}/bookings/workshop/:id`,
    UPDATE_WORKSHOP_BOOKING: `${BASE_API}/bookings/workshop/:id`,
    CANCEL_WORKSHOP_BOOKING: `${BASE_API}/bookings/workshop/:id/cancel`,
};

export default WORKSHOP_ENDPOINTS;
