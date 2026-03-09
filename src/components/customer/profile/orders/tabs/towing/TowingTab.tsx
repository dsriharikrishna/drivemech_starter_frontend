"use client";

import { MapPin, Navigation, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";

interface TowOrder {
  id: string;
  pickup: string;
  drop: string;
  truckType: string;
  date: string;
  amount: number;
  status: "In Progress" | "Completed";
}

const statusClasses = {
  "In Progress": "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
};

export default function TowingTab() {
  const router = useRouter();

  const orders: TowOrder[] = useMemo(
    () => [
      {
        id: "TOW-001",
        pickup: "123 Main St, Downtown",
        drop: "A to Z Garage",
        truckType: "Flatbed",
        date: "28 July 2025, 4:45 PM",
        amount: 85,
        status: "In Progress",
      },
      {
        id: "TOW-002",
        pickup: "Highway 101, Mile 45",
        drop: "QuickFix Auto Center",
        truckType: "Flatbed",
        date: "28 July 2025, 4:45 PM",
        amount: 85,
        status: "Completed",
      },
      {
        id: "TOW-003",
        pickup: "Highway 101, Mile 45",
        drop: "QuickFix Auto Center",
        truckType: "Flatbed",
        date: "28 July 2025, 4:45 PM",
        amount: 85,
        status: "Completed",
      },
    ],
    []
  );

  const handleOrderClick = useCallback(
    (id: string) => {
      router.push(`/customer/profile/my-orders/towing/${id}`);
    },
    [router]
  );

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => handleOrderClick(order.id)}
          className="bg-white border border-border rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition"
        >
          {/* STATUS BADGE */}
          <div className="flex justify-end">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusClasses[order.status]}`}
            >
              {order.status}
            </span>
          </div>

          {/* ROW CONTENT */}
          <div className="grid grid-cols-2 gap-4 mt-1.5">
            {/* PICKUP */}
            <div>
              <p className="text-gray-500 flex items-center gap-1 text-xs font-medium">
                <MapPin size={14} /> Pickup
              </p>
              <p className="font-semibold mt-0.5 text-xs">{order.pickup}</p>

              <p className="text-gray-500 text-xs mt-2.5">Tow Truck Type</p>
              <p className="font-semibold text-xs">{order.truckType}</p>
            </div>

            {/* DROP + DATE */}
            <div>
              <p className="text-gray-500 flex items-center gap-1 text-xs font-medium">
                <Navigation size={14} /> Drop
              </p>
              <p className="font-semibold mt-0.5 text-xs">{order.drop}</p>

              <p className="text-gray-500 text-xs mt-2.5 flex items-center gap-1">
                <CalendarDays size={14} /> Date
              </p>
              <p className="font-semibold text-xs">{order.date}</p>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="border-t border-border mt-3 pt-2.5 flex justify-end">
            <div className="text-right">
              <p className="text-gray-500 text-xs">Total Amount</p>
              <p className="text-orange-500 font-semibold text-base">
                ${order.amount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
