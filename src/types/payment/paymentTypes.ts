// ---------------- Payment Method Types ----------------

export type PaymentMethodType = 'card' | 'upi' | 'wallet' | 'netbanking' | 'cash';

export interface SavedCard {
    id: string;
    userId: string;
    cardType: 'credit' | 'debit';
    bankName: string;
    cardNumber: string; // masked, e.g., "**** **** **** 1234"
    cardHolderName: string;
    expiryMonth: string;
    expiryYear: string;
    isDefault: boolean;
    createdAt: string;
}

export interface UPIAccount {
    id: string;
    userId: string;
    upiId: string;
    provider: string; // e.g., "Google Pay", "PhonePe", "Paytm"
    isDefault: boolean;
    isVerified: boolean;
    createdAt: string;
}

export interface PaymentMethod {
    id: string;
    userId: string;
    type: PaymentMethodType;
    details: SavedCard | UPIAccount | WalletInfo;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface WalletInfo {
    id: string;
    userId: string;
    balance: number;
    currency: string;
}

// ---------------- Payment Types ----------------

export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed' | 'refunded' | 'cancelled';

export interface Payment {
    id: string;
    userId: string;
    bookingId?: string;
    orderId?: string;

    // Amount
    amount: number;
    currency: string;

    // Payment Method
    paymentMethod: PaymentMethodType;
    paymentMethodId?: string;

    // Status
    status: PaymentStatus;

    // Transaction Details
    transactionId?: string;
    gatewayTransactionId?: string;
    gateway?: string; // e.g., "Razorpay", "Stripe"

    // Metadata
    description?: string;
    metadata?: Record<string, any>;

    // Timestamps
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
    failedAt?: string;
}

// ---------------- Transaction Types ----------------

export type TransactionType = 'payment' | 'refund' | 'wallet_credit' | 'wallet_debit';

export interface Transaction {
    id: string;
    userId: string;
    type: TransactionType;

    // Amount
    amount: number;
    currency: string;

    // Related Entities
    paymentId?: string;
    bookingId?: string;
    orderId?: string;

    // Payment Details
    paymentMethod: PaymentMethodType;
    status: PaymentStatus;

    // Transaction Info
    transactionId: string;
    description: string;

    // Balance (for wallet transactions)
    balanceBefore?: number;
    balanceAfter?: number;

    // Timestamps
    createdAt: string;
}

// ---------------- Request Types ----------------

export interface AddPaymentMethodPayload {
    type: PaymentMethodType;
    details: Partial<SavedCard> | Partial<UPIAccount>;
    setAsDefault?: boolean;
}

export interface ProcessPaymentPayload {
    amount: number;
    paymentMethodId?: string;
    paymentMethod: PaymentMethodType;
    bookingId?: string;
    orderId?: string;
    description?: string;
    metadata?: Record<string, any>;
}

export interface VerifyPaymentPayload {
    paymentId: string;
    gatewayTransactionId: string;
    signature?: string;
}

export interface RefundPaymentPayload {
    paymentId: string;
    amount?: number; // partial refund if specified
    reason: string;
}

export interface AddMoneyToWalletPayload {
    amount: number;
    paymentMethodId: string;
}

// ---------------- Response Types ----------------

export interface GetPaymentMethodsResponse {
    paymentMethods: PaymentMethod[];
    total: number;
}

export interface ProcessPaymentResponse {
    payment: Payment;
    requiresAction: boolean;
    actionUrl?: string;
    clientSecret?: string;
}

export interface GetTransactionsResponse {
    transactions: Transaction[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        limit: number;
    };
}

export interface WalletBalanceResponse {
    balance: number;
    currency: string;
    lastUpdated: string;
}

// ---------------- Filter Types ----------------

export interface TransactionFilters {
    type?: TransactionType;
    status?: PaymentStatus;
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'amount';
    sortOrder?: 'asc' | 'desc';
}

// ---------------- State Types ----------------

export interface PaymentState {
    // Payment Methods
    savedCards: SavedCard[];
    savedUPI: UPIAccount[];
    paymentMethods: PaymentMethod[];
    defaultPaymentMethod: PaymentMethod | null;

    // Wallet
    walletBalance: number;
    walletCurrency: string;

    // Active Payment
    currentPayment: Payment | null;

    // Transaction History
    transactions: Transaction[];

    // Filters
    transactionFilters: TransactionFilters;

    // Loading States
    loading: "idle" | "pending" | "succeeded" | "failed";
    paymentLoading: "idle" | "pending" | "succeeded" | "failed";
    walletLoading: "idle" | "pending" | "succeeded" | "failed";

    // Pagination
    pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        limit: number;
    };

    // Error handling
    error: string | null;

    // Cache
    lastFetched: number | null;
}
