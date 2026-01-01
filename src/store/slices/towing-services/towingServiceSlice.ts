import { Driver, FormData, TowingServiceState } from '@/types/towing-services/towingServiceTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
    
const mockDrivers: Driver[] = [
    {
        id: "1",
        name: "Michael Rodriguez",
        photo: "https://i.pravatar.cc/150?img=12",
        rating: 4.8,
        trips: 342,
        vehicleType: "Flatbed Tow Truck",
        price: 75,
        baseFare: 60,
        serviceFee: 8,
        tax: 7,
        arrivalTime: "8 Min away",
        isOnline: true,
    },
    {
        id: "2",
        name: "Sarah Thompson",
        photo: "https://i.pravatar.cc/150?img=45",
        rating: 4.5,
        trips: 247,
        vehicleType: "Standard Tow Truck",
        price: 70,
        baseFare: 55,
        serviceFee: 8,
        tax: 7,
        arrivalTime: "12 Min away",
        isOnline: true,
    },
    {
        id: "3",
        name: "James Willison",
        photo: "https://i.pravatar.cc/150?img=33",
        rating: 4.5,
        trips: 562,
        vehicleType: "Standard Tow Truck",
        price: 90,
        baseFare: 72,
        serviceFee: 10,
        tax: 8,
        arrivalTime: "5 Min away",
        isOnline: true,
    },
];

const initialState: TowingServiceState = {
    formData: null,
    selectedDriver: null,
    availableDrivers: mockDrivers,
    paymentMethod: null,
    bookingId: null,
    showAvailableTrucks: false,
};

const towingServiceSlice = createSlice({
    name: 'towingService',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<FormData>) => {
            state.formData = action.payload;
            state.showAvailableTrucks = true;
        },
        setSelectedDriver: (state, action: PayloadAction<Driver>) => {
            state.selectedDriver = action.payload;
        },
        setPaymentMethod: (state, action: PayloadAction<'card' | 'wallet' | 'cash' | null>) => {
            state.paymentMethod = action.payload;
        },
        setBookingId: (state, action: PayloadAction<string>) => {
            state.bookingId = action.payload;
        },
        setShowAvailableTrucks: (state, action: PayloadAction<boolean>) => {
            state.showAvailableTrucks = action.payload;
        },
        resetBooking: (state) => {
            state.formData = null;
            state.selectedDriver = null;
            state.paymentMethod = null;
            state.bookingId = null;
            state.showAvailableTrucks = false;
        },
    },
});

export const {
    setFormData,
    setSelectedDriver,
    setPaymentMethod,
    setBookingId,
    setShowAvailableTrucks,
    resetBooking,
} = towingServiceSlice.actions;

export default towingServiceSlice.reducer;
