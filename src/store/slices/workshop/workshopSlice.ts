import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { API_CONFIG } from "@/services/apiConfig";
import apiService from "@/services/apiService";
import {
    WorkshopState,
    Workshop,
    WorkshopSearchParams,
    SearchWorkshopsResponse,
    WorkshopService,
    ServicePackage,
    TimeSlot,
    WorkshopReview,
    GetWorkshopServicesResponse,
    GetServicePackagesResponse,
    GetTimeSlotsResponse,
    GetWorkshopReviewsResponse,
    WorkshopBooking,
} from "@/types/workshop/workshopTypes";

// ---------------- Initial State ----------------

const initialState: WorkshopState = {
    // Workshop Discovery
    workshops: [],
    nearbyWorkshops: [],
    featuredWorkshops: [],
    selectedWorkshop: null,

    // Workshop Details
    workshopServices: [],
    servicePackages: [],
    availableTimeSlots: [],
    workshopReviews: [],

    // Search & Filters
    searchQuery: "",
    filters: {},

    // Booking State
    selectedServices: [],
    selectedPackages: [],
    selectedTimeSlot: null,
    bookingNotes: "",

    // Loading States
    searchLoading: "idle",
    workshopLoading: "idle",
    servicesLoading: "idle",
    reviewsLoading: "idle",
    bookingLoading: "idle",

    // Pagination
    pagination: {
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        limit: 10,
        hasNext: false,
        hasPrev: false,
    },

    // Error handling
    error: null,

    // Cache management
    lastSearch: null,
    lastFetched: null,
};

// ---------------- Thunks ----------------

/**
 * Search workshops
 */
export const searchWorkshops = createAsyncThunk<
    SearchWorkshopsResponse,
    WorkshopSearchParams,
    { rejectValue: string }
>("workshop/searchWorkshops", async (searchParams, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.SEARCH_WORKSHOPS, {
            params: searchParams,
        });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to search workshops"
        );
    }
});

/**
 * Get workshop by ID
 */
export const getWorkshopById = createAsyncThunk<
    Workshop,
    string,
    { rejectValue: string }
>("workshop/getWorkshopById", async (workshopId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_WORKSHOP_BY_ID.replace(':id', workshopId);
        const response = await apiService.get(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch workshop details"
        );
    }
});

/**
 * Get nearby workshops
 */
export const getNearbyWorkshops = createAsyncThunk<
    SearchWorkshopsResponse,
    { latitude: number; longitude: number; radius?: number; services?: string[] },
    { rejectValue: string }
>("workshop/getNearbyWorkshops", async (params, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_NEARBY_WORKSHOPS, {
            params,
        });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch nearby workshops"
        );
    }
});

/**
 * Get featured workshops
 */
export const getFeaturedWorkshops = createAsyncThunk<
    Workshop[],
    void,
    { rejectValue: string }
>("workshop/getFeaturedWorkshops", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_FEATURED_WORKSHOPS);
        const data = response.data.data || response.data;
        return data.workshops || data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch featured workshops"
        );
    }
});

/**
 * Get workshop services
 */
export const getWorkshopServices = createAsyncThunk<
    GetWorkshopServicesResponse,
    string,
    { rejectValue: string }
>("workshop/getWorkshopServices", async (workshopId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_WORKSHOP_SERVICES.replace(':id', workshopId);
        const response = await apiService.get(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch workshop services"
        );
    }
});

/**
 * Get service packages
 */
export const getServicePackages = createAsyncThunk<
    GetServicePackagesResponse,
    string,
    { rejectValue: string }
>("workshop/getServicePackages", async (workshopId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_SERVICE_PACKAGES.replace(':id', workshopId);
        const response = await apiService.get(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch service packages"
        );
    }
});

/**
 * Get available time slots
 */
export const getAvailableTimeSlots = createAsyncThunk<
    GetTimeSlotsResponse,
    { workshopId: string; date: string },
    { rejectValue: string }
>("workshop/getAvailableTimeSlots", async ({ workshopId, date }, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_AVAILABLE_TIME_SLOTS.replace(':id', workshopId);
        const response = await apiService.get(endpoint, { params: { date } });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch time slots"
        );
    }
});

/**
 * Get workshop reviews
 */
export const getWorkshopReviews = createAsyncThunk<
    GetWorkshopReviewsResponse,
    { workshopId: string; page?: number; limit?: number },
    { rejectValue: string }
>("workshop/getWorkshopReviews", async ({ workshopId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_WORKSHOP_REVIEWS.replace(':id', workshopId);
        const response = await apiService.get(endpoint, { params: { page, limit } });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch workshop reviews"
        );
    }
});

/**
 * Create workshop booking
 */
export const createWorkshopBooking = createAsyncThunk<
    WorkshopBooking,
    Partial<WorkshopBooking>,
    { rejectValue: string }
>("workshop/createWorkshopBooking", async (bookingData, { rejectWithValue }) => {
    try {
        const response = await apiService.post(API_CONFIG.ENDPOINTS.CREATE_WORKSHOP_BOOKING, bookingData);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to create booking"
        );
    }
});

// ---------------- Slice ----------------

const workshopSlice = createSlice({
    name: "workshop",
    initialState,

    reducers: {
        // Set selected workshop
        setSelectedWorkshop: (state, action: PayloadAction<Workshop | null>) => {
            state.selectedWorkshop = action.payload;
        },

        // Service selection
        toggleService: (state, action: PayloadAction<string>) => {
            const serviceId = action.payload;
            const index = state.selectedServices.indexOf(serviceId);
            if (index > -1) {
                state.selectedServices.splice(index, 1);
            } else {
                state.selectedServices.push(serviceId);
            }
        },

        clearSelectedServices: (state) => {
            state.selectedServices = [];
        },

        // Package selection
        togglePackage: (state, action: PayloadAction<string>) => {
            const packageId = action.payload;
            const index = state.selectedPackages.indexOf(packageId);
            if (index > -1) {
                state.selectedPackages.splice(index, 1);
            } else {
                state.selectedPackages.push(packageId);
            }
        },

        clearSelectedPackages: (state) => {
            state.selectedPackages = [];
        },

        // Time slot selection
        setSelectedTimeSlot: (state, action: PayloadAction<TimeSlot | null>) => {
            state.selectedTimeSlot = action.payload;
        },

        // Booking notes
        setBookingNotes: (state, action: PayloadAction<string>) => {
            state.bookingNotes = action.payload;
        },

        // Search query
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },

        // Filters
        setFilters: (state, action: PayloadAction<WorkshopSearchParams>) => {
            state.filters = action.payload;
        },

        updateFilters: (state, action: PayloadAction<Partial<WorkshopSearchParams>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },

        clearFilters: (state) => {
            state.filters = {};
        },

        // Clear workshop details
        clearWorkshopDetails: (state) => {
            state.selectedWorkshop = null;
            state.workshopServices = [];
            state.servicePackages = [];
            state.availableTimeSlots = [];
            state.workshopReviews = [];
            state.selectedServices = [];
            state.selectedPackages = [];
            state.selectedTimeSlot = null;
            state.bookingNotes = "";
        },

        // Clear search results
        clearSearchResults: (state) => {
            state.workshops = [];
            state.pagination = initialState.pagination;
            state.lastSearch = null;
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        },

        // Reset state
        resetWorkshopState: () => initialState,
    },

    extraReducers: (builder) => {
        // Search Workshops
        builder
            .addCase(searchWorkshops.pending, (state) => {
                state.searchLoading = "pending";
                state.error = null;
            })
            .addCase(searchWorkshops.fulfilled, (state, action) => {
                state.searchLoading = "succeeded";
                state.workshops = action.payload.workshops;
                state.pagination = action.payload.pagination;
                state.lastFetched = Date.now();
            })
            .addCase(searchWorkshops.rejected, (state, action) => {
                state.searchLoading = "failed";
                state.error = action.payload ?? "Search failed";
            });

        // Get Workshop by ID
        builder
            .addCase(getWorkshopById.pending, (state) => {
                state.workshopLoading = "pending";
                state.error = null;
            })
            .addCase(getWorkshopById.fulfilled, (state, action) => {
                state.workshopLoading = "succeeded";
                state.selectedWorkshop = action.payload;
            })
            .addCase(getWorkshopById.rejected, (state, action) => {
                state.workshopLoading = "failed";
                state.error = action.payload ?? "Failed to fetch workshop";
            });

        // Get Nearby Workshops
        builder
            .addCase(getNearbyWorkshops.pending, (state) => {
                state.searchLoading = "pending";
                state.error = null;
            })
            .addCase(getNearbyWorkshops.fulfilled, (state, action) => {
                state.searchLoading = "succeeded";
                state.nearbyWorkshops = action.payload.workshops;
            })
            .addCase(getNearbyWorkshops.rejected, (state, action) => {
                state.searchLoading = "failed";
                state.error = action.payload ?? "Failed to fetch nearby workshops";
            });

        // Get Featured Workshops
        builder
            .addCase(getFeaturedWorkshops.pending, (state) => {
                state.searchLoading = "pending";
                state.error = null;
            })
            .addCase(getFeaturedWorkshops.fulfilled, (state, action) => {
                state.searchLoading = "succeeded";
                state.featuredWorkshops = action.payload;
            })
            .addCase(getFeaturedWorkshops.rejected, (state, action) => {
                state.searchLoading = "failed";
                state.error = action.payload ?? "Failed to fetch featured workshops";
            });

        // Get Workshop Services
        builder
            .addCase(getWorkshopServices.pending, (state) => {
                state.servicesLoading = "pending";
                state.error = null;
            })
            .addCase(getWorkshopServices.fulfilled, (state, action) => {
                state.servicesLoading = "succeeded";
                state.workshopServices = action.payload.services;
            })
            .addCase(getWorkshopServices.rejected, (state, action) => {
                state.servicesLoading = "failed";
                state.error = action.payload ?? "Failed to fetch services";
            });

        // Get Service Packages
        builder
            .addCase(getServicePackages.pending, (state) => {
                state.servicesLoading = "pending";
                state.error = null;
            })
            .addCase(getServicePackages.fulfilled, (state, action) => {
                state.servicesLoading = "succeeded";
                state.servicePackages = action.payload.packages;
            })
            .addCase(getServicePackages.rejected, (state, action) => {
                state.servicesLoading = "failed";
                state.error = action.payload ?? "Failed to fetch packages";
            });

        // Get Available Time Slots
        builder
            .addCase(getAvailableTimeSlots.pending, (state) => {
                state.servicesLoading = "pending";
                state.error = null;
            })
            .addCase(getAvailableTimeSlots.fulfilled, (state, action) => {
                state.servicesLoading = "succeeded";
                state.availableTimeSlots = action.payload.timeSlots;
            })
            .addCase(getAvailableTimeSlots.rejected, (state, action) => {
                state.servicesLoading = "failed";
                state.error = action.payload ?? "Failed to fetch time slots";
            });

        // Get Workshop Reviews
        builder
            .addCase(getWorkshopReviews.pending, (state) => {
                state.reviewsLoading = "pending";
                state.error = null;
            })
            .addCase(getWorkshopReviews.fulfilled, (state, action) => {
                state.reviewsLoading = "succeeded";
                state.workshopReviews = action.payload.reviews;
            })
            .addCase(getWorkshopReviews.rejected, (state, action) => {
                state.reviewsLoading = "failed";
                state.error = action.payload ?? "Failed to fetch reviews";
            });

        // Create Workshop Booking
        builder
            .addCase(createWorkshopBooking.pending, (state) => {
                state.bookingLoading = "pending";
                state.error = null;
            })
            .addCase(createWorkshopBooking.fulfilled, (state) => {
                state.bookingLoading = "succeeded";
                // Clear booking state after successful creation
                state.selectedServices = [];
                state.selectedPackages = [];
                state.selectedTimeSlot = null;
                state.bookingNotes = "";
            })
            .addCase(createWorkshopBooking.rejected, (state, action) => {
                state.bookingLoading = "failed";
                state.error = action.payload ?? "Failed to create booking";
            });
    },
});

// ---------------- Actions & Reducer ----------------

export const {
    setSelectedWorkshop,
    toggleService,
    clearSelectedServices,
    togglePackage,
    clearSelectedPackages,
    setSelectedTimeSlot,
    setBookingNotes,
    setSearchQuery,
    setFilters,
    updateFilters,
    clearFilters,
    clearWorkshopDetails,
    clearSearchResults,
    clearError,
    resetWorkshopState,
} = workshopSlice.actions;

export default workshopSlice.reducer;
