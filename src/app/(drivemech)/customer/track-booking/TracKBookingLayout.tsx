"use client";

import { ArrowLeft } from "lucide-react";
import TrackingSummary from "@/components/tracking/TrackingSummary";
import TimelineList from "@/components/tracking/TimelineList";

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

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <ArrowLeft className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Track Booking</h2>
      </div>

      <div className="bg-white border rounded-xl shadow-sm p-6">

        {/* SUMMARY */}
        <TrackingSummary
          status="Booking Confirmed"
          stage="Service in Progress"
          estimate="Today, 2:00 PM - 3:00 PM"
        />

        {/* TIMELINE */}
        <TimelineList steps={timeline} />
      </div>
    </div>
  );
}
