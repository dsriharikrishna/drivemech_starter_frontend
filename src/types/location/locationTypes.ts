// ---------------- Location Types ----------------

export interface Location {
    id: string;
    name: string;
    city: string;
    state: string;
    pincode: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface State {
    id: string;
    name: string;
    code: string;
    isActive: boolean;
}

export interface City {
    id: string;
    name: string;
    stateId: string;
    stateName: string;
    isActive: boolean;
}

// ---------------- Garage Types ----------------

export interface Garage {
    id: string;
    name: string;
    locationId: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    email?: string;
    website?: string;
    rating?: number;
    totalReviews?: number;
    services: string[];
    isActive: boolean;
    verified: boolean;
    latitude?: number;
    longitude?: number;
    images: string[];

    // Business Hours
    openingTime?: string;
    closingTime?: string;
    isOpen?: boolean;

    // Additional Info
    description?: string;
    certifications?: string[];
    specializations?: string[];

    // Timestamps
    createdAt: string;
    updatedAt: string;
}

export interface GarageService {
    id: string;
    garageId: string;
    serviceId: string;
    serviceName: string;
    description?: string;
    price?: number;
    estimatedDuration?: number; // in minutes
    isAvailable: boolean;
}

export interface GarageReview {
    id: string;
    garageId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    serviceType?: string;
    createdAt: string;
    updatedAt: string;
}

// ---------------- Search & Filter Types ----------------

export interface SearchParams {
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

    // Garage filters
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

export interface SearchSuggestion {
    type: 'city' | 'pincode' | 'garage' | 'service';
    value: string;
    label: string;
    metadata?: {
        state?: string;
        city?: string;
        count?: number;
    };
}

// ---------------- Response Types ----------------

export interface SearchGaragesResponse {
    garages: Garage[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalResults: number;
        limit: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    filters?: {
        appliedFilters: SearchParams;
        availableFilters: {
            cities: string[];
            services: string[];
            ratings: number[];
        };
    };
}

export interface GetLocationsResponse {
    locations: Location[];
    total: number;
}

export interface GetStatesResponse {
    states: State[];
    total: number;
}

export interface GetCitiesResponse {
    cities: City[];
    total: number;
}

export interface NearbyGaragesRequest {
    latitude: number;
    longitude: number;
    radius?: number; // in kilometers, default 10
    limit?: number;
    services?: string[];
}

export interface ValidatePincodeResponse {
    isValid: boolean;
    pincode: string;
    city?: string;
    state?: string;
    district?: string;
}

// ---------------- State Types ----------------

export interface LocationState {
    // Search results
    garages: Garage[];
    locations: Location[];
    states: State[];
    cities: City[];

    // Loading states
    searchLoading: "idle" | "pending" | "succeeded" | "failed";
    locationsLoading: "idle" | "pending" | "succeeded" | "failed";
    statesLoading: "idle" | "pending" | "succeeded" | "failed";
    citiesLoading: "idle" | "pending" | "succeeded" | "failed";

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
    lastSearch: SearchParams | null;
    lastFetched: number | null;

    // Selected items
    selectedLocation: Location | null;
    selectedGarage: Garage | null;
    selectedState: State | null;
    selectedCity: City | null;

    // Garage details
    garageServices: GarageService[];
    garageReviews: GarageReview[];

    // Search suggestions
    searchSuggestions: SearchSuggestion[];
}
