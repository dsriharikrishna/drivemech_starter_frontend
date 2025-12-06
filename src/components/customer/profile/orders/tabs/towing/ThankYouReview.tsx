"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

export default function ThankYouReview({
  rating = 0,
  serviceName = "",
  onDone,
  onClose,
}: {
  rating?: number;
  serviceName?: string;
  onDone?: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="w-full sm:w-2xl md:w-3xl mx-auto text-center">

      {/* GREEN SUCCESS HEADER */}
      <div className="w-full bg-gradient-to-b from-green-500 to-green-400 rounded-t-xl py-10 text-white">
        <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
          <CheckCircle size={38} className="text-white" />
        </div>

        <h2 className="text-2xl font-semibold">Thank You!</h2>
        <p className="text-green-100 text-sm mt-1">
          Your feedback has been submitted
        </p>
      </div>

      <div className="p-6 space-y-6 bg-white rounded-b-xl">

        {/* RATING BOX */}
        <div className="border border-gray-200 p-4 rounded-xl">
          <p className="text-sm font-semibold text-gray-800 mb-1">
            Your Rating
          </p>

          {/* Stars */}
          <div className="flex justify-center gap-1 my-1">
            {[1,2,3,4,5].map((i) => (
              <span
                key={i}
                className={`text-2xl ${
                  i <= rating ? "text-orange-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-1">
            {serviceName || "Service"} at your selected provider
          </p>
        </div>

        {/* IMPACT BOX */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-semibold text-gray-800 mb-1">Your Impact</p>
          <p className="text-gray-700 text-sm">
            Your positive review helps others discover great service providers!
          </p>

          <p className="text-gray-500 text-xs mt-3">
            We've saved your feedback and notified the service provider.
          </p>
        </div>

        {/* DONE BUTTON */}
        <button
          onClick={onDone}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
}
