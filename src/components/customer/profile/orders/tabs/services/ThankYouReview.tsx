"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { X } from "phosphor-react";

export default function ThankYouReview({
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
    <div className="w-3xl bg-white rounded-2xl flex flex-col gap-1.5">
      {/* Top Green Section */}
      <div className="bg-gradient-to-b from-green-500 to-green-400 text-center rounded-2xl py-8 px-1.5 text-white relative">
        <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
          <span className="text-3xl">👍</span>
        </div>

        <h2 className="text-xl font-bold mb-1.5">Thank You!</h2>
        <p className="text-xs opacity-90">Your feedback has been submitted</p>
      </div>

      <div className="flex flex-col gap-1.5 ">
        {/* Rating Summary Box */}
        <div className="rounded-xl border border-orange-200 bg-orange-50 py-4 px-3 text-center">
          <p className="font-semibold text-gray-700 mb-2.5 text-xs">
            Your Rating
          </p>

          <div className="flex justify-center gap-1.5 mb-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`${
                  rating >= star
                    ? "fill-orange-500 text-orange-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <p className="text-gray-600 text-xs">
            {serviceName || "Service"} at {undefined}
          </p>
        </div>

        {/* Impact Box */}
        <div className="rounded-xl bg-blue-50 border border-blue-200 p-3">
          <p className="font-semibold text-gray-700 mb-0.5 text-xs">
            Your Impact
          </p>
          <p className="text-gray-600 text-xs">
            Your positive review helps others discover great service providers!
          </p>
        </div>

        {/* Reward Box */}
        <div className="rounded-xl bg-purple-50 border border-purple-200 p-3">
          <p className="font-semibold text-gray-700 mb-0.5 text-xs">
            Reward Unlocked!
          </p>
          <p className="text-gray-600 text-xs mb-1.5">
            You've earned 50 DriveMech Reward Points for sharing your
            experience!
          </p>

          <span className="text-[11px] bg-purple-200 text-purple-700 px-2.5 py-0.5 rounded-full">
            +50 Points Added
          </span>
        </div>

        <p className="text-center text-gray-500 text-xs">
          We've saved your feedback and notified the service provider.
        </p>

        {/* Done Button */}
        <button
          onClick={onDone}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl text-xs"
        >
          Done
        </button>
      </div>
    </div>
  );
}
