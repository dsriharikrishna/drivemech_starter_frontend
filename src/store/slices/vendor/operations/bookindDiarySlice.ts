import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BookingEvent } from "@/types/vendor/operations/booking";

// ============ Async Thunks ============
// NOTE: API endpoints are not yet developed - these are commented out for now

// Fetch all bookings for a vendor
export const fetchBookings = createAsyncThunk(
  "bookingDiary/fetchBookings",
  async (vendorId: string, { rejectWithValue }) => {
    try {
      // TODO: Uncomment when API is ready
      // const response = await fetch(`/api/vendors/${vendorId}/bookings`);
      // if (!response.ok) {
      //     throw new Error('Failed to fetch bookings');
      // }
      // return await response.json();

      // For now, return empty array (bookings will be loaded from mock data)
      return [];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Create a new booking
export const createBooking = createAsyncThunk(
  "bookingDiary/createBooking",
  async (booking: Omit<BookingEvent, "id">, { rejectWithValue }) => {
    try {
      // TODO: Uncomment when API is ready
      // const response = await fetch('/api/bookings', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(booking),
      // });
      // if (!response.ok) {
      //     throw new Error('Failed to create booking');
      // }
      // return await response.json();

      // For now, return the booking with a generated ID
      return {
        ...booking,
        id: Date.now().toString(),
      } as BookingEvent;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Update an existing booking
export const updateBooking = createAsyncThunk(
  "bookingDiary/updateBooking",
  async (booking: BookingEvent, { rejectWithValue }) => {
    try {
      // TODO: Uncomment when API is ready
      // const response = await fetch(`/api/bookings/${booking.id}`, {
      //     method: 'PUT',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(booking),
      // });
      // if (!response.ok) {
      //     throw new Error('Failed to update booking');
      // }
      // return await response.json();

      // For now, return the booking as-is
      return booking;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Delete a booking
export const deleteBooking = createAsyncThunk(
  "bookingDiary/deleteBooking",
  async (bookingId: string, { rejectWithValue }) => {
    try {
      // TODO: Uncomment when API is ready
      // const response = await fetch(`/api/bookings/${bookingId}`, {
      //     method: 'DELETE',
      // });
      // if (!response.ok) {
      //     throw new Error('Failed to delete booking');
      // }

      // For now, just return the bookingId
      return bookingId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// ============ State Interface ============

interface BookingDiaryState {
  bookings: BookingEvent[];
  loading: boolean;
  error: string | null;
  selectedBooking: BookingEvent | null;
}

const initialState: BookingDiaryState = {
  bookings: [],
  loading: false,
  error: null,
  selectedBooking: null,
};

// ============ Slice ============

const bookingDiarySlice = createSlice({
  name: "bookingDiary",
  initialState,
  reducers: {
    // Clear error message
    clearError: (state) => {
      state.error = null;
    },

    // Select a booking
    setSelectedBooking: (state, action: PayloadAction<BookingEvent | null>) => {
      state.selectedBooking = action.payload;
    },

    // Clear all bookings (useful for logout)
    clearBookings: (state) => {
      state.bookings = [];
      state.selectedBooking = null;
      state.error = null;
    },

    // Add booking locally (optimistic update)
    addBookingLocally: (state, action: PayloadAction<BookingEvent>) => {
      state.bookings.push(action.payload);
    },

    // Update booking locally
    updateBookingLocally: (state, action: PayloadAction<BookingEvent>) => {
      const index = state.bookings.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },

    // Remove booking locally
    removeBookingLocally: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // -------- Fetch Bookings --------
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch bookings";
      })

      // -------- Create Booking --------
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create booking";
      })

      // -------- Update Booking --------
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(
          (b) => b.id === action.payload.id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        if (state.selectedBooking?.id === action.payload.id) {
          state.selectedBooking = action.payload;
        }
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update booking";
      })

      // -------- Delete Booking --------
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter((b) => b.id !== action.payload);
        if (state.selectedBooking?.id === action.payload) {
          state.selectedBooking = null;
        }
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to delete booking";
      });
  },
});

// ============ Exports ============

export const {
  clearError,
  setSelectedBooking,
  clearBookings,
  addBookingLocally,
  updateBookingLocally,
  removeBookingLocally,
} = bookingDiarySlice.actions;

export default bookingDiarySlice.reducer;
