import config from "@/utils/comman";

const BASE_API = config.Payment;

const PAYMENT_ENDPOINTS = {
    // Payment Methods
    GET_PAYMENT_METHODS: `${BASE_API}/payment-methods`,
    ADD_PAYMENT_METHOD: `${BASE_API}/payment-methods`,
    REMOVE_PAYMENT_METHOD: `${BASE_API}/payment-methods/:id`,
    SET_DEFAULT_PAYMENT_METHOD: `${BASE_API}/payment-methods/:id/default`,

    // Payment Processing
    PROCESS_PAYMENT: `${BASE_API}/payments`,
    VERIFY_PAYMENT: `${BASE_API}/payments/:id/verify`,
    REFUND_PAYMENT: `${BASE_API}/payments/:id/refund`,

    // Transaction History
    GET_TRANSACTIONS: `${BASE_API}/transactions`,
    GET_TRANSACTION_BY_ID: `${BASE_API}/transactions/:id`,
    DOWNLOAD_RECEIPT: `${BASE_API}/transactions/:id/receipt`,

    // Wallet
    GET_WALLET_BALANCE: `${BASE_API}/wallet/balance`,
    ADD_MONEY_TO_WALLET: `${BASE_API}/wallet/add`,
    GET_WALLET_TRANSACTIONS: `${BASE_API}/wallet/transactions`,
};

export default PAYMENT_ENDPOINTS;
