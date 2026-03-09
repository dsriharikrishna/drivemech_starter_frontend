"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CancelledOrderCard from "@/components/vendor/cancelled/CancelledOrderCard";

// Mock data for cancelled orders
const mockCancelledOrders = [
  {
    id: "1",
    orderNumber: "123456789",
    customer: {
      name: "Ramesh Babu",
      avatar: undefined,
      phone: "T809KJ0007",
      email: "ramesh@example.com",
    },
    vehicle: {
      make: "BMW",
      model: "X7",
      registration: "ABC 123 D",
      year: "2024",
      type: "SUV",
    },
    service: {
      type: "General Service",
      source: "Walk-In",
    },
    technician: {
      name: "John Doe",
      avatar: undefined,
    },
    status: "Cancelled",
    appointment: {
      date: "Thursday, Oct 15, 2024",
      time: "Walk in 3:00 PM - 5:00 PM",
    },
    services: [
      {
        sNo: 1,
        product: "Battery Replacement",
        description:
          'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
        quantity: 1,
        unitPrice: 10,
        tax: 1,
        total: 11,
      },
      {
        sNo: 2,
        product: "Roadworthy Inspection / Pink Slips",
        description:
          'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
        quantity: 1,
        unitPrice: 5,
        tax: 0.5,
        total: 5.5,
      },
      {
        sNo: 3,
        product: "Spark Plug",
        description:
          'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
        quantity: 1,
        unitPrice: 10,
        tax: 1,
        total: 11,
      },
      {
        sNo: 4,
        product: "AC Antibacterial Clean",
        description:
          'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
        quantity: 1,
        unitPrice: 5,
        tax: 0.5,
        total: 5.5,
      },
      {
        sNo: 5,
        product: "AC Compressor Relay Replacement",
        description:
          'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
        quantity: 1,
        unitPrice: 10,
        tax: 1,
        total: 11,
      },
      {
        sNo: 6,
        product: "Battery Replacement",
        description:
          'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
        quantity: 1,
        unitPrice: 0,
        tax: 0,
        total: 0,
      },
      {
        sNo: 7,
        product: "Spark Plug",
        description:
          'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
        quantity: 1,
        unitPrice: 0,
        tax: 0,
        total: 0,
      },
      {
        sNo: 8,
        product: "AC Antibacterial Clean",
        description:
          'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
        quantity: 1,
        unitPrice: 0,
        tax: 0,
        total: 0,
      },
    ],
    cancellationReason: "",
  },
];

// Create 15 orders for the grid (reusing the same data)
const orders = Array.from({ length: 15 }, (_, i) => ({
  ...mockCancelledOrders[0],
  id: `${i + 1}`,
  orderNumber: `12345${6789 + i}`,
}));

const CancelledPage = () => {
  const router = useRouter();

  const handleViewDetails = (orderId: string) => {
    router.push(`/vendor/operations/transaction-center/cancelled/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Orders Grid View */}
      <div className="px-2 py-4">
        {/* Section Header */}
        <div className="bg-gray-800 text-white rounded-lg px-6 py-3 mb-6">
          <h2 className="text-base font-medium">Cancelled Orders</h2>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {orders.map((order) => (
            <CancelledOrderCard
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

export default CancelledPage;
