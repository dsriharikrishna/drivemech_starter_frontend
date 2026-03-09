"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import {
  SmoothLandingBox,
} from "@/components/animations/SmoothLandingBox";

// Mock data for Mercedes-Benz models
const MERCEDES_MODELS = {
  "A - Class Limousine": [
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
  ],
  "B - Class": [
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
  ],
  "C - Class": [
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
  ],
  "E - Class": [
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
  ],
  "E - Class Estate": [
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
  ],
  "AMG Cla": [
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
    "Mercedes B162 2000 - 2007",
    "Mercedes B 90 2000 - 2007",
  ],
};

const BrandsListLayout = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <SmoothLandingBox variant="fade" duration={0.6}>
        <div className="border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-4">
              {/* Back Button and Brand */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push("/spare-parts/products")}
                  className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>

                {/* Brand Logo and Name */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    {/* Mercedes Logo Placeholder */}
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                    Mercedes-Benz
                  </h1>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search your vehicle"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-900 text-white rounded">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SmoothLandingBox>

      {/* Content */}
      <SmoothLandingBox variant="slide-up" delay={0.1} distance={30}>
        <div className="container mx-auto px-4 py-6">
          {Object.entries(MERCEDES_MODELS).map(([className, models]) => (
            <div key={className} className="mb-8">
              {/* Class Title */}
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Mercedes-Benz {className}
              </h2>

              {/* Models Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {models.map((model, index) => (
                  <button
                    key={`${className}-${index}`}
                    onClick={() =>
                      router.push(
                        `/spare-parts/products?model=${encodeURIComponent(model)}`
                      )
                    }
                    className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all group"
                  >
                    {/* Car Icon */}
                    <div className="w-8 h-8 flex-shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-full h-full text-gray-600 group-hover:text-blue-600"
                      >
                        <path
                          d="M5 13l1.5-4.5h11L19 13M5 13v5a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-5M5 13h14M7 16h.01M17 16h.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Model Name */}
                    <span className="text-xs text-gray-700 group-hover:text-blue-600 line-clamp-2 flex-1">
                      {model}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SmoothLandingBox>
    </div>
  );
};

export default BrandsListLayout;
