"use client";

import BookingIdCard from "@/components/booking/BookingIdCard";
import BookingWorkshopCard from "@/components/booking/BookingWorkshopCard";
import ServiceDateCard from "@/components/booking/ServiceDateCard";
import VehicleCard from "@/components/booking/VehicleCard";
import { ArrowLeftIcon } from "lucide-react";

export default function BookingDetailsLayout() {
  return (
    <div className="px-6 py-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Booking Details</h2>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <BookingIdCard
          bookingId="DM-S3KO-IY3G"
          status="Confirmed"
        />

        <ServiceDateCard
          date="July 30, 2025"
          time="2:00 PM – 3:00 PM"
          onReschedule={() => console.log("reschedule")}
        />

        <VehicleCard
          name="Toyota Hilux"
          number="AP 09 BU 0007"
        />

        <BookingWorkshopCard
          name="A to Z Services"
          rating={4.5}
          reviewCount={120}
        />
      </div>

      {/* MIDDLE SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* SERVICE DETAILS */}
        <div className="border rounded-xl p-6 bg-white shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Service Details</h3>

          <ul className="space-y-3 text-sm">
            {[
              "Battery Replacement",
              "Roadworthy Inspection / Pink Slips",
              "Spark Plug",
              "AC Antibacterial Clean",
              "AC Compressor Relay Replacement",
            ].map((item, i) => (
              <li key={i} className="flex justify-between border-b pb-2">
                <span>{i + 1}. {item}</span>
                <strong>$ 10</strong>
              </li>
            ))}
          </ul>
        </div>

        {/* PAYMENT DETAILS */}
        <div className="border rounded-xl p-6 bg-white shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Payment Details</h3>

          <div className="text-sm space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Payment Method</span>
              <span className="font-medium">Credit / Debit Card</span>
            </div>

            <div className="flex justify-between">
              <span>Amount Paid</span>
              <span className="text-blue-600 font-medium">$ 579</span>
            </div>

            <div className="flex justify-between">
              <span>Payment Status</span>
              <span className="text-green-600 font-medium">Paid</span>
            </div>
          </div>

          {/* BILL DETAILS */}
          <h4 className="font-semibold text-gray-700 my-3">Bill Details</h4>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Items total</span> <span>$230</span></div>
            <div className="flex justify-between"><span>Add-On Services</span> <span>$100</span></div>
            <div className="flex justify-between"><span>Tax</span> <span>$150</span></div>
            <div className="flex justify-between"><span>Safety & Warranty</span> <span>$99</span></div>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-gray-900">
            <span>Grand Total</span>
            <span>$ 579</span>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">

        <button className="bg-red-500 text-white py-3 px-6 rounded-lg w-full md:w-1/3">
          Cancel Booking
        </button>

        <button className="bg-green-600 text-white py-3 px-6 rounded-lg w-full md:w-1/3">
          Download Invoice
        </button>

        <button className="bg-orange-500 text-white py-3 px-6 rounded-lg w-full md:w-1/3">
          Contact Workshop
        </button>
      </div>
    </div>
  );
}
