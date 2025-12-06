"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@/components/ui/Button";

export default function MpinVerifyPage() {
  const router = useRouter();
  const { handleSubmit } = useForm();

  // 4-digit MPIN per your design
  const DIGITS = 4;
  const [mpin, setMpin] = useState<string[]>(Array(DIGITS).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [showMpin, setShowMpin] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!value) {
      const copy = [...mpin];
      copy[index] = "";
      setMpin(copy);
      return;
    }
    // accept only digits
    const digit = value.replace(/\D/g, "").slice(0, 1);
    if (!digit) return;

    const copy = [...mpin];
    copy[index] = digit;
    setMpin(copy);

    // focus next
    const next = index + 1;
    if (next < DIGITS) {
      inputRefs.current[next]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (mpin[index]) {
        // clear current
        const copy = [...mpin];
        copy[index] = "";
        setMpin(copy);
      } else if (index > 0) {
        // move to previous
        inputRefs.current[index - 1]?.focus();
        const copy = [...mpin];
        copy[index - 1] = "";
        setMpin(copy);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < DIGITS - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, DIGITS);
    if (!pasted) return;
    const arr = Array(DIGITS).fill("");
    pasted.split("").forEach((ch, i) => {
      if (i < DIGITS) arr[i] = ch;
    });
    setMpin(arr);
    // focus next empty or last
    const nextEmpty = arr.findIndex((v) => !v);
    if (nextEmpty !== -1) inputRefs.current[nextEmpty]?.focus();
    else inputRefs.current[DIGITS - 1]?.focus();
  };

  const isComplete = mpin.every((d) => d !== "");

  // example verify: replace with real API call
  const verifyMpin = async (code: string) => {
    // fake delay
    await new Promise((r) => setTimeout(r, 600));
    // pretend '1234' is correct — adapt to real logic
    return code === "1234";
  };

  const onSubmit = async () => {
    if (!isComplete) return;
    setIsSubmitting(true);
    setError(null);
    const code = mpin.join("");
    const ok = await verifyMpin(code);
    setIsSubmitting(false);

    if (ok) {
      // success — route to home or wherever
      router.push("customer/services");
    } else {
      // failed
      setAttemptsLeft((p) => {
        const next = p - 1 > 0 ? p - 1 : 0;
        return next;
      });
      setError(`Incorrect MPIN. ${attemptsLeft - 1} attempts remaining`);
      // clear inputs on failure
      setMpin(Array(DIGITS).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  const handleClear = () => {
    setMpin(Array(DIGITS).fill(""));
    setError(null);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      {/* Logo */}
      <div className="text-center mb-4">
        {/* using your uploaded screenshot as requested */}
        <div className="mx-auto w-36 h-10 relative">
          <Image
            src="/mnt/data/493d80ec-7c06-43de-900c-3de2dff8c652.png"
            alt="DriveMech Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 text-center">Welcome Back!</h2>
      <p className="text-sm text-gray-500 text-center mt-1">Enter your 4-digit MPIN</p>

      {/* MPIN inputs */}
      <div className="mt-5">
        <div className="flex justify-center gap-3">
          {mpin.map((digit, i) => {
            const showError = Boolean(error);
            return (
              <input
                key={i}
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[i] = el;
                }}
                type={showMpin ? "text" : "password"}
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                aria-label={`MPIN digit ${i + 1}`}
                className={`w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-2xl font-semibold rounded-md transition-all
                ${showError ? "border border-red-400" : "border border-gray-300"}
                focus:outline-none focus:ring-2 focus:ring-orange-200`}
                />);
                })}
        </div>

        {/* error row */}
        {error && (
          <div className="flex items-start gap-2 text-red-600 text-sm mt-3 justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M11.998 2C6.477 2 2 6.477 2 12s4.477 10 9.998 10C17.52 22 22 17.523 22 12S17.52 2 11.998 2zM12 8v6" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 17h.01" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <div className="font-medium">Incorrect MPIN.</div>
              <div className="text-xs text-red-500">{attemptsLeft} attempts remaining</div>
            </div>
          </div>
        )}
      </div>

      {/* Forgot MPIN link */}
      <div className="text-center mt-3">
        <button
          type="button"
          onClick={() => router.push("/auth/forgot-mpin")}
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot MPIN?
        </button>
      </div>

      {/* Buttons block */}
      <div className="mt-6 space-y-3">
        <Button
          type="button"
          className={`w-full py-3 rounded-xl font-semibold ${isComplete ? "bg-gray-900 text-white hover:bg-black" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
          disabled={!isComplete || isSubmitting}
          onClick={onSubmit}
        >
          Login with MPIN
        </Button>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            className="flex-1 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Clear
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/auth/login")}
            className="flex-1 py-2 rounded-md text-black border border-gray-200 hover:bg-gray-50"
          >
            Login with OTP
          </Button>
        </div>
      </div>

      {/* Footer */}
      <p className="text-[11px] text-gray-500 text-center mt-5">
        MPIN provides quick access while maintaining security. Your MPIN is encrypted and stored securely.
      </p>

      <p className="text-[11px] text-gray-400 text-center mt-3">
        By continuing, you agree to our <span className="text-blue-600">Terms of Service</span> and <span className="text-blue-600">Privacy Policy</span>.
      </p>
    </div>
  );
}
