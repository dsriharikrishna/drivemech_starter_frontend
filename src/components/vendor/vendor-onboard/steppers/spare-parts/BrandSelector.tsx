"use client";

import React from "react";
import { Brand } from "./types";

interface BrandSelectorProps {
  brands: Brand[];
  selectedBrands: string[];
  onToggleBrand: (brandId: string) => void;
}

const BrandSelector: React.FC<BrandSelectorProps> = ({
  brands,
  selectedBrands,
  onToggleBrand,
}) => {
  return (
    <div>
      {/* Brands Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-4">
        {brands.map((brand) => (
          <button
            key={brand.id}
            type="button"
            onClick={() => onToggleBrand(brand.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${selectedBrands.includes(brand.id)
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 bg-white hover:border-gray-300"
              }`}
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs font-medium text-gray-700">
              {brand.name}
            </span>
          </button>
        ))}
      </div>

      {/* Others Button */}
      <button
        type="button"
        className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
      >
        Others
      </button>
    </div>
  );
};

export default BrandSelector;
