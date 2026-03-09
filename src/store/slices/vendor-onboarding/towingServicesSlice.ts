import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TowingServicesState } from "./types";

const initialState: TowingServicesState = {
  enabled: false,
  serviceLocations: "",
  vehicleTypes: [],
  is24x7: false,
  description: "",
  baseCharge: "",
  perKmCharge: "",
  minDistance: "",
  waitingCharge: "",
  drivers: [],
  chargesPerHour: "",
  serviceRadius: "",
  numberOfTrucks: "",
  servicePincodes: "",
  serviceCities: "",
  documents: {},
  currentSubStep: 1,
  isCompleted: false,
};

const towingServicesSlice = createSlice({
  name: "towingServices",
  initialState,
  reducers: {
    // Enable/Disable Actions
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },

    // Service Details Actions
    setTowingDetails: (
      state,
      action: PayloadAction<
        Partial<
          Omit<
            TowingServicesState,
            "documents" | "currentSubStep" | "isCompleted"
          >
        >
      >
    ) => {
      return { ...state, ...action.payload };
    },
    updateField: (
      state,
      action: PayloadAction<{ field: keyof TowingServicesState; value: any }>
    ) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    },

    // Vehicle Types Actions
    toggleVehicleType: (state, action: PayloadAction<string>) => {
      const index = state.vehicleTypes.indexOf(action.payload);
      if (index > -1) {
        state.vehicleTypes.splice(index, 1);
      } else {
        state.vehicleTypes.push(action.payload);
      }
    },
    setVehicleTypes: (state, action: PayloadAction<string[]>) => {
      state.vehicleTypes = action.payload;
    },

    // Driver Actions
    setDrivers: (
      state,
      action: PayloadAction<TowingServicesState["drivers"]>
    ) => {
      state.drivers = action.payload;
    },

    // Documents Actions
    setDocuments: (
      state,
      action: PayloadAction<TowingServicesState["documents"]>
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
    resetTowingServices: () => initialState,
  },
});

export const {
  setEnabled,
  setTowingDetails,
  updateField,
  toggleVehicleType,
  setVehicleTypes,
  setDrivers,
  setDocuments,
  setCurrentSubStep,
  setCompleted,
  resetTowingServices,
} = towingServicesSlice.actions;

export default towingServicesSlice.reducer;
