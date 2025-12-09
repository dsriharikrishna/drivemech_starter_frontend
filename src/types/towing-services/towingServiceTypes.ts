export interface Driver {
    id: string;
    name: string;
    photo: string;
    rating: number;
    trips: number;
    vehicleType: string;
    price: number;
    baseFare?: number;
    serviceFee?: number;
    tax?: number;
    arrivalTime: string;
    isOnline: boolean;
}

export interface FormData {
    pickup: string;
    destination: string;
    reg: string;
    make: { id: string; name: string } | null;
    model: { id: string; name: string } | null;
    vehicleType: { id: string; name: string } | null;
    phone?: string;
    mobileNo?: string;
}

export interface TowingServiceState {
    formData: FormData | null;
    selectedDriver: Driver | null;
    availableDrivers: Driver[];
    paymentMethod: 'card' | 'wallet' | 'cash' | null;
    bookingId: string | null;
    showAvailableTrucks: boolean;
}