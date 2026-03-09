"use client";

import { BookingEvent } from "@/types/vendor/operations/booking";

interface BookingEventCardProps {
  event: BookingEvent;
  onClick?: () => void;
}

export default function BookingEventCard({
  event,
  onClick,
}: BookingEventCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 border-l-4 border-blue-500 text-blue-700",
    red: "bg-red-100 border-l-4 border-red-500 text-red-700",
    yellow: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700",
    green: "bg-green-100 border-l-4 border-green-500 text-green-700",
  };

  const color = event.color || "blue";

  return (
    <div
      className={`${colorClasses[color]} p-2 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity`}
      onClick={onClick}
    >
      <div className="font-semibold">{event.startTime}</div>
      <div className="truncate">{event.title}</div>
    </div>
  );
}
