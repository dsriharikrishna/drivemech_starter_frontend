"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function InsuranceTab() {
  const router = useRouter();

  const insurancePolicies = [
    {
      id: "INS-001",
      vehicle: "Toyota Hilux 2021",
      plate: "ABC-1234",
      image: "/images/vehicles/hilux-blue.png",
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
      image: "/images/vehicles/cbr650.png",
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
          className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer"
        >
          {/* TOP ROW */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                width={70}
                height={70}
                alt={`${item.vehicle} image`}
                className="rounded-lg object-contain"
              />

              <div>
                <p className="font-semibold text-lg">{item.vehicle}</p>
                <p className="text-sm text-gray-600">{item.plate}</p>
              </div>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${statusColors[item.status]}`}
            >
              {item.status}
            </span>
          </div>

          {/* INSURANCE INFO */}
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={22} className="text-orange-500" />

              <div>
                <p className="font-semibold">{item.provider}</p>
                <p className="text-sm text-gray-600">{item.type}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Valid till</p>
              <p className="font-semibold">{item.validTill}</p>
            </div>

            <p className="text-orange-500 font-semibold text-lg">
              ${item.price}.00 / year
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
