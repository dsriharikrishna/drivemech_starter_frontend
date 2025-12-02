// components/customer/profile/orders/OrdersTab.tsx
"use client";

import { useState } from "react";
import { ordersData } from "../orders/data";
import type { Order } from "@/types/order";
import OrderCard from "../orders/OrderCard";


const tabs = [
  { id: "all", label: "All" },
  { id: "services", label: "Services" },
  { id: "spares", label: "Spares" },
  { id: "towing", label: "Towing" },
  { id: "insurance", label: "Insurance" },
];

export default function OrdersTab() {
  const [active, setActive] = useState<string>("services");

  // Filtering by type is disabled because 'type' is not present in Order type anymore
  const filtered = ordersData;

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Orders</h2>
      </div>

      <div className="flex gap-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition ${
              active === t.id
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((order: Order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
      </div>
    </div>
  );
}
