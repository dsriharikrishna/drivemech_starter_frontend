"use client";

import Avatar from "@/components/ui/Avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useCallback } from "react";

export default function InsuranceTab() {
  const router = useRouter();

  const insurancePolicies = useMemo(
    () => [
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
    ],
    []
  );

  const statusColors: Record<string, string> = useMemo(
    () => ({
      Active: "bg-green-100 text-green-700",
      Expiring: "bg-yellow-100 text-yellow-700",
    }),
    []
  );

  const handlePolicyClick = useCallback(
    (id: string) => {
      router.push(`/customer/profile/my-orders/insurance/${id}`);
    },
    [router]
  );

  return (
    <div className="space-y-3">
      {insurancePolicies.map((item) => (
        <div
          key={item.id}
          role="button"
          onClick={() => handlePolicyClick(item.id)}
          className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col gap-4"
        >
          {/* Vehicle Info Row */}
          <div className="flex items-center gap-2.5">
            <Avatar
              src={item.image}
              alt={`${item.vehicle} image`}
              className="rounded-lg object-contain"
            />
            <div>
              <p className="font-semibold text-xs text-gray-900">
                {item.vehicle}
              </p>
              <p className="text-xs text-gray-500">● {item.plate}</p>
            </div>
            <span
              className={`ml-auto px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusColors[item.status]}`}
            >
              {item.status}
            </span>
          </div>

          {/* Insurance Details Row */}
          <div className="flex flex-wrap items-center gap-3 border-t border-gray-200 pt-2">
            {/* Provider Info */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 flex items-center justify-center bg-orange-50 rounded-lg flex-shrink-0">
                <Avatar
                  src="/svgs/policy-shield-icon.svg"
                  alt="Insurance Shield"
                  className="w-5 h-5"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-xs">
                  {item.provider}
                </p>
                <p className="text-xs text-gray-500">{item.type}</p>
              </div>
            </div>

            {/* Valid Till */}
            <div className="text-left">
              <p className="text-xs text-gray-500">Valid till</p>
              <p className="font-semibold text-gray-900 text-xs">
                {item.validTill}
              </p>
            </div>

            {/* Price */}
            <p className="text-orange-500 font-semibold text-base sm:ml-auto">
              ${item.price}.00 / year
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
