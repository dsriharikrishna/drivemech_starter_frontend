"use client";

import Image from "next/image";
import Divider from "@/components/ui/Divider";
import { useRouter } from "next/navigation";

export type OrderStatus = "Completed" | "In Progress" | "Cancelled";

export interface ServiceOrder {
  id: string;
  garageName: string;
  date: string;
  time: string;
  registration: string;
  services: { name: string; price: number }[];
  status: OrderStatus;
  image: string;
}

const statusStyles: Record<OrderStatus, string> = {
  Completed: "bg-green-100 text-green-700 border-green-300",
  "In Progress": "bg-yellow-100 text-yellow-700 border-yellow-300",
  Cancelled: "bg-red-100 text-red-700 border-red-300",
};

const statusDot: Record<OrderStatus, string> = {
  Completed: "bg-green-500",
  "In Progress": "bg-yellow-500",
  Cancelled: "bg-red-500",
};

export default function ServiceOrderCard({ order }: { order: ServiceOrder }) {
  const router = useRouter();
  const totalAmount = order.services.reduce((sum, s) => sum + s.price, 0);

  return (
    <div
      onClick={() =>
        router.push(`/customer/profile/my-orders/services/${order.id}`)
      }
      className="p-5 bg-white rounded-xl border border-gray-200 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex w-full">

        {/* LEFT PANEL */}
        <div className="flex flex-col flex-1 gap-4 pr-6">
          <div className="flex items-start gap-4">

            {/* Image */}
            <Image
              src={order.image}
              alt="garage"
              width={80}
              height={80}
              className="w-20 h-20 rounded-lg object-cover"
            />

            {/* Name + ID */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg">{order.garageName}</h3>
              <p className="text-blue-600 text-sm font-medium">#{order.id}</p>
            </div>

            {/* Status */}
            <div className="ml-auto">
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 border ${statusStyles[order.status]}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusDot[order.status]}`} />
                {order.status}
              </div>
            </div>
          </div>

          {/* Date + Registration */}
          <div className="flex justify-between text-sm text-gray-600">
            <div>
              <p className="font-semibold">Date & Time</p>
              <p>
                {order.date}, {order.time}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">Registration No.</p>
              <p>{order.registration}</p>
            </div>
          </div>
        </div>

        {/* VERTICAL DIVIDER */}
        <Divider orientation="vertical" className="mx-1" />

        {/* RIGHT PANEL */}
        <div className="flex flex-col flex-1 gap-3 pl-6">

          <p className="font-semibold">Services Booked</p>

          {/* Services + Prices */}
          <div className="flex">
            <div className="flex-1 space-y-1 text-gray-700">
              {order.services.map((s) => (
                <p key={s.name}>• {s.name}</p>
              ))}
            </div>

            <div className="text-right space-y-1 text-gray-700">
              {order.services.map((s) => (
                <p key={s.name}>${s.price.toFixed(2)}</p>
              ))}
            </div>
          </div>

          <Divider />

          {/* Total */}
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total Amount</span>
            <span className="text-orange-500">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
