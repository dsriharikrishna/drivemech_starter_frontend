"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Star } from "lucide-react";

export default function TowDriverReview({
  onClose,
  driver = {
    name: "John Smith",
    avatar: "/images/driver.jpg",
    rating: 4.8,
    trips: 342,
  },
}: {
  onClose: () => void;
  driver?: {
    name: string;
    avatar: string;
    rating: number;
    trips: number;
  };
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const submitReview = () => {
    console.log("Driver Review Submitted:", {
      rating,
      comment,
    });
    onClose();
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-6 pb-10 rounded-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Rate Your Driver</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <X size={20} />
        </button>
      </div>

      {/* DRIVER INFO */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={driver.avatar}
          width={70}
          height={70}
          alt="driver"
          className="rounded-full object-cover"
        />

        <div>
          <p className="text-lg font-semibold">{driver.name}</p>
          <p className="text-gray-600 text-sm">
            ⭐ {driver.rating} • {driver.trips} trips
          </p>
        </div>
      </div>

      {/* STAR RATING */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={30}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className={`cursor-pointer ${
              (hover || rating) >= star
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* COMMENT BOX */}
      <label className="text-sm font-medium">Write a review (optional)</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with the driver..."
        className="w-full mt-2 p-3 border rounded-xl h-28 resize-none"
      />

      {/* SUBMIT BUTTON */}
      <button
        onClick={submitReview}
        disabled={rating === 0}
        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold transition"
      >
        Submit Review
      </button>
    </div>
  );
}
