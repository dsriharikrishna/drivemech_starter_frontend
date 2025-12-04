"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function TowInvoice({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 pb-10 rounded-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Invoice</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      {/* COMPANY INFO */}
      <div className="border rounded-xl p-4 mb-6">
        <p className="font-semibold text-gray-800">DriveMech Towing Services</p>
        <p className="text-sm text-gray-500">123 Auto Street, Hyderabad</p>
        <p className="text-sm text-gray-500">GSTIN: 29ABCDE1234F1Z9</p>
      </div>

      {/* ORDER INFO */}
      <div className="border rounded-xl p-4 mb-6">
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">Tow Request ID</p>
          <p className="font-semibold">TOW-001</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-sm text-gray-600">Date</p>
          <p className="font-medium">28 July 2025</p>
        </div>
      </div>

      {/* BILLING DETAILS */}
      <div className="border rounded-xl p-4 mb-6">
        <h3 className="font-semibold mb-3">Billing Details</h3>

        <div className="flex justify-between text-sm py-1">
          <span>Base Fare</span>
          <span>$60.00</span>
        </div>

        <div className="flex justify-between text-sm py-1">
          <span>Distance Charges</span>
          <span>$20.00</span>
        </div>

        <div className="flex justify-between text-sm py-1">
          <span>Service Fee</span>
          <span>$5.00</span>
        </div>

        <div className="border-t my-3"></div>

        <div className="flex justify-between text-lg font-semibold text-orange-500">
          <span>Total Paid</span>
          <span>$85.00</span>
        </div>
      </div>

      {/* DRIVER DETAILS */}
      <div className="border rounded-xl p-4 mb-6">
        <h3 className="font-semibold mb-3">Driver Details</h3>

        <div className="flex items-center gap-3">
          <Image
            src="/images/driver.jpg"
            width={55}
            height={55}
            alt="driver"
            className="rounded-full object-cover"
          />

          <div>
            <p className="font-semibold">John Smith</p>
            <p className="text-gray-600 text-sm">
              ⭐ 4.8 • Heavy Duty Tow Truck
            </p>
          </div>
        </div>
      </div>

      {/* DOWNLOAD BUTTON */}
      <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold">
        Download PDF
      </button>
    </div>
  );
}
