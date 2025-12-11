import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { API_CONFIG } from "@/services/apiConfig";
import apiService from "@/services/apiService";
import axios from "axios";

// ---------------- Static Mock Data for Showcase ----------------
// This data will be used as fallback when API is not available

const MOCK_INDIAN_STATES: IndianState[] = [
    { id: "1", name: "Maharashtra", code: "MH" },
    { id: "2", name: "Karnataka", code: "KA" },
    { id: "3", name: "Delhi", code: "DL" },
    { id: "4", name: "Tamil Nadu", code: "TN" },
    { id: "5", name: "Uttar Pradesh", code: "UP" },
    { id: "6", name: "Gujarat", code: "GJ" },
    { id: "7", name: "West Bengal", code: "WB" },
    { id: "8", name: "Telangana", code: "TG" },
    { id: "9", name: "Rajasthan", code: "RJ" },
    { id: "10", name: "Madhya Pradesh", code: "MP" },
    { id: "11", name: "Andhra Pradesh", code: "AP" },
    { id: "12", name: "Kerala", code: "KL" },
    { id: "13", name: "Punjab", code: "PB" },
    { id: "14", name: "Haryana", code: "HR" },
    { id: "15", name: "Bihar", code: "BR" },
];

const MOCK_CITIES_BY_STATE: Record<string, City[]> = {
    "1": [ // Maharashtra
        { id: "1-1", name: "Mumbai", stateId: "1", stateName: "Maharashtra" },
        { id: "1-2", name: "Pune", stateId: "1", stateName: "Maharashtra" },
        { id: "1-3", name: "Nagpur", stateId: "1", stateName: "Maharashtra" },
        { id: "1-4", name: "Nashik", stateId: "1", stateName: "Maharashtra" },
        { id: "1-5", name: "Aurangabad", stateId: "1", stateName: "Maharashtra" },
    ],
    "2": [ // Karnataka
        { id: "2-1", name: "Bengaluru", stateId: "2", stateName: "Karnataka" },
        { id: "2-2", name: "Mysuru", stateId: "2", stateName: "Karnataka" },
        { id: "2-3", name: "Mangaluru", stateId: "2", stateName: "Karnataka" },
        { id: "2-4", name: "Hubli", stateId: "2", stateName: "Karnataka" },
        { id: "2-5", name: "Belagavi", stateId: "2", stateName: "Karnataka" },
    ],
    "3": [ // Delhi
        { id: "3-1", name: "New Delhi", stateId: "3", stateName: "Delhi" },
        { id: "3-2", name: "Dwarka", stateId: "3", stateName: "Delhi" },
        { id: "3-3", name: "Rohini", stateId: "3", stateName: "Delhi" },
        { id: "3-4", name: "Saket", stateId: "3", stateName: "Delhi" },
        { id: "3-5", name: "Connaught Place", stateId: "3", stateName: "Delhi" },
    ],
    "4": [ // Tamil Nadu
        { id: "4-1", name: "Chennai", stateId: "4", stateName: "Tamil Nadu" },
        { id: "4-2", name: "Coimbatore", stateId: "4", stateName: "Tamil Nadu" },
        { id: "4-3", name: "Madurai", stateId: "4", stateName: "Tamil Nadu" },
        { id: "4-4", name: "Tiruchirappalli", stateId: "4", stateName: "Tamil Nadu" },
        { id: "4-5", name: "Salem", stateId: "4", stateName: "Tamil Nadu" },
    ],
    "5": [ // Uttar Pradesh
        { id: "5-1", name: "Lucknow", stateId: "5", stateName: "Uttar Pradesh" },
        { id: "5-2", name: "Kanpur", stateId: "5", stateName: "Uttar Pradesh" },
        { id: "5-3", name: "Agra", stateId: "5", stateName: "Uttar Pradesh" },
        { id: "5-4", name: "Varanasi", stateId: "5", stateName: "Uttar Pradesh" },
        { id: "5-5", name: "Noida", stateId: "5", stateName: "Uttar Pradesh" },
    ],
    "6": [ // Gujarat
        { id: "6-1", name: "Ahmedabad", stateId: "6", stateName: "Gujarat" },
        { id: "6-2", name: "Surat", stateId: "6", stateName: "Gujarat" },
        { id: "6-3", name: "Vadodara", stateId: "6", stateName: "Gujarat" },
        { id: "6-4", name: "Rajkot", stateId: "6", stateName: "Gujarat" },
        { id: "6-5", name: "Gandhinagar", stateId: "6", stateName: "Gujarat" },
    ],
    "7": [ // West Bengal
        { id: "7-1", name: "Kolkata", stateId: "7", stateName: "West Bengal" },
        { id: "7-2", name: "Howrah", stateId: "7", stateName: "West Bengal" },
        { id: "7-3", name: "Durgapur", stateId: "7", stateName: "West Bengal" },
        { id: "7-4", name: "Siliguri", stateId: "7", stateName: "West Bengal" },
        { id: "7-5", name: "Asansol", stateId: "7", stateName: "West Bengal" },
    ],
    "8": [ // Telangana
        { id: "8-1", name: "Hyderabad", stateId: "8", stateName: "Telangana" },
        { id: "8-2", name: "Warangal", stateId: "8", stateName: "Telangana" },
        { id: "8-3", name: "Nizamabad", stateId: "8", stateName: "Telangana" },
        { id: "8-4", name: "Karimnagar", stateId: "8", stateName: "Telangana" },
        { id: "8-5", name: "Khammam", stateId: "8", stateName: "Telangana" },
    ],
};

// ---------------- Types ----------------

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
    createdAt: string;
    updatedAt: string;
}

export interface SearchParams {
    city?: string;
    pincode?: string;
    state?: string;
    service?: string;
    page?: number;
    limit?: number;
    sortBy?: 'name' | 'rating' | 'distance';
    sortOrder?: 'asc' | 'desc';
}

export interface IndianState {
    id: string;
    name: string;
    code: string;
}

export interface City {
    id: string;
    name: string;
    stateId: string;
    stateName: string;
}

export interface LocationState {
    // Search results
    garages: Garage[];
    locations: Location[];

    // States and Cities (dynamic from API)
    states: IndianState[];
    cities: City[];
    citiesByState: Record<string, City[]>;

    // Loading states
    searchLoading: "idle" | "pending" | "succeeded" | "failed";
    locationsLoading: "idle" | "pending" | "succeeded" | "failed";
    statesLoading: "idle" | "pending" | "succeeded" | "failed";
    citiesLoading: "idle" | "pending" | "succeeded" | "failed";

    // Pagination
    currentPage: number;
    totalPages: number;
    totalResults: number;

    // Error handling
    error: string | null;

    // Cache management
    lastSearch: SearchParams | null;
    lastFetched: number | null;

    // Selected location/garage
    selectedLocation: Location | null;
    selectedGarage: Garage | null;
}

const initialState: LocationState = {
    garages: [],
    locations: [],
    states: [],
    cities: [],
    citiesByState: {},
    searchLoading: "idle",
    locationsLoading: "idle",
    statesLoading: "idle",
    citiesLoading: "idle",
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    error: null,
    lastSearch: null,
    lastFetched: null,
    selectedLocation: null,
    selectedGarage: null,
};

// ---------------- Thunks ----------------

/**
 * Get all Indian states from backend
 * Falls back to mock data if API is unavailable (for showcase)
 * Usage: dispatch(getStates())
 */
export const getStates = createAsyncThunk<
    IndianState[],
    void,
    { rejectValue: string }
>("location/getStates", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_STATES);
        const responseData = response.data.data || response.data;
        return responseData.states || responseData || [];
    } catch (error) {
        // Use mock data as fallback for showcase/demo
        console.warn("API unavailable, using mock states data for showcase");
        return MOCK_INDIAN_STATES;
    }
});

/**
 * Get cities by state ID
 * Falls back to mock data if API is unavailable (for showcase)
 * Usage: dispatch(getCitiesByState('state-id'))
 */
export const getCitiesByState = createAsyncThunk<
    { stateId: string; cities: City[] },
    string,
    { rejectValue: string }
>("location/getCitiesByState", async (stateId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_CITIES_BY_STATE.replace(':stateId', stateId);
        const response = await apiService.get(endpoint);
        const responseData = response.data.data || response.data;
        return {
            stateId,
            cities: responseData.cities || responseData || []
        };
    } catch (error) {
        // Use mock data as fallback for showcase/demo
        console.warn(`API unavailable, using mock cities data for state ${stateId}`);
        return {
            stateId,
            cities: MOCK_CITIES_BY_STATE[stateId] || []
        };
    }
});

/**
 * Search garages by location
 * Usage: dispatch(searchGarages({ city: 'Hyderabad', pincode: '500001' }))
 */
export const searchGarages = createAsyncThunk<
    {
        garages: Garage[];
        currentPage: number;
        totalPages: number;
        totalResults: number;
    },
    SearchParams,
    { rejectValue: string }
>("location/searchGarages", async (searchParams, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.SEARCH_GARAGES, {
            params: searchParams,
        });

        const responseData = response.data.data || response.data;

        return {
            garages: responseData.garages || [],
            currentPage: responseData.currentPage || 1,
            totalPages: responseData.totalPages || 0,
            totalResults: responseData.totalResults || 0,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || "Failed to search garages");
        }
        return rejectWithValue("An unexpected error occurred");
    }
});

/**
 * Get all available cities/locations
 * Usage: dispatch(getLocations())
 */
export const getLocations = createAsyncThunk<
    Location[],
    void,
    { rejectValue: string }
>("location/getLocations", async (_, { rejectWithValue }) => {
    try {
        const response = await apiService.get(API_CONFIG.ENDPOINTS.GET_ALL_LOCATIONS);

        const responseData = response.data.data || response.data;
        return responseData.locations || [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch locations");
        }
        return rejectWithValue("An unexpected error occurred");
    }
});

/**
 * Get garage details by ID
 * Usage: dispatch(getGarageById('garage-id'))
 */
export const getGarageById = createAsyncThunk<
    Garage,
    string,
    { rejectValue: string }
>("location/getGarageById", async (garageId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_GARAGE_BY_ID.replace(':id', garageId);
        const response = await apiService.get(endpoint);

        const responseData = response.data.data || response.data;
        return responseData;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch garage details");
        }
        return rejectWithValue("An unexpected error occurred");
    }
});

/**
 * Get location details by ID
 * Usage: dispatch(getLocationById('location-id'))
 */
export const getLocationById = createAsyncThunk<
    Location,
    string,
    { rejectValue: string }
>("location/getLocationById", async (locationId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_LOCATION_BY_ID.replace(':id', locationId);
        const response = await apiService.get(endpoint);

        const responseData = response.data.data || response.data;
        return responseData;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch location details");
        }
        return rejectWithValue("An unexpected error occurred");
    }
});

// ---------------- Slice ----------------
const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        // Clear search results
        clearSearchResults: (state) => {
            state.garages = [];
            state.currentPage = 1;
            state.totalPages = 0;
            state.totalResults = 0;
            state.lastSearch = null;
            state.error = null;
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        },

        // Set selected garage
        setSelectedGarage: (state, action) => {
            state.selectedGarage = action.payload;
        },

        // Set selected location
        setSelectedLocation: (state, action) => {
            state.selectedLocation = action.payload;
        },

        // Update search parameters
        updateSearchParams: (state, action) => {
            state.lastSearch = { ...state.lastSearch, ...action.payload };
        },

        // Reset entire location state
        resetLocationState: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        // Get States
        builder
            .addCase(getStates.pending, (state) => {
                state.statesLoading = "pending";
                state.error = null;
            })
            .addCase(getStates.fulfilled, (state, action) => {
                state.statesLoading = "succeeded";
                state.states = action.payload;
                state.error = null;
            })
            .addCase(getStates.rejected, (state, action) => {
                state.statesLoading = "failed";
                state.error = action.payload ?? "Failed to fetch states";
            });

        // Get Cities by State
        builder
            .addCase(getCitiesByState.pending, (state) => {
                state.citiesLoading = "pending";
                state.error = null;
            })
            .addCase(getCitiesByState.fulfilled, (state, action) => {
                state.citiesLoading = "succeeded";
                const { stateId, cities } = action.payload;
                state.citiesByState[stateId] = cities;
                // Also add to main cities array if not already there
                cities.forEach(city => {
                    if (!state.cities.find(c => c.id === city.id)) {
                        state.cities.push(city);
                    }
                });
                state.error = null;
            })
            .addCase(getCitiesByState.rejected, (state, action) => {
                state.citiesLoading = "failed";
                state.error = action.payload ?? "Failed to fetch cities";
            });

        // Search Garages
        builder
            .addCase(searchGarages.pending, (state) => {
                state.searchLoading = "pending";
                state.error = null;
            })
            .addCase(searchGarages.fulfilled, (state, action) => {
                state.searchLoading = "succeeded";
                state.garages = action.payload.garages;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
                state.totalResults = action.payload.totalResults;
                state.lastFetched = Date.now();
                state.error = null;
            })
            .addCase(searchGarages.rejected, (state, action) => {
                state.searchLoading = "failed";
                state.error = action.payload ?? "Search failed";
                state.garages = [];
            });

        // Get Locations
        builder
            .addCase(getLocations.pending, (state) => {
                state.locationsLoading = "pending";
                state.error = null;
            })
            .addCase(getLocations.fulfilled, (state, action) => {
                state.locationsLoading = "succeeded";
                state.locations = action.payload;
                state.error = null;
                state.lastFetched = Date.now();
            })
            .addCase(getLocations.rejected, (state, action) => {
                state.locationsLoading = "failed";
                state.error = action.payload ?? "Failed to fetch locations";
                state.locations = [];
            });

        // Get Garage by ID
        builder
            .addCase(getGarageById.pending, (state) => {
                state.searchLoading = "pending";
                state.error = null;
            })
            .addCase(getGarageById.fulfilled, (state, action) => {
                state.searchLoading = "succeeded";
                state.selectedGarage = action.payload;
                state.error = null;
            })
            .addCase(getGarageById.rejected, (state, action) => {
                state.searchLoading = "failed";
                state.error = action.payload ?? "Failed to fetch garage details";
                state.selectedGarage = null;
            });

        // Get Location by ID
        builder
            .addCase(getLocationById.pending, (state) => {
                state.locationsLoading = "pending";
                state.error = null;
            })
            .addCase(getLocationById.fulfilled, (state, action) => {
                state.locationsLoading = "succeeded";
                state.selectedLocation = action.payload;
                state.error = null;
            })
            .addCase(getLocationById.rejected, (state, action) => {
                state.locationsLoading = "failed";
                state.error = action.payload ?? "Failed to fetch location details";
                state.selectedLocation = null;
            });
    },
});

// ---------------- Selectors ----------------
export const selectLocation = (state: RootState) => state.location;

// Dynamic selectors for location data
export const selectStates = createSelector([selectLocation], (location) => location.states);
export const selectCities = createSelector([selectLocation], (location) => location.cities);
export const selectCitiesByState = (stateId: string) =>
    createSelector([selectLocation], (location) => location.citiesByState[stateId] || []);
export const selectGarages = createSelector([selectLocation], (location) => location.garages);
export const selectLocations = createSelector([selectLocation], (location) => location.locations);
export const selectSearchLoading = createSelector([selectLocation], (location) => location.searchLoading);
export const selectStatesLoading = createSelector([selectLocation], (location) => location.statesLoading);
export const selectCitiesLoading = createSelector([selectLocation], (location) => location.citiesLoading);
export const selectLocationsLoading = createSelector([selectLocation], (location) => location.locationsLoading);
export const selectLocationError = createSelector([selectLocation], (location) => location.error);
export const selectSelectedGarage = createSelector([selectLocation], (location) => location.selectedGarage);
export const selectSelectedLocation = createSelector([selectLocation], (location) => location.selectedLocation);
export const selectPagination = createSelector(
    [selectLocation],
    (location) => ({
        currentPage: location.currentPage,
        totalPages: location.totalPages,
        totalResults: location.totalResults,
    })
);
export const selectLastSearch = createSelector([selectLocation], (location) => location.lastSearch);

// ---------------- Actions & Reducer ----------------
export const {
    clearSearchResults,
    clearError,
    setSelectedGarage,
    setSelectedLocation,
    updateSearchParams,
    resetLocationState,
} = locationSlice.actions;

export default locationSlice.reducer;
