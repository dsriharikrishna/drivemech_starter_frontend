import config from "@/utils/comman";

const BASE_API = config.User;

const USER_ENDPOINTS = {
    // Profile Management
    GET_PROFILE: `${BASE_API}/profile`,
    UPDATE_PROFILE: `${BASE_API}/profile`,
    UPDATE_AVATAR: `${BASE_API}/profile/avatar`,

    // Address Management
    GET_ADDRESSES: `${BASE_API}/addresses`,
    GET_ADDRESS_BY_ID: `${BASE_API}/addresses/:id`,
    ADD_ADDRESS: `${BASE_API}/addresses`,
    UPDATE_ADDRESS: `${BASE_API}/addresses/:id`,
    DELETE_ADDRESS: `${BASE_API}/addresses/:id`,
    SET_DEFAULT_ADDRESS: `${BASE_API}/addresses/:id/default`,

    // Preferences
    GET_PREFERENCES: `${BASE_API}/preferences`,
    UPDATE_PREFERENCES: `${BASE_API}/preferences`,

    // Notification Settings
    GET_NOTIFICATION_SETTINGS: `${BASE_API}/notification-settings`,
    UPDATE_NOTIFICATION_SETTINGS: `${BASE_API}/notification-settings`,
};

export default USER_ENDPOINTS;
