"use client";

import { useForm, FormProvider, Controller } from "react-hook-form";
import React, { useState } from "react";
import { ClipboardCheck, MapPin, Search } from "lucide-react";

import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import ModalDropdown from "@/components/ui/DropDown";
import DatePicker from "@/components/ui/DatePicker";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";
import RegoInput from "@/components/forms/RegoInput";
import PhoneInput from "@/components/forms/PhoneInput";

const InspectionsLayout = () => {
  const countryOptions = [
    { code: "+91", label: "India", iso: "IN" },
    { code: "+1", label: "USA", iso: "US" },
    { code: "+61", label: "Australia", iso: "AU" },
  ];

  // Form Setup
  const methods = useForm({
    defaultValues: {
      // Customer Details
      isCash: false,
      isCompany: false,
      isNonBiller: false,
      customerName: "",
      mobileNumber: "",
      phoneNumber: "",
      email: "",
      address1: "",
      address2: "",
      suburb: "",
      postcode: "",
      state: null,
      country: null,
      contactMethod: null,
      customerSource: null,
      importedId: null,
      businessNumber: "",
      isSalesTaxFree: false,
      isCustomerLimited: false,
      isVip: false,

      // Vehicle Details
      vehicleState: null,
      rego: "",
      vehicleMake: null,
      vehicleModel: null,
      vehicleModelCode: "",
      vehicleModelSeries: "",
      manufacturingDate: null,
      cylinders: "",
      transmission: null,
      transmission2: null,
      vin: "",
      engineNumber: "",
      chassisNumber: "",
      engineCode: "",
      fleetCode: "",
      ac: false,
      bodyType: null,
      driveType: "",
      fuelType: null,
      vehicleImportedId: "",
      regoDueDate: null,
      buildDate: null,
      nextServiceDate: null,
      nextServiceKms: "",
      tyreSize: "",

      // Inspection Details
      reasonForInspection: "",
      preferredDate: null,
      location: "",
      notes: "",
    },
  });

  const { control, handleSubmit } = methods;

  const [expandedSection, setExpandedSection] = useState<string | null>(
    "customer"
  );

  const handleToggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full bg-white p-4 overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-[#E7F0FF] p-4 rounded-xl border border-blue-100 mb-3 flex items-center gap-3">
          <div className="bg-blue-500 rounded-lg p-2 text-white shadow-sm">
            <Search className="w-4 h-4" />
          </div>
          <h1 className="text-lg font-semibold text-gray-800">Inspections</h1>
        </div>

        <div className="space-y-4 pb-20">
          {/* Customer Details */}
          <Accordion
            title="Customer Details"
            icon={<ClipboardCheck size={18} className="text-gray-500" />}
            isExpanded={expandedSection === "customer"}
            onToggle={() => handleToggle("customer")}
            className="border-none shadow-sm mb-4"
            headerClassName="bg-[#eff6ff] hover:bg-blue-100 text-gray-900 rounded-lg"
          >
            <div className="space-y-6">
              {/* Toggles Row */}
              <div className="flex flex-wrap gap-8 px-1">
                <div className="flex items-center gap-3">
                  <ControlledToggleSwitch
                    name="isCash"
                    size="md"
                    color="blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Cash
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ControlledToggleSwitch
                    name="isCompany"
                    size="md"
                    color="blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Company/Individual
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ControlledToggleSwitch
                    name="isNonBiller"
                    size="md"
                    color="blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Non-Biller
                  </span>
                </div>
              </div>

              {/* Grid 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CommonTextInput
                  name="customerName"
                  label="Customer Name"
                  required
                  placeholder="Enter Contact Name"
                />
                <PhoneInput
                  name="mobileNumber"
                  label="Mobile Number"
                  countryOptions={countryOptions}
                  required
                />
                <PhoneInput
                  name="phoneNumber"
                  label="Phone Number"
                  countryOptions={countryOptions}
                />
                <CommonTextInput
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                />
              </div>

              {/* Grid 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CommonTextInput
                  name="address1"
                  label="Address 1"
                  placeholder="Enter Address"
                />
                <CommonTextInput
                  name="address2"
                  label="Address 2"
                  placeholder="Enter Address"
                />
                <CommonTextInput
                  name="suburb"
                  label="Suburb"
                  placeholder="Enter Suburb"
                />
                <CommonTextInput
                  name="postcode"
                  label="Postcode"
                  placeholder="Enter Postcode"
                />
              </div>

              {/* Grid 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <ModalDropdown
                      label="State"
                      items={[
                        { id: "ap", name: "Andhra Pradesh" },
                        { id: "ts", name: "Telangana" },
                      ]}
                      selectedItem={field.value}
                      onSelect={field.onChange}
                      placeholder="Select State"
                    />
                  )}
                />
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <ModalDropdown
                      label="Country"
                      items={[{ id: "in", name: "India" }]}
                      selectedItem={field.value}
                      onSelect={field.onChange}
                      placeholder="Select Country"
                    />
                  )}
                />
                <Controller
                  name="contactMethod"
                  control={control}
                  render={({ field }) => (
                    <ModalDropdown
                      label="Preferred Contact Method"
                      items={[
                        { id: "email", name: "Email" },
                        { id: "phone", name: "Phone" },
                      ]}
                      selectedItem={field.value}
                      onSelect={field.onChange}
                      placeholder="Select"
                    />
                  )}
                />
                <Controller
                  name="customerSource"
                  control={control}
                  render={({ field }) => (
                    <ModalDropdown
                      label="Customer Source"
                      items={[
                        { id: "google", name: "Google" },
                        { id: "referral", name: "Referral" },
                      ]}
                      selectedItem={field.value}
                      onSelect={field.onChange}
                      placeholder="Select Source"
                    />
                  )}
                />
              </div>

              {/* Grid 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <Controller
                  name="importedId"
                  control={control}
                  render={({ field }) => (
                    <ModalDropdown
                      label="Imported ID"
                      items={[]}
                      selectedItem={field.value}
                      onSelect={field.onChange}
                      placeholder="Enter ID"
                    />
                  )}
                />
                <CommonTextInput
                  name="businessNumber"
                  label="Business Number"
                  placeholder="Enter number"
                />

                <div className="mb-2">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Sales Tax Free
                  </p>
                  <ControlledToggleSwitch
                    name="isSalesTaxFree"
                    size="md"
                    color="gray-400"
                  />
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Customer Limited
                  </p>
                  <ControlledToggleSwitch
                    name="isCustomerLimited"
                    size="md"
                    color="gray-400"
                  />
                </div>
              </div>

              {/* VIP */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  VIP Customer
                </p>
                <ControlledToggleSwitch
                  name="isVip"
                  size="md"
                  color="gray-400"
                />
              </div>
            </div>
          </Accordion>

          {/* Vehicle Details */}
          <Accordion
            title="Vehicle Details"
            icon={<ClipboardCheck size={18} className="text-gray-500" />}
            isExpanded={expandedSection === "vehicle"}
            onToggle={() => handleToggle("vehicle")}
            className="border-none shadow-sm mb-4"
            headerClassName="bg-[#eff6ff] hover:bg-blue-100 text-gray-900 rounded-lg"
          >
            <div className="space-y-6">
              {/* Grid 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <RegoInput
                  name="rego"
                  stateName="vehicleState"
                  stateOptions={[
                    { id: "ap", name: "Andhra Pradesh", code: "AP" },
                    { id: "ts", name: "Telangana", code: "TS" },
                    { id: "ka", name: "Karnataka", code: "KA" },
                    { id: "tn", name: "Tamil Nadu", code: "TN" },
                    { id: "mh", name: "Maharashtra", code: "MH" },
                    { id: "dl", name: "Delhi", code: "DL" },
                  ]}
                  required
                />

                <Controller
                  name="vehicleMake"
                  control={control}
                  render={({ field }) => (
                    <ModalDropdown
                      label="Vehicle Make"
                      items={[{ id: "toyota", name: "Toyota" }]}
                      selectedItem={field.value}
                      onSelect={field.onChange}
                      placeholder="Select"
                      required
                    />
                  )}
                />
                <Controller
                  name="vehicleModel"
                  control={control}
                  render={({ field }) => (
                    <ModalDropdown
                      label="Vehicle Model *"
                      items={[{ id: "camry", name: "Camry" }]}
                      selectedItem={field.value}
                      onSelect={field.onChange}
                      placeholder="Enter Vehicle Model"
                      required
                    />
                  )}
                />
              </div>

              {/* Grid 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <Controller
                  name="manufacturingDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Manufacturing Date"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Date"
                    />
                  )}
                />
              </div>

              {/* Grid 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CommonTextInput
                  name="cylinders"
                  label="Cylinders"
                  placeholder=""
                />
                <Controller
                  name="transmission"
                  control={control}
                  render={({ field }) => (
                    <ModalDropdown
                      label="Transmission"
                      items={[{ id: "auto", name: "Automatic" }]}
                      selectedItem={field.value}
                      onSelect={field.onChange}
                      placeholder="Select Transmission"
                    />
                  )}
                />
                <CommonTextInput
                  name="vin"
                  label="VIN"
                  placeholder="Enter VIN"
                />
              </div>

              {/* Grid 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              </div>

              {/* Grid 5 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                <CommonTextInput
                  name="fleetCode"
                  label="Fleet Code"
                  placeholder="Fleet Code"
                />
                <Controller
                  name="transmission2" 
                  control={control}
                  render={({ field }) => (
                    <ModalDropdown
                      label="Transmission"
                      items={[]}
                      selectedItem={field.value}
                      onSelect={field.onChange}
                      placeholder="Select Transmission"
                    />
                  )}
                />
                <div className="mb-2">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    A/C
                  </p>
                  <ControlledToggleSwitch
                    name="ac"
                    size="md"
                    color="gray-400"
                  />
                </div>
              </div>

              {/* Grid 6 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Controller
                  name="bodyType"
                  control={control}
                  render={({ field }) => (
                    <ModalDropdown
                      label="Body Type"
                      items={[]}
                      selectedItem={field.value}
                      onSelect={field.onChange}
                      placeholder="Select Body Type"
                    />
                  )}
                />
                <CommonTextInput
                  name="driveType"
                  label="Drive Type"
                  placeholder="Enter Drive Type"
                />
                <Controller
                  name="fuelType"
                  control={control}
                  render={({ field }) => (
                    <ModalDropdown
                      label="Fuel Type"
                      items={[]}
                      selectedItem={field.value}
                      onSelect={field.onChange}
                      placeholder="Select Fuel Type"
                    />
                  )}
                />
              </div>

              {/* Grid 7 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CommonTextInput
                  name="vehicleImportedId"
                  label="Imported ID"
                  placeholder="Enter ID"
                />
                <Controller
                  name="regoDueDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Rego Due Date"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Date"
                    />
                  )}
                />
                <Controller
                  name="buildDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Build Date"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Date"
                    />
                  )}
                />
              </div>

              {/* Grid 8 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Controller
                  name="nextServiceDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Next Service Date"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Date"
                    />
                  )}
                />
                <CommonTextInput
                  name="nextServiceKms"
                  label="Next Service - KMS"
                  placeholder="Enter KMS"
                />
                <CommonTextInput
                  name="tyreSize"
                  label="Tyre Size"
                  placeholder=""
                />
              </div>
            </div>
          </Accordion>

          {/* Inspection Details */}
          <Accordion
            title="Inspection Details"
            icon={<ClipboardCheck size={18} className="text-gray-500" />}
            isExpanded={expandedSection === "inspection"}
            onToggle={() => handleToggle("inspection")}
            className="border-none shadow-sm mb-4"
            headerClassName="bg-[#eff6ff] hover:bg-blue-100 text-gray-900 rounded-lg"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CommonTextInput
                  name="reasonForInspection"
                  label="Reason for Inspection"
                  placeholder="Write reason for the inspection"
                />
                <Controller
                  name="preferredDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Preferred Inspection Date & Time"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Date & Time"
                    />
                  )}
                />
                <CommonTextInput
                  name="location"
                  label="Inspection Location"
                  placeholder="Enter Location"
                  icon={<MapPin className="text-gray-400 w-4 h-4" />}
                />
              </div>

              <CommonTextArea
                name="notes"
                label="Inspection Notes"
                placeholder="Type your inspection notes here..."
                className="min-h-[100px]"
              />
            </div>
          </Accordion>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-4">
          <Button type="button" variant="danger" className="w-32">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="w-32 bg-orange-500 hover:bg-orange-600 border-orange-500"
          >
            Save
          </Button>
        </div>

      </form>
    </FormProvider>
  );
};

export default InspectionsLayout;
