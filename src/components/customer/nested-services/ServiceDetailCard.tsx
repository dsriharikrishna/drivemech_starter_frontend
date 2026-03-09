"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { Check, ShoppingCart, ChevronUp } from "lucide-react";
import ServiceHero from "./ServiceHero";
import ServiceIncludedTabs from "./ServiceIncludedTabs";
import ServiceProcess from "./ServiceProcess";
import WhyChooseUs from "./WhyChooseUs";
import CustomerReviews from "./CustomerReviews";
import ServiceFAQ from "./ServiceFAQ";

/* ---------------- TYPES ---------------- */

export interface ServiceFeature {
  id: string;
  name: string;
  included: boolean;
}

export interface ServiceBadge {
  icon: string | React.ReactNode;
  label: string;
  value: string;
}

export interface ServiceDetailCardProps {
  id: string;
  title: string;
  image: string;
  badges: ServiceBadge[];
  features: ServiceFeature[];
  price?: number;
  totalFeatures?: number;
  includedServices?: string[];
  notIncludedServices?: string[];
  onAddToCart?: (serviceId: string) => void;
  className?: string;
}

/* ---------------- COMPONENT ---------------- */

export default function ServiceDetailCard({
  id,
  title,
  image,
  badges,
  features,
  price,
  totalFeatures,
  includedServices = [],
  notIncludedServices = [],
  onAddToCart,
  className = "",
}: ServiceDetailCardProps) {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const displayedFeatures = showAllFeatures ? features : features.slice(0, 4);
  const remainingCount = totalFeatures ? totalFeatures - features.length : 0;

  const handleAddToCart = useCallback(() => {
    if (onAddToCart) {
      onAddToCart(id);
    }
  }, [onAddToCart, id]);

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
    >
      {/* Show compact card when NOT expanded */}
      {!showDetails && (
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          {/* LEFT SECTION - Image */}
          <div className="flex-shrink-0 w-full lg:w-[160px]">
            <div className="relative w-full h-[160px] rounded-2xl overflow-hidden bg-gray-100">
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
          </div>

          {/* RIGHT SECTION - Details */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Title */}
            <h3 className="text-base font-bold text-gray-900 mb-3">{title}</h3>

            {/* Badges - Single Row */}
            <div className="flex flex-wrap gap-4 mb-4">
              {badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    {typeof badge.icon === "string" ? (
                      // Check if it's a valid image path (starts with / or http)
                      badge.icon.startsWith("/") ||
                      badge.icon.startsWith("http") ? (
                        <Image
                          src={badge.icon}
                          alt={badge.label}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-xl">{badge.icon}</span>
                      )
                    ) : (
                      badge.icon
                    )}
                  </div>
                  {/* Text */}
                  <div className="flex flex-col">
                    <p className="text-[11px] font-semibold text-gray-900 leading-tight whitespace-nowrap">
                      {badge.value}
                    </p>
                    <p className="text-[9px] text-gray-600 leading-tight whitespace-nowrap">
                      {badge.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* What's Included Section */}
            <div className="mb-4">
              <h4 className="text-xs font-bold text-gray-900 mb-2">
                What's included:
              </h4>

              {/* Features Grid - 4 Columns */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-1.5">
                {displayedFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    <span className="text-[11px] text-gray-700 leading-tight">
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* View All Link */}
              {!showDetails && remainingCount > 0 && (
                <button
                  onClick={() => setShowDetails(true)}
                  className="mt-2 text-xs text-orange-500 hover:text-orange-600 font-base transition-colors py-1 cursor-pointer"
                >
                  View All {remainingCount}+ More
                </button>
              )}
            </div>

            {/* Price & Add to Cart Button */}
            <div className="flex items-center justify-between mt-auto pt-3">
              {/* Price */}
              {price && (
                <div className="text-lg font-bold text-gray-900">
                  ${price.toFixed(2)}
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-4 py-2 
                                     bg-white border-2 border-orange-500 text-orange-500 
                                     rounded-xl font-medium text-sm
                                     hover:bg-orange-50 active:scale-95 transition-all duration-200
                                     ml-auto cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show expanded view when details are visible */}
      {showDetails && (
        <div className="space-y-3">
          {/* View Less Button - Top */}
          <div className="px-4 pt-4 flex justify-end">
            <button
              onClick={() => setShowDetails(false)}
              className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 font-medium transition-colors"
            >
              <ChevronUp className="w-4 h-4 font-bold" size={16} />
              <span className="text-xs font-bold">View Less</span>
            </button>
          </div>

          <ServiceHero
            title={title}
            image={image}
            badges={badges}
            features={features}
            price={price || 0}
            onAddToCart={handleAddToCart}
          />
          <div className="px-4 pb-4 space-y-3">
            <ServiceIncludedTabs
              includedServices={includedServices}
              notIncludedServices={notIncludedServices}
            />
            <ServiceProcess />
            <WhyChooseUs />
            <CustomerReviews />
            <ServiceFAQ />
          </div>

          {/* View Less Button - Bottom */}
          <div className="px-4 pb-4 flex justify-end">
            <button
              onClick={() => setShowDetails(false)}
              className="flex items-center gap-1.5 text-orange-500 hover:text-orange-600 font-medium transition-colors"
            >
              <ChevronUp className="w-4 h-4 font-bold" size={16} />
              <span className="text-xs font-bold">View Less</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
