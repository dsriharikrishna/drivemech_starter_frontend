"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle, Lock } from "lucide-react";
import Button from "@/components/ui/Button";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-blue-100 p-6">

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/mnt/data/b0d650d5-7377-4999-96ed-c164cd4b7b76.png"
          alt="DriveMech Logo"
          width={190}
          height={55}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">
        MPIN Reset Complete
      </h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        You can now login with your new MPIN
      </p>

      {/* Green Success Box */}
      <div className="bg-green-100 border border-green-200 rounded-xl p-5 text-center mb-4">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-700" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-green-700 mb-1">
          MPIN Reset Successful!
        </h3>
        <p className="text-sm text-green-700">
          Your MPIN has been reset successfully. You can now use your new MPIN to login.
        </p>
      </div>

      {/* Blue Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center mb-6">
        <div className="flex justify-center mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-base font-semibold text-blue-700 mb-1">
          MPIN Reset Successful!
        </h3>
        <p className="text-sm text-blue-600">
          Your MPIN has been reset successfully. You can now use your new MPIN to login.
        </p>
      </div>

      {/* Button */}
      <Button
        type="button"
        onClick={() => router.push("/customer/auth/login")}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
      >
        Continue to Login
      </Button>

      {/* Footer */}
      <p className="text-[11px] text-gray-500 text-center mt-6 leading-relaxed">
        By continuing, you agree to our{" "}
        <span className="text-blue-600 cursor-pointer">Terms of Service</span> and{" "}
        <span className="text-blue-600 cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  );
}
