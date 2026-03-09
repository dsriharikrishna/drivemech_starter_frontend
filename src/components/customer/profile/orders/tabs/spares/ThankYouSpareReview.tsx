"use client";

import { Star } from "lucide-react";
import React from "react";

export default function ThankYouSpareReview({
  rating,
  serviceName,
  onDone,
  onClose,
}: {
  rating: number;
  serviceName: string;
  onDone?: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-4 relative">
      {/* Top Section */}
      <div className="text-center mb-4">
        <div className="w-14 h-14 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2.5">
          <span className="text-3xl">🎉</span>
        </div>

        <h2 className="text-xl font-bold text-gray-800">Thank You!</h2>
        <p className="text-gray-500 mt-0.5 text-xs">
          Your review has been submitted successfully
        </p>
      </div>

      {/* Rating Summary */}
      <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 text-center">
        <p className="font-semibold text-gray-700 mb-2.5 text-xs">
          Your Rating
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-1.5 mb-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={24}
              className={`${
                rating >= s
                  ? "fill-orange-500 text-orange-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-gray-700 text-xs">{serviceName || "Spares Order"}</p>
      </div>

      {/* Informational Box */}
      <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 mt-4">
        <p className="font-semibold text-gray-800 mb-0.5 text-xs">
          Your Feedback Matters
        </p>
        <p className="text-gray-700 text-xs">
          Your review helps other customers choose the right products and
          improves our marketplace experience.
        </p>
      </div>

      {/* Rewards Box */}
      <div className="rounded-xl bg-purple-50 border border-purple-200 p-3 mt-3">
        <p className="font-semibold text-gray-800 mb-0.5 text-xs">
          Reward Earned!
        </p>
        <p className="text-gray-700 text-xs">
          You've earned 25 DriveMech Reward Points for reviewing a spare part.
        </p>

        <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-purple-200 text-purple-700 rounded-full text-[11px]">
          +25 Points Added
        </span>
      </div>

      <p className="text-center text-gray-500 text-xs mt-3">
        You can view your review history and points in your profile.
      </p>

      {/* Done Button */}
      <button
        onClick={onDone}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-semibold mt-4 text-xs"
      >
        Done
      </button>
    </div>
  );
}
