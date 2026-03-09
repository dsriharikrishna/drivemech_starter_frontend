"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function SparesTab() {
  const router = useRouter();

  const orders = useMemo(
    () => [
      {
        id: "SPR-001",
        products: 3,
        items: 4,
        status: "In Progress",
        statusColor: "text-yellow-600",
        statusDot: "bg-yellow-500",
        message: "Your items will be delivered by 1 December 2025",
        amount: 168.0,
        images: ["/images/workshop/spares.png"],
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
        images: ["/images/workshop/spares.png"],
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
        images: ["/images/workshop/spares.png"],
      },
    ],
    []
  );

  const handleOrderClick = useCallback(
    (orderId: string) => {
      router.push(`/customer/profile/my-orders/spares/${orderId}`);
    },
    [router]
  );

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm gap-3 cursor-pointer"
        >
          {/* LEFT SIDE — image + product details */}
          <div className="flex items-center gap-3 sm:w-1/3">
            {/* Product thumbnails */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {order.images.slice(0, 2).map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  width={38}
                  height={38}
                  alt="product"
                  className="rounded-lg bg-gray-100 border"
                />
              ))}

              {order.images.length > 2 && (
                <div className="w-9 h-9 bg-gray-200 border rounded-lg flex items-center justify-center text-xs font-semibold">
                  +{order.images.length - 2}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 text-xs">
                {order.products} Products ({order.items} items)
              </p>

              <button
                onClick={() => handleOrderClick(order.id)}
                className="text-blue-600 text-xs hover:underline"
              >
                Order {order.id}
              </button>
            </div>
          </div>

          {/* CENTER STATUS */}
          <div className="flex flex-col sm:w-1/3 min-w-0">
            <p
              className={`font-semibold flex items-center gap-1 text-xs ${order.statusColor}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${order.statusDot}`}
              ></span>
              {order.status === "Delivered"
                ? `Delivered on ${order.deliveredDate}`
                : order.status}
            </p>

            <p className="text-gray-600 text-xs leading-tight">{order.message}</p>
          </div>

          {/* RIGHT TOTAL AMOUNT */}
          <div className="text-right sm:w-1/3">
            <p className="text-gray-500 text-xs">Total Amount</p>
            <p className="text-orange-500 font-semibold text-base">
              ${order.amount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
