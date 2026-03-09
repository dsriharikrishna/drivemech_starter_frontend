"use client";

import React from "react";
import { Star, User } from "lucide-react";

interface Review {
  id: string;
  userName: string;
  rating: number;
  serviceName: string;
  comment: string;
  timeAgo: string;
}

const defaultReviews: Review[] = [
  {
    id: "1",
    userName: "Ahmed Al-Sayed",
    rating: 5,
    serviceName: "Air Conditioning Service",
    comment:
      "Excellent service! My AC is now cooling like brand new. The technician was professional and explained everything clearly. Highly recommended!",
    timeAgo: "2 days ago",
  },
  {
    id: "2",
    userName: "Sarah Johnson",
    rating: 5,
    serviceName: "Air Conditioning Service",
    comment:
      "Very satisfied with the AC service. The cooling improved dramatically. Professional team and fair pricing. Will definitely use DriveMech again.",
    timeAgo: "1 week ago",
  },
  {
    id: "3",
    userName: "Mohammed Hassan",
    rating: 4,
    serviceName: "Air Conditioning Service",
    comment:
      "Good service overall. The AC works much better now. Took slightly longer than expected but the result was worth it. Great value for money.",
    timeAgo: "2 weeks ago",
  },
  {
    id: "4",
    userName: "Emily Rodriguez",
    rating: 5,
    serviceName: "Air Conditioning Service",
    comment:
      "Outstanding experience! The real-time updates were helpful, and the technician was very knowledgeable. AC cooling is perfect now.",
    timeAgo: "3 weeks ago",
  },
];

interface CustomerReviewsProps {
  reviews?: Review[];
  overallRating?: number;
  reviewCount?: number;
}

export default function CustomerReviews({
  reviews = defaultReviews,
  overallRating = 4.7,
  reviewCount = 287,
}: CustomerReviewsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "fill-orange-500 text-orange-500"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Customer Reviews
          </h3>
          <p className="text-sm text-gray-600">
            What our customers say about this service
          </p>
        </div>

        {/* Overall Rating */}
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl font-bold text-gray-900">
              {overallRating}
            </span>
            <div className="flex">{renderStars(Math.round(overallRating))}</div>
          </div>
          <p className="text-xs text-gray-600">{reviewCount} reviews</p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-100 rounded-xl p-4 hover:border-orange-200 transition-colors"
          >
            {/* User Info */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {review.userName}
                  </h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">{review.timeAgo}</span>
            </div>

            {/* Service Name */}
            <p className="text-xs text-gray-600 mb-2">{review.serviceName}</p>

            {/* Comment */}
            <p className="text-sm text-gray-700 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
