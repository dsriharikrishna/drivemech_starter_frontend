"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import PhoneInput from "@/components/forms/PhoneInput";
import {
  basicInfoSchema,
  contactDetailsSchema,
} from "@/schemas/workshop.schema";
import type {
  BasicInfoFormValues,
  ContactDetailsFormValues,
} from "@/types/workshop.types";
import ManageWorkshopHeader from "../ManageWorkshopHeader";
import { Info, Plus } from "lucide-react";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";

interface BranchFormValues {
  branches: {
    name: string;
    representative: string;
    address: string;
    postcode: string;
    landmark: string;
    city: string;
    state: string;
    country: string;
  }[];
}

const BasicInfoForm = () => {
  const businessMethods = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      workshopName: "DriveMech Auto Services",
      abn: "12 345 678 901",
      email: "info@drivemech.com",
      phone: "+61 400 000 000",
      website: "www.drivemech.com",
      description: "Professional automotive repair and maintenance services",
    },
  });

  const [isBusinessEditing, setIsBusinessEditing] = React.useState(false);
  const [isBranchEditing, setIsBranchEditing] = React.useState(false);
  const [isContactEditing, setIsContactEditing] = React.useState(false);

  const onBusinessSubmit = (data: BasicInfoFormValues) => {
    console.log("Basic Info:", data);
    setIsBusinessEditing(false);
  };

  const branchMethods = useForm<BranchFormValues>({
    defaultValues: {
      branches: [
        {
          name: "Main Branch",
          representative: "",
          address: "1-2-345, Abc Street",
          postcode: "900000",
          landmark: "",
          city: "Hyderabad",
          state: "Telangana",
          country: "India",
        },
      ],
    },
  });

  const onBranchSubmit = (data: BranchFormValues) => {
    console.log("Branch Locations:", data);
    setIsBranchEditing(false);
  };

  const contactMethods = useForm<ContactDetailsFormValues>({
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

  const onContactSubmit = (data: ContactDetailsFormValues) => {
    console.log("Contact Details:", data);
    setIsContactEditing(false);
  };

  const countryOptions = [
    { code: "+91", label: "India", iso: "IN" },
    { code: "+61", label: "Australia", iso: "AU" },
    { code: "+1", label: "USA", iso: "US" },
    { code: "+44", label: "UK", iso: "GB" },
  ];

  const handleAddBranch = () => {
    const allValues = {
      businessInfo: businessMethods.getValues(),
      branchLocations: branchMethods.getValues(),
      contactDetails: contactMethods.getValues(),
    };
    console.log("ALL FORM VALUES:", allValues);
  };

  return (
    <div className="space-y-8">
      <FormProvider {...businessMethods}>
        <div>
          <ManageWorkshopHeader
            title="Business Information"
            editButtonLabel={isBusinessEditing ? "Save" : "Edit"}
            editButtonAction={() => {
              if (isBusinessEditing) {
                businessMethods.handleSubmit(onBusinessSubmit)();
              } else {
                setIsBusinessEditing(true);
              }
            }}
          />
          <form
            onSubmit={businessMethods.handleSubmit(onBusinessSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CommonTextInput
                name="workshopName"
                label="Company Name"
                placeholder="Enter company name"
                required
                disabled={!isBusinessEditing}
              />
              <CommonTextInput
                name="phone"
                label="Representative Name"
                placeholder="Enter representative name"
                required
                disabled={!isBusinessEditing}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CommonTextInput
                name="abn"
                label="Tax Identification Number"
                placeholder="Enter tax ID"
                required
                disabled={!isBusinessEditing}
              />
              <CommonTextInput
                name="abn"
                label="Business License Number"
                placeholder="Enter license number"
                required
                disabled={!isBusinessEditing}
              />
            </div>

            <CommonTextInput
              name="address"
              label="Business Address"
              placeholder="Enter address"
              required
              disabled={!isBusinessEditing}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CommonTextInput
                name="postcode"
                label="Post Code"
                placeholder="Enter postcode"
                required
                disabled={!isBusinessEditing}
              />
              <CommonTextInput
                name="city"
                label="City"
                placeholder="Enter city"
                required
                disabled={!isBusinessEditing}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CommonTextInput
                name="state"
                label="State"
                placeholder="Select state"
                required
                disabled={!isBusinessEditing}
              />
              <CommonTextInput
                name="country"
                label="Country"
                placeholder="Select country"
                required
                disabled={!isBusinessEditing}
              />
            </div>
          </form>
        </div>
      </FormProvider>

      <Divider />

      <FormProvider {...branchMethods}>
        <div>
          <ManageWorkshopHeader
            title="Branch Locations"
            editButtonLabel={isBranchEditing ? "Save" : "Edit"}
            editButtonAction={() => {
              if (isBranchEditing) {
                branchMethods.handleSubmit(onBranchSubmit)();
              } else {
                setIsBranchEditing(true);
              }
            }}
          />
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-900">Branch 1</span>
                <span className="px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                  Main Branch
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CommonTextInput
                  name="branches.0.name"
                  label="Branch Name"
                  placeholder="Enter Branch Name"
                  disabled={!isBranchEditing}
                />
                <CommonTextInput
                  name="branches.0.representative"
                  label="Representative Name"
                  placeholder="Enter name of representative"
                  disabled={!isBranchEditing}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CommonTextInput
                  name="branches.0.address"
                  label="Business Address"
                  placeholder="Enter address"
                  disabled={!isBranchEditing}
                />
                <CommonTextInput
                  name="branches.0.postcode"
                  label="Post Code"
                  placeholder="Enter postcode"
                  disabled={!isBranchEditing}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CommonTextInput
                  name="branches.0.landmark"
                  label="Landmark (Optional)"
                  placeholder="Enter landmark"
                  disabled={!isBranchEditing}
                />
                <CommonTextInput
                  name="branches.0.city"
                  label="City"
                  placeholder="Enter City"
                  disabled={!isBranchEditing}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CommonTextInput
                  name="branches.0.state"
                  label="State"
                  placeholder="Select State"
                  disabled={!isBranchEditing}
                />
                <CommonTextInput
                  name="branches.0.country"
                  label="Country"
                  placeholder="Select Country"
                  disabled={!isBranchEditing}
                />
              </div>
            </div>
          </form>
        </div>
      </FormProvider>

      <Divider />

      <FormProvider {...contactMethods}>
        <div>
          <ManageWorkshopHeader
            title="Contact Details"
            editButtonLabel={isContactEditing ? "Save" : "Edit"}
            editButtonAction={() => {
              if (isContactEditing) {
                contactMethods.handleSubmit(onContactSubmit)();
              } else {
                setIsContactEditing(true);
              }
            }}
          />
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 mb-6">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              All your account info will be created on your primary account.
            </p>
          </div>

          <form className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-semibold text-gray-900">
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
                  disabled={!isContactEditing}
                />
                <PhoneInput
                  name="primaryContactPhone"
                  label="Phone Number"
                  placeholder="XXXXX XXXXX"
                  countryOptions={countryOptions}
                  required
                  disabled={!isContactEditing}
                />
                <CommonTextInput
                  name="primaryContactEmail"
                  label="Email"
                  placeholder="Enter email address"
                  required
                  disabled={!isContactEditing}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-semibold text-gray-900">
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
                  disabled={!isContactEditing}
                />
                <PhoneInput
                  name="secondaryContactPhone"
                  label="Phone Number"
                  placeholder="XXXXX XXXXX"
                  countryOptions={countryOptions}
                  disabled={!isContactEditing}
                />
                <CommonTextInput
                  name="secondaryContactEmail"
                  label="Email"
                  placeholder="Enter email address"
                  disabled={!isContactEditing}
                />
              </div>
            </div>
          </form>
        </div>
      </FormProvider>

      <div className="flex justify-center pt-4">
        <Button
          variant="primary"
          className="bg-orange-500 hover:bg-orange-600 text-white"
          startIcon={<Plus className="w-4 h-4" />}
          onClick={handleAddBranch}
        >
          Add Branch
        </Button>
      </div>
    </div>
  );
};

export default BasicInfoForm;
