"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";

import CommonTextInput from "@/components/forms/CommonTextInput";
import PhoneInput from "@/components/forms/PhoneInput";
import Button from "@/components/ui/Button";
import { isPhoneInput, isEmailInput } from "@/utils";
import { ArrowLeft } from "phosphor-react";

export default function ForgotMpinRightSide() {
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      identifier: "",
      phone: "",
      email: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = methods;
  const identifier = watch("identifier");
  const formvalues = watch();

  const [mode, setMode] = React.useState<"initial" | "phone" | "email">("initial");

  const countryOptions = [
    { code: "+60", label: "Malaysia", iso: "MY" },
    { code: "+61", label: "Australia", iso: "AU" },
    { code: "+91", label: "India", iso: "IN" },
    { code: "+1", label: "United States", iso: "US" },
  ];

  // Smooth switching logic
  useEffect(() => {
    const t = setTimeout(() => {
      if (!identifier || identifier.length < 3) return setMode("initial");

      if (isPhoneInput(identifier)) {
        setMode("phone");
        setValue("phone", identifier);
      } else if (isEmailInput(identifier)) {
        setMode("email");
        setValue("email", identifier);
      } else setMode("initial");
    }, 350);

    return () => clearTimeout(t);
  }, [identifier]);

  // Make sure only 1 field stays active
  useEffect(() => {
    if (mode === "phone") setValue("email", "");
    if (mode === "email") setValue("phone", "");
  }, [mode]);

  const getValidation = useCallback(() => {
    const value =
      mode === "initial"
        ? identifier
        : mode === "phone"
          ? formvalues.phone
          : formvalues.email;

    if (!value) return false;

    if (isPhoneInput(value)) return value.replace(/\D/g, "").length >= 10;

    if (isEmailInput(value)) return true;

    return false;
  }, [mode, identifier, formvalues.phone, formvalues.email]);

  async function onSubmit(data: any) {
    // TODO: Implement API call to send verification code
    
    // Get the email or phone from the form
    const email = mode === "email" ? data.email : mode === "phone" ? data.phone : data.identifier;

    // After successful submission, redirect to verification page
    router.push(`/auth/forgot-mpin/verify?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">

      {/* LOGO */}
      <div className="text-center mb-6">
        <Image
          src="/mnt/data/d33031d0-0569-47f6-bc92-b5fb657dd444.png"
          alt="DriveMech Logo"
          width={150}
          height={40}
          className="mx-auto"
        />
      </div>

      {/* HEADER */}
      <h2 className="text-lg font-semibold text-gray-900">Forget MPIN?</h2>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
        Verify your identity to reset your MPIN
      </p>

      {/* BLUE INFO BOX */}
      <div className="bg-blue-50 border border-blue-100 px-4 py-3 rounded-xl mt-5">
        <h3 className="text-[14px] font-semibold text-gray-800">Reset your MPIN</h3>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          We'll send a verification code to your email to confirm your identity.
        </p>
      </div>

      {/* FORM */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">

          {/* DYNAMIC INPUT */}
          <div className="min-h-[90px]">
            {mode === "initial" && (
              <CommonTextInput
                name="identifier"
                label="Email Address"
                placeholder="example@gmail.com"
                rules={{ required: "Email or Mobile is required" }}
              />
            )}

            {mode === "phone" && (
              <PhoneInput
                name="phone"
                label="Mobile Number"
                placeholder="1234 567 890"
                rules={{ required: "Mobile number is required" }}
                countryOptions={countryOptions}
              />
            )}

            {mode === "email" && (
              <CommonTextInput
                name="email"
                label="Email Address"
                placeholder="example@gmail.com"
                rules={{ required: "Email is required" }}
              />
            )}
          </div>

          {/* ORANGE BUTTON */}
          <Button
            type="submit"
            fullWidth
            variant="primary"
            disabled={!getValidation()}
            className="py-3 rounded-lg font-semibold text-white"
          >
            Send Verification Code
          </Button>

          {/* BACK BUTTON — white border, left arrow */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => router.push("/auth/login")}
            className="w-full py-3 border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-gray-700 text-sm hover:bg-gray-50"
          >
            <ArrowLeft size={18} /> Back to MPIN Login
          </button>

          {/* FOOTER */}
          <p className="text-[11px] text-gray-500 text-center mt-3 leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="text-blue-600 cursor-pointer">Terms of Service</span> and{" "}
            <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
          </p>
        </form>
      </FormProvider>
    </div>
  );
}
