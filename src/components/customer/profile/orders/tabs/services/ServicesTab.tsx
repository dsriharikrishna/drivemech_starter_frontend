"use client";

import ServiceOrderCard, { ServiceOrder } from "./ServiceOrderCard";

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
  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <ServiceOrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
