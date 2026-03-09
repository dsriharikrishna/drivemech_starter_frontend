"use client";

import { BookingEvent } from "@/types/vendor/operations/booking";
import BookingEventCard from "./BookingEventCard";

interface WeekViewProps {
  currentDate: Date;
  bookings: BookingEvent[];
  onTimeSlotClick: (date: Date, time: string) => void;
  onBookingClick?: (booking: BookingEvent) => void;
}

export default function WeekView({
  currentDate,
  bookings,
  onTimeSlotClick,
  onBookingClick,
}: WeekViewProps) {
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

  // Get start of week (Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Get bookings for a specific day and time
  const getBookingForDayTime = (date: Date, time: string) => {
    const hour = time.includes("AM")
      ? parseInt(time)
      : parseInt(time) === 12
        ? 12
        : parseInt(time) + 12;

    const timeStr = `${hour.toString().padStart(2, "0")}:00`;

    return bookings.find((booking) => {
      const bookingDate = new Date(booking.date);
      return (
        bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear() &&
        booking.startTime === timeStr
      );
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Week Header */}
          <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
            <div className="p-3 min-w-[80px]"></div>
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`p-3 text-center border-l border-gray-200 min-w-[100px] ${
                  isToday(day) ? "bg-blue-500 text-white" : ""
                }`}
              >
                <div className="text-xs font-medium mb-1">
                  {dayNames[index]}
                </div>
                <div
                  className={`text-2xl font-bold ${isToday(day) ? "text-white" : "text-gray-900"}`}
                >
                  {day.getDate().toString().padStart(2, "0")}
                </div>
                <div className="text-xs">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="grid grid-cols-8">
            {timeSlots.map((time) => (
              <div key={time} className="contents">
                {/* Time Label */}
                <div className="p-3 text-sm text-gray-600 font-medium border-b border-gray-200 flex items-start min-w-[80px] bg-gray-50">
                  {time}
                </div>

                {/* Day Cells */}
                {weekDays.map((day, dayIndex) => {
                  const booking = getBookingForDayTime(day, time);

                  return (
                    <div
                      key={`${time}-${dayIndex}`}
                      className="p-2 border-l border-b border-gray-200 min-h-[80px] min-w-[100px] cursor-pointer hover:bg-gray-50 transition-colors relative"
                      onClick={() => !booking && onTimeSlotClick(day, time)}
                    >
                      {booking && (
                        <BookingEventCard
                          event={booking}
                          onClick={() => onBookingClick?.(booking)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
