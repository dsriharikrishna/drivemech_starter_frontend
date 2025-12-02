// components/customer/profile/orders/data.ts
export type OrderType = "services" | "spares" | "towing" | "insurance";

import type { Order } from "@/types/order";

export const ordersData: Order[] = [
  {
    // id removed
    // type removed
    // name removed
    orderId: "SRV-001",
    // image removed
    status: "completed",
    date: "2025-07-30T14:00:00Z",
    // regNo removed
    services: [
      { name: "Periodic Maintenance", price: 149 },
      { name: "AC Gas Refill", price: 85 },
      { name: "Wheel Alignment", price: 45 },
    ],
    total: 279,
    serviceType: "Car Service",
    notes: "Customer requested quick turnaround.",
    vehicle: {
      make: "Hyundai",
      model: "i20",
      year: 2021,
      licensePlate: "ABC1234 D"
    },
    serviceCenter: {
      name: "A to Z Garage",
      address: "123 Main Street, City",
      phone: "+91 9876543210"
    },
    assignedMechanic: {
      name: "Ravi Kumar",
      rating: 4.7
    },
    paymentStatus: "paid",
    paymentMethod: "Credit Card"
  },
  {
    // id removed
    // type removed
    // name removed
    orderId: "SRV-002",
    // image removed
    status: "in-progress",
    date: "2025-07-28T14:00:00Z",
    // regNo removed
    services: [
      { name: "Periodic Maintenance", price: 149 },
      { name: "AC Gas Refill", price: 85 },
      { name: "Wheel Alignment", price: 45 },
    ],
    total: 279,
    serviceType: "Car Service",
    notes: "Check AC cooling.",
    vehicle: {
      make: "Hyundai",
      model: "i20",
      year: 2021,
      licensePlate: "ABC1234 D"
    },
    serviceCenter: {
      name: "A to Z Garage",
      address: "123 Main Street, City",
      phone: "+91 9876543210"
    },
    assignedMechanic: {
      name: "Sunil Sharma",
      rating: 4.5
    },
    paymentStatus: "pending",
    paymentMethod: "UPI"
  },
  {
    // id removed
    // type removed
    // name removed
    orderId: "SRV-003",
    // image removed
    status: "cancelled",
    date: "2025-07-15T11:00:00Z",
    // regNo removed
    services: [
      { name: "Periodic Maintenance", price: 149 },
      { name: "AC Gas Refill", price: 85 },
      { name: "Wheel Alignment", price: 45 },
    ],
    total: 279,
    serviceType: "Car Service",
    notes: "Customer cancelled due to emergency.",
    vehicle: {
      make: "Hyundai",
      model: "i20",
      year: 2021,
      licensePlate: "ABC1234 D"
    },
    serviceCenter: {
      name: "A to Z Garage",
      address: "123 Main Street, City",
      phone: "+91 9876543210"
    },
    assignedMechanic: {
      name: "Amit Singh",
      rating: 4.2
    },
    paymentStatus: "failed",
    paymentMethod: "Cash"
  },
];
