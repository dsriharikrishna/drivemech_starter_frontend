import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AddressFormData } from "@/schemas/checkout.schema";
import { PaymentMethod } from "@/types/payment";
import { RootState } from "@/store/store";
import apiService from "@/services/apiService";
import { API_CONFIG } from "@/services/apiConfig";
import { clearCart } from "./sparePartsCartSlice";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
}

export type CheckoutStep = "address" | "review" | "payment";

export interface SparePartsCheckoutState {
  // Checkout flow
  currentStep: CheckoutStep;
  completedSteps: CheckoutStep[];

  // Address
  addressData: AddressFormData | null;

  // Payment
  selectedPaymentMethod: PaymentMethod;
}

const initialState: SparePartsCheckoutState = {
  currentStep: "address",
  completedSteps: [],
  addressData: null,
  selectedPaymentMethod: "saved",
};

// Thunks
export const submitOrder = createAsyncThunk<
  void,
  void,
  { state: RootState; rejectValue: string }
>(
  "sparePartsCheckout/submitOrder",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const { cart, pricing } = state.spareParts;
      const { addressData, selectedPaymentMethod } = state.sparePartsCheckout;

      if (!addressData) {
        throw new Error("Shipping address is required");
      }

      const payload = {
        items: cart.products.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: addressData,
        paymentMethod: selectedPaymentMethod,
        billing: {
          subtotal: pricing.subtotal,
          shipping: pricing.shippingCost,
          tax: pricing.taxAmount,
          total: pricing.totalAmount,
        },
      };

      await apiService.post(API_CONFIG.ENDPOINTS.CREATE_ORDER, payload);

      // On success
      dispatch(completeCheckout());
      dispatch(clearCart());
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Failed to place order"
      );
    }
  }
);

const sparePartsCheckoutSlice = createSlice({
  name: "sparePartsCheckout",
  initialState,
  reducers: {
    // Checkout flow actions
    setCurrentStep: (state, action: PayloadAction<CheckoutStep>) => {
      state.currentStep = action.payload;
    },

    completeStep: (state, action: PayloadAction<CheckoutStep>) => {
      if (!state.completedSteps.includes(action.payload)) {
        state.completedSteps.push(action.payload);
      }
    },

    goToNextStep: (state) => {
      const steps: CheckoutStep[] = ["address", "review", "payment"];
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex < steps.length - 1) {
        // Mark current step as completed
        if (!state.completedSteps.includes(state.currentStep)) {
          state.completedSteps.push(state.currentStep);
        }
        // Move to next step
        state.currentStep = steps[currentIndex + 1];
      }
    },

    goToPreviousStep: (state) => {
      const steps: CheckoutStep[] = ["address", "review", "payment"];
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex > 0) {
        state.currentStep = steps[currentIndex - 1];
      }
    },

    resetCheckoutFlow: (state) => {
      state.currentStep = "address";
      state.completedSteps = [];
      state.addressData = null;
      state.selectedPaymentMethod = "saved";
    },

    // Address actions
    setAddressData: (state, action: PayloadAction<AddressFormData>) => {
      state.addressData = action.payload;
    },

    clearAddressData: (state) => {
      state.addressData = null;
    },

    // Payment actions
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.selectedPaymentMethod = action.payload;
    },

    // Complete checkout
    completeCheckout: (state) => {
      state.currentStep = "address";
      state.completedSteps = [];
      state.addressData = null;
      state.selectedPaymentMethod = "saved";
    },
  },
});

export const {
  setCurrentStep,
  completeStep,
  goToNextStep,
  goToPreviousStep,
  resetCheckoutFlow,
  setAddressData,
  clearAddressData,
  setPaymentMethod,
  completeCheckout,
} = sparePartsCheckoutSlice.actions;

export default sparePartsCheckoutSlice.reducer;
