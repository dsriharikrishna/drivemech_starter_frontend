import Link from "next/link";
import OrderStatusBadge from "./OrderStatusBadge";

import type { Order } from "@/types/order";

interface OrderProps {
  order: Order;
}

export default function OrderCard({ order }: OrderProps) {
  return (
    <div className="border rounded-xl p-5 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      {/* LEFT SIDE */}
      <div className="flex items-start gap-4 w-full md:w-auto">
        <img
          src="/images/garage1.jpg" // Placeholder image
          alt={order.serviceCenter.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="space-y-1">
          <p className="font-semibold">{order.serviceCenter.name}</p>
          {/* CLICKABLE ORDER ID */}
          <Link
            href={`/customer/profile/orders/${order.orderId}`}
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            {order.orderId}
          </Link>
          <div>
            <p className="text-gray-500 text-sm">Date & Time</p>
            <p className="font-medium">{new Date(order.date).toLocaleString()}</p>
          </div>
        </div>
      </div>
      {/* MID + RIGHT */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:mt-0">
        <div className="flex md:justify-center">
          <OrderStatusBadge status={order.status} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Registration No.</p>
          <p className="font-medium">{order.vehicle.licensePlate}</p>
        </div>
        <div>
          <p className="font-semibold">Services Booked</p>
          <ul className="text-sm mt-1 space-y-1">
            {order.services.map((s, index) => (
              <li key={index}>• {s.name}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* RIGHT SIDE - Prices */}
      <div className="flex flex-col text-right mt-4 md:mt-0">
        {order.services.map((s, i) => (
          <p key={i} className="text-gray-700">₹{s.price.toFixed(2)}</p>
        ))}
        <p className="font-semibold text-orange-500 text-lg mt-3">
          ₹{order.total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
