import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface HelperState {
  selectedMake: string;
  selectedModel: string;
  selectedState: string;
  selectedRego: string;
  selectedPostcode: string;
  nextTabValidations: boolean;
  nextSubTabValidations: boolean;
}

const initialState: HelperState = {
  selectedMake: "",
  selectedModel: "",
  selectedState: "AP",
  selectedRego: "",
  selectedPostcode: "",
  nextTabValidations: false,
  nextSubTabValidations: false,
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setSelectedMake: (state, action: PayloadAction<string>) => {
      state.selectedMake = action.payload;
    },
    setSelectedModel: (state, action: PayloadAction<string>) => {
      state.selectedModel = action.payload;
    },
    setSelectedState: (state, action: PayloadAction<string>) => {
      state.selectedState = action.payload;
    },
    setSelectedRego: (state, action: PayloadAction<string>) => {
      state.selectedRego = action.payload;
    },
    setSelectedPostcode: (state, action: PayloadAction<string>) => {
      state.selectedPostcode = action.payload;
    },
    setnextTabValidations: (state, action: PayloadAction<boolean>) => {
      state.nextTabValidations = action.payload;
    },
    setnextSubTabValidations: (state, action: PayloadAction<boolean>) => {
      state.nextSubTabValidations = action.payload;
    },
    resetVehicleSearch: (state) => {
      state.selectedMake = "";
      state.selectedModel = "";
      state.selectedState = "AP";
      state.selectedRego = "";
      state.selectedPostcode = "";
    },
  },
});

export const {
  setSelectedMake,
  setSelectedModel,
  setSelectedState,
  setSelectedRego,
  setSelectedPostcode,
  resetVehicleSearch,
  setnextTabValidations,
  setnextSubTabValidations,
} = helperSlice.actions;

// Selectors
export const selectSelectedMake = (state: RootState) =>
  state.helper.selectedMake;
export const selectSelectedModel = (state: RootState) =>
  state.helper.selectedModel;
export const selectSelectedState = (state: RootState) =>
  state.helper.selectedState;
export const selectSelectedRego = (state: RootState) =>
  state.helper.selectedRego;
export const selectSelectedPostcode = (state: RootState) =>
  state.helper.selectedPostcode;
export const selectnextTabValidations = (state: RootState) =>
  state.helper.nextTabValidations;
export const selectnextSubTabValidations = (state: RootState) =>
  state.helper.nextSubTabValidations;
export default helperSlice.reducer;
