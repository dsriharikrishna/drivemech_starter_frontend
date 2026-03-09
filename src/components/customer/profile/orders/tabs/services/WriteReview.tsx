"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { X, Star } from "lucide-react";

const tags = [
  "Professional Service",
  "Quick Turnaround",
  "Fair Pricing",
  "Clean Facility",
  "Friendly Staff",
  "Expert Technicians",
  "Good Communication",
  "Quality Parts",
];

interface WriteReviewProps {
  onClose?: () => void;
  setIsReviewed: (value: boolean) => void;
  setRatingFromChild: (value: number) => void;
}

export default function WriteReview({
  onClose,
  setIsReviewed,
  setRatingFromChild,
}: WriteReviewProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [review, setReview] = useState("");

  const tags = useMemo(
    () => [
      "Professional Service",
      "Quick Turnaround",
      "Fair Pricing",
      "Clean Facility",
      "Friendly Staff",
      "Expert Technicians",
      "Good Communication",
      "Quality Parts",
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

    setRatingFromChild(rating);
    setIsReviewed(true);
    onClose?.();
  }, [rating, setRatingFromChild, setIsReviewed, onClose]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl p-3 flex flex-col gap-3">
      {/* Garage Info */}
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-1.5">
          <Image
            src="/images/garage-icon.png"
            alt="Garage"
            width={36}
            height={36}
          />
        </div>
        <p className="font-semibold text-gray-900 text-xs">A to Z Garage</p>
        <p className="text-xs text-gray-500">Periodic Maintenance</p>
      </div>

      {/* Rating Box */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
        <p className="font-medium text-gray-700 mb-1.5 text-xs">
          How was your experience?
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
      <div className="border border-gray-200 p-2 rounded-2xl">
        <p className="text-gray-700 font-medium mb-1.5 text-xs">
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

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full h-28 p-2.5 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-orange-400 outline-none text-xs"
          placeholder="Share details of your experience..."
          maxLength={500}
        />

        <p className="text-gray-400 text-[11px] mt-0.5 text-right">
          {review.length}/500 characters
        </p>
      </div>

      {/* Submit */}
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
