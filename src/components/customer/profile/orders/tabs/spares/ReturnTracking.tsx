"use client";

import {
  ArrowLeft,
  Clock,
  Package,
  CheckCircle2,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";

export default function ReturnTracking({ id }: { id: string }) {
  const router = useRouter();

  const product = useMemo(
    () => ({
      name: "Bosch Brake Pad Set",
      brand: "Bosch",
      qty: 2,
      price: 118,
      reason: "Damaged Product",
      refundId: "RET-2024-7042",
    }),
    []
  );

  const timeline = useMemo(
    () => [
      {
        label: "Request Received",
        desc: "Your return request has been submitted",
        time: "Aug 15, 2025 at 3:45 PM",
        icon: <CheckCircle2 className="text-green-500" size={18} />,
        active: true,
      },
      {
        label: "Request Approved",
        desc: "Return request approved after review",
        time: "Aug 15, 2025 at 4:20 PM",
        icon: <CheckCircle2 className="text-green-500" size={18} />,
        active: true,
      },
      {
        label: "Pickup Scheduled",
        desc: "Pickup on Aug 18, 2025",
        time: "10:00 AM - 12:00 PM",
        icon: <Clock className="text-orange-500" size={18} />,
        active: true,
      },
      {
        label: "Item Picked Up",
        desc: "Product collected from your address",
        time: "Pending",
        icon: <Package className="text-gray-400" size={18} />,
        active: false,
      },
      {
        label: "Refund Processed",
        desc: "Amount credited to your account",
        time: "Pending",
        icon: <DollarSign className="text-gray-400" size={18} />,
        active: false,
      },
    ],
    []
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="p-4 space-y-4 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={handleBack}
          className="p-1.5 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-lg font-semibold">Return Tracking</h1>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* LEFT: PRODUCT + TIMELINE */}
        <div className="lg:col-span-2 space-y-4">
          {/* PRODUCT DETAILS */}
          <div className="border rounded-xl p-3 bg-white">
            <h2 className="font-semibold mb-3 text-xs">Product Details</h2>

            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/images/spares/brakepad.png"
                  width={44}
                  height={44}
                  alt="product"
                />
                <div>
                  <p className="font-semibold text-xs">{product.name}</p>
                  <p className="text-xs text-gray-600">
                    {product.brand} • Qty: {product.qty}
                  </p>
                </div>
              </div>

              <button className="text-blue-600 text-xs hover:underline">
                Return for Refund
              </button>
            </div>

            <div className="flex justify-between py-2.5">
              <p className="text-gray-500 text-xs">Reason</p>
              <p className="font-medium text-xs">{product.reason}</p>
            </div>
          </div>

          {/* TIMELINE */}
          <div className="border rounded-xl p-3 bg-white">
            <h2 className="font-semibold mb-3 text-xs">Return Timeline</h2>

            <div className="space-y-4">
              {timeline.map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-0.5">{step.icon}</div>

                  <div>
                    <p className="font-semibold text-xs">{step.label}</p>
                    <p className="text-gray-600 text-xs">{step.desc}</p>
                    <p className="text-gray-400 text-xs">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-4">
          {/* RETURN REQUEST ID */}
          <div className="border rounded-xl p-3 bg-white">
            <p className="text-xs text-gray-500">Return Request ID</p>
            <p className="text-base font-semibold text-gray-800">
              {product.refundId}
            </p>
          </div>

          {/* PICKUP STATUS */}
          <div className="border rounded-xl p-3 bg-orange-50 border-orange-200">
            <p className="font-semibold text-orange-700 text-xs">
              Pickup Scheduled
            </p>
            <p className="text-xs text-gray-700 mt-0.5">
              Our team will collect the item on{" "}
              <span className="font-semibold text-orange-800">
                Aug 18, 2025
              </span>
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              Time Slot: 10:00 AM - 12:00 PM
            </p>
          </div>

          {/* REFUND INFO */}
          <div className="border rounded-xl p-3 bg-white">
            <h2 className="font-semibold mb-1.5 text-xs">Refund Information</h2>

            <div className="flex justify-between text-xs py-0.5">
              <span>Refund Amount</span>
              <span className="text-green-600 font-semibold">
                ${product.price}
              </span>
            </div>

            <div className="flex justify-between text-xs py-0.5">
              <span>Refund Method</span>
              <span className="font-medium">Original Payment Method</span>
            </div>

            <div className="flex justify-between text-xs py-0.5">
              <span>Processing Time</span>
              <span className="font-medium">5–7 business days</span>
            </div>

            <p className="text-[11px] text-gray-500 mt-2.5 leading-tight">
              Refund will be initiated once the product passes quality
              inspection
            </p>
          </div>

          {/* PICKUP INSTRUCTIONS */}
          <div className="border rounded-xl p-3 bg-blue-50">
            <p className="font-semibold mb-1.5 text-xs">Pickup Instructions</p>
            <ul className="text-xs text-gray-700 space-y-0.5">
              <li>• Keep the product ready in its original packaging</li>
              <li>• Include all accessories and documentation</li>
              <li>• Delivery partner will call before arriving</li>
              <li>• You'll receive an SMS once pickup is complete</li>
            </ul>
          </div>

          {/* ACTION BUTTONS */}
          <button className="w-full border rounded-xl py-2.5 hover:bg-gray-100 text-xs">
            Reschedule Pickup
          </button>

          <button className="w-full bg-orange-500 text-white py-2.5 rounded-xl hover:bg-orange-600 flex items-center justify-center gap-1.5 text-xs">
            <MessageSquare size={16} /> Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
