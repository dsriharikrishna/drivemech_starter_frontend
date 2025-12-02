"use client";

import { useState } from "react";
import RateSubmitted from "./RateSubmitted";

interface Props {
  onClose: () => void;
}

export default function RateServiceModal({ onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [review, setReview] = useState("");

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

  function toggleTag(tag: string) {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  if (submitted) return <RateSubmitted onDone={onClose} />;

  return (
    <div className="bg-white w-full max-w-[600px] rounded-2xl p-6 space-y-6 shadow-lg">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Rate Your Experience</h3>

        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl leading-none w-8 h-8 flex items-center justify-center"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* WORKSHOP INFO */}
      <div className="text-center space-y-1">
        <div className="w-14 h-14 bg-orange-500 text-white rounded-full grid place-items-center mx-auto text-2xl">
          🛠️
        </div>
        <p className="font-semibold">A to Z Garage</p>
        <p className="text-gray-500 text-sm">Periodic Maintenance</p>
      </div>

      {/* STARS */}
      <div className="bg-orange-50 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-600 mb-3">How was your experience?</p>

        <div className="flex justify-center gap-3 text-3xl cursor-pointer">
          {[1, 2, 3, 4, 5].map(num => (
            <span
              key={num}
              onClick={() => setRating(num)}
              className={
                num <= rating
                  ? "text-orange-500 transition"
                  : "text-gray-300 transition"
              }
            >
              ★
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-3">Tap to rate</p>
      </div>

      {/* TAGS */}
      <div>
        <p className="text-sm font-semibold mb-2">What did you like? (Optional)</p>

        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm border hover:bg-gray-100 transition ${
                selectedTags.includes(tag)
                  ? "bg-orange-100 border-orange-400 text-orange-700"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* REVIEW FIELD */}
      <div>
        <p className="text-sm font-semibold mb-1">Write a Review (Optional)</p>

        <textarea
          rows={4}
          value={review}
          onChange={e => setReview(e.target.value)}
          placeholder="Share details of your experience..."
          className="w-full border rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-orange-400 outline-none"
        />

        <p className="text-xs text-gray-500 mt-1">
          {review.length}/500 characters
        </p>
      </div>

      {/* SUBMIT */}
      <button
        onClick={() => setSubmitted(true)}
        className="w-full bg-gray-100 py-3 rounded-lg hover:bg-gray-200 transition font-medium"
      >
        Submit Rating
      </button>
    </div>
  );
}
