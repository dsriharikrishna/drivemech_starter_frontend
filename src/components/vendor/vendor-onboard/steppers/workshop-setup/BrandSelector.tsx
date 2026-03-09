"use client";

import React, { useCallback } from "react";
import { Car } from "lucide-react";

import { brandsData, Brand } from "./workshopData";

interface BrandSelectorProps {
  selectedBrands: string[];
  onBrandToggle: (brandId: string) => void;
  onSelectAll: () => void;
}

const BrandSelector: React.FC<BrandSelectorProps> = ({
  selectedBrands,
  onBrandToggle,
  onSelectAll,
}) => {
  // Brand data with logos
  const brands = brandsData;

  const isBrandSelected = useCallback(
    (brandId: string) => {
      return selectedBrands.includes(brandId);
    },
    [selectedBrands]
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car size={20} className="text-gray-600" />
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Select Brand For Bulk Pricing
            </p>
            <p className="text-xs text-gray-500">
              First, select the brands you service. Then, you can add bulk
              pricing for them.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onSelectAll}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium border border-orange-600 px-2 py-1 rounded cursor-pointer"
        >
          Select All
        </button>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {brands.map((brand) => (
          <button
            key={brand.id}
            type="button"
            onClick={() => onBrandToggle(brand.id)}
            className={`relative flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
              isBrandSelected(brand.id)
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            {/* Brand Logo */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.innerHTML = `<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-semibold">${brand.name.substring(0, 2).toUpperCase()}</div>`;
                }}
              />
            </div>

            {/* Brand Name */}
            <span className="text-xs text-gray-700 mt-1 text-center">
              {brand.name}
            </span>

            {/* Selection Checkmark */}
            {isBrandSelected(brand.id) && (
              <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            )}
          </button>
        ))}

        {/* Others Option */}
        <button
          type="button"
          onClick={() => onBrandToggle("others")}
          className={`relative flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
            isBrandSelected("others")
              ? "border-green-500 bg-green-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-semibold">
              +
            </div>
          </div>
          <span className="text-xs text-gray-700 mt-1 text-center">Others</span>

          {isBrandSelected("others") && (
            <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default BrandSelector;
