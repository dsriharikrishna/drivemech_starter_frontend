"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import PhoneInput from "@/components/forms/PhoneInput";
import { contactDetailsSchema } from "@/schemas/workshop.schema";
import { ContactDetailsFormValues } from "@/types/workshop.types"; // Removed WorkshopSectionProps
import { Info } from "lucide-react";

const ContactDetailsForm = () => {
  const methods = useForm<ContactDetailsFormValues>({
    resolver: zodResolver(contactDetailsSchema),
    defaultValues: {
      primaryContactName: "",
      primaryContactPhone: "",
      primaryContactEmail: "",
      secondaryContactName: "",
      secondaryContactPhone: "",
      secondaryContactEmail: "",
    },
  });

  const onSubmit = (data: ContactDetailsFormValues) => {
    console.log("Contact Details Data:", data);
  };

  const countryOptions = [
    { code: "+91", label: "India", iso: "IN" },
    { code: "+61", label: "Australia", iso: "AU" },
    { code: "+1", label: "USA", iso: "US" },
    { code: "+44", label: "UK", iso: "GB" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            All your account info will be created on your primary account.
          </p>
        </div>

        {/* Contact Person 1 */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Person 1
            </h3>
            <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
              Primary Contact
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CommonTextInput
              name="primaryContactName"
              label="Contact Person Name"
              placeholder="Enter contact person name"
              required
            />
            <PhoneInput
              name="primaryContactPhone"
              label="Phone Number"
              placeholder="XXXXX XXXXX"
              countryOptions={countryOptions}
              required
            />
            <CommonTextInput
              name="primaryContactEmail"
              label="Email"
              placeholder="Enter email address"
              required
            />
          </div>
        </div>

        {/* Contact Person 2 */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Person 2
            </h3>
            <span className="px-2 py-1 text-xs font-medium text-slate-700 bg-slate-200 rounded-full">
              Secondary Contact
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CommonTextInput
              name="secondaryContactName"
              label="Contact Person Name"
              placeholder="Enter contact person name"
            />
            <PhoneInput
              name="secondaryContactPhone"
              label="Phone Number"
              placeholder="XXXXX XXXXX"
              countryOptions={countryOptions}
            />
            <CommonTextInput
              name="secondaryContactEmail"
              label="Email"
              placeholder="Enter email address"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ContactDetailsForm;
