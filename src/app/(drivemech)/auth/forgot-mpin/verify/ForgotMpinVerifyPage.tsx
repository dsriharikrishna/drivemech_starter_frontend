"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "phosphor-react";

export default function ForgotMpinVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "example@gmail.com";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!value) {
      const copy = [...otp];
      copy[index] = "";
      setOtp(copy);
      return;
    }

    const digit = value.replace(/\D/g, "").slice(0, 1);
    if (!digit) return;

    const copy = [...otp];
    copy[index] = digit;
    setOtp(copy);

    const next = index + 1;
    if (next < 6) {
      inputRefs.current[next]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const copy = [...otp];
        copy[index] = "";
        setOtp(copy);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const copy = [...otp];
        copy[index - 1] = "";
        setOtp(copy);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const arr = Array(6).fill("");
    pasted.split("").forEach((ch, i) => {
      if (i < 6) arr[i] = ch;
    });
    setOtp(arr);

    const nextEmpty = arr.findIndex((v) => !v);
    if (nextEmpty !== -1) inputRefs.current[nextEmpty]?.focus();
    else inputRefs.current[5]?.focus();
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleVerify = async () => {
    if (!isOtpComplete) return;

    setIsSubmitting(true);
    const otpCode = otp.join("");

    // TODO: Implement OTP verification API call
    console.log("Verifying OTP:", otpCode);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);

    // After successful verification, redirect to create new MPIN
    router.push("/customer/auth/mpin/create");
  };

  const handleResend = () => {
    // TODO: Implement resend OTP API call
    console.log("Resending OTP to:", email);
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  const handleChangeEmail = () => {
    router.push("/customer/auth/forgot-mpin");
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      {/* Logo */}
      <div className="text-center mb-6">
        <div className="mx-auto w-36 h-10 relative mb-2">
          <Image
            src="/mnt/data/493d80ec-7c06-43de-900c-3de2dff8c652.png"
            alt="DriveMech Logo"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-xs text-gray-500">Drive Smart. Service Smarter.</p>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Forget MPIN?</h2>
      <p className="text-sm text-gray-500 mb-6">Verify your identity to reset your MPIN</p>

      {/* Check Your Email Box */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Check Your Email</h3>
        <p className="text-xs text-gray-600">
          We've sent a 6-digit verification code to{" "}
          <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>

      {/* Verification Code Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Verification Code
        </label>
        <div className="flex justify-center gap-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            />
          ))}
        </div>
      </div>

      {/* Verify Code Button */}
      <Button
        type="button"
        onClick={handleVerify}
        disabled={!isOtpComplete || isSubmitting}
        className={`w-full py-3 rounded-lg font-semibold mb-3 ${
          isOtpComplete
            ? "bg-gray-900 hover:bg-black text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isSubmitting ? "Verifying..." : "Verify Code"}
      </Button>

      {/* Resend Code Link */}
      <div className="text-center mb-3">
        <button
          type="button"
          onClick={handleResend}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Didn't receive the code? Resend
        </button>
      </div>

      {/* Change Email Link */}
      <button
        type="button"
        onClick={handleChangeEmail}
        className="w-full flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft size={16} />
        Change Email
      </button>

      {/* Footer */}
      <p className="text-[11px] text-gray-500 text-center leading-relaxed">
        By continuing, you agree to our{" "}
        <span className="text-blue-600 cursor-pointer">Terms of Service</span> and{" "}
        <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
      </p>
    </div>
  );
}

