"use client";

import React, { useCallback, useState } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Truck, Car, Bus, Info, X, Upload, Plus, Bike } from "lucide-react";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import DocumentUpload from "@/components/forms/DocumentUpload";
import Button from "@/components/ui/Button";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import DropDown from "@/components/ui/DropDown";

const TowingServiceDetails = () => {
  const methods = useFormContext();

  // Use useFieldArray for drivers
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "drivers",
  });

  const vehicleTypes: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }> = [
    { id: "2-wheeler", label: "2-Wheeler", icon: Bike },
    { id: "4-wheeler", label: "4-Wheeler", icon: Car },
    { id: "heavy", label: "Heavy Vehicle", icon: Truck },
    { id: "commercial", label: "Commercial Vehicle", icon: Bus },
  ];

  const experienceOptions = [
    { id: "1", name: "1 year" },
    { id: "2", name: "2 years" },
    { id: "3", name: "3 years" },
    { id: "4", name: "4 years" },
    { id: "5", name: "5 years" },
    { id: "6-10", name: "6-10 years" },
    { id: "10+", name: "10+ years" },
  ];

  const selectedTypes = methods.watch("towingServices.vehicleTypes") || [];
  const is24x7 = methods.watch("towingServices.is24x7") || false;

  // Pricing Watchers for Calculation
  const baseCharge = parseFloat(
    methods.watch("towingServices.baseCharge") || "0"
  );
  const perKmCharge = parseFloat(
    methods.watch("towingServices.perKmCharge") || "0"
  );
  const mockDistance = 15;
  const estimatedTotal = baseCharge + perKmCharge * mockDistance;

  // Handler Functions
  const handleFileUpload = (
    index: number,
    fileType: "photo" | "license",
    file: File
  ) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      methods.setValue(`drivers.${index}.${fileType}`, file);
      methods.setValue(
        `drivers.${index}.${fileType}Preview`,
        reader.result as string
      );
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, index: number, fileType: "photo" | "license") => {
      e.preventDefault();
      e.stopPropagation();
      const files = e.dataTransfer.files;
      if (files && files[0]) {
        handleFileUpload(index, fileType, files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleFileInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
      fileType: "photo" | "license"
    ) => {
      const files = e.target.files;
      if (files && files[0]) {
        handleFileUpload(index, fileType, files[0]);
      }
    },
    [handleFileUpload]
  );

  const removeFile = useCallback(
    (index: number, fileType: "photo" | "license") => {
      methods.setValue(`drivers.${index}.${fileType}`, null);
      methods.setValue(`drivers.${index}.${fileType}Preview`, null);
    },
    [methods]
  );

  const addDriver = useCallback(() => {
    append({
      id: `driver-${fields.length + 1}`,
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
    });
  }, [append]);

  const removeDriver = useCallback(
    (index: number) => {
      if (fields.length > 1) {
        remove(index);
      }
    },
    [fields]
  );

  const toggleVehicleType = useCallback(
    (typeId: string) => {
      const current = methods.getValues("towingServices.vehicleTypes") || [];
      const updated = current.includes(typeId)
        ? current.filter((id: string) => id !== typeId)
        : [...current, typeId];
      methods.setValue("towingServices.vehicleTypes", updated);
    },
    [methods]
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Service Details Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Truck size={18} className="text-gray-900" />
          <h4 className="text-base font-semibold text-gray-900">
            Service Details
          </h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Specify your service area and vehicle types supported
        </p>

        <div className="space-y-6">
          <CommonTextInput
            name="towingServices.serviceLocations"
            label="Service Area (Cities/Postcodes)"
            placeholder="Enter Service Area (e.g., Hyderabad, Chennai, 500001, 500002)"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Vehicle Types Supported
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vehicleTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => toggleVehicleType(type.id)}
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                    selectedTypes.includes(type.id)
                      ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <type.icon
                    size={24}
                    className={
                      selectedTypes.includes(type.id)
                        ? "text-orange-500"
                        : "text-gray-600"
                    }
                  />
                  <span
                    className={`text-sm font-medium ${
                      selectedTypes.includes(type.id)
                        ? "text-gray-900"
                        : "text-gray-600"
                    }`}
                  >
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 24/7 Available Toggle */}
          <div
            className={`p-4 rounded-lg border transition-colors ${
              is24x7
                ? "bg-green-50 border-green-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <ToggleSwitch
              checked={is24x7}
              onChange={(value) =>
                methods.setValue("towingServices.is24x7", value)
              }
              label="24/7 Available"
              description="Are you available round the clock?"
              variant="success"
              size="md"
            />
          </div>

          {/* Service Description */}
          <CommonTextArea
            name="towingServices.description"
            label="Service Description"
            placeholder="Tell us about your towing services, special features, etc."
            rows={4}
          />
        </div>
      </div>

      {/* Pricing Information Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Truck size={18} className="text-gray-900" />
          <h4 className="text-base font-semibold text-gray-900">
            Pricing Information
          </h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">Set your service charges</p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CommonTextInput
              name="towingServices.baseCharge"
              label="Base Charge"
              placeholder="100.00"
              type="number"
              required
            />
            <CommonTextInput
              name="towingServices.perKmCharge"
              label="Towing Charges (per KM)"
              placeholder="10.00"
              type="number"
              required
            />
            <CommonTextInput
              name="towingServices.minDistance"
              label="Min Distance (KM)"
              placeholder="5 KM"
              type="number"
            />
            <CommonTextInput
              name="towingServices.waitingCharge"
              label="Waiting Charges ($/hr)"
              placeholder="10.00"
              type="number"
            />
          </div>

          {/* Calculation Example */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
            <p className="text-sm text-gray-800 font-medium">
              <span className="font-bold">Example Calculation:</span> Base ₹
              {baseCharge || 0} + ({perKmCharge || 0} × {mockDistance} km) = ₹
              {estimatedTotal || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Driver Details Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Car size={18} className="text-gray-900" />
          <h4 className="text-base font-semibold text-gray-900">
            Driver Details
          </h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Add details of your towing drivers. You can add multiple drivers.
        </p>

        <div className="space-y-6">
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Add details of all your towing drivers. You can add multiple
              drivers.
            </p>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-gray-200 rounded-lg p-6 bg-gray-50 relative"
            >
              {/* Remove Driver Button */}
              {fields.length > 1 && (
                <div className="absolute top-4 right-4">
                  <Button
                    variant="icon-delete"
                    size="sm"
                    onClick={() => removeDriver(index)}
                    title="Remove driver"
                    startIcon={<X size={18} />}
                  />
                </div>
              )}

              <h5 className="font-semibold text-gray-900 mb-4">
                Driver #{index + 1}
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CommonTextInput
                  name={`drivers.${index}.name`}
                  label="Driver Name"
                  placeholder="Enter Driver Full Name"
                  type="text"
                  required
                />

                <CommonTextInput
                  name={`drivers.${index}.mobile`}
                  label="Mobile Number"
                  placeholder="+91 X XX XX XX XX"
                  type="tel"
                  required
                />

                <CommonTextInput
                  name={`drivers.${index}.email`}
                  label="Email"
                  placeholder="Enter email"
                  type="email"
                  required
                />

                <CommonTextInput
                  name={`drivers.${index}.licenseNumber`}
                  label="Licence Number"
                  placeholder="Enter licence number"
                  required
                />

                <Controller
                  name={`drivers.${index}.experience`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <DropDown
                      items={experienceOptions}
                      selectedItem={
                        experienceOptions.find(
                          (opt) =>
                            opt.id ===
                            methods.watch(`drivers.${index}.experience`)
                        ) || null
                      }
                      onSelect={(item) => field.onChange(item.id)}
                      label="Years of Experience"
                      placeholder="Select experience"
                      error={error?.message}
                      required
                    />
                  )}
                />

                <CommonTextInput
                  name={`drivers.${index}.emergencyContact`}
                  label="Emergency Contact Number"
                  placeholder="Enter emergency contact number"
                  type="tel"
                  required
                />
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Driver Photo Upload */}
                <DocumentUpload
                  label="Driver Photo"
                  accept="image/*"
                  file={methods.watch(`drivers.${index}.photo`)}
                  preview={methods.watch(`drivers.${index}.photoPreview`)}
                  onFileSelect={(file) =>
                    handleFileUpload(index, "photo", file)
                  }
                  onFileRemove={() => removeFile(index, "photo")}
                  placeholder="Upload driver photo"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index, "photo")}
                />

                {/* License Documents Upload */}
                <DocumentUpload
                  label="Licence Documents"
                  accept="image/*,application/pdf"
                  file={methods.watch(`drivers.${index}.license`)}
                  preview={methods.watch(`drivers.${index}.licensePreview`)}
                  onFileSelect={(file) =>
                    handleFileUpload(index, "license", file)
                  }
                  onFileRemove={() => removeFile(index, "license")}
                  placeholder="Upload driving license"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index, "license")}
                />
              </div>

              {/* Available 24/7 Checkbox */}
              <div className="mt-4">
                <ToggleSwitch
                  checked={
                    methods.watch(`drivers.${index}.available24x7`) || false
                  }
                  onChange={(value) =>
                    methods.setValue(`drivers.${index}.available24x7`, value)
                  }
                  label="Available 24/7"
                  variant="success"
                  size="sm"
                />
              </div>
            </div>
          ))}

          {/* Add Another Driver Button */}
          <Button
            size="md"
            onClick={addDriver}
            startIcon={<Plus className="w-4 h-4" />}
            variant="outline"
            className="text-primary-500 border-primary-500"
          >
            Add another driver
          </Button>
        </div>
      </div>

      {/* Pricing Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-semibold text-blue-900 mb-2">
              Pricing Tips
            </h5>
            <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
              <li>Consider different rates for different vehicle types</li>
              <li>Factor in fuel costs and equipment maintenance</li>
              <li>You can always update pricing later from your dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TowingServiceDetails;
