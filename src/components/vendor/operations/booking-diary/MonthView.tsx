"use client";

import { BookingEvent } from "@/types/vendor/operations/booking";
import BookingEventCard from "./BookingEventCard";

interface MonthViewProps {
  currentDate: Date;
  bookings: BookingEvent[];
  onDateClick: (date: Date) => void;
}

export default function MonthView({
  currentDate,
  bookings,
  onDateClick,
}: MonthViewProps) {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get first day of month
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Get starting day of week for first day of month
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Calculate days from previous month to show
  const daysInPrevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();
  const prevMonthDays = Array.from(
    { length: startingDayOfWeek },
    (_, i) => daysInPrevMonth - startingDayOfWeek + i + 1
  );

  // Days in current month
  const daysInMonth = lastDayOfMonth.getDate();
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Calculate days from next month to show
  const totalCells = prevMonthDays.length + currentMonthDays.length;
  const nextMonthDays = Array.from(
    { length: 42 - totalCells }, // 6 weeks * 7 days
    (_, i) => i + 1
  );

  // Check if date is today
  const isToday = (day: number, month: number, year: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Get bookings for a specific date
  const getBookingsForDate = (day: number, month: number, year: number) => {
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return (
        bookingDate.getDate() === day &&
        bookingDate.getMonth() === month &&
        bookingDate.getFullYear() === year
      );
    });
  };

  const renderDay = (
    day: number,
    month: number,
    year: number,
    isCurrentMonth: boolean
  ) => {
    const date = new Date(year, month, day);
    const dayBookings = getBookingsForDate(day, month, year);
    const isTodayDate = isToday(day, month, year);

    return (
      <div
        key={`${month}-${day}`}
        className={`min-h-[100px] p-2 border-r border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
          !isCurrentMonth ? "bg-gray-50" : ""
        }`}
        onClick={() => onDateClick(date)}
      >
        <div
          className={`text-sm font-medium mb-1 ${
            isTodayDate
              ? "bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
              : isCurrentMonth
                ? "text-gray-900"
                : "text-gray-400"
          }`}
        >
          {day}
        </div>
        <div className="space-y-1">
          {dayBookings.slice(0, 2).map((booking) => (
            <BookingEventCard key={booking.id} event={booking} />
          ))}
          {dayBookings.length > 2 && (
            <div className="text-xs text-gray-500 font-medium">
              +{dayBookings.length - 2} more
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Day Names Header */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {dayNames.map((name) => (
          <div
            key={name}
            className="p-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {/* Previous Month Days */}
        {prevMonthDays.map((day) =>
          renderDay(
            day,
            currentDate.getMonth() - 1,
            currentDate.getMonth() === 0
              ? currentDate.getFullYear() - 1
              : currentDate.getFullYear(),
            false
          )
        )}

        {/* Current Month Days */}
        {currentMonthDays.map((day) =>
          renderDay(
            day,
            currentDate.getMonth(),
            currentDate.getFullYear(),
            true
          )
        )}

        {/* Next Month Days */}
        {nextMonthDays.map((day) =>
          renderDay(
            day,
            currentDate.getMonth() + 1,
            currentDate.getMonth() === 11
              ? currentDate.getFullYear() + 1
              : currentDate.getFullYear(),
            false
          )
        )}
      </div>
    </div>
  );
}
