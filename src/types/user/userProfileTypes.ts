// ---------------- User Profile Types ----------------

export interface UserInfo {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar?: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
    createdAt: string;
    updatedAt: string;
}

export interface Address {
    id: string;
    userId: string;
    type: 'home' | 'work' | 'other';
    label?: string;
    addressLine1: string;
    addressLine2?: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    latitude?: number;
    longitude?: number;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserPreferences {
    language: string;
    currency: string;
    timezone: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';

    // Communication Preferences
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;

    // Privacy
    shareLocation: boolean;
    shareProfile: boolean;
}

export interface NotificationSettings {
    // Booking Notifications
    bookingConfirmation: boolean;
    bookingReminders: boolean;
    bookingUpdates: boolean;
    bookingCancellation: boolean;

    // Payment Notifications
    paymentSuccess: boolean;
    paymentFailed: boolean;
    refundProcessed: boolean;

    // Order Notifications
    orderConfirmation: boolean;
    orderShipped: boolean;
    orderDelivered: boolean;
    orderCancelled: boolean;

    // Promotional Notifications
    offers: boolean;
    newServices: boolean;
    newsletter: boolean;

    // Service Notifications
    serviceReminders: boolean;
    maintenanceAlerts: boolean;

    // Channels
    email: boolean;
    sms: boolean;
    push: boolean;
    whatsapp: boolean;
}

// ---------------- Request Types ----------------

export interface UpdateProfilePayload {
    fullName?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
}

export interface UpdateAvatarPayload {
    avatar: File | string;
}

export interface AddAddressPayload {
    type: 'home' | 'work' | 'other';
    label?: string;
    addressLine1: string;
    addressLine2?: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    latitude?: number;
    longitude?: number;
    setAsDefault?: boolean;
}

export interface UpdateAddressPayload extends Partial<AddAddressPayload> {
    id: string;
}

export interface UpdatePreferencesPayload extends Partial<UserPreferences> { }

export interface UpdateNotificationSettingsPayload extends Partial<NotificationSettings> { }

// ---------------- Response Types ----------------

export interface GetProfileResponse {
    profile: UserInfo;
}

export interface GetAddressesResponse {
    addresses: Address[];
    total: number;
}

export interface GetPreferencesResponse {
    preferences: UserPreferences;
}

export interface GetNotificationSettingsResponse {
    settings: NotificationSettings;
}

// ---------------- State Types ----------------

export interface UserProfileState {
    // Profile Data
    profile: UserInfo | null;
    addresses: Address[];
    defaultAddress: Address | null;
    preferences: UserPreferences | null;
    notificationSettings: NotificationSettings | null;

    // Loading States
    profileLoading: "idle" | "pending" | "succeeded" | "failed";
    addressesLoading: "idle" | "pending" | "succeeded" | "failed";
    preferencesLoading: "idle" | "pending" | "succeeded" | "failed";

    // Error handling
    error: string | null;

    // Cache
    lastFetched: number | null;
}
