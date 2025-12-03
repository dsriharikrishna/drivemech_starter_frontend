"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const GARAGE_ICON = "/mnt/data/9390e684-2a79-4ab6-af47-66c43268816f.png";

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

export default function WriteSpareReview({ orderId = "SPR-001", onClose }: { orderId?: string; onClose?: () => void }) {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [review, setReview] = useState("");

  const toggleTag = (t: string) => {
    setSelectedTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const submit = async () => {
    if (rating === 0) {
      alert("Please rate before submitting");
      return;
    }

    // stubbed api
    console.log("Submitting review:", { orderId, rating, selectedTags, review });
    // show confirmation / close modal
    alert("Thanks! Your review has been submitted.");
    onClose?.();
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden">
          <Image src={GARAGE_ICON} width={40} height={40} alt="garage" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">A to Z Garage</h3>
          <p className="text-sm text-gray-500">Order: {orderId} • Periodic Maintenance</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center mb-6">
        <p className="text-sm font-medium mb-2">How was your experience?</p>
        <div className="flex justify-center gap-3 mb-2">
          {[1,2,3,4,5].map(s => (
            <Star
              key={s}
              size={36}
              onClick={() => setRating(s)}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              className={`cursor-pointer transition ${((hover || rating) >= s) ? "text-orange-400 fill-orange-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500">Tap to rate</p>
      </div>

      <div className="mb-4">
        <p className="font-medium mb-2">What did you like? (Optional)</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className={`px-3 py-1 rounded-full text-sm border transition ${selectedTags.includes(t) ? "bg-orange-500 text-white border-orange-500" : "bg-gray-100 text-gray-700 border-gray-200"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="font-medium mb-2">Write a Review (Optional)</p>
        <textarea
          value={review}
          onChange={e => setReview(e.target.value)}
          placeholder="Share details of your experience..."
          maxLength={500}
          className="w-full h-32 p-3 border rounded-xl resize-none focus:ring-2 focus:ring-orange-400"
        />
        <p className="text-xs text-gray-400 text-right mt-1">{review.length}/500 characters</p>
      </div>

      <div className="flex gap-3">
        <button onClick={submit} className={`flex-1 py-3 rounded-xl font-semibold text-white ${rating === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}>
          Submit Rating
        </button>
        <button onClick={onClose} className="flex-1 border rounded-xl py-3 font-semibold hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </div>
  );
}
