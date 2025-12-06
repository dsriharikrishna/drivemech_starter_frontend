"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { CheckCircle, Calendar, Wallet, Info } from "lucide-react";

export default function ReturnSubmitted({
  returnId = "",
  onClose,
}: {
  returnId?: string;
  onClose?: () => void;
}) {
  const router = useRouter();

  return (
    <div className="w-full max-w-3xl mx-auto p-6">

      {/* SUCCESS ICON */}
      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-semibold text-center">Return Request Submitted!</h2>
      <p className="text-gray-600 text-center mt-1 mb-6">
        Your return request has been successfully submitted. We will arrange a pickup shortly.
      </p>

      {/* RETURN ID BOX */}
      <div className="border border-orange-200 rounded-xl p-4 mb-4 bg-gradient-to-r from-orange-50 to-white">
        <p className="text-sm text-gray-600">Return ID</p>
        <p className="text-xl font-bold mt-1">{returnId}</p>
        <p className="text-xs text-orange-600 mt-1">Save this for tracking</p>
      </div>

      {/* ESTIMATED PICKUP */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 mb-4">
        <Calendar className="w-5 h-5 text-orange-500 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-800">Estimated Pickup</p>
          <p className="text-gray-700 text-sm mt-1">Within 2–3 business days</p>
        </div>
      </div>

      {/* REFUND AMOUNT */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 mb-4">
        <Wallet className="w-5 h-5 text-green-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-800">Refund Amount</p>
          <p className="text-gray-700 font-semibold mt-1">$118.00 via original</p>
        </div>
      </div>

      {/* WHAT HAPPENS NEXT */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm mb-6">
        <p className="font-semibold flex items-center gap-2 text-gray-800">
          <Info className="w-4 h-4 text-blue-600" /> What happens next?
        </p>

        <div className="mt-2 text-gray-700 space-y-2">
          <p className="flex gap-2">
            <span className="text-blue-600">1.</span> We’ll verify your request within 2–4 hours
          </p>
          <p className="flex gap-2">
            <span className="text-blue-600">2.</span> Pickup will be scheduled at your convenience
          </p>
          <p className="flex gap-2">
            <span className="text-blue-600">3.</span> Refund processed within 5–7 business days after pickup
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() =>
            router.push(`/customer/profile/my-orders/spares/return-tracking/${returnId}`)
          }
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold"
        >
          Track Return Status
        </button>

        <button
          onClick={onClose}
          className="w-full py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
        >
          Back to Homepage
        </button>
      </div>

      {/* SUPPORT */}
      <p className="text-center text-gray-500 text-sm mt-6">Need help?</p>
      <button className="mx-auto block text-orange-600 font-medium text-sm mt-1">
        Contact Support
      </button>
    </div>
  );
}
