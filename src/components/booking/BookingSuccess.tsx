"use client";
import { CalendarIcon, CheckCircleIcon } from "lucide-react";
import Image from "next/image";

export default function BookingSuccess() {
  return (
    <div className="flex flex-col items-center py-12 px-4">
      <CheckCircleIcon className="w-20 h-20 text-green-500" />

      <h1 className="text-3xl font-semibold mt-4">Booking Successful!</h1>
      <p className="text-gray-600 mt-2">
        Your service has been successfully booked
      </p>

      <p className="mt-1 text-gray-700">
        Your booking ID is :{" "}
        <span className="font-semibold text-blue-600">DM-S3KO-IY3G</span>
      </p>

      {/* CARD CONTAINER */}
      <div className="mt-10 w-full max-w-4xl bg-white shadow-md rounded-xl p-6 border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* VEHICLE */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500 mb-2">Vehicle</h3>
            <div className="flex items-center gap-3">
              <Image
                src="/car.png" // replace with your asset
                alt="car"
                width={40}
                height={40}
                className="rounded"
              />
              <div>
                <p className="font-medium text-gray-800">Toyota Hilux</p>
                <p className="text-xs text-gray-500">AP 09 BU 0007</p>
              </div>
            </div>
          </div>

          {/* DATE & TIME */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500 mb-2">Service Date & Time</h3>
            <div className="flex items-start gap-3">
              <CalendarIcon className="w-10 h-10 text-gray-700" />
              <div>
                <p className="font-medium text-gray-800">July 30, 2025</p>
                <p className="text-xs text-gray-600">2:00 PM – 3:00 PM</p>
                <button className="px-2 py-1 mt-2 text-xs bg-red-100 text-red-500 rounded-md">
                  Reschedule
                </button>
              </div>
            </div>
          </div>

          {/* WORKSHOP */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500 mb-2">Workshop</h3>
            <div className="flex items-center gap-3">
              <Image
                src="/workshop.png" // replace with your asset
                alt="workshop"
                width={45}
                height={45}
                className="rounded-md"
              />
              <div>
                <p className="font-medium text-gray-800">A to Z Services</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  ⭐ 4.5 <span className="text-[10px]">(120)</span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <button className="p-2 rounded-full bg-blue-100 text-blue-600">📞</button>
                <button className="p-2 rounded-full bg-green-100 text-green-600">📍</button>
              </div>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <button className="w-full md:w-1/3 py-3 rounded-md bg-gray-800 text-white">
            View Booking Details
          </button>

          <button className="w-full md:w-1/3 py-3 rounded-md bg-orange-500 text-white">
            Track Booking
          </button>

          <button className="w-full md:w-1/3 py-3 rounded-md border border-gray-300 text-gray-700">
            Go To Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
