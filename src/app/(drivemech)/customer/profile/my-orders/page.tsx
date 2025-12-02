import OrderCard from "@/components/customer/profile/orders/services/OrderCard";

export default function MyOrdersPage() {
  const orders = [
    {
      garageName: "A to Z Garage",
      orderId: "#SRV-001",
      date: "30 July 2025, 2:00 PM",
      registration: "ABC1234 D",
      status: "Completed" as const,
      image: "/garage.jpg",
      bookedItems: [
        { label: "Periodic Maintenance", price: 149 },
        { label: "AC Gas Refill", price: 85 },
        { label: "Wheel Alignment", price: 45 },
      ],
    },
    {
      garageName: "A to Z Garage",
      orderId: "#SRV-001",
      date: "30 July 2025, 2:00 PM",
      registration: "ABC1234 D",
      status: "In Progress" as const,
      image: "/garage.jpg",
      bookedItems: [
        { label: "Periodic Maintenance", price: 149 },
        { label: "AC Gas Refill", price: 85 },
        { label: "Wheel Alignment", price: 45 },
      ],
    },
    {
      garageName: "A to Z Garage",
      orderId: "#SRV-001",
      date: "30 July 2025, 2:00 PM",
      registration: "ABC1234 D",
      status: "Cancelled" as const,
      image: "/garage.jpg",
      bookedItems: [
        { label: "Periodic Maintenance", price: 149 },
        { label: "AC Gas Refill", price: 85 },
        { label: "Wheel Alignment", price: 45 },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map((order, idx) => (
        <OrderCard key={idx} {...order} />
      ))}
    </div>
  );
}
