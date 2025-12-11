import config from "@/utils/comman";

const BASE_API = config.Order;

const ORDER_ENDPOINTS = {
    // Order Management
    GET_ORDERS: `${BASE_API}/orders`,
    GET_ORDER_BY_ID: `${BASE_API}/orders/:id`,
    UPDATE_ORDER_STATUS: `${BASE_API}/orders/:id/status`,
    CANCEL_ORDER: `${BASE_API}/orders/:id/cancel`,

    // Order Types
    GET_SERVICE_ORDERS: `${BASE_API}/orders/services`,
    GET_SPARES_ORDERS: `${BASE_API}/orders/spares`,
    GET_INSURANCE_ORDERS: `${BASE_API}/orders/insurance`,
    GET_TOWING_ORDERS: `${BASE_API}/orders/towing`,

    // Order Actions
    REORDER_SERVICE: `${BASE_API}/orders/:id/reorder`,
    DOWNLOAD_INVOICE: `${BASE_API}/orders/:id/invoice`,

    // Spares Orders
    REQUEST_RETURN: `${BASE_API}/orders/spares/:id/return`,
    TRACK_RETURN: `${BASE_API}/orders/spares/:id/return/track`,

    // Insurance Orders
    FILE_CLAIM: `${BASE_API}/orders/insurance/:id/claim`,
    ADD_NOMINEE: `${BASE_API}/orders/insurance/:id/nominee`,
    MODIFY_POLICY: `${BASE_API}/orders/insurance/:id/modify`,
};

export default ORDER_ENDPOINTS;
