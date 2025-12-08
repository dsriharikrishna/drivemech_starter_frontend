"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import Typography from "@/components/ui/Typography"; // :contentReference[oaicite:0]{index=0}
import Button from "@/components/ui/Button";         // :contentReference[oaicite:1]{index=1}
import CommonTextInput from "@/components/forms/CommonTextInput"; // :contentReference[oaicite:2]{index=2}
import ModalDropdown from "@/components/ui/DropDown"; // :contentReference[oaicite:3]{index=3}
import CustomCard from "@/components/ui/CustomCard";  // :contentReference[oaicite:4]{index=4}

import { MapPin, Navigation, Search, CarFront } from "lucide-react";

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

export default function TowingHeroSection() {
  const methods = useForm({
    defaultValues: {
      pickup: "",
      destination: "",
      reg: "",
      make: null,
      model: null,
      vehicleType: null,
    },
  });

  const { handleSubmit, setValue, watch } = methods;
  const selectedMake = watch("make");
  const selectedModel = watch("model");
  const selectedVehicleType = watch("vehicleType");

  const onSubmit = (data: any) => {
    console.log("FORM SUBMITTED:", data);
  };

  return (
    <section className="w-full bg-gray-50">
      {/* container width roughly same as screenshot */}
      <div className="w-full mx-auto">

        {/* layout: left bigger (2fr) and right narrow (1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 items-stretch">

          {/* LEFT: Hero image + overlay + text */}
          <div className="relative rounded-r-xl overflow-hidden h-[520px]">
            <img
              src="/tow-hero.jpg"
              alt="Towing hero"
              className="w-full h-full object-cover bg-hero"
            />

            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* hero content: left-aligned and vertically centered */}
            <div className="absolute inset-0 flex flex-col justify-center px-12 lg:px-16 text-white">
              <div className="inline-block bg-white text-black text-xs px-3 py-1 rounded-full w-fit mb-4 font-medium shadow-sm">
                Available 24/7 Nationwide
              </div>

              <Typography variant="h1" weight="bold" className="text-white leading-tight text-3xl lg:text-4xl">
                Professional Auto <br /> Services <span className="opacity-80">On Demand</span>
              </Typography>

              <Typography variant="body" className="mt-3 text-gray-200 max-w-lg">
                Fast, reliable towing and roadside assistance when you need it most.
                Average response time under 20 minutes.
              </Typography>

              {/* stats - match screenshot spacing */}
              <div className="flex gap-10 mt-6 bg-black/30 p-4 rounded-xl w-fit items-center">
                <div>
                  <p className="text-orange-400 text-xl font-bold">15+</p>
                  <p className="text-xs text-gray-300">Years Experience</p>
                </div>
                <div>
                  <p className="text-orange-400 text-xl font-bold">50k+</p>
                  <p className="text-xs text-gray-300">Happy Customers</p>
                </div>
                <div>
                  <p className="text-orange-400 text-xl font-bold">100+</p>
                  <p className="text-xs text-gray-300">Cities Covered</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: narrow, vertically centered form */}
          <div className="flex items-center">
            <div className="w-full max-w-md mx-auto">
              <CustomCard className="p-6 border border-gray-200 rounded-2xl shadow-sm">
                <FormProvider {...methods}>
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
                        onSelect={(item) => setValue("make", item as any)}
                        placeholder="Make (e.g., Toyota)"
                      />
                      <ModalDropdown
                        items={modelOptions}
                        selectedItem={selectedModel}
                        onSelect={(item) => setValue("model", item as any)}
                        placeholder="Model (e.g., Camry)"
                      />
                    </div>

                    {/* Vehicle type */}
                    <ModalDropdown
                      items={vehicleTypeOptions}
                      selectedItem={selectedVehicleType}
                      onSelect={(item) => setValue("vehicleType", item as any)}
                      placeholder="Select Vehicle Type"
                    />

                    {/* CTA */}
                    <Button
                      fullWidth
                      variant="gradient"
                      type="submit"
                      startIcon={<Search size={16} />}
                      className="mt-2 h-11 rounded-full"
                    >
                      Find Nearby Tow Trucks
                    </Button>
                  </form>
                </FormProvider>
              </CustomCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
