"use client";

import React from "react";

interface StatusCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  percentage?: string;
  badge?: {
    text?: string;
    color?: "green" | "orange" | "purple" | "teal";
  };
  iconBgColor: string;
}

const badgeColors: Record<string, string> = {
  green: "bg-green-500 text-white",
  orange: "bg-orange-500 text-white",
  purple: "bg-purple-500 text-white",
  teal: "bg-teal-500 text-white",
};

const StatusCard: React.FC<StatusCardProps> = ({
  icon,
  value,
  label,
  percentage,
  badge,
  iconBgColor,
}) => {
  return (
    <div
      className="
    group relative overflow-hidden
    rounded-lg bg-white px-4 py-4
    ring-1 ring-[#E3EAF5]
    shadow-sm
    cursor-pointer
    flex flex-col gap-2"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-50/60 to-transparent pointer-events-none" />
      {/* Curved background */}
      <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-[#F3F6FB] " />

      {/* Header */}
      <div className="relative flex items-center justify-start gap-2">
        {/* Icon */}
        <div
          className={`${iconBgColor} flex h-9 w-9 items-center justify-center rounded-full`}
        >
          {icon}
        </div>

        {badge?.text && (
          <span
            className={`h-7 rounded-full px-3 text-xs font-semibold leading-7 ${badgeColors[badge.color!]}`}
          >
            {badge.text}
          </span>
        )}

        {/* Badges */}
        <div className="flex gap-2">
          {percentage && (
            <span className="h-7 rounded-full bg-blue-500 px-3 text-xs font-semibold leading-7 text-white">
              {percentage}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-xl font-extrabold leading-none text-[#0F172A]">
          {value}
        </h3>
        <p className="mt-2 text-xs font-medium text-[#334155]">{label}</p>
      </div>
    </div>
  );
};

export default StatusCard;
