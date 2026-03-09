"use client";

import Avatar from "@/components/ui/Avatar";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Calendar } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";

import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import PhoneInput from "@/components/forms/PhoneInput";
import Button from "@/components/ui/Button";
import ModalDropdown from "@/components/ui/DropDown";
import { Download, User } from "phosphor-react";

// ✅ Import Zod schemas and helpers
import {
  profileUpdateSchema,
  transformProfileFormToPayload,
  transformProfilePayloadToForm,
  type ProfileUpdateFormData,
} from "@/schemas/customer/profile.schema";

// ✅ Import Redux
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getProfile,
  updateProfile,
  updateAvatar,
} from "@/store/slices/user/userProfileSlice";

interface DropdownItem {
  id: string;
  name: string;
}

export default function ProfileLayout() {
  const dispatch = useAppDispatch();

  // ✅ Redux state
  const profile = useAppSelector((state) => state.userProfile.profile);
  const profileLoading = useAppSelector(
    (state) => state.userProfile.profileLoading
  );
  const error = useAppSelector((state) => state.userProfile.error);

  // ✅ Local state for avatar preview
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // ✅ React Hook Form with Zod validation
  const form = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: undefined,
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      addressNotes: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // ✅ Fetch profile data on mount
  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [dispatch, profile]);

  // ✅ Populate form when profile data is loaded
  useEffect(() => {
    if (profile) {
      const formData = transformProfilePayloadToForm(profile);
      form.reset(formData);

      // Set avatar preview if exists
      if (profile.avatar) {
        setAvatarPreview(profile.avatar);
      }
    }
  }, [profile, form]);

  // ✅ Handle avatar file selection
  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  // ✅ Handle avatar upload
  const handleAvatarUpload = useCallback(async () => {
    if (!avatarFile) return;

    try {
      await dispatch(updateAvatar({ avatar: avatarFile })).unwrap();
      (window as any).addToast?.("Avatar updated successfully!", "success");
      setAvatarFile(null);
    } catch (error: any) {
      (window as any).addToast?.(
        error?.message || "Failed to update avatar",
        "error"
      );
    }
  }, [avatarFile, dispatch]);

  // ✅ Handle form submission
  const onSubmit = useCallback(
    async (data: ProfileUpdateFormData) => {
      try {
        // Transform form data to API payload
        const payload = transformProfileFormToPayload(data);

        // Dispatch update profile action
        await dispatch(updateProfile(payload)).unwrap();

        // Show success message
        (window as any).addToast?.("Profile updated successfully!", "success");
      } catch (error: any) {
        console.error("Profile update error:", error);
        (window as any).addToast?.(
          error?.message || "Failed to update profile. Please try again.",
          "error"
        );
      }
    },
    [dispatch]
  );

  // ✅ Constants
  const genderOptions: DropdownItem[] = useMemo(
    () => [
      { id: "male", name: "Male" },
      { id: "female", name: "Female" },
      { id: "other", name: "Other" },
    ],
    []
  );

  const countryOptions = useMemo(
    () => [
      { code: "+91", label: "India", iso: "IN" },
      { code: "+1", label: "United States", iso: "US" },
      { code: "+44", label: "United Kingdom", iso: "GB" },
      { code: "+61", label: "Australia", iso: "AU" },
      { code: "+971", label: "UAE", iso: "AE" },
      { code: "+966", label: "Saudi Arabia", iso: "SA" },
    ],
    []
  );

  return (
    <div className="flex-1 p-3 bg-white rounded-xl">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Profile Photo */}
          <div className="border border-gray-200 p-3 mb-3 rounded-2xl">
            <h2 className="text-base font-semibold">Profile Photo</h2>

            <div className="flex items-center gap-4 mt-3">
              <div className="relative">
                <Avatar
                  src={avatarPreview || profile?.avatar || ""}
                  name={profile?.fullName || "User"}
                  size="lg"
                  alt="Profile"
                  className="bg-orange-600 text-white"
                />

                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-primary-500 rounded-full p-1 shadow cursor-pointer hover:bg-primary-600"
                >
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="text-xs text-gray-500">
                <p className="font-medium text-gray-700">Upload your photo</p>
                <p className="text-[11px] mt-1 text-gray-500">
                  JPG, PNG or GIF. Max size 5MB
                </p>

                <label
                  htmlFor="avatar-upload"
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                >
                  <Download size={16} className="text-gray-600" />
                  <span className="text-xs font-medium text-gray-700">
                    Choose File
                  </span>
                </label>

                {avatarFile && (
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    className="mt-2 ml-2 text-xs"
                    onClick={handleAvatarUpload}
                    disabled={profileLoading === "pending"}
                  >
                    {profileLoading === "pending"
                      ? "Uploading..."
                      : "Upload Avatar"}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="border border-gray-200 p-3 rounded-2xl">
            {/* Personal Information */}
            <h2 className="text-base font-semibold">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <CommonTextInput
                name="firstName"
                label="First Name"
                placeholder="John"
                rules={{ required: "First name is required" }}
              />

              <CommonTextInput
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                rules={{ required: "Last name is required" }}
              />

              <Controller
                name="dateOfBirth"
                control={form.control}
                render={({ field }) => (
                  <CommonTextInput
                    {...field}
                    type="date"
                    label="Date of Birth"
                    placeholder="Select date"
                    leftIcon={<Calendar size={18} className="text-gray-400" />}
                  />
                )}
              />

              <div className="flex flex-col">
                <Controller
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <ModalDropdown
                      label="Gender"
                      items={genderOptions}
                      selectedItem={
                        genderOptions.find((i) => i.id === field.value) || null
                      }
                      onSelect={(item) => field.onChange(item.id)}
                      placeholder="Select Gender"
                    />
                  )}
                />
              </div>
            </div>

            <hr className="my-6 border border-gray-200" />

            {/* Contact Information */}
            <h2 className="text-base font-semibold">Contact Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <CommonTextInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="john.doe@example.com"
                leftIcon={<Mail size={18} className="text-gray-400" />}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    label="Phone Number"
                    placeholder="9876543210"
                    countryOptions={countryOptions}
                    required={true}
                  />
                )}
              />
            </div>

            {/* Note */}
            <div className="mt-4 bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-xs">
              <strong>Note:</strong> Your email & phone are used for
              verification & notifications.
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-center">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="text-base font-medium"
              >
                Save Profile
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
