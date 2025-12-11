// ---------------- Booking Types ----------------

export type BookingType = 'service' | 'towing' | 'workshop' | 'spares';
export type BookingStatus = 'draft' | 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

export interface Booking {
    id: string;
    userId: string;
    type: BookingType;
    status: BookingStatus;

    // Service Details
    serviceDetails: {
        serviceId?: string;
        serviceName?: string;
        workshopId?: string;
        workshopName?: string;
        garageId?: string;
        garageName?: string;
    };

    // Vehicle Info
    vehicleId: string;
    vehicleMake?: string;
    vehicleModel?: string;
    vehicleRegistration?: string;

    // Location
    locationId?: string;
    pickupAddress?: string;
    dropoffAddress?: string;

    // Schedule
    scheduledDate?: string;
    scheduledTime?: string;
    estimatedDuration?: number; // in minutes

    // Pricing
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;

    // Payment
    paymentStatus: 'pending' | 'paid' | 'partially-paid' | 'refunded' | 'failed';
    paymentMethod?: string;

    // Notes
    notes?: string;
    customerNotes?: string;
    internalNotes?: string;

    // Tracking
    trackingId?: string;
    currentStatus?: string;
    statusHistory?: BookingStatusHistory[];

    // Timestamps
    createdAt: string;
    updatedAt: string;
    confirmedAt?: string;
    completedAt?: string;
    cancelledAt?: string;
}

export interface BookingStatusHistory {
    status: BookingStatus;
    timestamp: string;
    note?: string;
    updatedBy?: string;
}

// ---------------- Create Booking Types ----------------

export interface CreateBookingPayload {
    type: BookingType;
    vehicleId: string;
    serviceDetails: {
        serviceId?: string;
        workshopId?: string;
        garageId?: string;
        services?: string[];
    };
    locationId?: string;
    pickupAddress?: string;
    dropoffAddress?: string;
    scheduledDate?: string;
    scheduledTime?: string;
    notes?: string;
    paymentMethod?: string;
}

export interface UpdateBookingPayload {
    scheduledDate?: string;
    scheduledTime?: string;
    notes?: string;
    status?: BookingStatus;
}

export interface RescheduleBookingPayload {
    scheduledDate: string;
    scheduledTime: string;
    reason?: string;
}

// ---------------- Tracking Types ----------------

export interface BookingTracking {
    bookingId: string;
    currentStatus: BookingStatus;
    estimatedCompletion?: string;
    location?: {
        latitude: number;
        longitude: number;
        address: string;
    };
    driver?: {
        name: string;
        phone: string;
        photo?: string;
        vehicleNumber?: string;
    };
    mechanic?: {
        name: string;
        phone: string;
        photo?: string;
    };
    statusUpdates: BookingStatusHistory[];
}

// ---------------- Response Types ----------------

export interface GetBookingsResponse {
    bookings: Booking[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        limit: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface CreateBookingResponse {
    booking: Booking;
    paymentRequired: boolean;
    paymentUrl?: string;
}

// ---------------- Filter Types ----------------

export interface BookingFilters {
    type?: BookingType;
    status?: BookingStatus;
    startDate?: string;
    endDate?: string;
    vehicleId?: string;
    page?: number;
    limit?: number;
    sortBy?: 'createdAt' | 'scheduledDate' | 'totalAmount';
    sortOrder?: 'asc' | 'desc';
}

// ---------------- State Types ----------------

export interface BookingState {
    // Current Booking (draft/in-progress)
    currentBooking: Booking | null;

    // Booking Form Data (temporary storage before creation)
    bookingFormData: {
        mode: string;
        date: string;
        time: string;
        personalInfo: {
            fullName: string;
            phone: string;
            email: string;
        };
        addOns?: string[];
        notes?: string;
        guest?: boolean;
        location?: {
            address: string;
            lat: number;
            lng: number;
        };
        selectedServices: string[];
        vehicle: any;
        addOnsTotal: number;
        totalAmount: number;
        timestamp: string;
    } | null;

    // Booking Lists
    bookings: Booking[];
    activeBookings: Booking[];
    pastBookings: Booking[];

    // Tracking
    trackingData: BookingTracking | null;

    // Filters
    filters: BookingFilters;

    // Loading States
    loading: "idle" | "pending" | "succeeded" | "failed";
    createLoading: "idle" | "pending" | "succeeded" | "failed";
    trackingLoading: "idle" | "pending" | "succeeded" | "failed";

    // Pagination
    pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        limit: number;
        hasNext: boolean;
        hasPrev: boolean;
    };

    // Error handling
    error: string | null;

    // Cache
    lastFetched: number | null;
}

