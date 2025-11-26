import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ServiceState {
  selectedServices: string[];
  searchQuery: string;
}

const initialState: ServiceState = {
  selectedServices: [],
  searchQuery: '',
};

const serviceSlicer = createSlice({
  name: 'service',
  initialState,
  reducers: {
    toggleService: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedServices.includes(id)) {
        state.selectedServices = state.selectedServices.filter(s => s !== id);
      } else {
        state.selectedServices.push(id);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearServices: (state) => {
      state.selectedServices = [];
    }
  },
});

export const { toggleService, setSearchQuery, clearServices } = serviceSlicer.actions;
export default serviceSlicer.reducer;
