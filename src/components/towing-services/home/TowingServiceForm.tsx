"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import Button from "@/components/ui/Button";
import CustomCard from "@/components/ui/CustomCard";
import ModalDropdown from "@/components/ui/DropDown";
import Typography from "@/components/ui/Typography";
import { CarFront, Navigation, Search, MapPin } from "lucide-react";
import { TowingHeroFormData } from "@/schemas/towing-hero.schema";

const makeOptions = [
  { id: "toyota", name: "Toyota" },
  { id: "honda", name: "Honda" },
  { id: "bmw", name: "BMW" },
];

const modelOptions = [
  { id: "camry", name: "Camry" },
  { id: "city", name: "City" },
  { id: "civic", name: "Civic" },
];

const vehicleTypeOptions = [
  { id: "car", name: "Car" },
  { id: "bike", name: "Bike" },
  { id: "truck", name: "Truck" },
];

interface TowingServiceFormProps {
  onSubmit: (data: TowingHeroFormData) => void;
}

export default function TowingServiceForm({ onSubmit }: TowingServiceFormProps) {
  const { handleSubmit, setValue, watch, clearErrors, trigger, formState: { isSubmitting, errors } } = useFormContext<TowingHeroFormData>();

  const selectedMake = watch("make");
  const selectedModel = watch("model");
  const selectedVehicleType = watch("vehicleType");

  // Handlers that clear errors when selecting
  const handleMakeSelect = (item: any) => {
    setValue("make", item);
    clearErrors("make");
  };

  const handleModelSelect = (item: any) => {
    setValue("model", item);
    clearErrors("model");
  };

  const handleVehicleTypeSelect = (item: any) => {
    setValue("vehicleType", item);
    clearErrors("vehicleType");
  };

  return (
    <div className="flex items-center">
      <div className="w-full max-w-md mx-auto">
        <CustomCard className="p-6 border border-gray-200 rounded-2xl shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <Typography variant="h5" weight="semibold" className="text-gray-800">
              Search Towing Services
            </Typography>

            {/* Pickup (placeholder only, icon inside) */}
            <CommonTextInput
              name="pickup"
              label=""
              placeholder="Pickup Location"
              leftIcon={<MapPin className="w-4 text-gray-400" />}
            />

            {/* Destination */}
            <CommonTextInput
              name="destination"
              label=""
              placeholder="Destination"
              leftIcon={<Navigation className="w-4 text-gray-400" />}
            />

            {/* Vehicle details header */}
            <div className="flex items-center gap-2 mt-2">
              <CarFront className="w-4 text-gray-600" />
              <Typography variant="body" weight="medium" className="text-gray-700">
                Vehicle Details
              </Typography>
            </div>

            {/* Reg */}
            <CommonTextInput
              name="reg"
              label=""
              placeholder="Vehicle Reg. Number (e.g., ABC 1234)"
            />

            {/* Make + Model in two columns */}
            <div className="grid grid-cols-2 gap-3">
              <ModalDropdown
                items={makeOptions}
                selectedItem={selectedMake}
                onSelect={handleMakeSelect}
                placeholder="Make (e.g., Toyota)"
                error={errors.make?.message}
              />
              <ModalDropdown
                items={modelOptions}
                selectedItem={selectedModel}
                onSelect={handleModelSelect}
                placeholder="Model (e.g., Camry)"
                error={errors.model?.message}
              />
            </div>

            {/* Vehicle type */}
            <ModalDropdown
              items={vehicleTypeOptions}
              selectedItem={selectedVehicleType}
              onSelect={handleVehicleTypeSelect}
              placeholder="Select Vehicle Type"
              error={errors.vehicleType?.message}
            />

            {/* CTA */}
            <Button
              fullWidth
              variant="gradient"
              type="submit"
              startIcon={<Search size={16} />}
              className="mt-2 h-11 rounded-full"
              disabled={isSubmitting}
            >
              Find Nearby Tow Trucks
            </Button>
          </form>
        </CustomCard>
      </div>
    </div>
  );
}
