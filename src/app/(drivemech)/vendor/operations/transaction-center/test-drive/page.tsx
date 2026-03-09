"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TestDriveCard from "@/components/vendor/test-drive/TestDriveCard";
import { SlidersHorizontal } from "lucide-react";

// Mock data for test drive orders
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
      name: "Johnson",
      avatar: undefined,
    },
    dateOfArrival: "07 May 2025",
    dateOfDelivery: "08 May 2025",
    status: "Test Drive",
  },
  {
    id: "2",
    orderNumber: "123456789",
    customer: {
      name: "Alex John",
      avatar: undefined,
    },
    vehicle: {
      make: "Defender",
      model: "",
      registration: "A 123 DE",
    },
    technician: {
      name: "Johnson",
      avatar: undefined,
    },
    dateOfArrival: "07 May 2025",
    dateOfDelivery: "08 May 2025",
    status: "Test Drive",
  },
  {
    id: "3",
    orderNumber: "123456789",
    customer: {
      name: "Jessica",
      avatar: undefined,
    },
    vehicle: {
      make: "Camry",
      model: "",
      registration: "AK 007 C",
    },
    technician: {
      name: "Johnson",
      avatar: undefined,
    },
    dateOfArrival: "07 May 2025",
    dateOfDelivery: "08 May 2025",
    status: "Test Drive",
  },
  {
    id: "4",
    orderNumber: "123456789",
    customer: {
      name: "Sanju Samson",
      avatar: undefined,
    },
    vehicle: {
      make: "BMW",
      model: "X7",
      registration: "ABC 123 D",
    },
    technician: {
      name: "Johnson",
      avatar: undefined,
    },
    dateOfArrival: "07 May 2025",
    dateOfDelivery: "08 May 2025",
    status: "Test Drive",
  },
];

// Create 15 orders for the grid (reusing the mock data)
const orders = Array.from({ length: 15 }, (_, i) => ({
  ...mockOrders[i % mockOrders.length],
  id: `${i + 1}`,
  orderNumber: `12345${6789 + i}`,
}));

const TestDrivePage = () => {
  const router = useRouter();

  const handleViewDetails = (orderId: string) => {
    router.push(`/vendor/operations/transaction-center/test-drive/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Orders Grid View */}
      <div className="px-2 py-4">
        {/* Section Header */}
        <div className="bg-gray-800 text-white rounded-lg px-2 py-2 mb-6 flex items-center justify-between">
          <h2 className="text-base font-medium">Test drive</h2>
          <button className="flex items-center gap-2 text-sm hover:bg-gray-700 px-3 py-1 rounded">
            <span>Filter By Assignee</span>
            <SlidersHorizontal size={16} />
          </button>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {orders.map((order) => (
            <TestDriveCard
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

export default TestDrivePage;
