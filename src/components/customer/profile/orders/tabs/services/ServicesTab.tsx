"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type OrderStatus = "Completed" | "In Progress" | "Cancelled";

interface ServiceOrder {
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

const orders: ServiceOrder[] = [
  {
    id: "SRV-001",
    garageName: "A to Z Garage",
    date: "30 July 2025",
    time: "2:00 PM",
    registration: "ABC1234 D",
    status: "Completed",
    image: "/images/car-demo.jpg",
    services: [
      { name: "Periodic Maintenance", price: 149 },
      { name: "AC Gas Refill", price: 85 },
      { name: "Wheel Alignment", price: 45 },
    ],
  },
  {
    id: "SRV-002",
    garageName: "A to Z Garage",
    date: "30 July 2025",
    time: "2:00 PM",
    registration: "ABC1234 D",
    status: "In Progress",
    image: "/images/car-demo.jpg",
    services: [
      { name: "Periodic Maintenance", price: 149 },
      { name: "AC Gas Refill", price: 85 },
      { name: "Wheel Alignment", price: 45 },
    ],
  },
  {
    id: "SRV-003",
    garageName: "A to Z Garage",
    date: "30 July 2025",
    time: "2:00 PM",
    registration: "ABC1234 D",
    status: "Cancelled",
    image: "/images/car-demo.jpg",
    services: [
      { name: "Periodic Maintenance", price: 149 },
      { name: "AC Gas Refill", price: 85 },
      { name: "Wheel Alignment", price: 45 },
    ],
  },
];

export default function ServicesTab() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const totalAmount = order.services.reduce(
          (sum, s) => sum + s.price,
          0
        );

        return (
          <div
            key={order.id}
            onClick={() =>
              router.push(
                `/customer/profile/my-orders/services/${order.id}` 
              )
            }
            className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            {/* Top Row */}
            <div className="flex gap-5">
              {/* Left Image */}
              <div className="w-28 h-28 rounded-lg overflow-hidden">
                <Image
                  src={order.image}
                  alt="garage"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Garage + Basic Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {order.garageName}
                  </h3>
                  <p className="text-blue-600 text-sm font-medium">
                    #{order.id}
                  </p>
                </div>

                <div className="text-sm text-gray-600 mt-2">
                  <p className="font-semibold">Date & Time</p>
                  <p>
                    {order.date}, {order.time}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="ml-auto flex flex-col items-end">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 border ${statusStyles[order.status]}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${statusDot[order.status]}`}
                  />
                  {order.status}
                </div>

                <div className="mt-6 text-sm text-gray-600">
                  <p className="font-semibold">Registration No.</p>
                  <p>{order.registration}</p>
                </div>
              </div>
            </div>

            {/* Middle Divider */}
            <div className="border-t my-4" />

            {/* Services Section */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="col-span-2">
                <p className="font-semibold mb-1">Services Booked</p>
                <ul className="list-disc ml-4 text-gray-700">
                  {order.services.map((s) => (
                    <li key={s.name}>{s.name}</li>
                  ))}
                </ul>
              </div>

              {/* Prices */}
              <div className="flex flex-col text-right text-gray-700">
                {order.services.map((s) => (
                  <p key={s.name}>${s.price.toFixed(2)}</p>
                ))}
              </div>
            </div>

            {/* Bottom Divider */}
            <div className="border-t my-4" />

            {/* Total */}
            <div className="text-right font-semibold text-orange-500 text-lg">
              ${totalAmount.toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
