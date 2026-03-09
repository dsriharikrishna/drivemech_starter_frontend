"use client";

import { useMemo } from "react";
import ServiceOrderCard, { ServiceOrder } from "./ServiceOrderCard";

export default function ServicesTab() {
  const orders = useMemo<ServiceOrder[]>(
    () => [
      {
        id: "SRV-001",
        garageName: "A to Z Garage",
        date: "30 July 2025",
        time: "2:00 PM",
        registration: "ABC1234 D",
        status: "Completed",
        image: "/images/workshop/AtoZ.png",
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
        image: "/images/workshop/AtoZ.png",
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
        image: "/images/workshop/AtoZ.png",
        services: [
          { name: "Periodic Maintenance", price: 149 },
          { name: "AC Gas Refill", price: 85 },
          { name: "Wheel Alignment", price: 45 },
        ],
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-3">
      {orders.map((order) => (
        <ServiceOrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
