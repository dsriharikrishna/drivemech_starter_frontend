import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { LOCATION_ENDPOINTS } from "@/services/apiConfig";
import apiService from "@/services/apiService";

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

export interface LocationState {
  // Search results
  garages: Garage[];
  locations: Location[];
  
  // Loading states
  searchLoading: "idle" | "pending" | "succeeded" | "failed";
  locationsLoading: "idle" | "pending" | "succeeded" | "failed";
  
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

// ---------------- Indian States and Union Territories ----------------
export const INDIAN_STATES = [
  // States
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  
  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
] as const;

// ---------------- Major Cities by State ----------------
export const MAJOR_CITIES_BY_STATE = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tezu", "Bomdila"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Durg", "Korba"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Kullu"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
  "Manipur": ["Imphal", "Thoubal", "Kakching", "Lilong", "Mayang Imphal"],
  "Meghalaya": ["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Sambalpur"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  "Sikkim": ["Gangtok", "Namchi", "Mangan", "Geyzing", "Rangpo"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Pratapgarh", "Kailashahar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rishikesh"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Sopore"],
  "Ladakh": ["Leh", "Kargil", "Padum", "Nubra", "Zanskar"],
  "Andaman and Nicobar Islands": ["Port Blair", "Car Nicobar", "Great Nicobar", "Little Andaman", "Havelock"],
  "Chandigarh": ["Chandigarh", "Sector 17", "Sector 22", "Sector 35", "Sector 43"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu", "Vapi", "Naroli"],
  "Lakshadweep": ["Kavaratti", "Agatti", "Amini", "Minicoy", "Kalpeni"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam", "Auroville"]
} as const;

// ---------------- Location Utility Functions ----------------
export const getCitiesByState = (state: string): string[] => {
  const cities = MAJOR_CITIES_BY_STATE[state as keyof typeof MAJOR_CITIES_BY_STATE];
  return cities ? [...cities] : [];
};

export const getAllCities = (): string[] => {
  return Object.values(MAJOR_CITIES_BY_STATE).flat();
};

export const searchStates = (query: string): string[] => {
  return INDIAN_STATES.filter(state => 
    state.toLowerCase().includes(query.toLowerCase())
  );
};

export const searchCities = (query: string, state?: string): string[] => {
  const citiesToSearch = state 
    ? getCitiesByState(state)
    : getAllCities();
  
  return citiesToSearch.filter(city => 
    city.toLowerCase().includes(query.toLowerCase())
  );
};

export const validateIndianState = (state: string): boolean => {
  return INDIAN_STATES.includes(state as any);
};

export const validateIndianCity = (city: string, state?: string): boolean => {
  if (state) {
    const cities = getCitiesByState(state);
    return cities.includes(city);
  } else {
    const allCities = getAllCities();
    return allCities.includes(city);
  }
};
const initialState: LocationState = {
  garages: [],
  locations: [],
  searchLoading: "idle",
  locationsLoading: "idle",
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
    const response = await apiService.get(LOCATION_ENDPOINTS.GARAGES.SEARCH, {
      params: searchParams,
    });

    const responseData = response.data.data || response.data;

    return {
      garages: responseData.garages || [],
      currentPage: responseData.currentPage || 1,
      totalPages: responseData.totalPages || 0,
      totalResults: responseData.totalResults || 0,
    };
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || error.message || "Failed to search garages"
    );
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
    const response = await apiService.get(LOCATION_ENDPOINTS.LOCATIONS.ALL);

    const responseData = response.data.data || response.data;
    return responseData.locations || [];
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || error.message || "Failed to fetch locations"
    );
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
    const response = await apiService.get(`${LOCATION_ENDPOINTS.GARAGES.BY_ID}/${garageId}`);

    const responseData = response.data.data || response.data;
    return responseData;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || error.message || "Failed to fetch garage details"
    );
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
    const response = await apiService.get(`${LOCATION_ENDPOINTS.LOCATIONS.BY_ID}/${locationId}`);

    const responseData = response.data.data || response.data;
    return responseData;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || error.message || "Failed to fetch location details"
    );
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

// Static data selectors
export const selectIndianStates = () => INDIAN_STATES;
export const selectMajorCitiesByState = () => MAJOR_CITIES_BY_STATE;
export const selectAllCities = () => getAllCities();

// Dynamic selectors for location data
export const selectGarages = createSelector([selectLocation], (location) => location.garages);
export const selectLocations = createSelector([selectLocation], (location) => location.locations);
export const selectSearchLoading = createSelector([selectLocation], (location) => location.searchLoading);
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
