"use client";

import { ArrowLeftIcon } from "lucide-react";
import CustomCard from "@/components/ui/CustomCard";
import BookingIdCard from "@/components/customer/booking/BookingIdCard";
import ServiceDateCard from "@/components/customer/booking/ServiceDateCard";
import VehicleCard from "@/components/customer/booking/VehicleCard";
import BookingWorkshopCard from "@/components/customer/booking/BookingWorkshopCard";
import BookingFooter from "@/components/customer/booking/BookingFooter";

interface BookingDetailsProps {
  bookingId: string;
  status: string;
  serviceDate: string;
  serviceTime: string;
  vehicle: {
    name: string;
    number: string;
    image?: string;
  };
  workshop: {
    name: string;
    rating: number;
    reviews: number;
    image?: string;
  };
  services: { title: string; price: number }[];
  payment: {
    method: string;
    amount: number;
    status: string;
    breakdown: {
      items: number;
      addon: number;
      tax: number;
      warranty: number;
    };
  };
}

export default function BookingDetailsPage() {
  // Static data as object - matching the image exactly
  const bookingData: BookingDetailsProps = {
    bookingId: "DM-S3KO-IY30",
    status: "Confirmed",
    serviceDate: "July 30, 2025",
    serviceTime: "2:00 PM - 3:00 PM",
    vehicle: {
      name: "Toyota Hilux",
      number: "AP 09 BU 0007",
      image: "/images/workshop/car.png"
    },
    workshop: {
      name: "A to Z Services",
      rating: 4.5,
      reviews: 120,
      image: "/images/workshop/AtoZ.png"
    },
    services: [
      { title: "Battery Replacement", price: 10 },
      { title: "Roadworthy Inspection / Pink Slips", price: 10 },
      { title: "Spark Plug", price: 10 },
      { title: "AC Antibacterial Clean", price: 10 },
      { title: "AC Compressor Relay Replacement", price: 10 }
    ],
    payment: {
      method: "Credit/Debit Card",
      amount: 579,
      status: "Paid",
      breakdown: {
        items: 230,
        addon: 100,
        tax: 150,
        warranty: 99
      }
    }
  };

  const { bookingId, status, serviceDate, serviceTime, vehicle, workshop, services, payment } = bookingData;
  const { items: itemsTotal, addon: addOns, tax, warranty: safetyAndWarranty } = payment.breakdown;
  return (
    <div className="px-6 py-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <header className="flex items-center gap-2 mb-2 bg-white p-4 rounded-2xl">
        <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Booking Details</h2>
      </header>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">

        {/* BOOKING ID */}
        <BookingIdCard bookingId={bookingId} status={status} />

        {/* SERVICE DATE */}
        <ServiceDateCard date={serviceDate} time={serviceTime} />

        {/* VEHICLE */}
        <VehicleCard name={vehicle.name} number={vehicle.number} img={vehicle.image} />

        {/* WORKSHOP */}
        <BookingWorkshopCard
          name={workshop.name}
          rating={workshop.rating}
          reviewCount={workshop.reviews}
          img={workshop.image}
        />
      </div>

      {/* SERVICE + PAYMENT SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* SERVICE DETAILS */}
        <CustomCard>
          <h3 className="font-semibold text-gray-800 mb-4">Service Details</h3>

          <ul className="text-sm space-y-3">
            {services.map((s, i) => (
              <li key={i} className="flex justify-between pb-2">
                <span>{i + 1}. {s.title}</span>
                <strong>${s.price}</strong>
              </li>
            ))}
          </ul>
        </CustomCard>

        {/* PAYMENT DETAILS */}
        <CustomCard>
          <h3 className="font-semibold text-gray-800 mb-2">Payment Details</h3>

          {/* TOP HEADER ROW */}
          <div className="grid grid-cols-3 text-sm text-gray-500 mb-1">
            <span>Payment Method</span>
            <span>Amount Paid</span>
            <span>Payment Status</span>
          </div>

          {/* VALUES ROW */}
          <div className="grid grid-cols-3 text-sm font-medium pb-3 border-b border-gray-200">
            <span className="text-gray-800">{payment.method}</span>
            <span className="text-blue-600">${payment.amount}</span>
            <span className="text-green-600">{payment.status}</span>
          </div>

          <h4 className="font-semibold text-gray-700 mt-4 mb-3">Bill Details</h4>

          {/* BILL DETAILS */}
          <div className="text-sm space-y-2 pb-3 border-b border-gray-200">
            <div className="flex justify-between"><span>Items total</span> <span>${payment.breakdown.items}</span></div>
            <div className="flex justify-between"><span>Add-On - Services</span> <span>${payment.breakdown.addon}</span></div>
            <div className="flex justify-between"><span>Tax</span> <span>${payment.breakdown.tax}</span></div>
            <div className="flex justify-between"><span>Safety & Warranty</span> <span>${payment.breakdown.warranty}</span></div>
          </div>

          {/* GRAND TOTAL */}
          <div className="pt-4 flex justify-between font-semibold text-gray-900">
            <span>Grand Total</span>
            <span>${payment.amount}</span>
          </div>
        </CustomCard>

      </div>

      {/* FOOTER BUTTONS */}
      <BookingFooter />
    </div>
  );
}
