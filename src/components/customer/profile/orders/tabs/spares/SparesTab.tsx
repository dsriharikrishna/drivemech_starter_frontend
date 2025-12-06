"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const orders = [
  {
    id: "SPR-001",
    products: 3,
    items: 4,
    status: "In Progress",
    statusColor: "text-yellow-600",
    statusDot: "bg-yellow-500",
    message: "Your items will be delivered by 1 December 2025",
    amount: 168.0,
    images: ["/images/p1.png", "/images/p2.png"],
  },
  {
    id: "SPR-002",
    products: 5,
    items: 6,
    status: "Cancelled",
    statusColor: "text-red-600",
    statusDot: "bg-red-500",
    message: "Your item has been cancelled as per your request",
    amount: 168.0,
    images: ["/images/p1.png", "/images/p2.png", "/images/p3.png"],
  },
  {
    id: "SPR-003",
    products: 3,
    items: 4,
    status: "Delivered",
    deliveredDate: "28 July 2025",
    statusColor: "text-green-600",
    statusDot: "bg-green-500",
    message: "Your items has been delivered",
    amount: 168.0,
    images: ["/images/p1.png", "/images/p2.png"],
  },
];

export default function SparesTab() {
    const router = useRouter();
  return (
    <div className="space-y-4">

      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm"
        >
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4 w-1/3">

            {/* Product thumbnails */}
            <div className="flex items-center -space-x-2">
              {order.images.slice(0, 2).map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  width={42}
                  height={42}
                  alt="product"
                  className="rounded-lg bg-gray-100 border"
                />
              ))}

              {order.images.length > 2 && (
                <div className="w-10 h-10 bg-gray-200 border rounded-lg flex items-center justify-center text-xs font-semibold">
                  +{order.images.length - 2}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <p className="font-semibold text-gray-800">
                {order.products} Products ({order.items} items)
              </p>

              <button onClick={()=>{router.push(`/customer/profile/my-orders/spares/${order.id}`)}} className="text-blue-600 text-sm hover:underline">
                Order {order.id}
              </button>
            </div>
          </div>

          {/* CENTER STATUS */}
          <div className="flex flex-col w-1/3">
            <p className={`font-semibold flex items-center gap-1 ${order.statusColor}`}>
              <span className={`w-2 h-2 rounded-full ${order.statusDot}`}></span>
              {order.status === "Delivered"
                ? `Delivered on ${order.deliveredDate}`
                : order.status}
            </p>

            <p className="text-gray-600 text-sm">{order.message}</p>
          </div>

          {/* RIGHT TOTAL AMOUNT */}
          <div className="text-right w-1/3">
            <p className="text-gray-500 text-sm">Total Amount</p>
            <p className="text-orange-500 font-semibold text-lg">${order.amount}</p>
          </div>
        </div>
      ))}

    </div>
  );
}
