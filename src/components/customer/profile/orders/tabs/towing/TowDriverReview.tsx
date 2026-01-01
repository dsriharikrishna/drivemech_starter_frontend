"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import CommonTextArea from "@/components/forms/CommonTextArea";

const likeTags = [
  "On Time",
  "Professional Driver",
  "Friendly Service",
  "Clean Truck",
  "Fair Pricing",
  "Helpful",
  "Quick Response",
  "Careful Handling",
];

export default function TowDriverReview({
  onClose,
  onSubmitted,
  driver = {
    name: "John Smith",
    avatar: "/images/driver.jpg",
    rating: 4.8,
    trips: 342,
  },
}: {
  onClose: () => void;
  onSubmitted: () => void;
  driver?: { name: string; avatar: string; rating: number; trips: number };
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const submitReview = () => {
    
    onClose();       // close rating modal
    onSubmitted();   // open ThankYou modal
  };

  return (
    <div className="w-full sm:w-2xl md:w-3xl mx-auto">
      {/* DRIVER HEADER */}
      <div className="text-center mb-6">
        <div className="mx-auto bg-orange-500 w-14 h-14 rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src={driver.avatar}
            width={60}
            height={60}
            alt="driver"
            className="rounded-full object-cover"
          />
        </div>

        <p className="text-lg font-semibold mt-3">{driver.name}</p>
        <p className="text-gray-600 text-sm">Flatbed Towing</p>
      </div>

      {/* STAR RATING */}
      <div className="border border-border rounded-xl p-6 mb-6 bg-gradient-to-b from-[#FFF8F0] to-white text-center">
        <p className="text-sm text-gray-600 mb-2">How was your experience?</p>

        <div className="flex justify-center gap-3 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={40}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`cursor-pointer transition ${
                (hover || rating) >= star
                  ? "text-orange-400 fill-orange-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-gray-500">Tap to rate</p>
      </div>

      {/* TAGS */}
      <div className="border border-border rounded-xl p-4 bg-white mb-4">
        <p className="font-medium text-sm mb-2">What did you like? (Optional)</p>

        <div className="flex flex-wrap gap-2">
          {likeTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs border transition ${
                selectedTags.includes(tag)
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* COMMENT */}
      <div className="border border-border rounded-xl p-4 bg-white">
        <CommonTextArea
          label="Write a Review (Optional)"
          name="driver_review"
          placeholder="Share details of your experience..."
          maxLength={500}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <p className="text-xs text-gray-400 text-right mt-1">
          {comment.length}/500 characters
        </p>
      </div>

      {/* SUBMIT */}
      <button
        onClick={submitReview}
        disabled={rating === 0}
        className={`w-full mt-3 py-1.5 rounded-xl text-white font-semibold transition ${
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
