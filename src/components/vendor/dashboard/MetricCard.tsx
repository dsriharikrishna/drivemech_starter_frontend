"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  iconBgColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  value,
  label,
  trend,
  iconBgColor = "bg-orange-100",
}) => {
  const isPositive = trend?.direction === "up";
  const trendColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <div className="bg-white cursor-pointer rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-2">
        <div className={`${iconBgColor} p-3 rounded-xl`}>{icon}</div>

        {trend && (
          <div
            className={`flex items-center gap-1 ${trendColor} text-sm font-medium`}
          >
            {isPositive ? (
              <ArrowUpRight size={16} strokeWidth={2.5} />
            ) : (
              <ArrowDownRight size={16} strokeWidth={2.5} />
            )}
            <span>
              {isPositive ? "+" : ""}
              {trend.value}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold text-gray-900">{value}</h3>
        <p className="text-xs text-gray-600 font-medium">{label}</p>
      </div>
    </div>
  );
};

export default MetricCard;
