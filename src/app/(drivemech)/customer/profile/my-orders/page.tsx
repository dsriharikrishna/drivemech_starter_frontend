"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const tabs = [
  { label: "Services", path: "/customer/profile/my-orders/services" },
  { label: "Spares", path: "/customer/profile/my-orders/spares" },
  { label: "Towing", path: "/customer/profile/my-orders/towing" },
  { label: "Insurance", path: "/customer/profile/my-orders/insurance" },
];

export default function OrdersTabs() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;

        return (
          <button
            key={tab.label}
            onClick={() => router.push(tab.path)}
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 text-sm transition
              ${
                isActive
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
