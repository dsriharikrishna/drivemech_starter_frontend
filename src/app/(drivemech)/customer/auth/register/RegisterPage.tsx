"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import {
  selectAuthLoading,
  selectAuthError,
  registerUser,
} from "@/store/slicers/authSlicer";

import CommonTextInput from "@/components/forms/CommonTextInput";
import PhoneInput from "@/components/forms/PhoneInput";
import Button from "@/components/ui/Button";

import { isEmailInput, isPhoneInput } from "@/utils";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const { handleSubmit, watch } = methods;

  const formvalues = watch();

  const countryOptions = [
    { code: "+60", label: "Malaysia", iso: "MY" },
    { code: "+61", label: "Australia", iso: "AU" },
    { code: "+91", label: "India", iso: "IN" },
    { code: "+1", label: "United States", iso: "US" },
  ];

  // 👉 Validation for Register Page
  const getValidation = useCallback(() => {
    const { firstName, lastName, email, phone } = formvalues;

    if (!firstName?.trim()) return false;
    if (!lastName?.trim()) return false;

    if (!email?.trim() || !isEmailInput(email)) return false;

    if (!phone?.trim() || !isPhoneInput(phone)) return false;
    if (phone.replace(/\D/g, "").length < 10) return false;

    return true;
  }, [formvalues]);

  async function onSubmit(data: any) {
    const result = await dispatch(registerUser(data));
    if ((result as any).type?.endsWith("/fulfilled")) {
      router.push("/");
    }
  }

  // Show toast on error
  useEffect(() => {
    if (error && typeof (window as any).addToast === "function") {
      (window as any).addToast(error, "error");
    }
  }, [error]);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      {/* Logo */}
      <div className="text-center mb-2">
        <Image
          src="/mnt/data/d33031d0-0569-47f6-bc92-b5fb657dd444.png"
          alt="DriveMech Logo"
          width={150}
          height={40}
          className="mx-auto"
        />
        <h2 className="text-xl font-semibold text-gray-900 mt-2">
          Create Your Account
        </h2>
      </div>

          {/* FORM */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

              {/* First + Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <CommonTextInput
                  name="firstName"
                  label="First Name"
                  placeholder="Enter First Name"
                  rules={{ required: "First name is required" }}
                  required
                />

                <CommonTextInput
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  rules={{ required: "Last name is required" }}
                  required
                />
              </div>

              {/* Phone */}
              <PhoneInput
                name="phone"
                label="Mobile Number"
                placeholder="1234 567 890"
                rules={{ required: "Phone number is required" }}
                countryOptions={countryOptions}
                required
              />

              {/* Email */}
              <CommonTextInput
                name="email"
                label="Email ID"
                placeholder="example@gmail.com"
                rules={{ required: "Email is required" }}
                required
              />

              {/* REGISTER BUTTON */}
              <Button
                type="submit"
                disabled={!getValidation()}
                className={`w-full text-white py-3 rounded-xl font-semibold 
                   ${getValidation()
                     ? "bg-orange-500 hover:bg-orange-600"
                     : "bg-orange-300 cursor-not-allowed"
                   }`}
              >
                Register
              </Button>

              {/* Already have account? */}
              <p className="text-center text-sm text-gray-500">
                Already have an account?
              </p>

              <Button
                type="button"
                onClick={() => router.replace("/customer/auth/login")}
                className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-semibold"
              >
                Login
              </Button>
            </form>
          </FormProvider>
    </div>
  );
}
