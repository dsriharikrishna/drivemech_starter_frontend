"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import HorizontalStepper from "@/components/ui/HorizontalStepper";
import WorkshopBasicInfo from "./workshop-setup/WorkshopBasicInfo";
import WorkshopServicesBrands from "./workshop-setup/WorkshopServicesBrands";
import WorkshopDocuments from "./workshop-setup/WorkshopDocuments";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setCurrentSubStep,
  setSelectedBrands,
  setSelectedServices,
  setWorkingDays,
  setVehicleTypes,
  setSelectedSubServices,
  setPricingRows,
} from "@/store/slices/vendor-onboarding/workshopSetupSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  workshopBasicInfoSchema,
  workshopServicesSchema,
} from "@/schemas/vendor-onboarding/workshopSetupSchema";
import { z } from "zod";

const WorkshopSetupStepper = () => {
  // Redux state
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(
    (state) => state.workshopSetup.currentSubStep
  );
  const showStepErrors = useAppSelector(
    (state) => state.vendorOnboarding.showStepErrors
  );

  // Redux Data
  const basicInfo = useAppSelector((state) => state.workshopSetup.basicInfo);
  const servicesAndBrands = useAppSelector(
    (state) => state.workshopSetup.servicesAndBrands
  );

  // Schema selection
  let schema;
  switch (currentStep) {
    case 1:
      schema = workshopBasicInfoSchema;
      break;
    case 2:
      schema = workshopServicesSchema;
      break;
    default:
      schema = z.any();
  }

  // Initialize form
  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      vehicleTypes: basicInfo.vehicleTypes,
      workingDays: basicInfo.workingDays,
      selectedServices: servicesAndBrands.selectedServices,
      selectedSubServices: servicesAndBrands.selectedSubServices,
      selectedBrands: servicesAndBrands.selectedBrands,
      pricingRows: servicesAndBrands.pricingRows || [],
    },
  });

  // Effect to trigger validation
  useEffect(() => {
    if (showStepErrors) {
      methods.trigger();
    }
  }, [showStepErrors, currentStep, methods]);

  // Sync form data to Redux
  useEffect(() => {
    const subscription = methods.watch((formData) => {
      const {
        vehicleTypes,
        workingDays,
        selectedServices,
        selectedSubServices,
        selectedBrands,
        pricingRows,
      } = formData;

      if (vehicleTypes)
        dispatch(setVehicleTypes((vehicleTypes as string[]) || []));
      if (workingDays)
        dispatch(setWorkingDays((workingDays as string[]) || []));
      if (selectedServices)
        dispatch(setSelectedServices((selectedServices as string[]) || []));
      if (selectedSubServices)
        dispatch(
          setSelectedSubServices((selectedSubServices as string[]) || [])
        );
      if (selectedBrands)
        dispatch(setSelectedBrands((selectedBrands as string[]) || []));
      if (pricingRows) dispatch(setPricingRows((pricingRows as any[]) || []));
    });
    return () => subscription.unsubscribe();
  }, [methods.watch, dispatch]);

  // Better approach for Sync:
  // Watch individual fields
  const watchedVehicleTypes = methods.watch("vehicleTypes");
  const watchedWorkingDays = methods.watch("workingDays");
  const watchedServices = methods.watch("selectedServices");
  const watchedBrands = methods.watch("selectedBrands");
  // const watchedPricing = methods.watch("pricingRows"); // Pricing usually complex to sync array fully

  const steps = [
    { label: "Basic Info", isCompleted: currentStep > 1 },
    { label: "Workshop Details", isCompleted: currentStep > 2 },
    { label: "Documents", isCompleted: currentStep > 3 },
  ];

  return (
    <FormProvider {...methods}>
      <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-3">
          <img
            src="/images/workshop-icon.png" // Verify path?
            alt="Workshop Icon"
            className="w-10 h-10"
          />
          <h3 className="text-xl font-bold text-gray-900">Workshop Setup</h3>
        </div>

        {/* Stepper */}
        <div className="">
          <HorizontalStepper
            steps={steps}
            currentStep={currentStep}
            variant="default"
            title=""
          />
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {/* We pass nothing, they use context */}
          {currentStep === 1 && <WorkshopBasicInfo />}
          {currentStep === 2 && <WorkshopServicesBrands />}
          {currentStep === 3 && <WorkshopDocuments />}
        </div>
      </div>
    </FormProvider>
  );
};

export default WorkshopSetupStepper;
