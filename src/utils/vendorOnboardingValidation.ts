import { basicInfoSchema } from "@/schemas/vendor-onboarding/basicInfoSchema";
import {
  workshopBasicInfoSchema,
  workshopServicesSchema,
} from "@/schemas/vendor-onboarding/workshopSetupSchema";
import { sparePartsSchema } from "@/schemas/vendor-onboarding/sparePartsSchema";
import { towingServicesStep1Schema } from "@/schemas/vendor-onboarding/towingServicesSchema";
import { z } from "zod";
import type { RootState } from "@/store/store";

/**
 * Validates Basic Info step - all fields together
 */
export const validateBasicInfo = (state: RootState): boolean => {
  const basicInfo = state.vendorBasicInfo;

  const dataToValidate = {
    companyName: basicInfo.companyName,
    representativeName: basicInfo.representativeName,
    taxIdentificationNumber: basicInfo.taxIdentificationNumber,
    businessLicenseNumber: basicInfo.businessLicenseNumber,
    businessAddress: basicInfo.businessAddress,
    postCode: basicInfo.postCode,
    landmark: basicInfo.landmark,
    city: basicInfo.city,
    state: basicInfo.state,
    country: basicInfo.country,
    branches: basicInfo.branches,
    contacts: basicInfo.contacts,
  };

  const result = basicInfoSchema.safeParse(dataToValidate);

  if (!result.success) {
    console.warn(
      "⚠️ Basic Info validation failed. Please fill all required fields:"
    );
    result.error.issues.forEach((err) => {
      console.warn(`  - ${err.path.join(".")}: ${err.message}`);
    });
    return false;
  }

  return true;
};

/**
 * Validates Workshop Setup step (based on current sub-step)
 */
export const validateWorkshopSetup = (
  state: RootState,
  currentSubStep: number
): boolean => {
  const workshopSetup = state.workshopSetup;

  switch (currentSubStep) {
    case 1: // Basic Info sub-step
      const basicInfoResult = workshopBasicInfoSchema.safeParse({
        vehicleTypes: workshopSetup.basicInfo.vehicleTypes,
        workingDays: workshopSetup.basicInfo.workingDays,
      });
      if (!basicInfoResult.success) {
        console.warn("⚠️ Workshop Basic Info validation failed:");
        basicInfoResult.error.issues.forEach((err) => {
          console.warn(`  - ${err.path.join(".")}: ${err.message}`);
        });
        return false;
      }
      return true;

    case 2: // Services & Brands sub-step
      const servicesResult = workshopServicesSchema.safeParse({
        selectedServices: workshopSetup.servicesAndBrands.selectedServices,
        selectedSubServices:
          workshopSetup.servicesAndBrands.selectedSubServices,
        selectedBrands: workshopSetup.servicesAndBrands.selectedBrands,
        pricingRows: workshopSetup.servicesAndBrands.pricingRows,
      });
      if (!servicesResult.success) {
        console.warn("⚠️ Workshop Services & Brands validation failed:");
        servicesResult.error.issues.forEach((err) => {
          console.warn(`  - ${err.path.join(".")}: ${err.message}`);
        });
        return false;
      }
      return true;

    case 3: // Documents sub-step
      // Documents are optional, so always valid
      return true;

    default:
      return false;
  }
};

/**
 * Validates Spare Parts step (based on current sub-step)
 */
export const validateSpareParts = (
  state: RootState,
  currentSubStep: number
): boolean => {
  const spareParts = state.vendorSpareParts;

  switch (currentSubStep) {
    case 1:
      // Check if at least one category AND one brand is selected
      if (
        spareParts.selectedCategories.length === 0 ||
        spareParts.selectedBrands.length === 0
      ) {
        console.error(
          "Spare Parts validation failed: No categories or brands selected"
        );
        return false;
      }
      return true;

    case 2: // Inventory sub-step
      // Check if at least one item exists in inventory
      if (!spareParts.inventory || spareParts.inventory.length === 0) {
        console.error("Spare Parts validation failed: Inventory is empty");
        return false;
      }
      return true;

    default:
      console.warn(`Validation skipped for sub-step ${currentSubStep}`);
      return true; // Default to true if not explicitly validated (e.g. optional steps)
  }
};

/**
 * Validates Towing Services step (based on current sub-step)
 */
export const validateTowingServices = (
  state: RootState,
  currentSubStep: number
): boolean => {
  const towingData = state.vendorTowingServices;

  // We construct an object matching the schema structure
  const validationData = {
    towingServices: {
      serviceLocations: towingData.serviceLocations,
      vehicleTypes: towingData.vehicleTypes,
      is24x7: towingData.is24x7,
      description: towingData.description,
      baseCharge: towingData.baseCharge,
      perKmCharge: towingData.perKmCharge,
      minDistance: towingData.minDistance,
      waitingCharge: towingData.waitingCharge,
    },
    drivers: towingData.drivers,
  };

  try {
    if (currentSubStep === 1) {
      towingServicesStep1Schema.parse(validationData);
      return true;
    }
    // Step 2 logic (Documents) typically doesn't have strict schema validation in this flow yet
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Towing Validation Error:", error.issues);
    }
    return false;
  }
};

/**
 * Validates the current step before navigation
 */
export const validateCurrentStep = (
  state: RootState,
  currentStep: number
): boolean => {
  const selectedServices = state.vendorOnboarding.selectedServices;

  // Map actual step numbers to step IDs
  const allSteps = [
    { number: 1, label: "Basic Info", id: "basic" },
    { number: 2, label: "Workshop Setup", id: "workshop" },
    { number: 3, label: "Spare Parts", id: "spare-parts" },
    { number: 4, label: "Towing Services", id: "towing" },
    { number: 5, label: "Review", id: "review" },
  ];

  const steps = allSteps
    .filter((step) => {
      if (step.id === "basic" || step.id === "review") return true;
      return selectedServices.includes(step.id);
    })
    .map((step, index) => ({ ...step, number: index + 1 }));

  const currentStepId = steps[currentStep - 1]?.id;

  switch (currentStepId) {
    case "basic":
      return validateBasicInfo(state);

    case "workshop":
      return validateWorkshopSetup(state, state.workshopSetup.currentSubStep);

    case "spare-parts":
      return validateSpareParts(state, state.vendorSpareParts.currentSubStep);

    case "towing":
      return validateTowingServices(
        state,
        state.vendorTowingServices.currentSubStep
      );

    case "review":
      // Review step doesn't need validation
      return true;

    default:
      return false;
  }
};
