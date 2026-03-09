"use client";

import React, { useCallback } from "react";

export default function ConfirmReturn({
  payload,
  onBack,
  onSubmit,
}: {
  payload: any;
  onBack?: () => void;
  onSubmit?: () => void;
}) {
  if (!payload) return null;

  const handleSubmit = useCallback(() => {
    onSubmit?.();
  }, [onSubmit]);

  const handleBack = useCallback(() => {
    onBack?.();
  }, [onBack]);

  return (
    <div className="w-full sm:w-2xl md:w-3xl mx-auto flex flex-col gap-3">
      {/* WARNING BANNER */}
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-xl flex gap-2.5 items-start">
        <span className="text-lg">⚠️</span>
        <div>
          <p className="font-semibold text-xs">Please Review Carefully</p>
          <p className="text-xs">
            Make sure all details are correct before submitting your request.
          </p>
        </div>
      </div>

      {/* PRODUCT CARD */}
      <div className="border border-gray-200 rounded-xl p-3">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
            🛠️
          </div>

          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-xs">
              {payload.productName}
            </p>
            <p className="text-xs text-gray-600">{payload.reason}</p>
          </div>

          <p className="text-orange-500 font-semibold text-base">
            ${payload.amount}
          </p>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="space-y-3">
        {/* Request Type */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-lg">
            📦
          </div>
          <div>
            <p className="font-medium text-xs">Request Type</p>
            <p className="text-xs text-gray-600">Return for Refund</p>
          </div>
        </div>

        {/* Refund Method */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-lg">
            💳
          </div>
          <div>
            <p className="font-medium text-xs">Refund Method</p>
            <p className="text-xs text-gray-600">
              {payload.refundMethod === "wallet"
                ? "DriveMech Wallet"
                : "Original Payment Method"}
            </p>
          </div>
        </div>

        {/* Pickup Timeline */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-lg">
            ⏱️
          </div>
          <div>
            <p className="font-medium text-xs">Pickup Timeline</p>
            <p className="text-xs text-gray-600">Within 2–3 business days</p>
          </div>
        </div>

        {/* Pickup Address */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-lg">
            📍
          </div>
          <div>
            <p className="font-medium text-xs">Pickup Address</p>
            <p className="text-xs text-gray-600">{payload.address}</p>
          </div>
        </div>
      </div>

      {/* WHAT HAPPENS NEXT */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
        <p className="font-semibold text-gray-800 text-xs">
          What happens next?
        </p>

        <div className="mt-2.5 text-gray-700 space-y-1.5 text-xs">
          <div className="flex gap-1.5">
            <span>•</span>
            <span>Request verification within 2–4 hours</span>
          </div>

          <div className="flex gap-1.5">
            <span>•</span>
            <span>Pickup scheduled at your convenience</span>
          </div>

          <div className="flex gap-1.5">
            <span>•</span>
            <span>Refund processed in 5–7 business days</span>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleBack}
          className="flex-1 border border-gray-300 py-1.5 rounded-xl font-medium hover:bg-gray-50 transition text-xs"
        >
          Go Back
        </button>

        <button
          onClick={handleSubmit}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded-xl font-semibold transition text-xs"
        >
          Confirm & Submit
        </button>
      </div>
    </div>
  );
}
