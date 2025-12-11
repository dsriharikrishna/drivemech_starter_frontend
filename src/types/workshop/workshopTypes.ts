// ---------------- Workshop Types ----------------

export interface Workshop {
    id: string;
    name: string;
    logo: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    email?: string;
    website?: string;

    // Ratings & Reviews
    rating: number;
    totalReviews: number;

    // Location
    latitude: number;
    longitude: number;
    distance?: number; // in kilometers

    // Business Info
    description: string;
    services: string[];
    specializations?: string[];
    certifications?: string[];

    // Status
    isActive: boolean;
    verified: boolean;
    isOpen: boolean;
    openingTime?: string;
    closingTime?: string;

    // Media
    images: string[];

    // Timestamps
    createdAt: string;
    updatedAt: string;
}

export interface WorkshopService {
    id: string;
    workshopId: string;
    serviceId: string;
    serviceName: string;
    description?: string;
    price?: number;
    estimatedDuration?: number; // in minutes
    isAvailable: boolean;
    category?: string;
}

export interface ServicePackage {
    id: string;
    workshopId: string;
    name: string;
    description: string;
    services: string[]; // service IDs
    price: number;
    originalPrice?: number;
    discount?: number;
    estimatedDuration: number;
    isAvailable: boolean;
}

export interface TimeSlot {
    id: string;
    workshopId: string;
    date: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    maxBookings: number;
    currentBookings: number;
}

export interface WorkshopReview {
    id: string;
    workshopId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    serviceType?: string;
    images?: string[];
    createdAt: string;
    updatedAt: string;
}

// ---------------- Search & Filter Types ----------------

export interface WorkshopSearchParams {
    // Location filters
    city?: string;
    pincode?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
    radius?: number; // in kilometers

    // Service filters
    service?: string;
    services?: string[];
    specialization?: string;

    // Workshop filters
    verified?: boolean;
    minRating?: number;
    isOpen?: boolean;

    // Pagination
    page?: number;
    limit?: number;

    // Sorting
    sortBy?: 'name' | 'rating' | 'distance' | 'reviews';
    sortOrder?: 'asc' | 'desc';

    // Search query
    query?: string;
}

// ---------------- Booking Types ----------------

export interface WorkshopBooking {
    id: string;
    workshopId: string;
    userId: string;
    vehicleId: string;

    // Services
    services: string[]; // service IDs
    packages?: string[]; // package IDs

    // Schedule
    scheduledDate: string;
    scheduledTime: string;
    timeSlotId?: string;

    // Status
    status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

    // Notes
    notes?: string;

    // Pricing
    totalAmount: number;

    // Timestamps
    createdAt: string;
    updatedAt: string;
}

// ---------------- Response Types ----------------

export interface SearchWorkshopsResponse {
    workshops: Workshop[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        limit: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    filters?: {
        appliedFilters: WorkshopSearchParams;
        availableFilters: {
            cities: string[];
            services: string[];
            specializations: string[];
            ratings: number[];
        };
    };
}

export interface GetWorkshopServicesResponse {
    services: WorkshopService[];
    total: number;
}

export interface GetServicePackagesResponse {
    packages: ServicePackage[];
    total: number;
}

export interface GetTimeSlotsResponse {
    timeSlots: TimeSlot[];
    date: string;
}

export interface GetWorkshopReviewsResponse {
    reviews: WorkshopReview[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        limit: number;
    };
    summary: {
        averageRating: number;
        totalReviews: number;
        ratingDistribution: {
            [key: number]: number;
        };
    };
}

// ---------------- State Types ----------------

export interface WorkshopState {
    // Workshop Discovery
    workshops: Workshop[];
    nearbyWorkshops: Workshop[];
    featuredWorkshops: Workshop[];
    selectedWorkshop: Workshop | null;

    // Workshop Details
    workshopServices: WorkshopService[];
    servicePackages: ServicePackage[];
    availableTimeSlots: TimeSlot[];
    workshopReviews: WorkshopReview[];

    // Search & Filters
    searchQuery: string;
    filters: WorkshopSearchParams;

    // Booking State
    selectedServices: string[]; // service IDs
    selectedPackages: string[]; // package IDs
    selectedTimeSlot: TimeSlot | null;
    bookingNotes: string;

    // Loading States
    searchLoading: "idle" | "pending" | "succeeded" | "failed";
    workshopLoading: "idle" | "pending" | "succeeded" | "failed";
    servicesLoading: "idle" | "pending" | "succeeded" | "failed";
    reviewsLoading: "idle" | "pending" | "succeeded" | "failed";
    bookingLoading: "idle" | "pending" | "succeeded" | "failed";

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

    // Cache management
    lastSearch: WorkshopSearchParams | null;
    lastFetched: number | null;
}
