"use client";

import React from "react";
import { Truck } from "lucide-react";

interface FleetStatus {
  value: number;
  label: string;
  cardBgColor: string;
  iconColor: string;
}

const TowingFleet: React.FC = () => {
  const fleetStatus: FleetStatus[] = [
    {
      value: 12,
      label: "Total Vehicles",
      cardBgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      value: 7,
      label: "Available",
      cardBgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      value: 4,
      label: "On Duty",
      cardBgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      value: 1,
      label: "Maintenance",
      cardBgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">Towing Fleet</h3>
      <p className="text-sm text-gray-600 mb-6">Vehicle availability status</p>

      {/* Fleet Status Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {fleetStatus.map((status, index) => (
          <div
            key={index}
            className={`${status.cardBgColor} rounded-2xl p-4 flex flex-col justify-between`}
          >
            <div className="text-xs text-gray-600 mb-3">{status.label}</div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-gray-900">
                {status.value}
              </div>
              <Truck size={28} className={status.iconColor} strokeWidth={2} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TowingFleet;
