import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Product/Part in cart
export interface CartProduct {
  id: string;
  partNumber: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  quantity: number;

  // Product specifications
  viscosity?: string;
  specifications?: string[];
  weight?: string;
  volume?: string;

  // Availability
  inStock: boolean;
  stockQuantity?: number;

  // Vehicle compatibility
  compatibleWith?: string[];
}

// Vehicle information
export interface Vehicle {
  id?: string;
  make: string;
  model: string;
  year: string;
  variant?: string;
  engineType?: string;
  fuelType?: string;
}

// Filters state
export interface ProductFilters {
  categories: string[];
  brands: string[];
  priceRange: { min: number; max: number };
  viscosity: string[];
  specifications: string[];
  inStockOnly: boolean;
}

export interface SparePartsState {
  // Shopping cart
  cart: {
    products: CartProduct[];
    itemCount: number;
  };

  // Selected vehicle for parts compatibility
  vehicle: Vehicle | null;

  // Wishlist
  wishlist: {
    productIds: string[];
  };

  // Compare products
  compare: {
    productIds: string[];
    maxItems: number;
  };

  // Order summary
  pricing: {
    subtotal: number;
    shippingCost: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
  };

  // Active filters
  filters: ProductFilters;

  // UI state
  ui: {
    isCartDrawerOpen: boolean;
    isVehicleSelectorOpen: boolean;
  };
}

const initialState: SparePartsState = {
  cart: {
    products: [],
    itemCount: 0,
  },
  vehicle: null,
  wishlist: {
    productIds: [],
  },
  compare: {
    productIds: [],
    maxItems: 4,
  },
  pricing: {
    subtotal: 0,
    shippingCost: 0,
    taxAmount: 0,
    discountAmount: 0,
    totalAmount: 0,
  },
  filters: {
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 10000 },
    viscosity: [],
    specifications: [],
    inStockOnly: false,
  },
  ui: {
    isCartDrawerOpen: false,
    isVehicleSelectorOpen: false,
  },
};

const sparePartsSlice = createSlice({
  name: "spareParts",
  initialState,
  reducers: {
    // ========== CART ACTIONS ==========
    addProductToCart: (state, action: PayloadAction<CartProduct>) => {
      const existingProduct = state.cart.products.find(
        (p) => p.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.cart.products.push(action.payload);
      }

      state.cart.itemCount = state.cart.products.reduce(
        (total, p) => total + p.quantity,
        0
      );

      sparePartsSlice.caseReducers.recalculatePricing(state);
    },

    removeProductFromCart: (state, action: PayloadAction<string>) => {
      state.cart.products = state.cart.products.filter(
        (p) => p.id !== action.payload
      );

      state.cart.itemCount = state.cart.products.reduce(
        (total, p) => total + p.quantity,
        0
      );

      sparePartsSlice.caseReducers.recalculatePricing(state);
    },

    updateProductQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const product = state.cart.products.find(
        (p) => p.id === action.payload.productId
      );

      if (product && action.payload.quantity > 0) {
        product.quantity = action.payload.quantity;

        state.cart.itemCount = state.cart.products.reduce(
          (total, p) => total + p.quantity,
          0
        );

        sparePartsSlice.caseReducers.recalculatePricing(state);
      }
    },

    clearCart: (state) => {
      state.cart.products = [];
      state.cart.itemCount = 0;
      state.pricing = {
        subtotal: 0,
        shippingCost: 0,
        taxAmount: 0,
        discountAmount: 0,
        totalAmount: 0,
      };
    },

    // ========== VEHICLE ACTIONS ==========
    selectVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.vehicle = action.payload;
    },

    clearVehicle: (state) => {
      state.vehicle = null;
    },

    // ========== WISHLIST ACTIONS ==========
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.wishlist.productIds.includes(action.payload)) {
        state.wishlist.productIds.push(action.payload);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist.productIds = state.wishlist.productIds.filter(
        (id) => id !== action.payload
      );
    },

    toggleWishlist: (state, action: PayloadAction<string>) => {
      const index = state.wishlist.productIds.indexOf(action.payload);

      if (index > -1) {
        state.wishlist.productIds.splice(index, 1);
      } else {
        state.wishlist.productIds.push(action.payload);
      }
    },

    // ========== COMPARE ACTIONS ==========
    addToCompare: (state, action: PayloadAction<string>) => {
      if (
        !state.compare.productIds.includes(action.payload) &&
        state.compare.productIds.length < state.compare.maxItems
      ) {
        state.compare.productIds.push(action.payload);
      }
    },

    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.compare.productIds = state.compare.productIds.filter(
        (id) => id !== action.payload
      );
    },

    clearCompare: (state) => {
      state.compare.productIds = [];
    },

    // ========== FILTER ACTIONS ==========
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = {
        categories: [],
        brands: [],
        priceRange: { min: 0, max: 10000 },
        viscosity: [],
        specifications: [],
        inStockOnly: false,
      };
    },

    // ========== UI ACTIONS ==========
    openCartDrawer: (state) => {
      state.ui.isCartDrawerOpen = true;
    },

    closeCartDrawer: (state) => {
      state.ui.isCartDrawerOpen = false;
    },

    toggleCartDrawer: (state) => {
      state.ui.isCartDrawerOpen = !state.ui.isCartDrawerOpen;
    },

    openVehicleSelector: (state) => {
      state.ui.isVehicleSelectorOpen = true;
    },

    closeVehicleSelector: (state) => {
      state.ui.isVehicleSelectorOpen = false;
    },

    // ========== PRICING CALCULATIONS ==========
    recalculatePricing: (state) => {
      // Calculate subtotal
      state.pricing.subtotal = state.cart.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );

      // Calculate total discount
      state.pricing.discountAmount = state.cart.products.reduce(
        (sum, product) => {
          const itemDiscount =
            (product.originalPrice - product.price) * product.quantity;
          return sum + itemDiscount;
        },
        0
      );

      // Calculate shipping (free over $1000)
      state.pricing.shippingCost = state.pricing.subtotal >= 1000 ? 0 : 50;

      // Calculate tax (18%)
      state.pricing.taxAmount = state.pricing.subtotal * 0.18;

      // Calculate total
      state.pricing.totalAmount =
        state.pricing.subtotal +
        state.pricing.shippingCost +
        state.pricing.taxAmount;
    },

    applyDiscountCode: (state, action: PayloadAction<number>) => {
      state.pricing.discountAmount += action.payload;
      state.pricing.totalAmount =
        state.pricing.subtotal +
        state.pricing.shippingCost +
        state.pricing.taxAmount -
        state.pricing.discountAmount;
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCart,
  selectVehicle,
  clearVehicle,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  addToCompare,
  removeFromCompare,
  clearCompare,
  setFilters,
  clearFilters,
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  openVehicleSelector,
  closeVehicleSelector,
  recalculatePricing,
  applyDiscountCode,
} = sparePartsSlice.actions;

export default sparePartsSlice.reducer;
