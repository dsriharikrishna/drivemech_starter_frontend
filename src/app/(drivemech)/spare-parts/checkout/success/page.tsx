"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAppSelector } from "@/store/store";

const OrderSuccessPage = () => {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.spareParts.cart.products);
  const { addressData } = useAppSelector((state) => state.sparePartsCheckout);

  // Generate random order ID
  const orderId = `DM-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  // Estimated delivery date (7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDate = deliveryDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "2-digit",
  });

  const handleCancelOrder = () => {
    console.log("Cancel order");
  };

  const handleTrackOrder = () => {
    router.push("/customer/profile/my-orders/spares");
  };

  const handleGoHome = () => {
    router.push("/spare-parts");
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Gears Icon */}
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* Outer Gear */}
              <circle
                cx="40"
                cy="40"
                r="28"
                fill="none"
                stroke="#1F2937"
                strokeWidth="3"
              />
              <circle cx="40" cy="12" r="5" fill="#1F2937" />
              <circle cx="40" cy="68" r="5" fill="#1F2937" />
              <circle cx="12" cy="40" r="5" fill="#1F2937" />
              <circle cx="68" cy="40" r="5" fill="#1F2937" />
              <circle cx="20" cy="20" r="5" fill="#1F2937" />
              <circle cx="60" cy="60" r="5" fill="#1F2937" />
              <circle cx="60" cy="20" r="5" fill="#1F2937" />
              <circle cx="20" cy="60" r="5" fill="#1F2937" />

              {/* Inner Gear */}
              <circle
                cx="75"
                cy="75"
                r="24"
                fill="none"
                stroke="#1F2937"
                strokeWidth="3"
              />
              <circle cx="75" cy="51" r="4" fill="#1F2937" />
              <circle cx="75" cy="99" r="4" fill="#1F2937" />
              <circle cx="51" cy="75" r="4" fill="#1F2937" />
              <circle cx="99" cy="75" r="4" fill="#1F2937" />
              <circle cx="60" cy="60" r="4" fill="#1F2937" />
              <circle cx="90" cy="90" r="4" fill="#1F2937" />

              {/* Checkmark Circle */}
              <circle cx="75" cy="75" r="14" fill="#06B6D4" />
              <path
                d="M69 75 L73 79 L81 71"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Thank You Message */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">
          Thanks for shopping with us!
        </h1>

        {/* Order ID */}
        <p className="text-center text-gray-600 mb-10">
          Your Order ID is :{" "}
          <span className="text-blue-600 font-semibold">{orderId}</span>
        </p>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 ${
                    index !== cartItems.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-base">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">by {item.brand}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 text-lg ml-4">
                    $ {item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Delivery Info */}
          <div className="space-y-6">
            {/* Estimated Delivery */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-base">
                Estimate Deliver
              </h3>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    {formattedDate}
                  </p>
                  <button
                    onClick={handleTrackOrder}
                    className="text-sm text-blue-600 hover:underline block"
                  >
                    Track Order
                  </button>
                  <button className="text-xs text-gray-500 hover:underline mt-1 block">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-base">
                Delivery Address
              </h3>
              {addressData && (
                <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-base">
                      {addressData.fullName}
                    </h4>
                    <button className="px-3 py-1 bg-gray-800 text-white text-xs rounded-full hover:bg-gray-700 transition-colors">
                      Change
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {addressData.addressLine1}
                    {addressData.addressLine2 &&
                      `, ${addressData.addressLine2}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addressData.city}, {addressData.state} -{" "}
                    {addressData.postcode}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Phone : {addressData.countryCode} {addressData.phoneNumber}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={handleCancelOrder}
            className="border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold"
          >
            Cancel Order
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleTrackOrder}
            className="bg-orange-500 hover:bg-orange-600 font-semibold"
          >
            Track Order
          </Button>
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={handleGoHome}
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold"
          >
            Go To Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
