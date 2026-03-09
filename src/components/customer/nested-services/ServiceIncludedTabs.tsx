"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

interface ServiceIncludedTabsProps {
  includedServices: string[];
  notIncludedServices: string[];
}

export default function ServiceIncludedTabs({
  includedServices,
  notIncludedServices,
}: ServiceIncludedTabsProps) {
  const [activeTab, setActiveTab] = useState<"included" | "notIncluded">(
    "included"
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("included")}
          className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
            activeTab === "included"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          What's Included
        </button>
        <button
          onClick={() => setActiveTab("notIncluded")}
          className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
            activeTab === "notIncluded"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          What's Not Included
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <h3 className="text-base font-bold text-gray-900 mb-4">
          Services Included in This Package
        </h3>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === "included"
            ? includedServices.map((service, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{service}</span>
                </div>
              ))
            : notIncludedServices.map((service, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{service}</span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
