import React from "react";

interface StatusBadgeProps {
  status: string;
  color?: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  const colorMap: Record<string, string> = {
    active: "bg-green-100 text-green-700 border-green-300",
    completed: "bg-green-100 text-green-700 border-green-300",
    success: "bg-green-100 text-green-700 border-green-300",

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

  const badgeClasses = colorMap[normalized] 
    || "bg-blue-100 text-blue-700 border-blue-300"; 

  return (
    <span
      className={`px-3 py-1 text-xs font-medium border rounded-full ${badgeClasses}`}
    >
      {status}
    </span>
  );
}

//USAGE
//  <div className="space-y-4">

//   {/* 🟢 SUCCESS */}
//   <div className="flex gap-3 flex-wrap">
//     <StatusBadge status="active" />
//     <StatusBadge status="completed" />
//     <StatusBadge status="success" />
//   </div>

//   {/* 🟡 PENDING / PROGRESS */}
//   <div className="flex gap-3 flex-wrap">
//     <StatusBadge status="pending" />
//     <StatusBadge status="awaiting" />
//     <StatusBadge status="in-progress" />
//     <StatusBadge status="inprogress" />
//   </div>

//   {/* ⚪ INACTIVE */}
//   <div className="flex gap-3 flex-wrap">
//     <StatusBadge status="inactive" />
//     <StatusBadge status="disabled" />
//     <StatusBadge status="archived" />
//   </div>

//   {/* 🔴 ERROR / FAILED */}
//   <div className="flex gap-3 flex-wrap">
//     <StatusBadge status="failed" />
//     <StatusBadge status="error" />
//     <StatusBadge status="rejected" />
//     <StatusBadge status="cancelled" />
//   </div>

//   {/* 🔵 INFO */}
//   <div className="flex gap-3 flex-wrap">
//     <StatusBadge status="info" />
//     <StatusBadge status="approved" />
//     <StatusBadge status="review" />
//   </div>

//   {/* 🟠 WARNING */}
//   <div className="flex gap-3 flex-wrap">
//     <StatusBadge status="warning" />
//   </div>

//   {/* 🟣 DRAFT / NEW */}
//   <div className="flex gap-3 flex-wrap">
//     <StatusBadge status="draft" />
//     <StatusBadge status="new" />
//   </div>

//   {/* 🔄 PROCESSING */}
//   <div className="flex gap-3 flex-wrap">
//     <StatusBadge status="processing" />
//   </div>

//   {/* 🔵 FALLBACK */}
//   <div className="flex gap-3 flex-wrap">
//     <StatusBadge status="unknown" />
//     <StatusBadge status="anything" />
//   </div>

// </div>
