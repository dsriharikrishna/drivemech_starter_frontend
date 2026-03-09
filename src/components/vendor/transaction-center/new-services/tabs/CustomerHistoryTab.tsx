"use client";

import React from "react";
import { Calendar, FileText, Car } from "lucide-react";

const CustomerHistoryTab: React.FC = () => {
  const historyRecords = [
    {
      date: "29 Aug 2024",
      orderId: "#1234567",
      serviceSummary: "Standard Oil Change, Tire Rotation, Brake Inspection",
      vehicle: "BMW X7 (ABC 1234 D)",
      amount: 950.0,
    },
    {
      date: "15 Jul 2024",
      orderId: "#1234568",
      serviceSummary:
        "Engine Diagnostic, Air Filter Replacement, Battery Check",
      vehicle: "BMW X7 (ABC 1234 D)",
      amount: 1250.0,
    },
    {
      date: "03 Jun 2024",
      orderId: "#1234569",
      serviceSummary: "Brake Pad Replacement, Wheel Alignment, Fluid Top-up",
      vehicle: "BMW X7 (ABC 1234 D)",
      amount: 1850.0,
    },
  ];

  return (
    <div className="">
      {/* Service History Cards */}
      <div className="flex flex-col gap-4">
        {historyRecords.map((record, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 border transition-all duration-300 hover:shadow-lg ${index % 2 === 0
                ? "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"
                : "bg-white border-gray-200"
              }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Left Column - Date & Order ID */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1.5">
                    <Calendar size={16} />
                    <span className="text-xs font-medium uppercase tracking-wide">
                      Date of Service
                    </span>
                  </div>
                  <div className="text-base font-semibold text-gray-900">
                    {record.date}
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100 w-fit">
                  <FileText size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    {record.orderId}
                  </span>
                </div>
              </div>

              {/* Middle Column - Service Summary */}
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1.5">
                    Service Summary
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {record.serviceSummary}
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-100 w-fit">
                  <Car size={16} className="text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">
                    {record.vehicle}
                  </span>
                </div>
              </div>

              {/* Right Column - Invoice Amount & Action */}
              <div className="flex flex-col items-start md:items-end justify-between">
                <div className="text-left md:text-right">
                  <div className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                    Invoice Amount
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    ${record.amount.toFixed(2)}
                  </div>
                </div>
                <button className="mt-3 md:mt-0 px-5 py-2.5 bg-white border-2 border-teal-500 text-teal-600 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerHistoryTab;
