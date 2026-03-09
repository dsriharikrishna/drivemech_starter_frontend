"use client";

import { BookingEvent } from "@/types/vendor/operations/booking";
import BookingEventCard from "./BookingEventCard";

interface DayViewProps {
  currentDate: Date;
  bookings: BookingEvent[];
  onTimeSlotClick: (time: string) => void;
  onBookingClick?: (booking: BookingEvent) => void;
}

export default function DayView({
  currentDate,
  bookings,
  onTimeSlotClick,
  onBookingClick,
}: DayViewProps) {
  const timeSlots = [
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
  ];

  // Filter bookings for current date
  const dayBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    return (
      bookingDate.getDate() === currentDate.getDate() &&
      bookingDate.getMonth() === currentDate.getMonth() &&
      bookingDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Get booking for a specific time slot
  const getBookingForTime = (time: string) => {
    const hour = time.includes("AM")
      ? parseInt(time)
      : parseInt(time) === 12
        ? 12
        : parseInt(time) + 12;

    const timeStr = `${hour.toString().padStart(2, "0")}:00`;

    return dayBookings.find((booking) => booking.startTime === timeStr);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="grid grid-cols-1">
        {timeSlots.map((time, index) => {
          const booking = getBookingForTime(time);

          return (
            <div
              key={time}
              className={`flex items-start border-b border-gray-200 last:border-b-0 ${
                index === 0 ? "" : ""
              }`}
            >
              {/* Time Label */}
              <div className="w-20 p-4 text-sm text-gray-600 font-medium flex-shrink-0">
                {time}
              </div>

              {/* Event Area */}
              <div
                className="flex-1 p-4 min-h-[80px] cursor-pointer hover:bg-gray-50 transition-colors relative"
                onClick={() => !booking && onTimeSlotClick(time)}
              >
                {booking && (
                  <div className="absolute left-4 right-4 top-4">
                    <BookingEventCard
                      event={booking}
                      onClick={() => onBookingClick?.(booking)}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
