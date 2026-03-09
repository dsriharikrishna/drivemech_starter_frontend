"use client";

import Image from "next/image";
import { Phone, Star } from "lucide-react";
import { useCallback } from "react";

export default function DriverDetailsCard() {
  const handleCall = useCallback(() => {
    window.location.href = "tel:+1234567890";
  }, []);

  return (
    <div className="border border-gray-200 rounded-xl p-3 bg-white">
      <h3 className="font-semibold mb-2.5 text-xs">Driver Details</h3>

      <div className="flex items-center gap-2.5">
        <Image
          src="/images/driver-avatar.png"
          width={44}
          height={44}
          alt="Driver"
          className="rounded-full"
        />

        <div className="flex-1">
          <p className="font-semibold text-xs">John Smith</p>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span>4.8 (245 trips)</span>
          </div>
        </div>

        <button
          onClick={handleCall}
          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
        >
          <Phone size={16} />
        </button>
      </div>

      <div className="mt-2.5 text-xs text-gray-600 space-y-0.5">
        <p>• Truck: Flatbed #FL-2024</p>
        <p>• License: ABC-123-XYZ</p>
      </div>
    </div>
  );
}
