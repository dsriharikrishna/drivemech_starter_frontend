"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

interface Review {
  name: string;
  date: string;
  rating: number;
  comment: string;
}

interface ProductTabsProps {
  product: {
    brand: string;
    rating: number;
    reviews: number;
  };
  reviewsList: Review[];
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product, reviewsList }) => {
  const [activeTab, setActiveTab] = useState<"specifications" | "reviews">(
    "specifications"
  );

  return (
    <div className="bg-white rounded-lg">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8 px-6">
          <button
            onClick={() => setActiveTab("specifications")}
            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "specifications"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "reviews"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Reviews ({product.reviews})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "specifications" ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Brand
                </h3>
                <p className="text-gray-700">{product.brand}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Category
                </h3>
                <p className="text-gray-700">Lubricants</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Overall Rating */}
            <div className="flex items-start gap-8 mb-8 pb-8 border-b">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {product.rating}
                </div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  {product.reviews} Reviews
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-600 w-8">{rating}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{
                          width: `${
                            rating === 5 ? 70 : rating === 4 ? 20 : 5
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">
                      {rating === 5 ? "70%" : rating === 4 ? "20%" : "5%"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviewsList.map((review, index) => (
                <div key={index} className="border-b pb-6 last:border-0">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {review.name}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
