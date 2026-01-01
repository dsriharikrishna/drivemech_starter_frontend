import config from "@/utils/comman";

const BASE_API = config.Booking;

const BOOKING_ENDPOINTS = {
    // Booking Management
    CREATE_BOOKING: `${BASE_API}/bookings`,
    GET_BOOKING_BY_ID: `${BASE_API}/bookings/:id`,
    UPDATE_BOOKING: `${BASE_API}/bookings/:id`,
    CANCEL_BOOKING: `${BASE_API}/bookings/:id/cancel`,

    // User Bookings
    GET_USER_BOOKINGS: `${BASE_API}/bookings/user/:userId`,
    GET_ACTIVE_BOOKINGS: `${BASE_API}/bookings/user/:userId/active`,
    GET_PAST_BOOKINGS: `${BASE_API}/bookings/user/:userId/past`,

    // Booking Tracking
    TRACK_BOOKING: `${BASE_API}/bookings/:id/track`,
    GET_BOOKING_STATUS: `${BASE_API}/bookings/:id/status`,

    // Booking Actions
    RESCHEDULE_BOOKING: `${BASE_API}/bookings/:id/reschedule`,
    CONFIRM_BOOKING: `${BASE_API}/bookings/:id/confirm`,
};

export default BOOKING_ENDPOINTS;
