"use client";

import { useAppSelector } from "@/store/store";
import BookingCalendar from "@/components/vendor/operations/booking-diary/BookingCalendar";
import { mockBookings } from "@/data/mockBookings";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/store";
import { addBookingLocally } from "@/store/slices/vendor/operations/bookindDiarySlice";

const BookingDiaryPage = () => {
  const dispatch = useAppDispatch();
  const hasLoadedMockData = useRef(false);

  // Get vendor ID from Redux auth state
  const user = useAppSelector((state) => state.auth.user);
  const vendorId = user?.id;

  // Load mock bookings for demo (remove this in production)
  useEffect(() => {
    // Only load once on mount
    if (!hasLoadedMockData.current) {
      console.log("Loading mock bookings...", mockBookings.length);
      mockBookings.forEach((booking) => {
        dispatch(addBookingLocally(booking));
      });
      hasLoadedMockData.current = true;
    }
  }, [dispatch]);

  return (
    <div className="w-full h-full p-6 bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* Page Header */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Booking Diary
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                View and manage all workshop bookings and appointments
                {!vendorId && (
                  <span className="ml-2 text-xs text-orange-500">
                    (Demo Mode)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <BookingCalendar vendorId={vendorId} />
      </div>
    </div>
  );
};

export default BookingDiaryPage;
