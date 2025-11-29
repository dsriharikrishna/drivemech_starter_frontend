"use client";

import BookingWorkshopCard from "@/components/booking/BookingWorkshopCard";
import ServiceDateCard from "@/components/booking/ServiceDateCard";
import VehicleCard from "@/components/booking/VehicleCard";
import { CheckCircleIcon } from "lucide-react";

export default function BookingSuccessLayout() {
  return (
    <div className="flex flex-col items-center py-12 px-4">

      {/* SUCCESS ICON + TEXT */}
      <CheckCircleIcon className="w-20 h-20 text-green-500" />

      <h1 className="text-3xl font-semibold mt-4">Booking Successful!</h1>
      <p className="text-gray-600 mt-2">
        Your service has been successfully booked
      </p>

      <p className="mt-1 text-gray-700">
        Your booking ID is :
        <span className="font-semibold text-blue-600"> DM-S3KO-IY3G</span>
      </p>

      {/* CARDS */}
      <div className="mt-10 w-full max-w-5xl p-6 bg-white border rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <VehicleCard
            name="Toyota Hilux"
            number="AP 09 BU 0007"
          />

          <ServiceDateCard
            date="July 30, 2025"
            time="2:00 PM – 3:00 PM"
            onReschedule={() => console.log("Reschedule")}
          />

          <BookingWorkshopCard
            name="A to Z Services"
            rating={4.5}
            reviewCount={120}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">

          <button className="bg-gray-800 text-white py-3 px-6 rounded-lg w-full md:w-1/3">
            View Booking Details
          </button>

          <button className="bg-orange-500 text-white py-3 px-6 rounded-lg w-full md:w-1/3">
            Track Booking
          </button>

          <button className="border text-gray-700 py-3 px-6 rounded-lg w-full md:w-1/3">
            Go To Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
