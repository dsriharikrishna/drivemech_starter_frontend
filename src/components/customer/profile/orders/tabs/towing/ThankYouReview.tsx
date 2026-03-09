"use client";

import React, { useCallback } from "react";
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
  const handleDone = useCallback(() => {
    onDone?.();
  }, [onDone]);

  return (
    <div className="w-full sm:w-2xl md:w-3xl mx-auto text-center">
      {/* GREEN SUCCESS HEADER */}
      <div className="w-full bg-gradient-to-b from-green-500 to-green-400 rounded-t-xl py-8 text-white">
        <div className="w-14 h-14 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-2.5">
          <CheckCircle size={32} className="text-white" />
        </div>

        <h2 className="text-xl font-semibold">Thank You!</h2>
        <p className="text-green-100 text-xs mt-0.5">
          Your feedback has been submitted
        </p>
      </div>

      <div className="p-4 space-y-4 bg-white rounded-b-xl">
        {/* RATING BOX */}
        <div className="border border-gray-200 p-3 rounded-xl">
          <p className="text-xs font-semibold text-gray-800 mb-0.5">
            Your Rating
          </p>

          {/* Stars */}
          <div className="flex justify-center gap-0.5 my-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`text-xl ${
                  i <= rating ? "text-orange-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-0.5">
            {serviceName || "Service"} at your selected provider
          </p>
        </div>

        {/* IMPACT BOX */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <p className="font-semibold text-gray-800 mb-0.5 text-xs">
            Your Impact
          </p>
          <p className="text-gray-700 text-xs">
            Your positive review helps others discover great service providers!
          </p>

          <p className="text-gray-500 text-xs mt-2.5">
            We've saved your feedback and notified the service provider.
          </p>
        </div>

        {/* DONE BUTTON */}
        <button
          onClick={handleDone}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-semibold text-xs"
        >
          Done
        </button>
      </div>
    </div>
  );
}
