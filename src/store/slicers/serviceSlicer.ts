import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ServiceState {
  selectedServices: string[];
  selectedNestedServices: string[];
  searchQuery: string;
  nestedServiceParent: string | null;
  nestedSearchQuery: string;
}

const initialState: ServiceState = {
  selectedServices: [],
  selectedNestedServices: [],
  searchQuery: '',
  nestedServiceParent: null,
  nestedSearchQuery: '',
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
    toggleNestedService: (state, action: PayloadAction<{ serviceId: string; nestedServiceId: string }>) => {
      const { serviceId, nestedServiceId } = action.payload;
      
      if (state.selectedNestedServices.includes(nestedServiceId)) {
        state.selectedNestedServices = state.selectedNestedServices.filter(s => s !== nestedServiceId);
        // If no more nested services selected for this parent, remove parent from selected
        const hasOtherNestedServices = state.selectedNestedServices.some(id => 
          id.startsWith(serviceId + '-')
        );
        if (!hasOtherNestedServices) {
          state.selectedServices = state.selectedServices.filter(s => s !== serviceId);
        }
      } else {
        state.selectedNestedServices.push(nestedServiceId);
        // If parent service not selected, add it
        if (!state.selectedServices.includes(serviceId)) {
          state.selectedServices.push(serviceId);
        }
        state.nestedServiceParent = serviceId;
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setNestedSearchQuery: (state, action: PayloadAction<string>) => {
      state.nestedSearchQuery = action.payload;
    },
    clearServices: (state) => {
      state.selectedServices = [];
      state.selectedNestedServices = [];
      state.nestedServiceParent = null;
    },
    setNestedServiceParent: (state, action: PayloadAction<string | null>) => {
      state.nestedServiceParent = action.payload;
    }
  },
});

export const { 
  toggleService, 
  toggleNestedService, 
  setSearchQuery, 
  setNestedSearchQuery,
  clearServices, 
  setNestedServiceParent 
} = serviceSlicer.actions;
export default serviceSlicer.reducer;
