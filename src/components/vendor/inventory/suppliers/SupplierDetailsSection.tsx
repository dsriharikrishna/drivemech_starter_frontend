"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import DropDown from "@/components/ui/DropDown";
import PhoneInput from "@/components/forms/PhoneInput";
import {
  supplierDetailsSchema,
  type SupplierDetailsFormValues,
} from "@/schemas/vendor/supplier.schema";
import Button from "@/components/ui/Button";

const stateOptions = [
  { id: "1", name: "Select" },
  { id: "2", name: "California" },
  { id: "3", name: "Texas" },
  { id: "4", name: "New York" },
];

const countryOptions = [
  { id: "1", name: "Select" },
  { id: "2", name: "United States" },
  { id: "3", name: "Canada" },
  { id: "4", name: "India" },
];

const phoneCountryOptions = [
  { code: "+91", label: "India", iso: "IN" },
  { code: "+1", label: "United States", iso: "US" },
];

const SupplierDetailsSection = () => {
  const methods = useForm<SupplierDetailsFormValues>({
    resolver: zodResolver(supplierDetailsSchema),
    defaultValues: {
      companyName: "",
      biller: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      countryCode: "",
      phone: "",
      cell: "",
      fax: "",
      email: "",
      accountNumber: "",
      importedId: "",
      note: "",
      contactPerson1Name: "",
      contactPerson1Phone: "",
      contactPerson1Email: "",
      contactPerson2Name: "",
      contactPerson2Phone: "",
      contactPerson2Email: "",
    },
  });

  const { handleSubmit, setValue, watch } = methods;

  const selectedState = watch("state");
  const selectedCountryCode = watch("countryCode");

  const onSubmit = (data: SupplierDetailsFormValues) => {
    console.log("Supplier Details:", data);
    // Handle form submission
  };

  const handleCancel = () => {
    methods.reset();
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this supplier?")) {
      // Handle delete
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Main Details Grid */}
        <div className="grid grid-cols-4 gap-4">
          <CommonTextInput
            name="companyName"
            label="Company Name"
            placeholder="Enter Company Name"
            required
          />
          <CommonTextInput name="biller" label="Biller" placeholder="" />
          <CommonTextInput name="address1" label="Address 1" placeholder="" />
          <CommonTextInput name="address2" label="Address 2" placeholder="" />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <CommonTextInput name="city" label="City" placeholder="" />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State
            </label>
            <DropDown
              items={stateOptions}
              selectedItem={
                stateOptions.find((s) => s.id === selectedState) || null
              }
              onSelect={(item) => setValue("state", item.id)}
              placeholder="Select"
            />
          </div>
          <CommonTextInput
            name="postalCode"
            label="Postal code"
            placeholder=""
          />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Country Code
            </label>
            <DropDown
              items={countryOptions}
              selectedItem={
                countryOptions.find((c) => c.id === selectedCountryCode) || null
              }
              onSelect={(item) => setValue("countryCode", item.id)}
              placeholder="Select"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <CommonTextInput name="phone" label="Phone" placeholder="" />
          <CommonTextInput name="cell" label="Cell" placeholder="" />
          <CommonTextInput name="fax" label="Fax" placeholder="" />
          <CommonTextInput
            name="email"
            label="Email"
            placeholder=""
            type="email"
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <CommonTextInput
            name="accountNumber"
            label="Account Number"
            placeholder=""
          />
          <CommonTextInput
            name="importedId"
            label="Imported ID"
            placeholder=""
          />
          <CommonTextInput
            name="countryCode"
            label="Country Code"
            placeholder=""
          />
        </div>

        <div>
          <CommonTextArea name="note" label="Note" placeholder="" rows={3} />
        </div>

        {/* Contact Person 1 */}
        <div className="border border-gray-200 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Contact Person 1
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <CommonTextInput
              name="contactPerson1Name"
              label="Contact Person Name"
              placeholder="Enter contact person name"
            />
            <PhoneInput
              name="contactPerson1Phone"
              label="Phone Number"
              placeholder="XXXXX XXXXX"
              countryOptions={phoneCountryOptions}
            />
            <CommonTextInput
              name="contactPerson1Email"
              label="Email"
              placeholder="Enter email address"
              type="email"
            />
          </div>
        </div>

        {/* Contact Person 2 */}
        <div className="border border-gray-200 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Contact Person 2
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <CommonTextInput
              name="contactPerson2Name"
              label="Contact Person Name"
              placeholder="Enter contact person name"
            />
            <PhoneInput
              name="contactPerson2Phone"
              label="Phone Number"
              placeholder="XXXXX XXXXX"
              countryOptions={phoneCountryOptions}
            />
            <CommonTextInput
              name="contactPerson2Email"
              label="Email"
              placeholder="Enter email address"
              type="email"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between px-4">
          <div className="flex-1 flex items-center gap-3">
            <Button
              type="button"
              variant="danger"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="custom"
              className="bg-white hover:bg-red-50 text-red-500 border border-red-500"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-end">
            <Button
              type="submit"
              variant="success"
              size="md"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default SupplierDetailsSection;
