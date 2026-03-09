"use client";

import React, { useCallback, useEffect } from "react";
import {
  useForm,
  FormProvider,
  useFieldArray,
  Controller,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, MapPin, Phone, Info } from "lucide-react";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import DropDown from "@/components/ui/DropDown";
import PhoneInput from "@/components/forms/PhoneInput";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setBasicInfo } from "@/store/slices/vendor-onboarding/basicInfoSlice";
import {
  businessInfoSchema,
  branchLocationsSchema,
  contactDetailsSchema,
} from "@/schemas/vendor-onboarding";
import {
  setnextSubTabValidations,
  setnextTabValidations,
} from "@/store/slices/helpers/helperSlice";

type BusinessInfoFormValues = z.infer<typeof businessInfoSchema>;
type BranchLocationsFormValues = z.infer<typeof branchLocationsSchema>;
type ContactDetailsFormValues = z.infer<typeof contactDetailsSchema>;

interface BasicInfoStepperProps {
  expandedSections: {
    businessInfo: boolean;
    branchLocations: boolean;
    contactDetails: boolean;
  };
  toggleSection: (
    section: "businessInfo" | "branchLocations" | "contactDetails"
  ) => void;
  cityOptions: Array<{ id: string; name: string }>;
  stateOptions: Array<{ id: string; name: string }>;
  countryOptions: Array<{ id: string; name: string }>;
}

const BasicInfoStepper: React.FC<BasicInfoStepperProps> = ({
  expandedSections,
  toggleSection,
  cityOptions,
  stateOptions,
  countryOptions,
}) => {
  const dispatch = useAppDispatch();
  const basicInfo = useAppSelector((state) => state.vendorBasicInfo);
  const showStepErrors = useAppSelector(
    (state) => state.vendorOnboarding.showStepErrors
  );

  // Form 1: Business Information
  const businessInfoMethods = useForm<BusinessInfoFormValues>({
    resolver: zodResolver(businessInfoSchema),
    mode: "onChange",
    defaultValues: {
      companyName: basicInfo.companyName || "",
      representativeName: basicInfo.representativeName || "",
      taxIdentificationNumber: basicInfo.taxIdentificationNumber || "",
      businessLicenseNumber: basicInfo.businessLicenseNumber || "",
      businessAddress: basicInfo.businessAddress || "",
      postCode: basicInfo.postCode || "",
      landmark: basicInfo.landmark || "",
      city: basicInfo.city || "",
      state: basicInfo.state || "",
      country: basicInfo.country || "",
    },
  });

  // Form 2: Branch Locations
  const branchMethods = useForm<BranchLocationsFormValues>({
    resolver: zodResolver(branchLocationsSchema),
    mode: "onChange",
    defaultValues: {
      branches:
        basicInfo.branches.length > 0
          ? basicInfo.branches.map((b) => ({ ...b }))
          : [
              {
                branchName: "",
                representativeName: "",
                businessAddress: "",
                postCode: "",
                landmark: "",
                city: "",
                state: "",
                country: "",
              },
            ],
    },
  });

  // Form 3: Contact Details
  const contactMethods = useForm<ContactDetailsFormValues>({
    resolver: zodResolver(contactDetailsSchema),
    mode: "onChange",
    defaultValues: {
      contacts:
        basicInfo.contacts.length > 0
          ? basicInfo.contacts.map((c) => ({ ...c }))
          : [
              {
                contactPersonName: "",
                phoneNumber: "",
                email: "",
              },
            ],
    },
  });

  // Field arrays for branches and contacts
  const { fields: branchFields, append: appendBranch } = useFieldArray({
    control: branchMethods.control,
    name: "branches",
  });

  const { fields: contactFields, append: appendContact } = useFieldArray({
    control: contactMethods.control,
    name: "contacts",
  });

  // Effect to trigger validation when parent signals errors should be shown
  useEffect(() => {
    if (showStepErrors) {
      // Trigger validation for all 3 forms
      businessInfoMethods.trigger().then((isValid) => {
        if (!isValid && !expandedSections.businessInfo) {
          toggleSection("businessInfo");
        }
      });

      branchMethods.trigger().then((isValid) => {
        if (!isValid && !expandedSections.branchLocations) {
          toggleSection("branchLocations");
        }
      });

      contactMethods.trigger().then((isValid) => {
        if (!isValid && !expandedSections.contactDetails) {
          toggleSection("contactDetails");
        }
      });
    }
  }, [
    showStepErrors,
    businessInfoMethods,
    branchMethods,
    contactMethods,
    expandedSections,
    toggleSection,
  ]);

  // Sync Business Info to Redux
  const businessFormData = useWatch({ control: businessInfoMethods.control });

  useEffect(() => {
    if (businessFormData) {
      dispatch(
        setBasicInfo({
          companyName: businessFormData.companyName || "",
          representativeName: businessFormData.representativeName || "",
          taxIdentificationNumber:
            businessFormData.taxIdentificationNumber || "",
          businessLicenseNumber: businessFormData.businessLicenseNumber || "",
          businessAddress: businessFormData.businessAddress || "",
          postCode: businessFormData.postCode || "",
          landmark: businessFormData.landmark,
          city: businessFormData.city || "",
          state: businessFormData.state || "",
          country: businessFormData.country || "",
        })
      );
    }
  }, [businessFormData, dispatch]);

  // Sync Branch Locations to Redux
  const branchFormData = useWatch({ control: branchMethods.control });
  useEffect(() => {
    if (branchFormData) {
      dispatch(
        setBasicInfo({
          branches: (branchFormData.branches || [])
            .filter((b): b is NonNullable<typeof b> => b !== undefined)
            .map((b) => ({
              branchName: b.branchName || "",
              representativeName: b.representativeName || "",
              businessAddress: b.businessAddress || "",
              postCode: b.postCode || "",
              landmark: b.landmark,
              city: b.city || "",
              state: b.state || "",
              country: b.country || "",
            })),
        })
      );
    }
  }, [branchFormData, dispatch]);

  // Sync Contact Details to Redux
  const contactFormData = useWatch({ control: contactMethods.control });
  useEffect(() => {
    if (contactFormData) {
      dispatch(
        setBasicInfo({
          contacts: (contactFormData.contacts || [])
            .filter((c): c is NonNullable<typeof c> => c !== undefined)
            .map((c) => ({
              contactPersonName: c.contactPersonName || "",
              phoneNumber: c.phoneNumber || "",
              email: c.email || "",
            })),
        })
      );
    }
  }, [contactFormData, dispatch]);

  const handleAddBranch = useCallback(() => {
    appendBranch({
      branchName: "",
      representativeName: "",
      businessAddress: "",
      postCode: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
    });
  }, []);

  const handleAddContact = useCallback(() => {
    appendContact({
      contactPersonName: "",
      phoneNumber: "",
      email: "",
    });
  }, []);

  useEffect(() => {
    if (businessFormData && branchFormData && contactFormData) {
      dispatch(setnextTabValidations(true));
      dispatch(setnextSubTabValidations(true));
    }
  }, [businessFormData, branchFormData, contactFormData, dispatch]);

  console.log("DEBUG: Business Form Data:", businessFormData);
  console.log("DEBUG: Branch Form Data:", branchFormData);
  console.log("DEBUG: Contact Form Data:", contactFormData);

  return (
    <>
      {/* Form 1: Business Information */}
      <FormProvider {...businessInfoMethods}>
        <Accordion
          title="Business Information"
          icon={<Building2 size={20} />}
          isExpanded={expandedSections.businessInfo}
          onToggle={() => toggleSection("businessInfo")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CommonTextInput
              name="companyName"
              label="Company Name"
              placeholder="Enter your company's name"
              required
            />
            <CommonTextInput
              name="representativeName"
              label="Representative Name"
              placeholder="Enter name of primary representative"
              required
            />
            <CommonTextInput
              name="taxIdentificationNumber"
              label="Tax Identification Number"
              placeholder="e.g. GST or PAN"
              required
            />
            <CommonTextInput
              name="businessLicenseNumber"
              label="Business License Number"
              placeholder="Enter business license number"
              required
            />
            <div className="md:col-span-2">
              <CommonTextArea
                name="businessAddress"
                label="Business Address"
                placeholder="Enter business full address"
                required
              />
            </div>
            <CommonTextInput
              name="postCode"
              label="Post Code"
              placeholder="Enter pin code"
              required
            />
            <CommonTextInput
              name="landmark"
              label="Landmark (Optional)"
              placeholder="Enter landmark"
            />
            <div>
              <Controller
                name="city"
                control={businessInfoMethods.control}
                render={({ field, fieldState: { error } }) => (
                  <DropDown
                    label="City"
                    items={cityOptions}
                    selectedItem={
                      cityOptions.find((item) => item.id === field.value) ||
                      null
                    }
                    onSelect={(item) => field.onChange(item.id)}
                    placeholder="Enter City"
                    error={error?.message}
                    required
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="state"
                control={businessInfoMethods.control}
                render={({ field, fieldState: { error } }) => (
                  <DropDown
                    label="State"
                    items={stateOptions}
                    selectedItem={
                      stateOptions.find((item) => item.id === field.value) ||
                      null
                    }
                    onSelect={(item) => field.onChange(item.id)}
                    placeholder="Select State"
                    error={error?.message}
                    required
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="country"
                control={businessInfoMethods.control}
                render={({ field, fieldState: { error } }) => (
                  <DropDown
                    label="Country"
                    items={countryOptions}
                    selectedItem={
                      countryOptions.find((item) => item.id === field.value) ||
                      null
                    }
                    onSelect={(item) => field.onChange(item.id)}
                    placeholder="Select Country"
                    error={error?.message}
                    required
                  />
                )}
              />
            </div>
          </div>
        </Accordion>
      </FormProvider>

      {/* Form 2: Branch Locations */}
      <FormProvider {...branchMethods}>
        <Accordion
          title="Branch Locations"
          icon={<MapPin size={20} />}
          isExpanded={expandedSections.branchLocations}
          onToggle={() => toggleSection("branchLocations")}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">
                Branches ({branchFields.length})
              </span>
            </div>
            <Button type="button" variant="primary" onClick={handleAddBranch}>
              Add Branch
            </Button>
          </div>

          <div className="flex flex-col gap-6">
            {branchFields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 p-4 rounded-lg bg-gray-50 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-gray-900">
                    Branch {index + 1}
                  </span>
                  {index > 0 && (
                    <button
                      type="button"
                      className="text-red-500 text-sm hover:underline"
                      onClick={() =>
                        branchMethods.setValue(
                          "branches",
                          branchMethods
                            .getValues("branches")
                            .filter((_, i) => i !== index)
                        )
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CommonTextInput
                    name={`branches.${index}.branchName`}
                    label="Branch Name"
                    placeholder="Enter branch name"
                    required
                  />
                  <CommonTextInput
                    name={`branches.${index}.representativeName`}
                    label="Representative Name"
                    placeholder="Enter name of primary representative"
                    required
                  />
                  <div className="md:col-span-2">
                    <CommonTextArea
                      name={`branches.${index}.businessAddress`}
                      label="Business Address"
                      placeholder="Enter business full address"
                      required
                    />
                  </div>
                  <CommonTextInput
                    name={`branches.${index}.postCode`}
                    label="Post Code"
                    placeholder="Enter pin code"
                    required
                  />
                  <CommonTextInput
                    name={`branches.${index}.landmark`}
                    label="Landmark (Optional)"
                    placeholder="Enter landmark"
                  />
                  <div>
                    <Controller
                      name={`branches.${index}.city`}
                      control={branchMethods.control}
                      render={({ field, fieldState: { error } }) => (
                        <DropDown
                          label="City"
                          items={cityOptions}
                          selectedItem={
                            cityOptions.find(
                              (item) => item.id === field.value
                            ) || null
                          }
                          onSelect={(item) => field.onChange(item.id)}
                          placeholder="Enter City"
                          error={error?.message}
                          required
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name={`branches.${index}.state`}
                      control={branchMethods.control}
                      render={({ field, fieldState: { error } }) => (
                        <DropDown
                          label="State"
                          items={stateOptions}
                          selectedItem={
                            stateOptions.find(
                              (item) => item.id === field.value
                            ) || null
                          }
                          onSelect={(item) => field.onChange(item.id)}
                          placeholder="Select State"
                          error={error?.message}
                          required
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name={`branches.${index}.country`}
                      control={branchMethods.control}
                      render={({ field, fieldState: { error } }) => (
                        <DropDown
                          label="Country"
                          items={countryOptions}
                          selectedItem={
                            countryOptions.find(
                              (item) => item.id === field.value
                            ) || null
                          }
                          onSelect={(item) => field.onChange(item.id)}
                          placeholder="Select Country"
                          error={error?.message}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Accordion>
      </FormProvider>

      {/* Form 3: Contact Details */}
      <FormProvider {...contactMethods}>
        <Accordion
          title="Contact Details"
          icon={<Phone size={20} />}
          isExpanded={expandedSections.contactDetails}
          onToggle={() => toggleSection("contactDetails")}
        >
          {/* Info Message and Add New Button */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-2 text-sm bg-blue-50 border border-blue-200 rounded-lg p-3 flex-1">
              <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-blue-700">
                All your account info will be created on your primary account
              </span>
            </div>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleAddContact}
            >
              Add New
            </Button>
          </div>

          <div className="flex flex-col gap-6">
            {contactFields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 p-4 rounded-lg bg-gray-50 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      Contact Person {index + 1}
                    </span>
                    {index === 0 ? (
                      <span className="text-xs bg-teal-100 text-teal-700 px-2.5 py-1 rounded-md font-medium">
                        Primary Contact
                      </span>
                    ) : (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md font-medium">
                        Secondary Contact
                      </span>
                    )}
                  </div>
                  {index > 0 && (
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" size="sm">
                        Set as Primary
                      </Button>
                      <button
                        type="button"
                        className="text-red-500 text-sm hover:underline cursor-pointer"
                        onClick={() =>
                          contactMethods.setValue(
                            "contacts",
                            contactMethods
                              .getValues("contacts")
                              .filter((_, i) => i !== index)
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CommonTextInput
                    name={`contacts.${index}.contactPersonName`}
                    label="Contact Person Name"
                    placeholder="Enter contact person name"
                    required
                  />
                  <Controller
                    name={`contacts.${index}.phoneNumber`}
                    control={contactMethods.control}
                    render={({ field, fieldState: { error } }) => (
                      <PhoneInput
                        {...field}
                        label="Phone Number"
                        required
                        countryOptions={[
                          { code: "+1", label: "United States", iso: "US" },
                          { code: "+44", label: "United Kingdom", iso: "GB" },
                          { code: "+61", label: "Australia", iso: "AU" },
                        ]}
                        error={error?.message}
                      />
                    )}
                  />

                  <CommonTextInput
                    name={`contacts.${index}.email`}
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </Accordion>

        {/* <Button type="button" onClick={}>
          Next
        </Button> */}
      </FormProvider>
    </>
  );
};

export default BasicInfoStepper;
