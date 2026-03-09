"use client";

import React from "react";
import { BarChart3 } from "lucide-react";

interface TopItem {
  rank: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
}

const TopSellingItems: React.FC = () => {
  const items: TopItem[] = [
    {
      rank: 1,
      name: "Brake Pads",
      category: "Category: Consumables",
      quantity: 342,
      unit: "Used",
    },
    {
      rank: 2,
      name: "Engine Oil",
      category: "Category: Fluids",
      quantity: 342,
      unit: "Used",
    },
    {
      rank: 3,
      name: "Air Filters",
      category: "Category: Filters",
      quantity: 342,
      unit: "Used",
    },
  ];

  return (
    <div className="bg-purple-50 rounded-xl p-6 shadow-sm w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
            <BarChart3 size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Top Selling Items
            </h3>
            <p className="text-xs text-gray-500">Most used parts</p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-blue-600 bg-blue-100 border border-blue-200 hover:text-blue-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
          View All
          <span>→</span>
        </button>
      </div>

      {/* Items List */}
      <div className="flex flex-col gap-2 mt-4">
        {items.map((item) => (
          <div
            key={item.rank}
            className="flex items-center gap-4 bg-white p-3 rounded-xl"
          >
            {/* Rank */}
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-bold text-lg">
              {item.rank}
            </div>

            {/* Item Info */}
            <div className="flex-1">
              <div className="font-semibold text-base text-gray-900">
                {item.name}
              </div>
              <div className="text-sm text-gray-500">{item.category}</div>
            </div>

            {/* Quantity */}
            <div className="text-right">
              <div className="font-bold text-lg text-gray-900">
                {item.quantity}
              </div>
              <div className="text-sm text-gray-500">{item.unit}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingItems;
