// Shared types for vendor onboarding Redux slices

export interface Branch {
  branchName: string;
  representativeName: string;
  businessAddress: string;
  postCode: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
}

export interface Contact {
  contactPersonName: string;
  phoneNumber: string;
  email: string;
  isPrimary?: boolean;
}

export interface PricingRow {
  id: string;
  make: string;
  model: string;
  serviceType: string;
  price: string;
}

export interface InventoryItem {
  partName: string;
  category: string;
  brand: string;
  partNumber: string;
  price: number;
  stockQuantity: number;
}

// Basic Info State
export interface BasicInfoState {
  companyName: string;
  representativeName: string;
  taxIdentificationNumber: string;
  businessLicenseNumber: string;
  businessAddress: string;
  postCode: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  branches: Branch[];
  contacts: Contact[];
  isCompleted: boolean;
}

// Workshop Setup State
export interface WorkshopSetupState {
  basicInfo: {
    vehicleTypes: string[];
    workingDays: string[];
  };
  servicesAndBrands: {
    selectedServices: string[];
    selectedSubServices: string[];
    selectedBrands: string[];
    pricingRows: PricingRow[];
  };
  documents: {
    businessLicense?: File;
    certifications?: File[];
    bankQR?: File;
    gstCertificate?: File;
    panCard?: File;
    addressProof?: File;
    workshopPhotos?: File[];
  };
  currentSubStep: number;
  isCompleted: boolean;
}

// Spare Parts State
export interface SparePartsState {
  enabled: boolean;
  selectedCategories: string[];
  selectedBrands: string[];
  inventory: InventoryItem[];
  currentSubStep: number;
  isCompleted: boolean;
}

// Towing Services State
// Towing Services State
export interface Driver {
  id: string;
  name: string;
  mobile: string;
  email: string;
  licenseNumber: string;
  experience: string;
  emergencyContact: string;
  photo?: any;
  photoPreview?: string | null;
  license?: any;
  licensePreview?: string | null;
  available24x7: boolean;
}

export interface TowingServicesState {
  enabled: boolean;
  // Enhanced fields
  serviceLocations: string;
  vehicleTypes: string[];
  is24x7: boolean;
  description: string;
  baseCharge: string;
  perKmCharge: string;
  minDistance: string;
  waitingCharge: string;
  drivers: Driver[];

  chargesPerHour: string;
  serviceRadius: string;
  numberOfTrucks: string;
  servicePincodes: string;
  serviceCities: string;
  documents: {
    license?: File;
    insurance?: File[];
    vehiclePhotos?: File[];
  };
  currentSubStep: number;
  isCompleted: boolean;
}

// Main Onboarding State
export interface OnboardingState {
  currentStep: number;
  selectedServices: string[]; // Workshop, Spare Parts, Towing
  completedSteps: number[];
  isSubmitting: boolean;
  submitError?: string;
  showStepErrors: boolean;
}
