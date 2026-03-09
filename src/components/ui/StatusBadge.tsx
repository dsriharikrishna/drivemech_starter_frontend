import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: "green" | "yellow" | "gray" | "red" | "blue" | "orange" | "purple" | "indigo";
}

export default function StatusBadge({
  status,
  label,
  size = "md",
  className,
  color,
}: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  const colorMap: Record<string, string> = {
    active: "bg-green-100 text-green-700 border-green-300",
    completed: "bg-green-100 text-green-700 border-green-300",
    success: "bg-green-100 text-green-700 border-green-300",
    verified: "bg-green-100 text-green-700 border-green-300",

    pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    awaiting: "bg-yellow-100 text-yellow-700 border-yellow-300",
    inprogress: "bg-yellow-100 text-yellow-700 border-yellow-300",
    "in-progress": "bg-yellow-100 text-yellow-700 border-yellow-300",

    inactive: "bg-gray-100 text-gray-700 border-gray-300",
    disabled: "bg-gray-100 text-gray-700 border-gray-300",
    archived: "bg-gray-100 text-gray-700 border-gray-300",

    failed: "bg-red-100 text-red-700 border-red-300",
    error: "bg-red-100 text-red-700 border-red-300",
    rejected: "bg-red-100 text-red-700 border-red-300",
    cancelled: "bg-red-100 text-red-700 border-red-300",

    approved: "bg-blue-100 text-blue-700 border-blue-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
    review: "bg-blue-100 text-blue-700 border-blue-300",

    warning: "bg-orange-100 text-orange-700 border-orange-300",

    draft: "bg-purple-100 text-purple-700 border-purple-300",
    new: "bg-purple-100 text-purple-700 border-purple-300",

    processing: "bg-indigo-100 text-indigo-700 border-indigo-300",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  const badgeClasses =
    colorMap[normalized] || "bg-blue-100 text-blue-700 border-blue-300";

  return (
    <span
      className={cn(
        "font-medium border rounded-lg inline-block",
        sizeClasses[size],
        badgeClasses,
        className,
        color === "green" && "bg-green-100 text-green-700 border-green-300",
        color === "yellow" && "bg-yellow-100 text-yellow-700 border-yellow-300",
        color === "gray" && "bg-gray-100 text-gray-700 border-gray-300",
        color === "red" && "bg-red-100 text-red-700 border-red-300",
        color === "blue" && "bg-blue-100 text-blue-700 border-blue-300",
        color === "orange" && "bg-orange-100 text-orange-700 border-orange-300",
        color === "purple" && "bg-purple-100 text-purple-700 border-purple-300",
        color === "indigo" && "bg-indigo-100 text-indigo-700 border-indigo-300",
      )}
    >
      {label || status}
    </span>
  );
}

//USAGE
//  <div className="space-y-4">
//   {/* ... existing usage comments ... */}
// </div>
