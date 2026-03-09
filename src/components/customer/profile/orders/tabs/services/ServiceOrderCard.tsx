"use client";

import Image from "next/image";
import Divider from "@/components/ui/Divider";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

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
  const totalAmount = useMemo(
    () => order.services.reduce((sum, s) => sum + s.price, 0),
    [order.services]
  );

  const handleClick = useCallback(() => {
    router.push(`/customer/profile/my-orders/services/${order.id}`);
  }, [router, order.id]);

  return (
    <div
      onClick={handleClick}
      className="p-4 bg-white rounded-xl border border-gray-200 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex flex-col sm:flex-row w-full">
        {/* LEFT PANEL */}
        <div className="flex flex-col flex-1 gap-3 sm:pr-4">
          <div className="flex items-start gap-3">
            {/* Image */}
            <Image
              src={order.image}
              alt="garage"
              width={64}
              height={64}
              className="w-16 h-16 rounded-lg object-cover"
            />

            {/* Name + ID */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-base">{order.garageName}</h3>
              <p className="text-blue-600 text-xs font-medium">#{order.id}</p>
            </div>

            {/* Status */}
            <div className="ml-auto">
              <div
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 border ${statusStyles[order.status]}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${statusDot[order.status]}`}
                />
                {order.status}
              </div>
            </div>
          </div>

          {/* Date + Registration */}
          <div className="flex justify-between text-xs text-gray-600">
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

        {/* DIVIDER — horizontal on mobile, vertical on sm+ */}
        <Divider orientation="vertical" className="hidden sm:block mx-1" />
        <Divider className="block sm:hidden my-3" />

        {/* RIGHT PANEL */}
        <div className="flex flex-col flex-1 gap-2.5 sm:pl-4">
          <p className="font-semibold text-xs">Services Booked</p>

          {/* Services + Prices */}
          <div className="flex">
            <div className="flex-1 space-y-0.5 text-gray-700 text-xs">
              {order.services.map((s) => (
                <p key={s.name}>• {s.name}</p>
              ))}
            </div>

            <div className="text-right space-y-0.5 text-gray-700 text-xs">
              {order.services.map((s) => (
                <p key={s.name}>${s.price.toFixed(2)}</p>
              ))}
            </div>
          </div>

          <Divider />

          {/* Total */}
          <div className="flex justify-between items-center font-semibold text-base">
            <span>Total Amount</span>
            <span className="text-orange-500">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
