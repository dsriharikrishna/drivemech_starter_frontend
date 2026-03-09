"use client";

import React from "react";
import { useRouter } from "next/navigation";
import NextDayDeliveryCard from "@/components/vendor/next-day-delivery/NextDayDeliveryCard";

// Mock data for next day delivery orders
const mockOrders = [
  {
    id: "1",
    orderNumber: "123456789",
    customer: {
      name: "Ramesh Babu",
      avatar: undefined,
    },
    vehicle: {
      make: "BMW",
      model: "X7",
      registration: "ABC 123 D",
    },
    technician: {
      name: "John",
      avatar: undefined,
    },
    status: "Next Day Delivery",
  },
];

// Create 15 orders for the grid (reusing the same data)
const orders = Array.from({ length: 15 }, (_, i) => ({
  ...mockOrders[0],
  id: `${i + 1}`,
  orderNumber: `12345${6789 + i}`,
}));

const NextDayDeliveryPage = () => {
  const router = useRouter();

  const handleViewDetails = (orderId: string) => {
    router.push(
      `/vendor/operations/transaction-center/next-day-delivery/${orderId}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Orders Grid View */}
      <div className="px-2 py-2">
        {/* Section Header */}
        <div className="bg-gray-800 text-white rounded-lg px-2 py-2 mb-2">
          <h2 className="text-base font-medium">Next Day Delivery</h2>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {orders.map((order) => (
            <NextDayDeliveryCard
              key={order.id}
              order={order}
              onViewDetails={() => handleViewDetails(order.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NextDayDeliveryPage;
