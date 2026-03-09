import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasicInfoState, Branch, Contact } from "./types";

const initialState: BasicInfoState = {
  companyName: "",
  representativeName: "",
  taxIdentificationNumber: "",
  businessLicenseNumber: "",
  businessAddress: "",
  postCode: "",
  landmark: "",
  city: "",
  state: "",
  country: "",
  branches: [],
  contacts: [],
  isCompleted: false,
};

const basicInfoSlice = createSlice({
  name: "basicInfo",
  initialState,
  reducers: {
    // Basic Info Actions
    setBasicInfo: (state, action: PayloadAction<Partial<BasicInfoState>>) => {
      return { ...state, ...action.payload };
    },
    updateField: (
      state,
      action: PayloadAction<{ field: keyof BasicInfoState; value: any }>
    ) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    },

    // Branch Actions
    addBranch: (state, action: PayloadAction<Branch>) => {
      state.branches.push(action.payload);
    },
    updateBranch: (
      state,
      action: PayloadAction<{ index: number; branch: Branch }>
    ) => {
      const { index, branch } = action.payload;
      if (state.branches[index]) {
        state.branches[index] = branch;
      }
    },
    removeBranch: (state, action: PayloadAction<number>) => {
      state.branches.splice(action.payload, 1);
    },

    // Contact Actions
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    updateContact: (
      state,
      action: PayloadAction<{ index: number; contact: Contact }>
    ) => {
      const { index, contact } = action.payload;
      if (state.contacts[index]) {
        state.contacts[index] = contact;
      }
    },
    removeContact: (state, action: PayloadAction<number>) => {
      state.contacts.splice(action.payload, 1);
    },
    setPrimaryContact: (state, action: PayloadAction<number>) => {
      state.contacts.forEach((contact, index) => {
        contact.isPrimary = index === action.payload;
      });
    },

    // Completion Actions
    setCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },

    // Reset Action
    resetBasicInfo: () => initialState,
  },
});

export const {
  setBasicInfo,
  updateField,
  addBranch,
  updateBranch,
  removeBranch,
  addContact,
  updateContact,
  removeContact,
  setPrimaryContact,
  setCompleted,
  resetBasicInfo,
} = basicInfoSlice.actions;

export default basicInfoSlice.reducer;
