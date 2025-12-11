import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VehicleInfo {
  registration: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  transmission: string;
  engine: string;
  drive: string;
}

export interface CarState {
  currentVehicle: VehicleInfo;
  savedVehicles: VehicleInfo[];
}

const defaultVehicle: VehicleInfo = {
  registration: 'ABC 1234 D',
  make: 'Toyota',
  model: 'Hilux',
  year: 2021,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  engine: '2.5 Liters',
  drive: 'Hybrid AWD-i'
};

const initialState: CarState = {
  currentVehicle: defaultVehicle,
  savedVehicles: [defaultVehicle],
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCurrentVehicle: (state, action: PayloadAction<VehicleInfo>) => {
      state.currentVehicle = action.payload;
    },
    updateVehicleField: (state, action: PayloadAction<{ field: keyof VehicleInfo; value: string | number }>) => {
      const { field, value } = action.payload;
      // Type-safe field assignment
      switch (field) {
        case 'year':
          if (typeof value === 'number') {
            state.currentVehicle.year = value;
          }
          break;
        case 'registration':
        case 'make':
        case 'model':
        case 'fuelType':
        case 'transmission':
        case 'engine':
        case 'drive':
          if (typeof value === 'string') {
            state.currentVehicle[field] = value;
          }
          break;
      }
    },
    addSavedVehicle: (state, action: PayloadAction<VehicleInfo>) => {
      const exists = state.savedVehicles.some(
        vehicle => vehicle.registration === action.payload.registration
      );
      if (!exists) {
        state.savedVehicles.push(action.payload);
      }
    },
    removeSavedVehicle: (state, action: PayloadAction<string>) => {
      state.savedVehicles = state.savedVehicles.filter(
        vehicle => vehicle.registration !== action.payload
      );
    },
    clearCurrentVehicle: (state) => {
      state.currentVehicle = defaultVehicle;
    },
  },
});

export const {
  setCurrentVehicle,
  updateVehicleField,
  addSavedVehicle,
  removeSavedVehicle,
  clearCurrentVehicle,
} = carSlice.actions;

export default carSlice.reducer;
