"use client";

import { ArrowLeft, Clock, Package, CheckCircle2, DollarSign, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ReturnTracking({ id }: { id: string }) {
  const router = useRouter();

  // Mock Data (Later replace with API)
  const product = {
    name: "Bosch Brake Pad Set",
    brand: "Bosch",
    qty: 2,
    price: 118,
    reason: "Damaged Product",
    refundId: "RET-2024-7042",
  };

  const timeline = [
    {
      label: "Request Received",
      desc: "Your return request has been submitted",
      time: "Aug 15, 2025 at 3:45 PM",
      icon: <CheckCircle2 className="text-green-500" />,
      active: true,
    },
    {
      label: "Request Approved",
      desc: "Return request approved after review",
      time: "Aug 15, 2025 at 4:20 PM",
      icon: <CheckCircle2 className="text-green-500" />,
      active: true,
    },
    {
      label: "Pickup Scheduled",
      desc: "Pickup on Aug 18, 2025",
      time: "10:00 AM - 12:00 PM",
      icon: <Clock className="text-orange-500" />,
      active: true,
    },
    {
      label: "Item Picked Up",
      desc: "Product collected from your address",
      time: "Pending",
      icon: <Package className="text-gray-400" />,
      active: false,
    },
    {
      label: "Refund Processed",
      desc: "Amount credited to your account",
      time: "Pending",
      icon: <DollarSign className="text-gray-400" />,
      active: false,
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold">Return Tracking</h1>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT: PRODUCT + TIMELINE */}
        <div className="lg:col-span-2 space-y-6">

          {/* PRODUCT DETAILS */}
          <div className="border rounded-xl p-4 bg-white">
            <h2 className="font-semibold mb-4">Product Details</h2>

            <div className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-3">
                <Image src="/images/spares/brakepad.png" width={48} height={48} alt="product" />
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.brand} • Qty: {product.qty}</p>
                </div>
              </div>

              <button className="text-blue-600 text-sm hover:underline">
                Return for Refund
              </button>
            </div>

            <div className="flex justify-between py-3">
              <p className="text-gray-500">Reason</p>
              <p className="font-medium">{product.reason}</p>
            </div>
          </div>

          {/* TIMELINE */}
          <div className="border rounded-xl p-4 bg-white">
            <h2 className="font-semibold mb-4">Return Timeline</h2>

            <div className="space-y-6">
              {timeline.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1">{step.icon}</div>

                  <div>
                    <p className="font-semibold">{step.label}</p>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
                    <p className="text-gray-400 text-sm">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          {/* RETURN REQUEST ID */}
          <div className="border rounded-xl p-4 bg-white">
            <p className="text-sm text-gray-500">Return Request ID</p>
            <p className="text-lg font-semibold text-gray-800">{product.refundId}</p>
          </div>

          {/* PICKUP STATUS */}
          <div className="border rounded-xl p-4 bg-orange-50 border-orange-200">
            <p className="font-semibold text-orange-700">Pickup Scheduled</p>
            <p className="text-sm text-gray-700 mt-1">
              Our team will collect the item on <span className="font-semibold text-orange-800">Aug 18, 2025</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">Time Slot: 10:00 AM - 12:00 PM</p>
          </div>

          {/* REFUND INFO */}
          <div className="border rounded-xl p-4 bg-white">
            <h2 className="font-semibold mb-2">Refund Information</h2>

            <div className="flex justify-between text-sm py-1">
              <span>Refund Amount</span>
              <span className="text-green-600 font-semibold">${product.price}</span>
            </div>

            <div className="flex justify-between text-sm py-1">
              <span>Refund Method</span>
              <span className="font-medium">Original Payment Method</span>
            </div>

            <div className="flex justify-between text-sm py-1">
              <span>Processing Time</span>
              <span className="font-medium">5–7 business days</span>
            </div>

            <p className="text-xs text-gray-500 mt-3 leading-tight">
              Refund will be initiated once the product passes quality inspection
            </p>
          </div>

          {/* PICKUP INSTRUCTIONS */}
          <div className="border rounded-xl p-4 bg-blue-50">
            <p className="font-semibold mb-2">Pickup Instructions</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Keep the product ready in its original packaging</li>
              <li>• Include all accessories and documentation</li>
              <li>• Delivery partner will call before arriving</li>
              <li>• You'll receive an SMS once pickup is complete</li>
            </ul>
          </div>

          {/* ACTION BUTTONS */}
          <button className="w-full border rounded-xl py-3 hover:bg-gray-100">
            Reschedule Pickup
          </button>

          <button className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 flex items-center justify-center gap-2">
            <MessageSquare size={18} /> Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
