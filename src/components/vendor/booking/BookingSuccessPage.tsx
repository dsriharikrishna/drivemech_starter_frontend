"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function BookingSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-12 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Gear Icon */}
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {/* Checkmark */}
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center border-4 border-blue-500">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            {/* Arrows */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <svg
                className="w-12 h-12 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2L12 8M12 2L9 5M12 2L15 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          New Service has Initiated
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-2">
          Vehicle assigned to{" "}
          <span className="font-semibold text-gray-900">Peter</span> to service.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          The status is now in{" "}
          <span className="font-semibold text-gray-900">Under Servicing</span>
        </p>

        {/* Vehicle Number */}
        <p className="text-xl font-semibold text-blue-600 mb-8">
          Vehicle Number: AP03 AR 8778
        </p>

        {/* Homepage Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push("/vendor/operations")}
          className="min-w-[300px]"
        >
          Homepage
        </Button>
      </div>
    </div>
  );
}
