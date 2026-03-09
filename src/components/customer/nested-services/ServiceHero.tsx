"use client";

import React from "react";
import Image from "next/image";
import { Check, ShoppingCart } from "lucide-react";

interface ServiceBadge {
  icon: string | React.ReactNode;
  label: string;
  value: string;
}

interface ServiceFeature {
  id: string;
  name: string;
}

interface ServiceHeroProps {
  title: string;
  image: string;
  badges: ServiceBadge[];
  features: ServiceFeature[];
  price: number;
  warrantyText?: string;
  onAddToCart?: () => void;
}

export default function ServiceHero({
  title,
  image,
  badges,
  features,
  price,
  warrantyText = "500 KMS / 1 Month\nWarranty Included",
  onAddToCart,
}: ServiceHeroProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Hero Image */}
      <div className="relative w-full h-[240px] overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Badges - 4 in a row */}
        <div className="flex flex-wrap gap-6 mb-6">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2">
              {/* Icon */}
              <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center">
                {typeof badge.icon === "string" ? (
                  badge.icon.startsWith("/") ||
                  badge.icon.startsWith("http") ? (
                    <Image
                      src={badge.icon}
                      alt={badge.label}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-2xl">{badge.icon}</span>
                  )
                ) : (
                  badge.icon
                )}
              </div>
              {/* Text */}
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-900 leading-tight whitespace-nowrap">
                  {badge.value}
                </p>
                <p className="text-xs text-gray-600 leading-tight whitespace-nowrap">
                  {badge.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* What's Included Section */}
        <div className="mb-6">
          <h4 className="text-base font-bold text-gray-900 mb-3">
            What's included:
          </h4>

          {/* Features Grid - 4 columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 leading-tight">
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Price with Warranty */}
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Service Price</p>
              <p className="text-2xl font-bold text-gray-900">
                ${price.toFixed(2)}
              </p>
            </div>

            {/* Warranty Badge */}
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900 leading-tight">
                  {warrantyText.split("\n")[0]}
                </p>
                <p className="text-[10px] text-gray-600 leading-tight">
                  {warrantyText.split("\n")[1]}
                </p>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={onAddToCart}
            className="flex items-center gap-2 px-6 py-3
                                 bg-orange-500 text-white
                                 rounded-xl font-semibold text-base
                                 hover:bg-orange-600 transition-all duration-200
                                 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
