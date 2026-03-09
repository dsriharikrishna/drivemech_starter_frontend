"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import CommonTextArea from "@/components/forms/CommonTextArea";

const tags = [
  "Great Packaging",
  "Fast Delivery",
  "Good Pricing",
  "Genuine Product",
  "High Quality",
  "Fits Perfectly",
  "Reliable Brand",
  "Value for Money",
];

export default function WriteSpareReview({
  orderId = "SPR-001",
  onClose,
  setIsReviewed,
  setRatingFromChild,
}: {
  orderId?: string;
  onClose?: () => void;
  setIsReviewed?: (v: boolean) => void;
  setRatingFromChild?: (v: number) => void;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [review, setReview] = useState("");

  const tags = useMemo(
    () => [
      "Great Packaging",
      "Fast Delivery",
      "Good Pricing",
      "Genuine Product",
      "High Quality",
      "Fits Perfectly",
      "Reliable Brand",
      "Value for Money",
    ],
    []
  );

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleSubmit = useCallback(() => {
    if (rating === 0) return;

    setIsReviewed?.(true);
    setRatingFromChild?.(rating);

    onClose?.();
  }, [rating, setIsReviewed, setRatingFromChild, onClose]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl p-4 flex flex-col gap-3 relative">
      {/* Header Section (Garage + Order Info) */}
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-1.5">
          <Image
            src="/images/garage-icon.png"
            alt="Garage"
            width={36}
            height={36}
          />
        </div>

        <p className="font-semibold text-gray-900 text-xs">A to Z Spares</p>
        <p className="text-xs text-gray-500">Order: {orderId}</p>
      </div>

      {/* Rating Box */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
        <p className="font-medium text-gray-700 mb-1.5 text-xs">
          Rate Your Experience
        </p>

        <div className="flex justify-center gap-2.5 mb-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`cursor-pointer transition 
              ${
                (hover || rating) >= star
                  ? "fill-orange-400 text-orange-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-gray-500">Tap to rate</p>
      </div>

      {/* Tags */}
      <div className="border border-gray-200 rounded-2xl p-3">
        <p className="font-medium text-gray-700 mb-1.5 text-xs">
          What did you like? <span className="text-gray-400">(Optional)</span>
        </p>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2.5 py-1 text-xs rounded-full border transition
                ${
                  selectedTags.includes(tag)
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Review Textarea */}
      <div>
        <p className="text-gray-700 font-medium mb-1.5 text-xs">
          Write a Review <span className="text-gray-400">(Optional)</span>
        </p>

        <CommonTextArea
          label=""
          name="spareReview"
          placeholder="Share details about the product..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <p className="text-[11px] text-gray-400 text-right mt-0.5">
          {review.length}/500 characters
        </p>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={rating === 0}
        className={`w-full py-2.5 rounded-xl text-white font-semibold transition text-xs
          ${
            rating === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
      >
        Submit Rating
      </button>
    </div>
  );
}
