import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Pricing plan interface
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  isPopular?: boolean;
  features: {
    category: string;
    items: string[];
  }[];
}

// Pricing state interface
export interface PricingState {
  billingCycle: "monthly" | "yearly";
  selectedPlanId: string | null;
  servicesCount: number;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PricingState = {
  billingCycle: "yearly",
  selectedPlanId: "professional", // Default to professional plan
  servicesCount: 3, // Default services count
  loading: false,
  error: null,
};

// Create slice
const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    // Set billing cycle
    setBillingCycle: (state, action: PayloadAction<"monthly" | "yearly">) => {
      state.billingCycle = action.payload;
    },

    // Set selected plan
    setSelectedPlan: (state, action: PayloadAction<string>) => {
      state.selectedPlanId = action.payload;
    },

    // Set services count
    setServicesCount: (state, action: PayloadAction<number>) => {
      state.servicesCount = action.payload;
    },

    // Set loading state
    setPricingLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error
    setPricingError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Reset pricing state
    resetPricingState: (state) => {
      state.billingCycle = "yearly";
      state.selectedPlanId = "professional";
      state.servicesCount = 3;
      state.loading = false;
      state.error = null;
    },
  },
});

// Export actions
export const {
  setBillingCycle,
  setSelectedPlan,
  setServicesCount,
  setPricingLoading,
  setPricingError,
  resetPricingState,
} = pricingSlice.actions;

// Export reducer
export default pricingSlice.reducer;
