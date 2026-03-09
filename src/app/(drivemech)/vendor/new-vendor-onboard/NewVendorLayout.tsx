"use client";

import React, { useState, useCallback, useEffect } from "react";
import Stepper from "@/components/ui/Stepper";
import Button from "@/components/ui/Button";
import BasicInfoStepper from "@/components/vendor/vendor-onboard/steppers/BasicInfoStepper";
import WorkshopSetupStepper from "@/components/vendor/vendor-onboard/steppers/WorkshopSetupStepper";
import SparePartsStepper from "@/components/vendor/vendor-onboard/steppers/SparePartsStepper";
import TowingServicesStepper from "@/components/vendor/vendor-onboard/steppers/TowingServicesStepper";
import ReviewStepper from "@/components/vendor/vendor-onboard/steppers/ReviewStepper";
import { useRouter, useSearchParams } from "next/navigation";
import { Wrench } from "phosphor-react";
import { useAppDispatch, useAppSelector, store } from "@/store/store";
import {
  nextStep,
  previousStep,
  setCurrentStep,
  resetOnboarding,
  setShowStepErrors,
} from "@/store/slices/vendor-onboarding/onboardingSlice";
import { resetBasicInfo } from "@/store/slices/vendor-onboarding/basicInfoSlice";
import {
  resetWorkshopSetup,
  setCurrentSubStep as setWorkshopSubStep,
} from "@/store/slices/vendor-onboarding/workshopSetupSlice";
import {
  resetSpareParts,
  setCurrentSubStep as setSparePartsSubStep,
} from "@/store/slices/vendor-onboarding/sparePartsSlice";
import {
  resetTowingServices,
  setCurrentSubStep as setTowingServicesSubStep,
} from "@/store/slices/vendor-onboarding/towingServicesSlice";
import { validateCurrentStep } from "@/utils/vendorOnboardingValidation";

const stateOptions = [
  { id: "nsw", name: "NSW" },
  { id: "vic", name: "VIC" },
  { id: "qld", name: "QLD" },
];

const countryOptions = [
  { id: "au", name: "Australia" },
  { id: "us", name: "United States" },
  { id: "uk", name: "United Kingdom" },
];

const cityOptions = [
  { id: "sydney", name: "Sydney" },
  { id: "melbourne", name: "Melbourne" },
  { id: "brisbane", name: "Brisbane" },
];

const NewVendorLayout: React.FC = () => {
  // Redux state
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStep = useAppSelector(
    (state) => state.vendorOnboarding.currentStep
  );
  const selectedServices = useAppSelector(
    (state) => state.vendorOnboarding.selectedServices
  );
  const basicInfo = useAppSelector((state) => state.vendorBasicInfo);
  const workshopSetup = useAppSelector((state) => state.workshopSetup);
  const spareParts = useAppSelector((state) => state.vendorSpareParts);
  const towingServices = useAppSelector((state) => state.vendorTowingServices);

  const [expandedSections, setExpandedSections] = useState({
    businessInfo: true,
    branchLocations: true,
    contactDetails: true,
  });

  // Filter steps based on selected services
  const steps = React.useMemo(() => {
    const allSteps = [
      { number: 1, label: "Basic Info", id: "basic" },
      { number: 2, label: "Workshop Setup", id: "workshop" },
      { number: 3, label: "Spare Parts", id: "spare-parts" },
      { number: 4, label: "Towing Services", id: "towing" },
      { number: 5, label: "Review", id: "review" },
    ];

    return allSteps
      .filter((step) => {
        // Always show Basic Info and Review
        if (step.id === "basic" || step.id === "review") return true;
        // Show service steps only if selected
        return selectedServices.includes(step.id);
      })
      .map((step, index) => ({ ...step, number: index + 1 }));
  }, [selectedServices]);

  const toggleSection = useCallback(
    (section: keyof typeof expandedSections) => {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    },
    []
  );

  // Sync URL with Redux state
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("step", currentStep.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [currentStep, router]);

  const handleNext = useCallback(() => {
    // Validate current step before proceeding
    const state = store.getState();
    const isValid = validateCurrentStep(state, currentStep);

    if (!isValid) {
      // Show validation errors
      dispatch(setShowStepErrors(true));
      return; // Prevent navigation
    }

    // Clear error flag on successful validation
    dispatch(setShowStepErrors(false));

    const currentStepId = steps[currentStep - 1]?.id;

    // Explicit Navigation Logic
    switch (currentStepId) {
      case "basic": // Basic Info
        dispatch(nextStep());
        break;

      case "workshop": // Workshop Setup
        if (workshopSetup.currentSubStep < 3) {
          dispatch(setWorkshopSubStep(workshopSetup.currentSubStep + 1));
        } else {
          dispatch(nextStep());
          // Reset next step sub-step
          dispatch(setSparePartsSubStep(1));
        }
        break;

      case "spare-parts": // Spare Parts
        if (spareParts.currentSubStep < 2) {
          dispatch(setSparePartsSubStep(spareParts.currentSubStep + 1));
        } else {
          dispatch(nextStep());
          dispatch(setTowingServicesSubStep(1));
        }
        break;

      case "towing": // Towing Services
        if (towingServices.currentSubStep < 2) {
          dispatch(setTowingServicesSubStep(towingServices.currentSubStep + 1));
        } else {
          dispatch(nextStep());
        }
        break;

      case "review": // Review
        // End of flow
        break;

      default:
        dispatch(nextStep());
    }
  }, [
    currentStep,
    steps,
    workshopSetup.currentSubStep,
    spareParts.currentSubStep,
    towingServices.currentSubStep,
    dispatch,
  ]);

  const handlePrevious = useCallback(() => {
    // Clear validation errors when going back
    dispatch(setShowStepErrors(false));

    const currentStepId = steps[currentStep - 1]?.id;
    const prevStepIndex = currentStep - 2;
    const prevStepId = steps[prevStepIndex]?.id;

    switch (currentStepId) {
      case "basic": // Basic Info
        // Can't go back
        break;

      case "workshop": // Workshop Setup
        if (workshopSetup.currentSubStep > 1) {
          dispatch(setWorkshopSubStep(workshopSetup.currentSubStep - 1));
        } else {
          dispatch(previousStep());
        }
        break;

      case "spare-parts": // Spare Parts
        if (spareParts.currentSubStep > 1) {
          dispatch(setSparePartsSubStep(spareParts.currentSubStep - 1));
        } else {
          dispatch(previousStep());
          // Intelligent back navigation: set sub-step of the target previous step
          if (prevStepId === "workshop") {
            dispatch(setWorkshopSubStep(3));
          }
        }
        break;

      case "towing": // Towing Services
        if (towingServices.currentSubStep > 1) {
          dispatch(setTowingServicesSubStep(towingServices.currentSubStep - 1));
        } else {
          dispatch(previousStep());
          // Intelligent back navigation
          if (prevStepId === "spare-parts") {
            dispatch(setSparePartsSubStep(2));
          } else if (prevStepId === "workshop") {
            dispatch(setWorkshopSubStep(3));
          }
        }
        break;

      case "review": // Review
        dispatch(previousStep());
        // Intelligent back navigation
        if (prevStepId === "towing") {
          dispatch(setTowingServicesSubStep(2));
        } else if (prevStepId === "spare-parts") {
          dispatch(setSparePartsSubStep(2));
        } else if (prevStepId === "workshop") {
          dispatch(setWorkshopSubStep(3));
        }
        break;

      default:
        dispatch(previousStep());
    }
  }, [
    currentStep,
    steps,
    workshopSetup.currentSubStep,
    spareParts.currentSubStep,
    towingServices.currentSubStep,
    dispatch,
  ]);

  const handleNavigation = useCallback(() => {
    // Collect all data before clearing
    const completeOnboardingData = {
      basicInfo: basicInfo,
      workshopSetup: workshopSetup,
      spareParts: spareParts,
      towingServices: towingServices,
      selectedServices: selectedServices,
      submittedAt: new Date().toISOString(),
    };

    // Print final data before clearing
    console.log(JSON.stringify(completeOnboardingData, null, 2));

    // Clear all Redux onboarding data after successful submission
    dispatch(resetOnboarding());
    dispatch(resetBasicInfo());
    dispatch(resetWorkshopSetup());
    dispatch(resetSpareParts());
    dispatch(resetTowingServices());

    // Navigate to services-qr page
    router.replace("/vendor/services-qr");
  }, [
    basicInfo,
    workshopSetup,
    spareParts,
    towingServices,
    selectedServices,
    dispatch,
    router,
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="w-full flex flex-col gap-4">
        {/* Stepper */}
        <Stepper
          steps={steps}
          currentStep={currentStep}
          title="DriveMech Setup"
          subtitle={`Step ${currentStep} of ${steps.length}: ${steps[currentStep - 1]?.label}`}
          icon={<Wrench size={20} />}
        />

        {/* Content */}
        <div className="flex flex-col gap-4">
          {/* Render step based on ID */}
          {steps[currentStep - 1]?.id === "basic" && (
            <BasicInfoStepper
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              cityOptions={cityOptions}
              stateOptions={stateOptions}
              countryOptions={countryOptions}
            />
          )}
          {steps[currentStep - 1]?.id === "workshop" && (
            <WorkshopSetupStepper />
          )}
          {steps[currentStep - 1]?.id === "spare-parts" && (
            <SparePartsStepper />
          )}
          {steps[currentStep - 1]?.id === "towing" && <TowingServicesStepper />}
          {steps[currentStep - 1]?.id === "review" && <ReviewStepper />}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <Button type="button" variant="outline" onClick={handlePrevious}>
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button type="button" variant="primary" onClick={handleNext}>
                Next Step
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={handleNavigation}
              >
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVendorLayout;
