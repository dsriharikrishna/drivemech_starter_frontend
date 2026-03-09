// Configuration related types

export interface SystemConfig {
  id: string;
  vendorId: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  address: Address;
  taxSettings: TaxSettings;
  currency: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface TaxSettings {
  taxEnabled: boolean;
  taxRate: number;
  taxNumber: string;
  includeTaxInPrice: boolean;
}

export interface FeatureFlags {
  [key: string]: boolean;
}

export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  language: string;
  notifications: NotificationPreferences;
  dashboard: DashboardPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  newBooking: boolean;
  paymentReceived: boolean;
  lowStock: boolean;
}

export interface DashboardPreferences {
  layout: "grid" | "list";
  widgets: string[];
  refreshInterval: number;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  description: string;
  icon?: string;
  connectedAt?: string;
}

export interface ConnectedApp {
  id: string;
  integrationId: string;
  credentials: Record<string, string>;
  settings: Record<string, any>;
  lastSync?: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  expiresAt?: string;
  lastUsed?: string;
  permissions: string[];
}

export interface GeneralSettings {
  businessHours: BusinessHours;
  appointmentDuration: number;
  bufferTime: number;
  maxAdvanceBooking: number;
  cancellationPolicy: string;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  breaks?: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  bookingReminders: boolean;
  paymentAlerts: boolean;
  inventoryAlerts: boolean;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  ipWhitelist: string[];
  passwordPolicy: PasswordPolicy;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  expiryDays: number;
}
