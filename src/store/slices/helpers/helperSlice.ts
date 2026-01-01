import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface HelperState {
    selectedMake: string;
    selectedModel: string;
    selectedState: string;
    selectedRego: string;
    selectedPostcode: string;
}

const initialState: HelperState = {
    selectedMake: "",
    selectedModel: "",
    selectedState: "AP",
    selectedRego: "",
    selectedPostcode: "",
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
    resetVehicleSearch
} = helperSlice.actions;

// Selectors
export const selectSelectedMake = (state: RootState) => state.helper.selectedMake;
export const selectSelectedModel = (state: RootState) => state.helper.selectedModel;
export const selectSelectedState = (state: RootState) => state.helper.selectedState;
export const selectSelectedRego = (state: RootState) => state.helper.selectedRego;
export const selectSelectedPostcode = (state: RootState) => state.helper.selectedPostcode;

export default helperSlice.reducer;
