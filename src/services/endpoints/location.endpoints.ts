import config from "@/utils/comman";

const BASE_API = config.Location;

const LOCATION_ENDPOINTS = {
    // Location Management
    GET_ALL_LOCATIONS: `${BASE_API}/locations`,
    GET_LOCATION_BY_ID: `${BASE_API}/locations/:id`,
    GET_STATES: `${BASE_API}/locations/states`,
    GET_CITIES_BY_STATE: `${BASE_API}/locations/states/:stateId/cities`,

    // Garage/Workshop Search & Management
    SEARCH_GARAGES: `${BASE_API}/garages/search`,
    GET_GARAGE_BY_ID: `${BASE_API}/garages/:id`,
    GET_NEARBY_GARAGES: `${BASE_API}/garages/nearby`,
    GET_GARAGE_SERVICES: `${BASE_API}/garages/:id/services`,
    GET_GARAGE_REVIEWS: `${BASE_API}/garages/:id/reviews`,

    // Filters & Suggestions
    SEARCH_SUGGESTIONS: `${BASE_API}/search/suggestions`,
    VALIDATE_PINCODE: `${BASE_API}/locations/validate-pincode`,
};

export default LOCATION_ENDPOINTS;
