// ---------------- Order Types ----------------

export type OrderType = 'service' | 'spares' | 'insurance' | 'towing';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'partially-paid' | 'failed' | 'refunded';

export interface Order {
    id: string;
    orderId: string; // user-friendly order ID
    userId: string;
    type: OrderType;
    status: OrderStatus;

    // Dates
    orderDate: string;
    confirmedDate?: string;
    shippedDate?: string;
    deliveredDate?: string;
    completedDate?: string;
    cancelledDate?: string;

    // Service Type Specific
    serviceType?: string;

    // Vehicle Info
    vehicle: {
        id: string;
        make: string;
        model: string;
        year: number;
        licensePlate: string;
    };

    // Service Center/Workshop Info
    serviceCenter?: {
        id: string;
        name: string;
        address: string;
        phone: string;
        email?: string;
    };

    // Services/Items
    items: OrderItem[];

    // Pricing
    subtotal: number;
    tax: number;
    serviceFee: number;
    discount: number;
    total: number;

    // Payment
    paymentStatus: PaymentStatus;
    paymentMethod: string;
    paymentId?: string;

    // Notes
    notes?: string;
    customerNotes?: string;

    // Assigned Personnel
    assignedMechanic?: {
        id: string;
        name: string;
        phone: string;
        rating: number;
        photo?: string;
    };

    assignedDriver?: {
        id: string;
        name: string;
        phone: string;
        rating: number;
        photo?: string;
        vehicleNumber?: string;
    };

    // Tracking
    trackingId?: string;
    trackingUrl?: string;

    // Completion
    estimatedCompletion?: string;
    actualCompletion?: string;

    // Reviews
    rating?: number;
    review?: string;
    reviewedAt?: string;

    // Timestamps
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    id: string;
    name: string;
    description?: string;
    quantity: number;
    price: number;
    total: number;
    sku?: string;
    image?: string;
}

// ---------------- Service Order Types ----------------

export interface ServiceOrder extends Order {
    type: 'service';
    services: {
        id: string;
        name: string;
        description?: string;
        price: number;
        estimatedDuration?: number;
        status: 'pending' | 'in-progress' | 'completed';
    }[];
    scheduledDate?: string;
    scheduledTime?: string;
    checkInTime?: string;
    checkOutTime?: string;
}

// ---------------- Spares Order Types ----------------

export interface SparesOrder extends Order {
    type: 'spares';
    shippingAddress: {
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        pincode: string;
        phone: string;
    };
    deliveryMethod: 'standard' | 'express' | 'same-day';
    deliveryCharges: number;
    estimatedDelivery?: string;
    actualDelivery?: string;

    // Return Info
    returnEligible: boolean;
    returnWindow?: number; // days
    returnRequested?: boolean;
    returnStatus?: 'pending' | 'approved' | 'rejected' | 'picked-up' | 'refunded';
}

// ---------------- Insurance Order Types ----------------

export interface InsuranceOrder extends Order {
    type: 'insurance';
    policyNumber: string;
    policyType: string;
    provider: string;
    coverageAmount: number;
    premium: number;
    startDate: string;
    endDate: string;
    renewalDate?: string;

    // Nominee
    nominee?: {
        name: string;
        relationship: string;
        phone: string;
        dateOfBirth: string;
    };

    // Claims
    claims?: InsuranceClaim[];
}

export interface InsuranceClaim {
    id: string;
    claimNumber: string;
    claimDate: string;
    claimAmount: number;
    approvedAmount?: number;
    status: 'submitted' | 'under-review' | 'approved' | 'rejected' | 'settled';
    reason: string;
    documents: string[];
    settledDate?: string;
}

// ---------------- Towing Order Types ----------------

export interface TowingOrder extends Order {
    type: 'towing';
    pickupLocation: {
        address: string;
        latitude: number;
        longitude: number;
    };
    dropoffLocation: {
        address: string;
        latitude: number;
        longitude: number;
    };
    distance: number; // in kilometers
    vehicleType: string;
    towTruckType: string;
    estimatedArrival?: string;
    actualArrival?: string;
    pickupTime?: string;
    dropoffTime?: string;
}

// ---------------- Request Types ----------------

export interface GetOrdersPayload {
    type?: OrderType;
    status?: OrderStatus;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
    sortBy?: 'orderDate' | 'total' | 'status';
    sortOrder?: 'asc' | 'desc';
}

export interface UpdateOrderStatusPayload {
    orderId: string;
    status: OrderStatus;
    notes?: string;
}

export interface CancelOrderPayload {
    orderId: string;
    reason: string;
    refundMethod?: 'original' | 'wallet';
}

export interface ReorderPayload {
    orderId: string;
}

export interface RequestReturnPayload {
    orderId: string;
    items: {
        itemId: string;
        quantity: number;
        reason: string;
    }[];
    refundMethod: 'original' | 'wallet';
}

export interface FileClaimPayload {
    orderId: string;
    claimAmount: number;
    reason: string;
    description: string;
    documents: File[];
}

export interface AddNomineePayload {
    orderId: string;
    nominee: {
        name: string;
        relationship: string;
        phone: string;
        dateOfBirth: string;
    };
}

export interface ModifyPolicyPayload {
    orderId: string;
    modifications: {
        coverageAmount?: number;
        addOns?: string[];
        removeOns?: string[];
    };
}

// ---------------- Response Types ----------------

export interface GetOrdersResponse {
    orders: Order[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        limit: number;
    };
    summary?: {
        totalOrders: number;
        totalSpent: number;
        activeOrders: number;
        completedOrders: number;
    };
}

export interface GetOrderByIdResponse {
    order: Order | ServiceOrder | SparesOrder | InsuranceOrder | TowingOrder;
}

export interface DownloadInvoiceResponse {
    invoiceUrl: string;
    invoiceNumber: string;
}

// ---------------- Filter Types ----------------

export interface OrderFilters {
    type?: OrderType | 'all';
    status?: OrderStatus | 'all';
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
    vehicleId?: string;
    page?: number;
    limit?: number;
    sortBy?: 'orderDate' | 'total' | 'status';
    sortOrder?: 'asc' | 'desc';
}

// ---------------- State Types ----------------

export interface OrderState {
    // Orders
    orders: Order[];
    activeOrders: Order[];
    completedOrders: Order[];
    selectedOrder: Order | ServiceOrder | SparesOrder | InsuranceOrder | TowingOrder | null;

    // Filters
    filterType: OrderType | 'all';
    filterStatus: OrderStatus | 'all';
    filters: OrderFilters;

    // Loading States
    loading: "idle" | "pending" | "succeeded" | "failed";
    orderLoading: "idle" | "pending" | "succeeded" | "failed";
    actionLoading: "idle" | "pending" | "succeeded" | "failed";

    // Pagination
    pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        limit: number;
    };

    // Summary
    summary: {
        totalOrders: number;
        totalSpent: number;
        activeOrders: number;
        completedOrders: number;
    } | null;

    // Error handling
    error: string | null;

    // Cache
    lastFetched: number | null;
}
