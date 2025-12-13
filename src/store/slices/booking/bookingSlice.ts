import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Booking form data interface
interface BookingFormData {
    mode: 'walkin' | 'pickup';
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
    vehicle: any | null;
    addOnsTotal: number;
    totalAmount: number;
    timestamp: string;
}

// Booking state interface
interface BookingState {
    bookingFormData: BookingFormData | null;
    currentBookingId: string | null;
    bookingHistory: any[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: BookingState = {
    bookingFormData: null,
    currentBookingId: null,
    bookingHistory: [],
    loading: false,
    error: null,
};

// Create slice
const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        // Set booking form data
        setBookingFormData: (state, action: PayloadAction<BookingFormData>) => {
            state.bookingFormData = action.payload;
        },

        // Clear booking form data
        clearBookingFormData: (state) => {
            state.bookingFormData = null;
        },

        // Set current booking ID
        setCurrentBookingId: (state, action: PayloadAction<string>) => {
            state.currentBookingId = action.payload;
        },

        // Add to booking history
        addToBookingHistory: (state, action: PayloadAction<any>) => {
            state.bookingHistory.push(action.payload);
        },

        // Set loading state
        setBookingLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        // Set error
        setBookingError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        // Reset booking state
        resetBookingState: (state) => {
            state.bookingFormData = null;
            state.currentBookingId = null;
            state.loading = false;
            state.error = null;
        },
    },
});

// Export actions
export const {
    setBookingFormData,
    clearBookingFormData,
    setCurrentBookingId,
    addToBookingHistory,
    setBookingLoading,
    setBookingError,
    resetBookingState,
} = bookingSlice.actions;

// Export reducer
export default bookingSlice.reducer;

// Export types
export type { BookingFormData, BookingState };
