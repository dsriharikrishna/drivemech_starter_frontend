"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { ArrowLeft, Warning } from "phosphor-react";
import { SmoothLandingBox } from "@/components/animations/SmoothLandingBox";

const CancelBookingLayout = () => {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cancellationReasons = [
    "Found a better price elsewhere",
    "Changed my mind",
    "Booked by mistake",
    "Service no longer needed",
    "Workshop not available at preferred time",
    "Other",
  ];

  const handleCancel = async () => {
    if (!selectedReason && !reason) {
      alert("Please select or provide a reason for cancellation");
      return;
    }

    setIsSubmitting(true);

    // TODO: Implement API call to cancel booking
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    router.push("/customer/profile/my-orders");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 container mx-auto">
      <div className="max-w-2xl mx-auto px-4">
        <SmoothLandingBox variant="fade" duration={0.6}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Cancel Booking</h1>
          </div>
        </SmoothLandingBox>

        <SmoothLandingBox variant="slide-up" delay={0.1} distance={30}>
          {/* Warning Card */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Warning
              size={24}
              className="text-orange-500 flex-shrink-0 mt-0.5"
            />
            <div>
              <h3 className="font-semibold text-orange-900 mb-1">
                Are you sure you want to cancel?
              </h3>
              <p className="text-sm text-orange-700">
                Cancelling this booking may result in cancellation fees
                depending on the workshop's policy. Please review the terms
                before proceeding.
              </p>
            </div>
          </div>
        </SmoothLandingBox>

        <SmoothLandingBox variant="slide-up" delay={0.15} distance={30}>
          {/* Booking Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Booking Details
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-medium text-gray-900">#BK123456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium text-gray-900">Oil Change</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Workshop:</span>
                <span className="font-medium text-gray-900">
                  AutoCare Center
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-medium text-gray-900">
                  Jan 30, 2026 at 10:00 AM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium text-gray-900">₹1,500</span>
              </div>
            </div>
          </div>
        </SmoothLandingBox>

        <SmoothLandingBox variant="slide-up" delay={0.2} distance={30}>
          {/* Cancellation Reason */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Reason for Cancellation
            </h2>

            <div className="space-y-3 mb-4">
              {cancellationReasons.map((reasonOption) => (
                <label
                  key={reasonOption}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="cancellationReason"
                    value={reasonOption}
                    checked={selectedReason === reasonOption}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{reasonOption}</span>
                </label>
              ))}
            </div>

            {selectedReason === "Other" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Please specify your reason
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter your reason for cancellation..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>
            )}
          </div>
        </SmoothLandingBox>

        <SmoothLandingBox variant="slide-up" delay={0.25} distance={30}>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
              disabled={isSubmitting}
            >
              Keep Booking
            </Button>
            <Button
              variant="danger"
              onClick={handleCancel}
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cancelling..." : "Confirm Cancellation"}
            </Button>
          </div>
        </SmoothLandingBox>
      </div>
    </div>
  );
};

export default CancelBookingLayout;
