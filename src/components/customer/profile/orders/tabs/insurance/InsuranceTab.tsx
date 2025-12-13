"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function InsuranceTab() {
  const router = useRouter();

  const insurancePolicies = [
    {
      id: "INS-001",
      vehicle: "Toyota Hilux 2021",
      plate: "ABC-1234",
      image: "/images/workshop/car.png",
      provider: "GEICO",
      type: "Comprehensive",
      validTill: "July 30, 2025",
      price: 249,
      status: "Active",
    },
    {
      id: "INS-002",
      vehicle: "Honda CBR 650R",
      plate: "XYZ-5678",
      image: "/images/workshop/car.png",
      provider: "AXA",
      type: "Third-Party",
      validTill: "July 30, 2025",
      price: 129,
      status: "Expiring",
    },
  ];

  const statusColors: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Expiring: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="space-y-4">
      {insurancePolicies.map((item) => (
        <div
          key={item.id}
          role="button"
          onClick={() =>
            router.push(`/customer/profile/my-orders/insurance/${item.id}`)
          }
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer"
        >
          {/* Vehicle Info Row */}
          <div className="flex items-center gap-3 mb-4">
            <Image
              src={item.image}
              width={50}
              height={50}
              alt={`${item.vehicle} image`}
              className="rounded-lg object-contain"
            />
            <div>
              <p className="font-semibold text-base text-gray-900">{item.vehicle}</p>
              <p className="text-sm text-gray-500">● {item.plate}</p>
            </div>
            <span
              className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}
            >
              {item.status}
            </span>
          </div>

          {/* Insurance Details Row */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            {/* Provider Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-orange-50 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{item.provider}</p>
                <p className="text-sm text-gray-500">{item.type}</p>
              </div>
            </div>

            {/* Valid Till */}
            <div className="text-left">
              <p className="text-sm text-gray-500">Valid till</p>
              <p className="font-semibold text-gray-900">{item.validTill}</p>
            </div>

            {/* Price */}
            <p className="text-orange-500 font-semibold text-lg">
              ${item.price}.00 / year
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
