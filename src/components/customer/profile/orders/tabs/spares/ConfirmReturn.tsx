"use client";

import React from "react";

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

  return (
    <div className="w-full sm:w-2xl md:w-3xl mx-auto flex flex-col gap-4">

      {/* WARNING BANNER */}
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl flex gap-3 items-start">
        <span className="text-xl">⚠️</span>
        <div>
          <p className="font-semibold">Please Review Carefully</p>
          <p className="text-sm">
            Make sure all details are correct before submitting your request.
          </p>
        </div>
      </div>

      {/* PRODUCT CARD */}
      <div className="border border-gray-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
            🛠️
          </div>

          <div className="flex-1">
            <p className="font-semibold text-gray-900">{payload.productName}</p>
            <p className="text-sm text-gray-600">{payload.reason}</p>
          </div>

          <p className="text-orange-500 font-semibold text-lg">
            ${payload.amount}
          </p>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="space-y-4">

        {/* Request Type */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xl">📦</div>
          <div>
            <p className="font-medium">Request Type</p>
            <p className="text-sm text-gray-600">Return for Refund</p>
          </div>
        </div>

        {/* Refund Method */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-xl">💳</div>
          <div>
            <p className="font-medium">Refund Method</p>
            <p className="text-sm text-gray-600">
              {payload.refundMethod === "wallet"
                ? "DriveMech Wallet"
                : "Original Payment Method"}
            </p>
          </div>
        </div>

        {/* Pickup Timeline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-xl">⏱️</div>
          <div>
            <p className="font-medium">Pickup Timeline</p>
            <p className="text-sm text-gray-600">Within 2–3 business days</p>
          </div>
        </div>

        {/* Pickup Address */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-xl">📍</div>
          <div>
            <p className="font-medium">Pickup Address</p>
            <p className="text-sm text-gray-600">{payload.address}</p>
          </div>
        </div>
      </div>

      {/* WHAT HAPPENS NEXT */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="font-semibold text-gray-800">What happens next?</p>

        <div className="mt-3 text-gray-700 space-y-2">
          <div className="flex gap-2">
            <span>•</span>
            <span>Request verification within 2–4 hours</span>
          </div>

          <div className="flex gap-2">
            <span>•</span>
            <span>Pickup scheduled at your convenience</span>
          </div>

          <div className="flex gap-2">
            <span>•</span>
            <span>Refund processed in 5–7 business days</span>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-6">

        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 py-1.5 rounded-xl font-medium hover:bg-gray-50 transition"
        >
          Go Back
        </button>

        <button
          onClick={onSubmit}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded-xl font-semibold transition"
        >
          Confirm & Submit
        </button>

      </div>
    </div>
  );
}
