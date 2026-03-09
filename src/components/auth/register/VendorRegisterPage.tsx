"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import {
  selectAuthLoading,
  selectAuthError,
  registerUser,
  setOtpSent,
  setVerificationMethod,
} from "@/store/slices/auth/authSlice";

import CommonTextInput from "@/components/forms/CommonTextInput";
import PhoneInput from "@/components/forms/PhoneInput";
import Button from "@/components/ui/Button";

import { isEmailInput, isPhoneInput } from "@/utils";

// Combined schema with MPIN fields
const vendorRegisterSchema = z
  .object({
    businessName: z
      .string()
      .min(2, "Business name must be at least 2 characters")
      .max(100, "Business name must not exceed 100 characters"),
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must not exceed 100 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),
    countryCode: z.string().default("+91"),
    mpin: z
      .string()
      .length(4, "MPIN must be exactly 4 digits")
      .regex(/^\d{4}$/, "MPIN must contain only numbers"),
    confirmMpin: z
      .string()
      .length(4, "MPIN must be exactly 4 digits")
      .regex(/^\d{4}$/, "MPIN must contain only numbers"),
  })
  .refine((data) => data.mpin === data.confirmMpin, {
    message: "MPINs do not match",
    path: ["confirmMpin"],
  });

export default function VendorRegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpSent, setOtpSentState] = useState(false);

  const methods = useForm({
    resolver: zodResolver(vendorRegisterSchema),
    defaultValues: {
      businessName: "",
      fullName: "",
      email: "",
      phone: "",
      countryCode: "+91",
      mpin: "",
      confirmMpin: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const formvalues = watch();

  const countryOptions = [
    { code: "+60", label: "Malaysia", iso: "MY" },
    { code: "+61", label: "Australia", iso: "AU" },
    { code: "+91", label: "India", iso: "IN" },
    { code: "+1", label: "United States", iso: "US" },
  ];

  // Handle Send OTP
  const handleSendOtp = () => {
    const phone = formvalues.phone;
    if (phone && phone.replace(/\D/g, "").length >= 10) {
      console.log("Sending OTP to:", phone);
      // TODO: Integrate OTP sending logic
      setOtpSentState(true);
      // Simulate verification for demo
      setTimeout(() => {
        setPhoneVerified(true);
      }, 1000);
    }
  };

  // 👉 Validation for Vendor Register Page
  const getValidation = useCallback(() => {
    const { businessName, fullName, email, phone, mpin, confirmMpin } =
      formvalues;

    if (!businessName?.trim()) return false;
    if (!fullName?.trim()) return false;
    if (!email?.trim() || !isEmailInput(email)) return false;
    if (!phone?.trim() || !isPhoneInput(phone)) return false;
    if (phone.replace(/\D/g, "").length < 10) return false;
    if (!phoneVerified) return false;
    if (!mpin || mpin.length !== 4) return false;
    if (!confirmMpin || confirmMpin.length !== 4) return false;
    if (mpin !== confirmMpin) return false;

    return true;
  }, [formvalues, phoneVerified]);

  async function onSubmit(data: any) {
    console.log("Form submitted with data:", data);
    // TODO: Integrate Redux thunks
    // const result = await dispatch(registerUser(data));
    // if ((result as any).type?.endsWith("/fulfilled")) {
    //     dispatch(setOtpSent(true));
    //     dispatch(setVerificationMethod(data.email ? "email" : "phone"));
    // router.push("/auth/vendor/verify");
    router.push("/vendor/onboard");
    // }
  }

  // Show toast on error
  useEffect(() => {
    // TODO: Integrate toast notifications
    // if (error && typeof (window as any).addToast === "function") {
    //     (window as any).addToast(error, "error");
    // }
  }, [error]);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      {/* Logo */}
      <div className="text-center mb-6">
        <Image
          src="/images/DriveMechLogo.png"
          alt="DriveMech Logo"
          width={200}
          height={50}
          className="mx-auto object-contain"
        />
        <h2 className="text-2xl font-semibold text-gray-900 mt-4">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Get started with your workshop management
        </p>
      </div>

      {/* FORM */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit, (errors) =>
            console.log("Form validation errors:", errors)
          )}
          className="flex flex-col gap-4"
        >
          {/* Business Name */}
          <CommonTextInput
            name="businessName"
            label="Business Name"
            placeholder="Enter your business name"
            rules={{ required: "Business name is required" }}
            required
          />

          {/* Full Name */}
          <CommonTextInput
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            rules={{ required: "Full name is required" }}
            required
          />

          {/* Email */}
          <CommonTextInput
            name="email"
            label="Email Address"
            placeholder="johndoe@email.com"
            type="email"
            rules={{ required: "Email is required" }}
            required
          />

          {/* Phone with Send OTP */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <PhoneInput
                  name="phone"
                  label="Phone Number"
                  placeholder="98765 43210"
                  rules={{ required: "Phone number is required" }}
                  countryOptions={countryOptions}
                  required
                />
              </div>
              <Button
                type="button"
                onClick={handleSendOtp}
                disabled={
                  !formvalues.phone ||
                  formvalues.phone.replace(/\D/g, "").length < 10 ||
                  phoneVerified
                }
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold disabled:bg-orange-300 h-[40px] whitespace-nowrap"
              >
                Send OTP
              </Button>
            </div>
            {phoneVerified && (
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-green-600 font-medium">
                  Mobile number verified
                </span>
              </div>
            )}
          </div>

          {/* Create MPIN */}
          <CommonTextInput
            name="mpin"
            label="Create MPIN"
            placeholder="4-digit MPIN"
            type="password"
            maxLength={4}
            rules={{
              required: "MPIN is required",
              pattern: {
                value: /^\d{4}$/,
                message: "MPIN must be 4 digits",
              },
            }}
            required
          />

          {/* Confirm MPIN */}
          <CommonTextInput
            name="confirmMpin"
            label="Confirm MPIN"
            placeholder="Re-enter 4-digit MPIN"
            type="password"
            maxLength={4}
            rules={{
              required: "Please confirm your MPIN",
              validate: (value) =>
                value === formvalues.mpin || "MPINs do not match",
            }}
            required
          />

          {/* CREATE ACCOUNT BUTTON */}
          <Button
            type="submit"
            disabled={!getValidation() || isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 rounded-xl font-semibold mt-2"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="h-px flex-1 bg-gray-200" />
            <p className="text-xs text-gray-500">Or</p>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Already have account? */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?
          </p>

          {/* LOGIN BUTTON */}
          <Button
            type="button"
            variant="outline"
            onClick={() => router.replace("/auth/vendor/login")}
            className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-3 rounded-xl font-semibold"
          >
            Login
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
