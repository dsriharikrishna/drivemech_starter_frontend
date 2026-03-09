"use client";

import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  customerSchema,
  type CustomerFormValues,
} from "@/schemas/vendor/customer.schema";
import CommonTextInput from "@/components/forms/CommonTextInput";
import DropDown from "@/components/ui/DropDown";
import ToggleSwitch, {
  ControlledToggleSwitch,
} from "@/components/ui/ToggleSwitch";

interface CustomerDetailsFormProps {
  initialData?: Partial<CustomerFormValues>;
  onCancel: () => void;
  onSave: (data: CustomerFormValues) => void;
}

const stateOptions = [
  { id: "NSW", name: "NSW" },
  { id: "VIC", name: "VIC" },
  { id: "QLD", name: "QLD" },
  { id: "SA", name: "SA" },
  { id: "WA", name: "WA" },
  { id: "TAS", name: "TAS" },
];

const countryOptions = [
  { id: "AU", name: "Australia" },
  { id: "IN", name: "India" },
  { id: "US", name: "United States" },
];

const contactMethodOptions = [
  { id: "email", name: "Email" },
  { id: "phone", name: "Phone" },
  { id: "sms", name: "SMS" },
];

const sourceOptions = [
  { id: "website", name: "Website" },
  { id: "referral", name: "Referral" },
  { id: "walkin", name: "Walk-in" },
];

const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({
  initialData,
  onCancel,
  onSave,
}) => {
  const methods = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customerType: initialData?.customerType || "cash",
      customerName: initialData?.customerName || "",
      mobileNumber: initialData?.mobileNumber || "",
      phoneNumber: initialData?.phoneNumber || "",
      email: initialData?.email || "",
      address1: initialData?.address1 || "",
      address2: initialData?.address2 || "",
      suburb: initialData?.suburb || "",
      postcode: initialData?.postcode || "",
      state: initialData?.state || "",
      country: initialData?.country || "",
      importedId: initialData?.importedId || "",
      businessNumber: initialData?.businessNumber || "",
      preferredContactMethod: initialData?.preferredContactMethod || "",
      customerSource: initialData?.customerSource || "",
      salesTaxFree: initialData?.salesTaxFree || false,
      customerLimited: initialData?.customerLimited || false,
      vipCustomer: initialData?.vipCustomer || false,
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  const onSubmit = (data: CustomerFormValues) => {
    onSave(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        {/* Customer Details Header */}
        <div className="bg-blue-50 rounded-lg px-4 py-3">
          <h3 className="text-base font-medium text-gray-900">
            Customer Details
          </h3>
        </div>

        {/* Customer Type Toggles */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Cash
            </label>
            <Controller
              name="customerType"
              control={methods.control}
              render={({ field }) => (
                <ToggleSwitch
                  checked={field.value === "cash"}
                  onChange={(checked) => {
                    if (checked) field.onChange("cash");
                  }}
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Company/Individual
            </label>
            <Controller
              name="customerType"
              control={methods.control}
              render={({ field }) => (
                <ToggleSwitch
                  checked={field.value === "company"}
                  onChange={(checked) => {
                    if (checked) field.onChange("company");
                  }}
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Non-Biller
            </label>
            <Controller
              name="customerType"
              control={methods.control}
              render={({ field }) => (
                <ToggleSwitch
                  checked={field.value === "nonBiller"}
                  onChange={(checked) => {
                    if (checked) field.onChange("nonBiller");
                  }}
                />
              )}
            />
          </div>
        </div>

        {/* Row 1: Contact Information */}
        <div className="grid grid-cols-4 gap-4">
          <CommonTextInput
            name="customerName"
            label="Customer Name"
            placeholder="Enter Contact Name"
            required
          />
          <CommonTextInput
            name="mobileNumber"
            label="Mobile Number"
            placeholder="+91 XXXXX XXXXX"
            required
          />
          <CommonTextInput
            name="phoneNumber"
            label="Phone Number"
            placeholder="+91 XXXXX XXXXX"
          />
          <CommonTextInput
            name="email"
            label="Email"
            placeholder="Enter Email"
          />
        </div>

        {/* Row 2: Address */}
        <div className="grid grid-cols-4 gap-4">
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

        {/* Row 3: Location & Business */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              State
            </label>
            <DropDown
              items={stateOptions}
              selectedItem={
                stateOptions.find((s) => s.id === watch("state")) || null
              }
              onSelect={(item) => setValue("state", item.id)}
              placeholder="Select State"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Country
            </label>
            <DropDown
              items={countryOptions}
              selectedItem={
                countryOptions.find((c) => c.id === watch("country")) || null
              }
              onSelect={(item) => setValue("country", item.id)}
              placeholder="Select Country"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Preferred Contact Method
            </label>
            <DropDown
              items={contactMethodOptions}
              selectedItem={
                contactMethodOptions.find(
                  (m) => m.id === watch("preferredContactMethod")
                ) || null
              }
              onSelect={(item) => setValue("preferredContactMethod", item.id)}
              placeholder="Select"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Customer Source
            </label>
            <DropDown
              items={sourceOptions}
              selectedItem={
                sourceOptions.find((s) => s.id === watch("customerSource")) ||
                null
              }
              onSelect={(item) => setValue("customerSource", item.id)}
              placeholder="Select Source"
            />
          </div>
        </div>

        {/* Row 4: Business Information */}
        <div className="grid grid-cols-2 gap-4">
          <CommonTextInput
            name="importedId"
            label="Imported ID"
            placeholder="Enter ID"
          />
          <CommonTextInput
            name="businessNumber"
            label="Business Number"
            placeholder="Enter number"
          />
        </div>

        {/* Row 5: Toggles */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Sales Tax Free
            </label>
            <ControlledToggleSwitch name="salesTaxFree" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Customer Limited
            </label>
            <ControlledToggleSwitch name="customerLimited" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              VIP Customer
            </label>
            <ControlledToggleSwitch name="vipCustomer" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CustomerDetailsForm;
