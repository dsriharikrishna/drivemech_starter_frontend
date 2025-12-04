"use client";

import { MapPin, Navigation, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

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

  const orders: TowOrder[] = [
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
  ];

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() =>
            router.push(`/customer/profile/my-orders/towing/${order.id}`)
          }
          className="bg-white border rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md transition"
        >
          {/* STATUS BADGE */}
          <div className="flex justify-end">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[order.status]}`}
            >
              {order.status}
            </span>
          </div>

          {/* ROW CONTENT */}
          <div className="grid grid-cols-2 gap-6 mt-2">
            {/* PICKUP */}
            <div>
              <p className="text-gray-500 flex items-center gap-1 text-sm font-medium">
                <MapPin size={16} /> Pickup
              </p>
              <p className="font-semibold mt-1">{order.pickup}</p>

              <p className="text-gray-500 text-sm mt-3">Tow Truck Type</p>
              <p className="font-semibold">{order.truckType}</p>
            </div>

            {/* DROP + DATE */}
            <div>
              <p className="text-gray-500 flex items-center gap-1 text-sm font-medium">
                <Navigation size={16} /> Drop
              </p>
              <p className="font-semibold mt-1">{order.drop}</p>

              <p className="text-gray-500 text-sm mt-3 flex items-center gap-1">
                <CalendarDays size={16} /> Date
              </p>
              <p className="font-semibold">{order.date}</p>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="border-t mt-4 pt-3 flex justify-end">
            <div className="text-right">
              <p className="text-gray-500 text-sm">Total Amount</p>
              <p className="text-orange-500 font-semibold text-lg">
                ${order.amount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
