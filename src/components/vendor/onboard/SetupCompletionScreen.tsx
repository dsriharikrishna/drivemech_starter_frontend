"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface SetupItem {
  id: string;
  title: string;
  percentage: number;
  status: "completed" | "pending";
}

const SETUP_ITEMS: SetupItem[] = [
  {
    id: "account",
    title: "Setup Account",
    percentage: 20,
    status: "completed",
  },
  {
    id: "workshop",
    title: "Workshop Details",
    percentage: 20,
    status: "pending",
  },
  {
    id: "towing",
    title: "Towing Services",
    percentage: 20,
    status: "pending",
  },
  {
    id: "photo",
    title: "Upload you photo",
    percentage: 20,
    status: "pending",
  },
  {
    id: "spare-parts",
    title: "Spare parts",
    percentage: 20,
    status: "pending",
  },
];

export default function SetupCompletionScreen() {
  const router = useRouter();

  // Calculate total completion percentage
  const completionPercentage = SETUP_ITEMS.filter(
    (item) => item.status === "completed"
  ).reduce((acc, item) => acc + item.percentage, 0);

  const handleStartSetup = () => {
    // Navigate to the first pending setup step
    // TODO: Implement actual navigation to setup steps
    console.log("Starting setup...");
    router.push("/vendor/new-vendor-onboard");
  };

  return (
    <div className="min-h-full bg-gray-50 flex items-start justify-start p-4">
      <div className="w-full bg-white rounded-2xl shadow-lg border-2 border-orange-500 p-4">
        {/* Header with Progress Circle and Checklist */}
        <div className="flex items-start justify-between gap-4">
          {/* Left: Progress Circle */}
          <div className="flex items-center gap-2">
            {/* Circular Progress */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="#F97316"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 42 * (1 - completionPercentage / 100)
                  }`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              {/* Percentage text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-500">
                  {completionPercentage}%
                </span>
              </div>
            </div>

            {/* Title and Description */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Complete Your Setup
              </h1>
              <p className="text-sm text-gray-600">
                Complete the selected services setup to get orders.
              </p>
            </div>
          </div>

          {/* Right: Start Setup Button */}
          <Button
            onClick={handleStartSetup}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-lg font-semibold whitespace-nowrap"
          >
            Start Setup
          </Button>
        </div>

        {/* Setup Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {SETUP_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Status Icon */}
              <div className="flex-shrink-0">
                {item.status === "completed" ? (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="2"
                      className="opacity-50"
                    />
                  </svg>
                )}
              </div>

              {/* Item Details */}
              <div className="flex-1">
                <span
                  className={`text-sm font-medium ${
                    item.status === "completed"
                      ? "text-gray-900"
                      : "text-gray-600"
                  }`}
                >
                  {item.title}
                </span>
              </div>

              {/* Percentage and Status */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {item.percentage}%
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    item.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.status === "completed" ? "Completed" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
