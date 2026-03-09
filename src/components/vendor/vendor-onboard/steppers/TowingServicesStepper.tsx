"use client";

import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Truck } from "lucide-react";
import HorizontalStepper from "@/components/ui/HorizontalStepper";
import TowingServiceDetails from "./towing/TowingServiceDetails";
import TowingDocuments from "./towing/TowingDocuments";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setCurrentSubStep,
  setTowingDetails,
  setDrivers,
} from "@/store/slices/vendor-onboarding/towingServicesSlice";

// Validation Schema
import { towingServicesStep1Schema } from "@/schemas/vendor-onboarding/towingServicesSchema";

type TowingServicesFormData = z.infer<typeof towingServicesStep1Schema>;

const TowingServicesStepper = () => {
  // Redux state
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(
    (state) => state.vendorTowingServices.currentSubStep
  );
  const reduxTowingData = useAppSelector((state) => state.vendorTowingServices);
  const showStepErrors = useAppSelector(
    (state) => state.vendorOnboarding.showStepErrors
  );

  // Form initialization with Redux data
  const methods = useForm<TowingServicesFormData>({
    resolver: zodResolver(towingServicesStep1Schema),
    mode: "onChange",
    defaultValues: {
      towingServices: {
        serviceLocations: reduxTowingData.serviceLocations || "",
        vehicleTypes: reduxTowingData.vehicleTypes || [],
        is24x7: reduxTowingData.is24x7 || false,
        description: reduxTowingData.description || "",
        baseCharge: reduxTowingData.baseCharge || "",
        perKmCharge: reduxTowingData.perKmCharge || "",
        minDistance: reduxTowingData.minDistance || "",
        waitingCharge: reduxTowingData.waitingCharge || "",
      },
      drivers:
        reduxTowingData.drivers.length > 0
          ? reduxTowingData.drivers.map((driver) => ({ ...driver }))
          : [
              {
                id: "driver-1",
                name: "",
                mobile: "",
                email: "",
                licenseNumber: "",
                experience: "",
                emergencyContact: "",
                photo: null,
                photoPreview: null,
                license: null,
                licensePreview: null,
                available24x7: false,
              },
            ],
    },
  });

  // Effect to trigger validation when parent signals errors should be shown
  useEffect(() => {
    if (showStepErrors && currentStep === 1) {
      methods.trigger();
    }
  }, [showStepErrors, currentStep, methods]);

  // Sync form data to Redux
  useEffect(() => {
    const subscription = methods.watch((formData) => {
      // Sync Towing Details
      if (formData.towingServices) {
        dispatch(
          setTowingDetails({
            serviceLocations: formData.towingServices.serviceLocations || "",
            vehicleTypes: (formData.towingServices.vehicleTypes || []).filter(
              (v): v is string => typeof v === "string"
            ),
            is24x7: formData.towingServices.is24x7 || false,
            description: formData.towingServices.description || "",
            baseCharge: formData.towingServices.baseCharge || "",
            perKmCharge: formData.towingServices.perKmCharge || "",
            minDistance: formData.towingServices.minDistance || "",
            waitingCharge: formData.towingServices.waitingCharge || "",
          })
        );
      }

      // Sync Drivers
      if (formData.drivers) {
        // Deep clone to prevent Redux from freezing form state objects
        const driversClone = formData.drivers.map((driver: any) => ({
          ...driver,
        }));
        dispatch(setDrivers(driversClone));
      }
    });
    return () => subscription.unsubscribe();
  }, [methods.watch, dispatch]);

  const steps = [
    { label: "Service Details", isCompleted: currentStep > 1 },
    { label: "Documents", isCompleted: currentStep > 2 },
  ];

  return (
    <FormProvider {...methods}>
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header - Centered with icon and title */}
        <div className="flex items-center justify-center gap-2 py-4 ">
          <Truck size={20} className="text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Towing Services
          </h3>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 border-b border-gray-100">
          <HorizontalStepper
            steps={steps}
            currentStep={currentStep}
            variant="default"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && <TowingServiceDetails />}
          {currentStep === 2 && <TowingDocuments />}
        </div>
      </div>
    </FormProvider>
  );
};

export default TowingServicesStepper;
