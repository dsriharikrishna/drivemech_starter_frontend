"use client";

import { Download } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

export default function TowInvoice({
  orderId = "TOW-001",
}: {
  orderId?: string;
}) {
  const handleDownload = useCallback(() => {
    alert("Downloading invoice...");
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-xl border">
      <div className="text-center mb-3">
        <Image
          src="/images/logo.png"
          width={80}
          height={80}
          alt="Logo"
          className="mx-auto mb-2"
        />
        <h2 className="text-lg font-bold">Towing Invoice</h2>
        <p className="text-xs text-gray-500">Order ID: {orderId}</p>
      </div>

      <div className="border-t border-b py-3 mb-3 space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Pickup Location:</span>
          <span className="font-medium">123 Main St, Downtown</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Drop Location:</span>
          <span className="font-medium">A to Z Garage</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Distance:</span>
          <span className="font-medium">12.5 km</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Date:</span>
          <span className="font-medium">28 July 2025, 4:45 PM</span>
        </div>
      </div>

      <div className="space-y-1.5 text-xs mb-3">
        <div className="flex justify-between">
          <span>Base Fare</span>
          <span>$50.00</span>
        </div>
        <div className="flex justify-between">
          <span>Distance Charge</span>
          <span>$25.00</span>
        </div>
        <div className="flex justify-between">
          <span>Service Fee</span>
          <span>$10.00</span>
        </div>
        <div className="flex justify-between font-semibold text-base border-t pt-1.5 mt-1.5">
          <span>Total</span>
          <span className="text-orange-500">$85.00</span>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-1.5 text-xs"
      >
        <Download size={16} />
        Download Invoice
      </button>
    </div>
  );
}
