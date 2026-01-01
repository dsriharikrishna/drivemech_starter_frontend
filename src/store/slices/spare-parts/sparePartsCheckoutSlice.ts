import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressFormData } from '@/schemas/checkout.schema';
import { PaymentMethod } from '@/types/payment';

export interface CartItem {
    id: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    quantity: number;
}

export type CheckoutStep = 'address' | 'review' | 'payment';

export interface SparePartsCheckoutState {
    // Cart
    cartItems: CartItem[];

    // Checkout flow
    currentStep: CheckoutStep;
    completedSteps: CheckoutStep[];

    // Address
    addressData: AddressFormData | null;

    // Payment
    selectedPaymentMethod: PaymentMethod;

    // Order summary
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

const initialState: SparePartsCheckoutState = {
    cartItems: [],
    currentStep: 'address',
    completedSteps: [],
    addressData: null,
    selectedPaymentMethod: 'saved',
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
};

const sparePartsCheckoutSlice = createSlice({
    name: 'sparePartsCheckout',
    initialState,
    reducers: {
        // Cart actions
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
            // Recalculate totals
            sparePartsCheckoutSlice.caseReducers.calculateTotals(state);
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            sparePartsCheckoutSlice.caseReducers.calculateTotals(state);
        },

        updateCartItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                sparePartsCheckoutSlice.caseReducers.calculateTotals(state);
            }
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.subtotal = 0;
            state.shipping = 0;
            state.tax = 0;
            state.total = 0;
        },

        setCartItems: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems = action.payload;
            sparePartsCheckoutSlice.caseReducers.calculateTotals(state);
        },

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
            const steps: CheckoutStep[] = ['address', 'review', 'payment'];
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
            const steps: CheckoutStep[] = ['address', 'review', 'payment'];
            const currentIndex = steps.indexOf(state.currentStep);
            if (currentIndex > 0) {
                state.currentStep = steps[currentIndex - 1];
            }
        },

        resetCheckoutFlow: (state) => {
            state.currentStep = 'address';
            state.completedSteps = [];
            state.addressData = null;
            state.selectedPaymentMethod = 'saved';
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

        // Order summary actions
        calculateTotals: (state) => {
            state.subtotal = state.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            state.shipping = state.subtotal > 1000 ? 0 : 50; // Free shipping over $1000
            state.tax = state.subtotal * 0.18; // 18% tax
            state.total = state.subtotal + state.shipping + state.tax;
        },

        // Complete checkout
        completeCheckout: (state) => {
            // This would typically trigger an API call
            // For now, just reset the state
            state.cartItems = [];
            state.currentStep = 'address';
            state.completedSteps = [];
            state.addressData = null;
            state.selectedPaymentMethod = 'saved';
            state.subtotal = 0;
            state.shipping = 0;
            state.tax = 0;
            state.total = 0;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    setCartItems,
    setCurrentStep,
    completeStep,
    goToNextStep,
    goToPreviousStep,
    resetCheckoutFlow,
    setAddressData,
    clearAddressData,
    setPaymentMethod,
    calculateTotals,
    completeCheckout,
} = sparePartsCheckoutSlice.actions;

export default sparePartsCheckoutSlice.reducer;
