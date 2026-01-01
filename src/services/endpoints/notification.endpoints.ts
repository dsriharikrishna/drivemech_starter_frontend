import config from "@/utils/comman";

const BASE_API = config.Notification;

const NOTIFICATION_ENDPOINTS = {
    // Notifications
    GET_NOTIFICATIONS: `${BASE_API}/notifications`,
    GET_NOTIFICATION_BY_ID: `${BASE_API}/notifications/:id`,
    MARK_AS_READ: `${BASE_API}/notifications/:id/read`,
    MARK_ALL_AS_READ: `${BASE_API}/notifications/read-all`,
    DELETE_NOTIFICATION: `${BASE_API}/notifications/:id`,
    DELETE_ALL_NOTIFICATIONS: `${BASE_API}/notifications/delete-all`,

    // Notification Count
    GET_UNREAD_COUNT: `${BASE_API}/notifications/unread-count`,
};

export default NOTIFICATION_ENDPOINTS;
