"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TowingServiceDetails from "@/components/vendor/vendor-onboard/steppers/towing/TowingServiceDetails";
import Button from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setTowingDetails,
  setDrivers,
} from "@/store/slices/vendor-onboarding/towingServicesSlice";

// Validation Schema (matching the structure used in TowingServicesStepper)
const towingServicesSchema = z.object({
  towingServices: z.object({
    serviceLocations: z.string().min(1, "Service area is required"),
    vehicleTypes: z
      .array(z.string())
      .min(1, "Select at least one vehicle type"),
    is24x7: z.boolean(),
    description: z.string().optional(),
    baseCharge: z.string().min(1, "Base charge is required"),
    perKmCharge: z.string().min(1, "Per KM charge is required"),
    minDistance: z.string().optional(),
    waitingCharge: z.string().optional(),
  }),
  drivers: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Driver name is required"),
        mobile: z.string().min(10, "Valid mobile number is required"),
        email: z.string().email("Valid email is required"),
        licenseNumber: z.string().min(1, "License number is required"),
        experience: z.string().min(1, "Experience is required"),
        emergencyContact: z.string().min(10, "Emergency contact is required"),
        photo: z.any().optional(),
        photoPreview: z.string().nullable().optional(),
        license: z.any().optional(),
        licensePreview: z.string().nullable().optional(),
        available24x7: z.boolean(),
      })
    )
    .min(1, "At least one driver is required"),
});

type TowingServicesFormData = z.infer<typeof towingServicesSchema>;

const ManagementTowingServicesTab = () => {
  const dispatch = useAppDispatch();
  const {
    serviceLocations,
    vehicleTypes,
    is24x7,
    description,
    baseCharge,
    perKmCharge,
    minDistance,
    waitingCharge,
    drivers,
  } = useAppSelector((state) => state.vendorTowingServices);

  const [isLoading, setIsLoading] = React.useState(false);

  // Form initialization
  const methods = useForm<TowingServicesFormData>({
    resolver: zodResolver(towingServicesSchema),
    mode: "onChange",
    defaultValues: {
      towingServices: {
        serviceLocations: serviceLocations || "",
        vehicleTypes: vehicleTypes || [],
        is24x7: is24x7 || false,
        description: description || "",
        baseCharge: baseCharge || "",
        perKmCharge: perKmCharge || "",
        minDistance: minDistance || "",
        waitingCharge: waitingCharge || "",
      },
      drivers:
        drivers.length > 0
          ? (drivers as any)
          : [
              {
                id: "1",
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

  const handleUpdateDetails = async () => {
    setIsLoading(true);
    const formData = methods.getValues();
    console.log("Updated Form Data:", formData);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Dispatch to Redux
      dispatch(
        setTowingDetails({
          serviceLocations: formData.towingServices.serviceLocations,
          vehicleTypes: formData.towingServices.vehicleTypes,
          is24x7: formData.towingServices.is24x7,
          description: formData.towingServices.description,
          baseCharge: formData.towingServices.baseCharge,
          perKmCharge: formData.towingServices.perKmCharge,
          minDistance: formData.towingServices.minDistance,
          waitingCharge: formData.towingServices.waitingCharge,
        })
      );

      // Dispatch drivers
      const formattedDrivers: any[] = formData.drivers.map((d) => ({
        ...d,
      }));

      dispatch(setDrivers(formattedDrivers));

      alert("Towing service details updated successfully!");
    } catch (error) {
      console.error("Failed to update details:", error);
      alert("Failed to update details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-6 p-4 bg-white">
        {/* Reusing the Onboarding Component */}
        <TowingServiceDetails />

        {/* Update Button */}
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            variant="primary"
            onClick={methods.handleSubmit(handleUpdateDetails)}
            className="w-full md:w-auto min-w-[200px]"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Details"}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default ManagementTowingServicesTab;
