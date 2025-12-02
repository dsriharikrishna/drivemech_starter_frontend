"use client";

import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { User, Mail, Phone, Calendar } from "lucide-react";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import Button from "@/components/ui/Button";
import ModalDropdown from "@/components/ui/DropDown";
import PhoneInput from "@/components/forms/PhoneInput";

interface DropdownItem {
  id: string;
  name: string;
  description?: string;
}

interface CountryOption {
  code: string;
  label: string;
  iso: string;
}

export default function ProfileTab() {
  const form = useForm();

  const genderOptions: DropdownItem[] = [
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "other", name: "Other" },
  ];

  const countryOptions: CountryOption[] = [
    { code: "+91", label: "India", iso: "IN" },
    { code: "+1", label: "United States", iso: "US" },
    { code: "+44", label: "United Kingdom", iso: "GB" },
    { code: "+61", label: "Australia", iso: "AU" },
    { code: "+971", label: "UAE", iso: "AE" },
    { code: "+966", label: "Saudi Arabia", iso: "SA" },
  ];

  const handleSubmit = (data: any) => {
    console.log("Profile data:", data);
    // Handle profile update logic here
  };

  return (
    <div className="flex-1 p-6 bg-white rounded-xl shadow">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          
          {/* Profile Photo Section */}
          <div>
            <h2 className="text-lg font-semibold">Profile Photo</h2>
            <div className="flex items-center gap-6 mt-4">
              <div className="relative">
                <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  AK
                </div>
                <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow cursor-pointer">
                  <Image src="/icons/camera.svg" alt="camera" width={18} height={18} />
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <p>Upload your photo</p>
                <p className="text-xs mt-1">JPG, PNG, or GIF. Max size 5MB</p>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  Choose File
                </Button>
              </div>
            </div>
          </div>

          <hr className="my-8 border border-gray-200" />

          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-semibold">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

              <CommonTextInput
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                rules={{ required: "First name is required" }}
              />

              <CommonTextInput
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                rules={{ required: "Last name is required" }}
              />

              <CommonTextInput
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                leftIcon={<Calendar size={20} className="text-gray-400" />}
              />

              <div>
                <label className="text-sm font-medium">Gender</label>
                <Controller
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <ModalDropdown
                      items={genderOptions}
                      selectedItem={genderOptions.find(item => item.id === field.value) || null}
                      onSelect={(item) => field.onChange(item.id)}
                      placeholder="Select Gender"
                      className="mt-2"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <hr className="my-8 border border-gray-200" />

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-semibold">Contact Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              
              <CommonTextInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="email@example.com"
                leftIcon={<Mail size={20} className="text-gray-400" />}
                rules={{ 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
              />

              <PhoneInput
                name="phone"
                label="Phone Number"
                placeholder="1234 567 890"
                countryOptions={countryOptions}
                required={true}
                rules={{ 
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number"
                  }
                }}
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Address Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              
              <CommonTextInput
                name="address"
                label="Street Address"
                placeholder="Enter your street address"
                rules={{ required: "Address is required" }}
              />

              <CommonTextInput
                name="city"
                label="City"
                placeholder="Enter your city"
                rules={{ required: "City is required" }}
              />

              <CommonTextInput
                name="state"
                label="State"
                placeholder="Enter your state"
                rules={{ required: "State is required" }}
              />

              <CommonTextInput
                name="pincode"
                label="Pincode"
                placeholder="Enter your pincode"
                rules={{ 
                  required: "Pincode is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Please enter a valid 6-digit pincode"
                  }
                }}
              />
            </div>

            <div className="mt-6">
              <CommonTextArea
                name="addressNotes"
                label="Address Notes (Optional)"
                placeholder="Any additional address information..."
                rows={3}
              />
            </div>
          </div>

          {/* Note */}
          <div className="mt-6 bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-sm">
            <strong>Note:</strong> Your email and phone are used for verification & notifications.
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-center">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="px-20 py-3 text-lg font-medium"
            >
              Save Profile
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}