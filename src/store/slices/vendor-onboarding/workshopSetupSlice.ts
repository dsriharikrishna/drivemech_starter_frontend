import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkshopSetupState, PricingRow } from "./types";

const initialState: WorkshopSetupState = {
  basicInfo: {
    vehicleTypes: [],
    workingDays: [],
  },
  servicesAndBrands: {
    selectedServices: [],
    selectedSubServices: [],
    selectedBrands: [],
    pricingRows: [],
  },
  documents: {},
  currentSubStep: 1,
  isCompleted: false,
};

const workshopSetupSlice = createSlice({
  name: "workshopSetup",
  initialState,
  reducers: {
    // Basic Info Actions
    setVehicleTypes: (state, action: PayloadAction<string[]>) => {
      state.basicInfo.vehicleTypes = action.payload;
    },
    toggleVehicleType: (state, action: PayloadAction<string>) => {
      const index = state.basicInfo.vehicleTypes.indexOf(action.payload);
      if (index > -1) {
        state.basicInfo.vehicleTypes.splice(index, 1);
      } else {
        state.basicInfo.vehicleTypes.push(action.payload);
      }
    },
    setWorkingDays: (state, action: PayloadAction<string[]>) => {
      state.basicInfo.workingDays = action.payload;
    },

    // Services Actions
    toggleService: (state, action: PayloadAction<string>) => {
      const index = state.servicesAndBrands.selectedServices.indexOf(
        action.payload
      );
      if (index > -1) {
        state.servicesAndBrands.selectedServices.splice(index, 1);
      } else {
        state.servicesAndBrands.selectedServices.push(action.payload);
      }
    },
    setSelectedServices: (state, action: PayloadAction<string[]>) => {
      state.servicesAndBrands.selectedServices = action.payload;
    },

    // Sub-Services Actions
    toggleSubService: (state, action: PayloadAction<string>) => {
      const index = state.servicesAndBrands.selectedSubServices.indexOf(
        action.payload
      );
      if (index > -1) {
        state.servicesAndBrands.selectedSubServices.splice(index, 1);
      } else {
        state.servicesAndBrands.selectedSubServices.push(action.payload);
      }
    },
    setSelectedSubServices: (state, action: PayloadAction<string[]>) => {
      state.servicesAndBrands.selectedSubServices = action.payload;
    },

    // Brands Actions
    toggleBrand: (state, action: PayloadAction<string>) => {
      const index = state.servicesAndBrands.selectedBrands.indexOf(
        action.payload
      );
      if (index > -1) {
        state.servicesAndBrands.selectedBrands.splice(index, 1);
      } else {
        state.servicesAndBrands.selectedBrands.push(action.payload);
      }
    },
    setSelectedBrands: (state, action: PayloadAction<string[]>) => {
      state.servicesAndBrands.selectedBrands = action.payload;
    },

    // Pricing Actions
    addPricingRow: (state, action: PayloadAction<PricingRow>) => {
      state.servicesAndBrands.pricingRows.push(action.payload);
    },
    updatePricingRow: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof PricingRow;
        value: string;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const row = state.servicesAndBrands.pricingRows.find((r) => r.id === id);
      if (row) {
        row[field] = value;
      }
    },
    removePricingRow: (state, action: PayloadAction<string>) => {
      state.servicesAndBrands.pricingRows =
        state.servicesAndBrands.pricingRows.filter(
          (row) => row.id !== action.payload
        );
    },
    setPricingRows: (state, action: PayloadAction<PricingRow[]>) => {
      state.servicesAndBrands.pricingRows = action.payload;
    },

    // Documents Actions
    setDocuments: (
      state,
      action: PayloadAction<WorkshopSetupState["documents"]>
    ) => {
      state.documents = { ...state.documents, ...action.payload };
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
    resetWorkshopSetup: () => initialState,
  },
});

export const {
  setVehicleTypes,
  toggleVehicleType,
  setWorkingDays,
  toggleService,
  setSelectedServices,
  toggleSubService,
  setSelectedSubServices,
  toggleBrand,
  setSelectedBrands,
  addPricingRow,
  updatePricingRow,
  removePricingRow,
  setPricingRows,
  setDocuments,
  setCurrentSubStep,
  setCompleted,
  resetWorkshopSetup,
} = workshopSetupSlice.actions;

export default workshopSetupSlice.reducer;
