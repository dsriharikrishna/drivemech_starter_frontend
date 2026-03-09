"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchBookings,
  createBooking,
  clearError,
  updateBookingLocally,
  removeBookingLocally,
} from "@/store/slices/vendor/operations/bookindDiarySlice";
import { CalendarView, BookingEvent } from "@/types/vendor/operations/booking";
import CalendarHeader from "./CalendarHeader";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import AddBookingDialog from "./AddBookingDialog";
import EditBookingDialog from "./EditBookingDialog";

interface BookingCalendarProps {
  vendorId?: string;
}

export default function BookingCalendar({ vendorId }: BookingCalendarProps) {
  const dispatch = useAppDispatch();
  const { bookings, loading, error } = useAppSelector(
    (state) => state.bookingDiary
  );

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>("day");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<{
    date: Date;
    time: string;
  } | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingEvent | null>(
    null
  );

  // Fetch bookings on mount (if vendorId is provided)
  // TODO: Uncomment when APIs are ready
  // useEffect(() => {
  //     if (vendorId) {
  //         dispatch(fetchBookings(vendorId));
  //     }
  // }, [dispatch, vendorId]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(currentDate.getDate() - 1);
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(currentDate.getDate() + 1);
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedDateTime({ date: currentDate, time });
    setIsDialogOpen(true);
  };

  const handleWeekTimeSlotClick = (date: Date, time: string) => {
    setSelectedDateTime({ date, time });
    setIsDialogOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
    setView("day");
  };

  const handleAddBooking = async (serviceName: string) => {
    if (!selectedDateTime) return;

    const hour = selectedDateTime.time.includes("AM")
      ? parseInt(selectedDateTime.time)
      : parseInt(selectedDateTime.time) === 12
        ? 12
        : parseInt(selectedDateTime.time) + 12;

    const newBooking = {
      title: serviceName,
      startTime: `${hour.toString().padStart(2, "0")}:00`,
      date: selectedDateTime.date.toISOString(), // Convert Date to ISO string
      color: "blue" as const,
    };

    // Dispatch Redux action to create booking
    await dispatch(createBooking(newBooking));
    setSelectedDateTime(null);
  };

  const handleBookingClick = (booking: BookingEvent) => {
    setSelectedBooking(booking);
    setIsEditDialogOpen(true);
  };

  const handleEditBooking = (bookingId: string, newTitle: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      const updatedBooking = { ...booking, title: newTitle };
      dispatch(updateBookingLocally(updatedBooking));
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    dispatch(removeBookingLocally(bookingId));
  };

  // Show loading state
  if (loading && bookings.length === 0) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-xl border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  // Debug logging
  console.log("BookingCalendar - Bookings:", bookings.length, bookings);
  console.log("BookingCalendar - Loading:", loading);
  console.log("BookingCalendar - Error:", error);

  return (
    <div className="w-full">
      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
          <button
            onClick={() => dispatch(clearError())}
            className="text-red-500 hover:text-red-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Booking Count Debug Info */}
      <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-700">
          📊 Total Bookings: <strong>{bookings.length}</strong>
          {loading && <span className="ml-2 text-blue-500">(Loading...)</span>}
        </p>
      </div>

      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onViewChange={setView}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {view === "day" && (
        <DayView
          currentDate={currentDate}
          bookings={bookings}
          onTimeSlotClick={handleTimeSlotClick}
          onBookingClick={handleBookingClick}
        />
      )}

      {view === "week" && (
        <WeekView
          currentDate={currentDate}
          bookings={bookings}
          onTimeSlotClick={handleWeekTimeSlotClick}
          onBookingClick={handleBookingClick}
        />
      )}

      {view === "month" && (
        <MonthView
          currentDate={currentDate}
          bookings={bookings}
          onDateClick={handleDateClick}
        />
      )}

      <AddBookingDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedDateTime(null);
        }}
        onConfirm={handleAddBooking}
      />

      <EditBookingDialog
        isOpen={isEditDialogOpen}
        booking={selectedBooking}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedBooking(null);
        }}
        onConfirm={handleEditBooking}
        onDelete={handleDeleteBooking}
      />
    </div>
  );
}
