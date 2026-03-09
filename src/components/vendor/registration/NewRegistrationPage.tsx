"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import CommonTextInput from "@/components/forms/CommonTextInput";
import DropDown from "@/components/ui/DropDown";
import DatePicker from "@/components/ui/DatePicker";
import PhoneInput from "@/components/forms/PhoneInput";
import Button from "@/components/ui/Button";
import RegoInput, { StateOption } from "@/components/forms/RegoInput";
import {
  newRegistrationSchema,
  type NewRegistration,
} from "@/lib/schemas/registration-booking";

export default function NewRegistrationPage() {
  const router = useRouter();
  const [vehicleFound, setVehicleFound] = useState(false);
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showWorkshopDetails, setShowWorkshopDetails] = useState(false);

  const methods = useForm<NewRegistration>({
    resolver: zodResolver(newRegistrationSchema),
    defaultValues: {
      vehicleRegNumber: "",
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  const handleVehicleSearch = () => {
    const regNumber = watch("vehicleRegNumber");
    if (regNumber) {
      // Simulate vehicle search - in real app, this would call an API
      setVehicleFound(true);
      setShowVehicleDetails(true);
      setShowCustomerDetails(true);
      setShowWorkshopDetails(true);
    }
  };

  const onSubmit = (data: NewRegistration) => {
    console.log("Registration Data:", data);
    // Navigate to booking page
    router.push("/vendor/operations/create-booking");
  };

  // Mock data for dropdowns
  const stateOptions: StateOption[] = [
    { id: "AP", name: "Andhra Pradesh", code: "AP" },
    { id: "TS", name: "Telangana", code: "TS" },
    { id: "KA", name: "Karnataka", code: "KA" },
    { id: "TN", name: "Tamil Nadu", code: "TN" },
    { id: "MH", name: "Maharashtra", code: "MH" },
    { id: "DL", name: "Delhi", code: "DL" },
  ];

  const makeOptions = [
    { id: "toyota", name: "Toyota" },
    { id: "honda", name: "Honda" },
    { id: "ford", name: "Ford" },
    { id: "bmw", name: "BMW" },
  ];

  const bodyTypeOptions = [
    { id: "sedan", name: "Sedan" },
    { id: "suv", name: "SUV" },
    { id: "hatchback", name: "Hatchback" },
    { id: "truck", name: "Truck" },
  ];

  const transmissionOptions = [
    { id: "automatic", name: "Automatic" },
    { id: "manual", name: "Manual" },
  ];

  const fuelTypeOptions = [
    { id: "petrol", name: "Petrol" },
    { id: "diesel", name: "Diesel" },
    { id: "electric", name: "Electric" },
    { id: "hybrid", name: "Hybrid" },
  ];

  const technicianOptions = [
    { id: "peter", name: "Peter" },
    { id: "john", name: "John" },
    { id: "mike", name: "Mike" },
  ];

  const sourceOptions = [
    { id: "walk-in", name: "Walk-In" },
    { id: "online", name: "Online" },
    { id: "referral", name: "Referral" },
  ];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto p-6 space-y-6"
      >
        {/* Vehicle Search Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            New Registration / Find Vehicle
          </h2>

          <div className="flex items-end gap-4">
            <div className="flex-1">
              <RegoInput
                name="vehicleRegNumber"
                stateName="state"
                label="State"
                regoLabel="Rego"
                placeholder="Enter your Reg. Number"
                stateOptions={stateOptions}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Start by searching the vehicle to auto-fill details.
              </p>
            </div>
            <Button
              type="button"
              onClick={handleVehicleSearch}
              variant="primary"
              className="h-[40px]"
            >
              Save Vehicle & Continue
            </Button>
          </div>

          {vehicleFound && (
            <button
              type="button"
              onClick={() => setShowVehicleDetails(!showVehicleDetails)}
              className="text-sm text-blue-600 hover:underline mt-2"
            >
              Vehicle details found
            </button>
          )}
        </div>

        {/* Vehicle Details Section */}
        {showVehicleDetails && (
          <div className="bg-blue-50 rounded-lg border border-blue-100 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Vehicle Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2">
                <RegoInput
                  name="vehicleRegNumber"
                  stateName="state"
                  label="State"
                  regoLabel="Rego"
                  placeholder="Enter your Reg. Number"
                  stateOptions={stateOptions}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle Make <span className="text-red-500">*</span>
                </label>
                <DropDown
                  items={makeOptions}
                  selectedItem={
                    makeOptions.find((m) => m.id === watch("vehicleMake")) ||
                    null
                  }
                  onSelect={(item) => setValue("vehicleMake", item.id)}
                  placeholder="Select"
                />
              </div>
              <CommonTextInput
                name="vehicleModel"
                label="Vehicle Model"
                placeholder="Enter Vehicle Model"
                required
              />

              <CommonTextInput
                name="vehicleModelCode"
                label="Vehicle Model Code"
                placeholder="Enter Vehicle Model"
              />
              <CommonTextInput
                name="vehicleModelSeries"
                label="Vehicle Model Series"
                placeholder="Enter Vehicle Model Series"
              />
              <CommonTextInput name="vin" label="VIN" placeholder="Enter VIN" />
              <CommonTextInput
                name="engineNumber"
                label="Engine Number"
                placeholder="Enter Engine Number"
              />

              <CommonTextInput
                name="chassisNumber"
                label="Chassis Number"
                placeholder="Enter Chassis Number"
              />
              <CommonTextInput
                name="engineCode"
                label="Engine Code"
                placeholder="Engine Code"
              />
              <CommonTextInput
                name="fleetCode"
                label="Fleet Code"
                placeholder="Enter Fleet Code"
              />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Transmission
                </label>
                <DropDown
                  items={transmissionOptions}
                  selectedItem={
                    transmissionOptions.find(
                      (t) => t.id === watch("transmission")
                    ) || null
                  }
                  onSelect={(item) => setValue("transmission", item.id)}
                  placeholder="Select Transmission"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  A/C
                </label>
                <DropDown
                  items={[
                    { id: "yes", name: "Yes" },
                    { id: "no", name: "No" },
                  ]}
                  selectedItem={
                    watch("ac")
                      ? { id: watch("ac")!, name: watch("ac")! }
                      : null
                  }
                  onSelect={(item) => setValue("ac", item.id)}
                  placeholder="Select"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Body Type
                </label>
                <DropDown
                  items={bodyTypeOptions}
                  selectedItem={
                    bodyTypeOptions.find((b) => b.id === watch("bodyType")) ||
                    null
                  }
                  onSelect={(item) => setValue("bodyType", item.id)}
                  placeholder="Select Body Type"
                />
              </div>
              <CommonTextInput
                name="driveType"
                label="Drive Type"
                placeholder="Enter Drive Type"
              />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fuel Type
                </label>
                <DropDown
                  items={fuelTypeOptions}
                  selectedItem={
                    fuelTypeOptions.find((f) => f.id === watch("fuelType")) ||
                    null
                  }
                  onSelect={(item) => setValue("fuelType", item.id)}
                  placeholder="Select Fuel Type"
                />
              </div>

              <DatePicker
                label="Rego Due Date"
                value={watch("regoDueDate") || null}
                onChange={(date) => setValue("regoDueDate", date || undefined)}
                placeholder="Select Date"
              />
              <DatePicker
                label="Build Date"
                value={watch("buildDate") || null}
                onChange={(date) => setValue("buildDate", date || undefined)}
                placeholder="Select Date"
              />
              <DatePicker
                label="Next Service Date"
                value={watch("nextServiceDate") || null}
                onChange={(date) =>
                  setValue("nextServiceDate", date || undefined)
                }
                placeholder="Select Date"
              />
              <CommonTextInput
                name="nextServiceKms"
                label="Next Service - KMS"
                placeholder="Enter KMS"
              />

              <DatePicker
                label="Manufacturing Date"
                value={watch("manufacturingDate") || null}
                onChange={(date) =>
                  setValue("manufacturingDate", date || undefined)
                }
                placeholder="Select Date"
              />
              <CommonTextInput
                name="cylinders"
                label="Cylinders"
                placeholder="Enter"
              />
              <CommonTextInput
                name="tyreSize"
                label="Tyre Size"
                placeholder="Enter"
              />
              <CommonTextInput
                name="importedId"
                label="Imported ID"
                placeholder="Enter ID"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                {...methods.register("notes")}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[80px]"
                placeholder="Enter notes"
              />
            </div>
          </div>
        )}

        {/* Customer Details Section */}
        {showCustomerDetails && (
          <div className="bg-blue-50 rounded-lg border border-blue-100 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Customer Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <DropDown
                  items={[
                    { id: "john-doe", name: "John Doe" },
                    { id: "jane-smith", name: "Jane Smith" },
                  ]}
                  selectedItem={null}
                  onSelect={(item) => setValue("customerName", item.name)}
                  placeholder="Enter Customer Name"
                />
              </div>
              <PhoneInput
                name="mobileNumber"
                label="Mobile Number"
                required
                countryOptions={[
                  { code: "+1", label: "United States", iso: "US" },
                  { code: "+44", label: "United Kingdom", iso: "GB" },
                  { code: "+61", label: "Australia", iso: "AU" },
                  { code: "+91", label: "India", iso: "IN" },
                ]}
              />
              <CommonTextInput
                name="emailId"
                label="Email ID"
                type="email"
                placeholder="Enter Email"
              />

              <CommonTextInput
                name="street"
                label="Street"
                placeholder="Enter Address"
              />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State
                </label>
                <DropDown
                  items={stateOptions}
                  selectedItem={
                    stateOptions.find((s) => s.id === watch("customerState")) ||
                    null
                  }
                  onSelect={(item) => setValue("customerState", item.id)}
                  placeholder="Select State"
                />
              </div>
              <CommonTextInput
                name="country"
                label="Country"
                placeholder="Enter Country"
              />
            </div>
          </div>
        )}

        {/* Workshop & Service Details Section */}
        {showWorkshopDetails && (
          <div className="bg-blue-50 rounded-lg border border-blue-100 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Workshop & Service Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Technician <span className="text-red-500">*</span>
                  <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                    New
                  </span>
                </label>
                <DropDown
                  items={technicianOptions}
                  selectedItem={
                    technicianOptions.find(
                      (t) => t.id === watch("technician")
                    ) || null
                  }
                  onSelect={(item) => setValue("technician", item.id)}
                  placeholder="Select"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Source <span className="text-red-500">*</span>
                </label>
                <DropDown
                  items={sourceOptions}
                  selectedItem={
                    sourceOptions.find((s) => s.id === watch("source")) || null
                  }
                  onSelect={(item) => setValue("source", item.id)}
                  placeholder="Select"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
