"use client";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { CheckCircle, Calendar, Wallet, Info } from "lucide-react";

export default function ReturnSubmitted({
  returnId = "",
  onClose,
}: {
  returnId?: string;
  onClose?: () => void;
}) {
  const router = useRouter();

  const handleTrackReturn = useCallback(() => {
    router.push(
      `/customer/profile/my-orders/spares/return-tracking/${returnId}`
    );
  }, [router, returnId]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {/* SUCCESS ICON */}
      <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-center">
        Return Request Submitted!
      </h2>
      <p className="text-gray-600 text-center mt-0.5 mb-4 text-xs">
        Your return request has been successfully submitted. We will arrange a
        pickup shortly.
      </p>

      {/* RETURN ID BOX */}
      <div className="border border-orange-200 rounded-xl p-3 mb-3 bg-gradient-to-r from-orange-50 to-white">
        <p className="text-xs text-gray-600">Return ID</p>
        <p className="text-lg font-bold mt-0.5">{returnId}</p>
        <p className="text-[11px] text-orange-600 mt-0.5">
          Save this for tracking
        </p>
      </div>

      {/* ESTIMATED PICKUP */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-2.5 mb-3">
        <Calendar className="w-4 h-4 text-orange-500 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-gray-800">Estimated Pickup</p>
          <p className="text-gray-700 text-xs mt-0.5">
            Within 2–3 business days
          </p>
        </div>
      </div>

      {/* REFUND AMOUNT */}
      <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-2.5 mb-3">
        <Wallet className="w-4 h-4 text-green-600 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-gray-800">Refund Amount</p>
          <p className="text-gray-700 font-semibold mt-0.5 text-xs">
            $118.00 via original
          </p>
        </div>
      </div>

      {/* WHAT HAPPENS NEXT */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs mb-4">
        <p className="font-semibold flex items-center gap-1.5 text-gray-800">
          <Info className="w-3.5 h-3.5 text-blue-600" /> What happens next?
        </p>

        <div className="mt-1.5 text-gray-700 space-y-1.5">
          <p className="flex gap-1.5">
            <span className="text-blue-600">1.</span> We'll verify your request
            within 2–4 hours
          </p>
          <p className="flex gap-1.5">
            <span className="text-blue-600">2.</span> Pickup will be scheduled
            at your convenience
          </p>
          <p className="flex gap-1.5">
            <span className="text-blue-600">3.</span> Refund processed within
            5–7 business days after pickup
          </p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col gap-2.5">
        <button
          onClick={handleTrackReturn}
          className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-xs"
        >
          Track Return Status
        </button>

        <button
          onClick={onClose}
          className="w-full py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 text-xs"
        >
          Back to Homepage
        </button>
      </div>

      {/* SUPPORT */}
      <p className="text-center text-gray-500 text-xs mt-4">Need help?</p>
      <button className="mx-auto block text-orange-600 font-medium text-xs mt-0.5">
        Contact Support
      </button>
    </div>
  );
}
