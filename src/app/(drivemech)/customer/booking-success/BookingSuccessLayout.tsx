"use client";

import BookingDetailsCard from "@/components/customer/booking/BookingDetailsCard";
import { CheckCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function BookingSuccessLayout() {
  const router = useRouter();

  const handleNext = useCallback((path: string) => {
    if (path === "view-booking") {
      router.push("/customer/booking-details")
    } else if (path === "track-booking") {
      router.push("/customer/track-booking")
    } else {
      router.push("/")
    }
  }, [router])

  return (
    <div className="w-full flex flex-col items-center bg-white justify-center px-4 py-8">
      <div className="w-full max-w-7xl flex flex-col items-center py-10 px-4 md:px-8 rounded-xl shadow-md border border-border bg-white">

        {/* SUCCESS ICON + TEXT */}
        <CheckCircleIcon className="w-20 h-20 text-green-500" />

        <h1 className="text-2xl md:text-3xl font-semibold mt-4 text-center">
          Booking Successful!
        </h1>

        <p className="text-gray-600 mt-2 text-center text-sm md:text-base">
          Your service has been successfully booked
        </p>

        <p className="mt-1 text-gray-700 text-center text-sm md:text-base">
          Your booking ID is:
          <span className="font-semibold text-blue-600"> DM-S3KO-IY3G</span>
        </p>

        {/* CENTERED CARD */}
        <div className="mt-10 w-full max-w-5xl bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            <BookingDetailsCard
              type="vehicle"
              vehicleName="Toyota Hilux"
              vehicleNumber="AP 09 BU 0007"
            />

            <BookingDetailsCard
              type="service-date"
              date="July 30, 2025"
              time="2:00 PM – 3:00 PM"
              onReschedule={() => {}}
            />

            <BookingDetailsCard
              type="workshop"
              workshopName="A to Z Services"
              rating={4.5}
              reviewCount={120}
              onCall={() => { }}
              onLocation={() => { }}
            />

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 mt-10 justify-center">

            <button onClick={() => handleNext("view-booking")} className="bg-gray-800 cursor-pointer text-white py-1.5 px-3 rounded-lg w-full md:w-1/3 text-center">
              View Booking Details
            </button>

            <button onClick={() => handleNext("track-booking")} className="bg-orange-500 cursor-pointer text-white py-1.5 px-3 rounded-lg w-full md:w-1/3 text-center">
              Track Booking
            </button>

            <button onClick={() => handleNext("home")} className="border border-orange-300 cursor-pointer text-orange-700 py-1.5 px-3 rounded-lg w-full md:w-1/3 text-center">
              Go To Homepage
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
