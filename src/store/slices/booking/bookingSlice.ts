import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { API_CONFIG } from "@/services/apiConfig";
import apiService from "@/services/apiService";
import {
    BookingState,
    Booking,
    BookingFilters,
    CreateBookingPayload,
    UpdateBookingPayload,
    RescheduleBookingPayload,
    GetBookingsResponse,
    CreateBookingResponse,
    BookingTracking,
} from "@/types/booking/bookingTypes";

// ---------------- Initial State ----------------

const initialState: BookingState = {
    currentBooking: null,
    bookingFormData: null,
    bookings: [],
    activeBookings: [],
    pastBookings: [],
    trackingData: null,
    filters: {},
    loading: "idle",
    createLoading: "idle",
    trackingLoading: "idle",
    pagination: {
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        limit: 10,
        hasNext: false,
        hasPrev: false,
    },
    error: null,
    lastFetched: null,
};

// ---------------- Thunks ----------------

export const createBooking = createAsyncThunk<
    CreateBookingResponse,
    CreateBookingPayload,
    { rejectValue: string }
>("booking/createBooking", async (payload, { rejectWithValue }) => {
    try {
        const response = await apiService.post(API_CONFIG.ENDPOINTS.CREATE_BOOKING, payload);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to create booking"
        );
    }
});

export const getBookingById = createAsyncThunk<
    Booking,
    string,
    { rejectValue: string }
>("booking/getBookingById", async (bookingId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_BOOKING_BY_ID.replace(':id', bookingId);
        const response = await apiService.get(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch booking"
        );
    }
});

export const getUserBookings = createAsyncThunk<
    GetBookingsResponse,
    { userId: string; filters?: BookingFilters },
    { rejectValue: string }
>("booking/getUserBookings", async ({ userId, filters }, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_USER_BOOKINGS.replace(':userId', userId);
        const response = await apiService.get(endpoint, { params: filters });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch bookings"
        );
    }
});

export const getActiveBookings = createAsyncThunk<
    Booking[],
    string,
    { rejectValue: string }
>("booking/getActiveBookings", async (userId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_ACTIVE_BOOKINGS.replace(':userId', userId);
        const response = await apiService.get(endpoint);
        const data = response.data.data || response.data;
        return data.bookings || data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch active bookings"
        );
    }
});

export const getPastBookings = createAsyncThunk<
    Booking[],
    string,
    { rejectValue: string }
>("booking/getPastBookings", async (userId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.GET_PAST_BOOKINGS.replace(':userId', userId);
        const response = await apiService.get(endpoint);
        const data = response.data.data || response.data;
        return data.bookings || data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to fetch past bookings"
        );
    }
});

export const updateBooking = createAsyncThunk<
    Booking,
    { id: string; payload: UpdateBookingPayload },
    { rejectValue: string }
>("booking/updateBooking", async ({ id, payload }, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.UPDATE_BOOKING.replace(':id', id);
        const response = await apiService.put(endpoint, payload);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to update booking"
        );
    }
});

export const cancelBooking = createAsyncThunk<
    Booking,
    { id: string; reason: string },
    { rejectValue: string }
>("booking/cancelBooking", async ({ id, reason }, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.CANCEL_BOOKING.replace(':id', id);
        const response = await apiService.post(endpoint, { reason });
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to cancel booking"
        );
    }
});

export const rescheduleBooking = createAsyncThunk<
    Booking,
    { id: string; payload: RescheduleBookingPayload },
    { rejectValue: string }
>("booking/rescheduleBooking", async ({ id, payload }, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.RESCHEDULE_BOOKING.replace(':id', id);
        const response = await apiService.post(endpoint, payload);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to reschedule booking"
        );
    }
});

export const trackBooking = createAsyncThunk<
    BookingTracking,
    string,
    { rejectValue: string }
>("booking/trackBooking", async (bookingId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.TRACK_BOOKING.replace(':id', bookingId);
        const response = await apiService.get(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to track booking"
        );
    }
});

export const confirmBooking = createAsyncThunk<
    Booking,
    string,
    { rejectValue: string }
>("booking/confirmBooking", async (bookingId, { rejectWithValue }) => {
    try {
        const endpoint = API_CONFIG.ENDPOINTS.CONFIRM_BOOKING.replace(':id', bookingId);
        const response = await apiService.post(endpoint);
        return response.data.data || response.data;
    } catch (error: any) {
        return rejectWithValue(
            error?.response?.data?.message || error.message || "Failed to confirm booking"
        );
    }
});

// ---------------- Slice ----------------

const bookingSlice = createSlice({
    name: "booking",
    initialState,

    reducers: {
        setCurrentBooking: (state, action: PayloadAction<Booking | null>) => {
            state.currentBooking = action.payload;
        },

        setBookingFormData: (state, action: PayloadAction<BookingState['bookingFormData']>) => {
            state.bookingFormData = action.payload;
        },

        clearBookingFormData: (state) => {
            state.bookingFormData = null;
        },

        setFilters: (state, action: PayloadAction<BookingFilters>) => {
            state.filters = action.payload;
        },

        updateFilters: (state, action: PayloadAction<Partial<BookingFilters>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },

        clearBookings: (state) => {
            state.bookings = [];
            state.activeBookings = [];
            state.pastBookings = [];
            state.pagination = initialState.pagination;
        },

        clearError: (state) => {
            state.error = null;
        },

        resetBookingState: () => initialState,
    },

    extraReducers: (builder) => {
        // Create Booking
        builder
            .addCase(createBooking.pending, (state) => {
                state.createLoading = "pending";
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.createLoading = "succeeded";
                state.currentBooking = action.payload.booking;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.createLoading = "failed";
                state.error = action.payload ?? "Failed to create booking";
            });

        // Get Booking by ID
        builder
            .addCase(getBookingById.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getBookingById.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.currentBooking = action.payload;
            })
            .addCase(getBookingById.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch booking";
            });

        // Get User Bookings
        builder
            .addCase(getUserBookings.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getUserBookings.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.bookings = action.payload.bookings;
                state.pagination = action.payload.pagination;
                state.lastFetched = Date.now();
            })
            .addCase(getUserBookings.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch bookings";
            });

        // Get Active Bookings
        builder
            .addCase(getActiveBookings.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getActiveBookings.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.activeBookings = action.payload;
            })
            .addCase(getActiveBookings.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch active bookings";
            });

        // Get Past Bookings
        builder
            .addCase(getPastBookings.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(getPastBookings.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.pastBookings = action.payload;
            })
            .addCase(getPastBookings.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to fetch past bookings";
            });

        // Update Booking
        builder
            .addCase(updateBooking.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.currentBooking = action.payload;
                // Update in bookings array
                const index = state.bookings.findIndex(b => b.id === action.payload.id);
                if (index !== -1) {
                    state.bookings[index] = action.payload;
                }
            })
            .addCase(updateBooking.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to update booking";
            });

        // Cancel Booking
        builder
            .addCase(cancelBooking.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.currentBooking = action.payload;
                // Update in bookings array
                const index = state.bookings.findIndex(b => b.id === action.payload.id);
                if (index !== -1) {
                    state.bookings[index] = action.payload;
                }
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to cancel booking";
            });

        // Reschedule Booking
        builder
            .addCase(rescheduleBooking.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(rescheduleBooking.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.currentBooking = action.payload;
            })
            .addCase(rescheduleBooking.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to reschedule booking";
            });

        // Track Booking
        builder
            .addCase(trackBooking.pending, (state) => {
                state.trackingLoading = "pending";
                state.error = null;
            })
            .addCase(trackBooking.fulfilled, (state, action) => {
                state.trackingLoading = "succeeded";
                state.trackingData = action.payload;
            })
            .addCase(trackBooking.rejected, (state, action) => {
                state.trackingLoading = "failed";
                state.error = action.payload ?? "Failed to track booking";
            });

        // Confirm Booking
        builder
            .addCase(confirmBooking.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(confirmBooking.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.currentBooking = action.payload;
            })
            .addCase(confirmBooking.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ?? "Failed to confirm booking";
            });
    },
});

export const {
    setCurrentBooking,
    setBookingFormData,
    clearBookingFormData,
    setFilters,
    updateFilters,
    clearBookings,
    clearError,
    resetBookingState,
} = bookingSlice.actions;

export default bookingSlice.reducer;
