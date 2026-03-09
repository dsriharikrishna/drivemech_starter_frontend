"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

interface IntegrationItem {
  name: string;
  icon: React.ReactNode;
  status: "connected" | "available";
}

interface IntegrationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: IntegrationItem[];
  iconBgColor: string;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  icon,
  title,
  description,
  items,
  iconBgColor,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-start gap-3 mb-5">
        <div className={`${iconBgColor} p-3 rounded-xl`}>{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>

      {/* Integration Items */}
      <div className="space-y-2 mb-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {item.status === "connected" ? (
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-md">
                  Connected
                </span>
              ) : (
                <span className="text-xs font-medium text-gray-400">
                  Available
                </span>
              )}
              <ChevronRight
                size={16}
                className="text-gray-400 group-hover:text-gray-600 transition-colors"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <button className="w-full px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
        View all {title} Integrations
      </button>
    </div>
  );
};

export default IntegrationCard;
