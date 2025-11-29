"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CreateMpinPage(): React.ReactNode {
  const router = useRouter();
  const DIGITS = 4;

  const [newMpin, setNewMpin] = useState<string[]>(Array(DIGITS).fill(""));
  const [confirmMpin, setConfirmMpin] = useState<string[]>(Array(DIGITS).fill(""));
  const [showMpin, setShowMpin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Correct typing for array refs
  const newMpinRefs = useRef<(HTMLInputElement | null)[]>([]);
  const confirmMpinRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input when page loads
    newMpinRefs.current[0]?.focus();
  }, []);

  const handleMpinChange = (
    index: number,
    value: string,
    type: "new" | "confirm"
  ) => {
    const digits = type === "new" ? newMpin : confirmMpin;
    const setter = type === "new" ? setNewMpin : setConfirmMpin;
    const refs = type === "new" ? newMpinRefs : confirmMpinRefs;

    if (!value) {
      const copy = [...digits];
      copy[index] = "";
      setter(copy);
      return;
    }

    const digit = value.replace(/\D/g, "").charAt(0);
    if (!digit) return;

    const copy = [...digits];
    copy[index] = digit;
    setter(copy);

    if (index + 1 < DIGITS) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
    type: "new" | "confirm"
  ) => {
    const digits = type === "new" ? newMpin : confirmMpin;
    const setter = type === "new" ? setNewMpin : setConfirmMpin;
    const refs = type === "new" ? newMpinRefs : confirmMpinRefs;

    if (e.key === "Backspace") {
      if (digits[index]) {
        const copy = [...digits];
        copy[index] = "";
        setter(copy);
      } else if (index > 0) {
        const copy = [...digits];
        copy[index - 1] = "";
        setter(copy);
        refs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < DIGITS - 1)
      refs.current[index + 1]?.focus();
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    type: "new" | "confirm"
  ) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, DIGITS);

    if (!pasted) return;

    const arr = Array(DIGITS).fill("");
    pasted.split("").forEach((d, i) => (arr[i] = d));

    if (type === "new") setNewMpin(arr);
    else setConfirmMpin(arr);

    const refs = type === "new" ? newMpinRefs : confirmMpinRefs;
    const nextEmpty = arr.findIndex((d) => !d);

    if (nextEmpty !== -1) refs.current[nextEmpty]?.focus();
    else refs.current[DIGITS - 1]?.focus();
  };

  const isNewMpinComplete = newMpin.every((v) => v !== "");
  const isConfirmMpinComplete = confirmMpin.every((v) => v !== "");
  const mpinsMatch = newMpin.join("") === confirmMpin.join("");

  const validateMpin = (mpin: string): boolean => {
    if (["1234", "1111", "0000", "4321"].includes(mpin)) return false;
    if (/^(\d)\1{3}$/.test(mpin)) return false;
    return true;
  };

  const handleSubmit = () => {
    setError(null);

    if (!isNewMpinComplete || !isConfirmMpinComplete) {
      setError("Please complete both MPIN fields.");
      return;
    }

    const newStr = newMpin.join("");
    const confirmStr = confirmMpin.join("");

    if (!validateMpin(newStr)) {
      setError("Please choose a more secure MPIN. Avoid common patterns like 1234 or 1111.");
      return;
    }

    if (newStr !== confirmStr) {
      setError("MPINs do not match. Please try again.");
      setConfirmMpin(Array(DIGITS).fill(""));
      confirmMpinRefs.current[0]?.focus();
      return;
    }

    console.log("Creating MPIN:", newStr);
    router.push("/customer/auth/mpin");
  };

  const inputClass =
    "w-14 h-14 text-center text-2xl font-semibold rounded-xl border border-gray-300 bg-gray-50 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all";

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6">

      {/* Logo */}
      <div className="text-center mb-4">
        <div className="mx-auto w-36 h-10 relative">
          <Image
            src="/mnt/data/493d80ec-7c06-43de-900c-3de2dff8c652.png"
            alt="DriveMech Logo"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Drive Smart. Service Smarter.</p>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create New MPIN</h2>
        <p className="text-sm text-gray-500 mt-1">Set up a secure 4-digit MPIN</p>
      </div>

      {/* Identity Verified */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex flex-col items-center">
          <CheckCircle className="w-12 h-12 text-green-600 mb-2" />
          <p className="text-base font-semibold text-green-700">Identity Verified</p>
          <p className="text-xs text-gray-600 mt-1">You can now create a new MPIN.</p>
        </div>
      </div>

      {/* New MPIN */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Enter New MPIN
        </label>
        <div className="flex justify-center gap-3">
          {newMpin.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                newMpinRefs.current[i] = el;
              }}
              type={showMpin ? "text" : "password"}
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleMpinChange(i, e.target.value, "new")}
              onKeyDown={(e) => handleKeyDown(i, e, "new")}
              onPaste={(e) => handlePaste(e, "new")}
              className={inputClass}
            />
          ))}
        </div>
      </div>

      {/* Confirm MPIN */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Confirm New MPIN
        </label>
        <div className="flex justify-center gap-3">
          {confirmMpin.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                confirmMpinRefs.current[i] = el;
              }}
              type={showMpin ? "text" : "password"}
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleMpinChange(i, e.target.value, "confirm")}
              onKeyDown={(e) => handleKeyDown(i, e, "confirm")}
              onPaste={(e) => handlePaste(e, "confirm")}
              className={inputClass}
            />
          ))}
        </div>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <input
          type="checkbox"
          id="showMpin"
          checked={showMpin}
          onChange={(e) => setShowMpin(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
        />
        <label htmlFor="showMpin" className="text-sm text-gray-600 cursor-pointer">
          Show MPIN
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center shadow-sm">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Security Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Security Tips</h3>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Use a unique 4-digit combination.</li>
          <li>• Avoid common patterns like 1234 or 1111.</li>
          <li>• Don’t use your birth year or phone number.</li>
        </ul>
      </div>

      {/* Button */}
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!isNewMpinComplete || !isConfirmMpinComplete}
        className={`w-full py-3 rounded-xl font-semibold transition-all ${isNewMpinComplete && isConfirmMpinComplete && mpinsMatch
            ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        Reset MPIN
      </Button>

      {/* Footer */}
      <p className="text-[11px] text-gray-500 text-center mt-6 leading-relaxed">
        By continuing, you agree to our{" "}
        <span className="text-blue-600 cursor-pointer hover:underline">Terms of Service</span>{" "}
        and{" "}
        <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span>.
      </p>
    </div>
  );
}
