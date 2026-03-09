import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OnboardingState } from "./types";

const initialState: OnboardingState = {
  currentStep: 1,
  selectedServices: [],
  completedSteps: [],
  isSubmitting: false,
  submitError: undefined,
  showStepErrors: false,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    // Navigation Actions
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    goToStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    // Service Selection Actions
    setSelectedServices: (state, action: PayloadAction<string[]>) => {
      state.selectedServices = action.payload;
    },
    toggleSelectedService: (state, action: PayloadAction<string>) => {
      const index = state.selectedServices.indexOf(action.payload);
      if (index > -1) {
        state.selectedServices.splice(index, 1);
      } else {
        state.selectedServices.push(action.payload);
      }
    },

    // Completion Tracking Actions
    markStepCompleted: (state, action: PayloadAction<number>) => {
      if (!state.completedSteps.includes(action.payload)) {
        state.completedSteps.push(action.payload);
      }
    },
    markStepIncomplete: (state, action: PayloadAction<number>) => {
      state.completedSteps = state.completedSteps.filter(
        (step) => step !== action.payload
      );
    },

    // Submission Actions
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setSubmitError: (state, action: PayloadAction<string | undefined>) => {
      state.submitError = action.payload;
    },
    clearSubmitError: (state) => {
      state.submitError = undefined;
    },
    setShowStepErrors: (state, action: PayloadAction<boolean>) => {
      state.showStepErrors = action.payload;
    },

    // Reset Action
    resetOnboarding: () => initialState,
  },
});

export const {
  setCurrentStep,
  nextStep,
  previousStep,
  goToStep,
  setSelectedServices,
  toggleSelectedService,
  markStepCompleted,
  markStepIncomplete,
  setSubmitting,
  setSubmitError,
  clearSubmitError,
  setShowStepErrors,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
