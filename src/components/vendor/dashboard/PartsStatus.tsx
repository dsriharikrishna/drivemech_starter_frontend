"use client";

import React from "react";
import { Package } from "lucide-react";

interface StatusItem {
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
}

const PartsStatus: React.FC = () => {
  const statusItems: StatusItem[] = [
    {
      label: "Packing",
      value: 15,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      label: "Out for Delivery",
      value: 22,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      label: "Delivered",
      value: 48,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      label: "Returned",
      value: 3,
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <Package size={18} className="text-blue-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Parts Status</h3>
      </div>

      {/* Status Items */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statusItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between gap-2 border border-gray-200 rounded-lg p-3"
          >
            <div className="text-sm text-gray-600">{item.label}</div>
            <div
              className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center`}
            >
              <span className={`text-xl font-bold ${item.textColor}`}>
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartsStatus;
