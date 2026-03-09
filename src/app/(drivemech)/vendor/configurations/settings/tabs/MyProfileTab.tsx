"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import PhoneInput from "@/components/forms/PhoneInput";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import StatusBadge from "@/components/ui/StatusBadge";
import { Upload, Trash2, UploadCloud } from "lucide-react";
import { Pencil } from "phosphor-react";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const MyProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("/images/workshop/mechanic1.jpg");

  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Wick",
      email: "johnwick@gmail.com",
      phoneNumber: "9876543210",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile updated:", data);
    setIsEditing(false);
    // TODO: Handle profile update
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setAvatarUrl("");
  };

  return (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h3>
          {!isEditing && (
            <Button
              variant="success"
              size="sm"
              startIcon={<Pencil size={16} />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar
                src={avatarUrl}
                alt="Profile"
                size="xl"
                name="John Wick"
                className="rounded-lg"
              />
              <div className="flex flex-wrap gap-3">
                <label htmlFor="avatar-upload">
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("avatar-upload")?.click()
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <UploadCloud size={16} />
                    Upload Image
                  </button>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CommonTextInput
                name="firstName"
                label="First Name"
                placeholder="John"
                disabled={!isEditing}
                required
              />
              <CommonTextInput
                name="lastName"
                label="Last Name"
                placeholder="Wick"
                disabled={!isEditing}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CommonTextInput
                name="email"
                label="Email Address"
                placeholder="johnwick@gmail.com"
                type="email"
                disabled={true}
                required
              />

              <PhoneInput
                name="phoneNumber"
                label="Phone Number"
                countryOptions={[
                  { code: "+91", label: "India", iso: "IN" },
                  { code: "+1", label: "USA", iso: "US" },
                  { code: "+44", label: "UK", iso: "GB" },
                ]}
                disabled={!isEditing}
                required
              />
            </div>

            {isEditing && (
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>

      {/* Account Information Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Account Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">Account Created</p>
            <p className="text-sm font-medium text-gray-900">Sep 29, 2025</p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">Email Verified</p>
            <StatusBadge status="success" label="Verified" size="sm" />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">Last Login</p>
            <p className="text-sm font-medium text-gray-900">Today, 2:30 PM</p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">Phone Verified</p>
            <StatusBadge status="warning" label="Pending" size="sm" />
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">Account Status</p>
            <StatusBadge status="info" label="Active" size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileTab;
