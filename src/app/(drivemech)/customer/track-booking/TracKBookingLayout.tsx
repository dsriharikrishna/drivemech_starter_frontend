"use client";

import TrackingHeader from "@/components/tracking/TrackingHeader";
import TrackingCard from "@/components/tracking/TrackingCard";

export default function TrackBookingLayout() {
  const timeline = [
    {
      id: "1",
      title: "Pending",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: true,
      isActive: false,
    },
    {
      id: "2",
      title: "Assigned",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: true,
      isActive: false,
    },
    {
      id: "3",
      title: "Service In Progress",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: true, // Current Stage
    },
    {
      id: "4",
      title: "Awaiting Customer Confirmation",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "5",
      title: "Awaiting Parts",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "6",
      title: "Service Completed",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "7",
      title: "Test Drive in Progress",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "8",
      title: "Ready for Customer Pickup",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "9",
      title: "Delivered / Picked up by Customer",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: false,
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <TrackingHeader onBack={() => history.back()} />

      {/* MAIN TRACKING CARD */}
      <TrackingCard
        summary={{
          status: "Booking Confirmed",
          stage: "Service in Progress",
          estimate: "Today, 2:00 PM - 3:00 PM",
        }}
        steps={timeline}
      />
    </div>
  );
}
