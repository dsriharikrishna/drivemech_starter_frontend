"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";

import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import {
  verifyOtp,
  resendOtp,
  setOtpVerified,
  selectAuthLoading,
  selectAuthError,
  selectVerificationMethod,
  selectOtpSent,
} from "@/store/slicers/authSlicer";
import { otpVerifySchema } from "@/schemas/auth/verify.schema";

export default function OtpVerifyPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const verificationMethod = useAppSelector(selectVerificationMethod);
  const otpSent = useAppSelector(selectOtpSent);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const methods = useForm({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: {
      email: "",
      phone: "",
      code: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { handleSubmit, formState: { errors, isSubmitting } } = methods;

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, "");
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  async function onSubmit() {
    const otpCode = otp.join("");

    // Build payload based on verification method
    const payload: any = { code: otpCode };
    if (verificationMethod === "email") {
      payload.email = methods.getValues("email");
    } else if (verificationMethod === "phone") {
      payload.phone = methods.getValues("phone");
    }

    const result = await dispatch(verifyOtp(payload));
    if ((result as any).type?.endsWith("/fulfilled")) {
      dispatch(setOtpVerified(true));
      // Navigate to MPIN creation or dashboard
      router.push("/auth/mpin/create");
    }
  }

  async function handleResendOtp() {
    const payload: any = {};
    if (verificationMethod === "email") {
      payload.email = methods.getValues("email");
    } else if (verificationMethod === "phone") {
      payload.phone = methods.getValues("phone");
    }

    await dispatch(resendOtp(payload));
    // Reset OTP inputs
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      {/* Logo */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <Image
            src="/mnt/data/d33031d0-0569-47f6-bc92-b5fb657dd444.png"
            alt="DriveMech Logo"
            width={140}
            height={40}
            className="object-contain"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Verify OTP</h2>
        <p className="text-sm text-gray-500 mt-2">
          Enter the 6-digit code sent to your mobile number
        </p>
      </div>

      {/* FORM */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* OTP Input */}
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              />
            ))}
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="text-orange-500 font-semibold hover:text-orange-600"
                onClick={handleResendOtp}
                disabled={loading === "pending"}
              >
                Resend
              </button>
            </p>
          </div>

          {/* Verify Button */}
          <Button
            type="submit"
            variant={isOtpComplete ? "primary" : "outline"}
            className="py-3 rounded-xl font-semibold"
            disabled={!isOtpComplete || isSubmitting}
          >
            Verify OTP
          </Button>

          {/* Back to Login */}
          <button
            type="button"
            onClick={() => router.push("/customer/auth/login")}
            className="text-sm text-gray-500 hover:text-gray-700 text-center"
          >
            Back to Login
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
