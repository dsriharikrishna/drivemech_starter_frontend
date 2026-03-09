"use client";

import React from "react";
import { useRouter } from "next/navigation";
import GatePassCard from "@/components/vendor/gate-pass/GatePassCard";

// Mock data for gate pass orders
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
      name: "John Doe",
      avatar: undefined,
    },
    status: "Gate Pass Issued",
  },
];

// Create 15 orders for the grid (reusing the same data)
const orders = Array.from({ length: 15 }, (_, i) => ({
  ...mockOrders[0],
  id: `${i + 1}`,
  orderNumber: `12345${6789 + i}`,
}));

const GatePassIssuedPage = () => {
  const router = useRouter();

  const handleIssueGatePass = (orderId: string) => {
    router.push(
      `/vendor/operations/transaction-center/gate-pass-issued/${orderId}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Orders Grid View */}
      <div className="px-2 py-2">
        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {orders.map((order) => (
            <GatePassCard
              key={order.id}
              order={order}
              onIssueGatePass={() => handleIssueGatePass(order.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GatePassIssuedPage;
