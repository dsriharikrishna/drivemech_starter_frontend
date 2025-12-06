"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import {
  loginUser,
  selectAuthLoading,
  selectAuthError,
} from "@/store/slicers/authSlicer";

import CommonTextInput from "@/components/forms/CommonTextInput";
import PhoneInput from "@/components/forms/PhoneInput";
import Button from "@/components/ui/Button";

import { isPhoneInput, isEmailInput } from "@/utils";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const methods = useForm({
    defaultValues: {
      identifier: "",
      email: "",
      phone: "",
    },
  });

  const { handleSubmit, watch, setValue, getValues } = methods;
  const formvalues = watch();
  const identifier = watch("identifier");

  const [mode, setMode] = useState<"initial" | "phone" | "email">("initial");

  const countryOptions = [
    { code: "+60", label: "Malaysia", iso: "MY" },
    { code: "+61", label: "Australia", iso: "AU" },
    { code: "+91", label: "India", iso: "IN" },
    { code: "+1", label: "United States", iso: "US" },
  ];

  // Debounced switching (keeps UI smooth)
  useEffect(() => {
    const t = setTimeout(() => {
      if (!identifier || identifier.trim().length < 3) {
        setMode("initial");
        return;
      }
      if (isPhoneInput(identifier.trim())) {
        setMode("phone");
        setValue("phone", identifier.trim(), { shouldValidate: true, shouldDirty: true });
      } else if (isEmailInput(identifier.trim())) {
        setMode("email");
        setValue("email", identifier.trim(), { shouldValidate: true, shouldDirty: true });
      } else {
        setMode("initial");
      }
    }, 400);

    return () => clearTimeout(t);
  }, [identifier, setValue]);

  // When mode changes, clear the other field so RHF doesn't keep stale values
  useEffect(() => {
    if (mode === "phone") {
      setValue("email", "");
    } else if (mode === "email") {
      setValue("phone", "");
    }
  }, [mode, setValue]);

  // getValidation: returns true when the current input is valid
  const getValidation = useCallback(() => {
    let value = "";

    if (mode === "initial") {
      value = identifier?.trim() || "";
    } else if (mode === "phone") {
      value = formvalues.phone?.trim() || "";
    } else if (mode === "email") {
      value = formvalues.email?.trim() || "";
    }

    if (!value) return false;

    // PHONE VALIDATION
    if (isPhoneInput(value)) {
      return value.replace(/\D/g, "").length >= 10;
    }

    // EMAIL VALIDATION
    if (isEmailInput(value)) {
      return true;
    }

    return false;
  }, [mode, identifier, formvalues.phone, formvalues.email]);


  async function onSubmit(data: any) {
    // Optionally normalize payload here: pick phone or email as identifier
    const payload = { ...data };
    // If identifier existed but phone/email are empty, attempt to set them
    if (!payload.phone && isPhoneInput(payload.identifier || "")) {
      payload.phone = (payload.identifier || "").replace(/\D/g, "");
    }
    if (!payload.email && isEmailInput(payload.identifier || "")) {
      payload.email = payload.identifier;
    }

    const result = await dispatch(loginUser(payload));
    if ((result as any).type?.endsWith("/fulfilled")) {
      router.push("/customer/verify");
    }
  }

  // Show error toast when `error` changes
  useEffect(() => {
    if (error) {
      if (typeof (window as any).addToast === "function") {
        (window as any).addToast(error, "error");
      } else {
        console.warn("Toast function not found:", error);
      }
    }
  }, [error]);

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
        <h2 className="text-xl font-semibold text-gray-900">Login</h2>
      </div>

      {/* FORM */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* Animated Input Zone (keeps stable height to avoid layout jumps) */}
          <div className="min-h-[90px] relative">
            <AnimatePresence mode="wait">
              {mode === "initial" && (
                <motion.div
                  key="initial"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute w-full"
                >
                  <CommonTextInput
                    name="identifier"
                    label="Mobile / Email ID"
                    placeholder="Enter Mobile Number / Email"
                    rules={{ required: "This field is required" }}
                  />
                </motion.div>
              )}

              {mode === "phone" && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute w-full"
                >
                  <PhoneInput
                    name="phone"
                    label="Mobile Number"
                    placeholder="1234 567 890"
                    rules={{ required: "Mobile number is required" }}
                    countryOptions={countryOptions}
                  />
                </motion.div>
              )}

              {mode === "email" && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute w-full"
                >
                  <CommonTextInput
                    name="email"
                    label="Email ID"
                    placeholder="example@gmail.com"
                    rules={{ required: "Email is required" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* VERIFY BUTTON: enabled only when getValidation() is true */}
          <Button
            type="submit"
            variant={!getValidation() ? "outline" : "primary"}
            className="py-2 rounded-xl font-semibold"
            disabled={!getValidation()}
          >
            {!getValidation() ? "Submitting..." : "Verify with OTP"}
          </Button>


          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <p className="text-xs text-gray-500">Or</p>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* MPIN Button */}
          <Button
            type="button"
            variant="outline"
            className="py-2 rounded-xl font-semibold"
            onClick={() => router.push("/auth/mpin")}
          >
            MPIN
          </Button>

          {/* Register */}
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?
          </p>

          <button
            type="button"
            className="w-full py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold"
            onClick={() => router.push("/auth/register")}
          >
            Register
          </button>

        </form>
      </FormProvider>
    </div>
  );
}
