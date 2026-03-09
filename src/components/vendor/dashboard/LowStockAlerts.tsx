"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

interface LowStockItem {
  rank: number;
  name: string;
  status: string;
  quantity: number;
  unit: string;
  urgency: "critical" | "warning";
}

const LowStockAlerts: React.FC = () => {
  const items: LowStockItem[] = [
    {
      rank: 1,
      name: "Spark Plugs",
      status: "Out of Stock",
      quantity: 0,
      unit: "Units",
      urgency: "critical",
    },
    {
      rank: 2,
      name: "Coolant",
      status: "Low Stock",
      quantity: 8,
      unit: "Litres",
      urgency: "warning",
    },
    {
      rank: 3,
      name: "Wiper Blades",
      status: "Low Stock",
      quantity: 12,
      unit: "Pairs",
      urgency: "warning",
    },
  ];

  return (
    <div className="bg-red-50 rounded-xl p-6 shadow-sm w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
            <AlertTriangle size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Low Stock Alerts
            </h3>
            <p className="text-xs text-gray-500">
              Requires immediate attention
            </p>
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
            <div
              className={`w-10 h-10 ${item.urgency === "critical" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"} rounded-xl flex items-center justify-center font-bold text-lg`}
            >
              {item.rank}
            </div>

            {/* Item Info */}
            <div className="flex-1">
              <div className="font-semibold text-base text-gray-900">
                {item.name}
              </div>
              <div
                className={`text-sm font-medium ${item.urgency === "critical" ? "text-red-600" : "text-yellow-600"}`}
              >
                {item.status}
              </div>
            </div>

            {/* Quantity */}
            <div className="text-right">
              <div
                className={`font-bold text-lg ${item.urgency === "critical" ? "text-red-600" : "text-yellow-600"}`}
              >
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

export default LowStockAlerts;
