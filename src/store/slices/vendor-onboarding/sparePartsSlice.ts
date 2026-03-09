import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SparePartsState, InventoryItem } from "./types";

const initialState: SparePartsState = {
  enabled: false,
  selectedCategories: [],
  selectedBrands: [],
  inventory: [],
  currentSubStep: 1,
  isCompleted: false,
};

const sparePartsSlice = createSlice({
  name: "spareParts",
  initialState,
  reducers: {
    // Enable/Disable Actions
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },

    // Category Actions
    toggleCategory: (state, action: PayloadAction<string>) => {
      const index = state.selectedCategories.indexOf(action.payload);
      if (index > -1) {
        state.selectedCategories.splice(index, 1);
      } else {
        state.selectedCategories.push(action.payload);
      }
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },

    // Brand Actions
    toggleBrand: (state, action: PayloadAction<string>) => {
      const index = state.selectedBrands.indexOf(action.payload);
      if (index > -1) {
        state.selectedBrands.splice(index, 1);
      } else {
        state.selectedBrands.push(action.payload);
      }
    },
    setSelectedBrands: (state, action: PayloadAction<string[]>) => {
      state.selectedBrands = action.payload;
    },

    // Inventory Actions
    addInventoryItem: (state, action: PayloadAction<InventoryItem>) => {
      state.inventory.push(action.payload);
    },
    updateInventoryItem: (
      state,
      action: PayloadAction<{ index: number; item: InventoryItem }>
    ) => {
      const { index, item } = action.payload;
      if (state.inventory[index]) {
        state.inventory[index] = item;
      }
    },
    removeInventoryItem: (state, action: PayloadAction<number>) => {
      state.inventory.splice(action.payload, 1);
    },
    bulkAddInventory: (state, action: PayloadAction<InventoryItem[]>) => {
      state.inventory.push(...action.payload);
    },
    clearInventory: (state) => {
      state.inventory = [];
    },
    setInventory: (state, action: PayloadAction<InventoryItem[]>) => {
      state.inventory = action.payload;
    },

    // Navigation Actions
    setCurrentSubStep: (state, action: PayloadAction<number>) => {
      state.currentSubStep = action.payload;
    },

    // Completion Actions
    setCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },

    // Reset Action
    resetSpareParts: () => initialState,
  },
});

export const {
  setEnabled,
  toggleCategory,
  setSelectedCategories,
  toggleBrand,
  setSelectedBrands,
  addInventoryItem,
  updateInventoryItem,
  removeInventoryItem,
  bulkAddInventory,
  clearInventory,
  setInventory,
  setCurrentSubStep,
  setCompleted,
  resetSpareParts,
} = sparePartsSlice.actions;

export default sparePartsSlice.reducer;
