"use client";

import { BookingEvent } from "@/types/vendor/operations/booking";

// Mock booking data - 3 bookings for December 2025
export const mockBookings: BookingEvent[] = [
  {
    id: "1",
    title: "Oil Change Service",
    startTime: "10:00",
    date: new Date(2025, 11, 23).toISOString(), // December 23, 2025
    color: "blue",
  },
  {
    id: "2",
    title: "Brake Inspection",
    startTime: "14:00",
    date: new Date(2025, 11, 25).toISOString(), // December 25, 2025
    color: "red",
  },
  {
    id: "3",
    title: "Tire Rotation",
    startTime: "11:00",
    date: new Date(2025, 11, 27).toISOString(), // December 27, 2025
    color: "green",
  },
];
