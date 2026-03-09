"use client";

import React from "react";
import Timeline, { TimelineItem } from "@/components/ui/Timeline";

const TrackingStatusTab: React.FC = () => {
  const statuses: TimelineItem[] = [
    {
      id: 1,
      title: "Pending",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024",
      time: "10:00 AM",
      completed: true,
    },
    {
      id: 2,
      title: "Assigned",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024",
      time: "10:00 AM",
      completed: true,
    },
    {
      id: 3,
      title: "Service In Progress",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024",
      time: "10:00 AM",
      completed: true,
    },
    {
      id: 4,
      title: "Awaiting for Customer Confirmation",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024",
      time: "10:00 AM",
      completed: true,
    },
    {
      id: 5,
      title: "Awaiting Parts",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024",
      time: "10:00 AM",
      completed: true,
    },
    {
      id: 6,
      title: "Service Completed",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024",
      time: "10:00 AM",
      completed: false,
    },
    {
      id: 7,
      title: "Test Drive in progress",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024",
      time: "10:00 AM",
      completed: false,
    },
    {
      id: 8,
      title: "Ready for Customer Pickup",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024",
      time: "10:00 AM",
      completed: false,
    },
    {
      id: 9,
      title: "Delivered/Picked up by Customer",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024",
      time: "10:00 AM",
      completed: false,
    },
  ];

  return (
    <Timeline
      items={statuses}
      showHeader
      headerTitle="Source(Walk-in/Mobile)"
      variant="default"
    />
  );
};

export default TrackingStatusTab;
