"use client";

import {
  ArrowLeft,
  MapPin,
  Navigation,
  FileDown,
  MessageSquare,
  Star,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import TowInvoice from "./TowInvoice";
import TowDriverReview from "./TowDriverReview";
import TowComplaint from "./TowComplaint";


export default function TowingOrderDetails({ id }: { id: string }) {
  const router = useRouter();

  // Modal states
  const [isInvoice, setIsInvoice] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [isComplaint, setIsComplaint] = useState(false);

  const statusTimeline = [
    { label: "Request Accepted", date: "28 July 2025, 4:30 PM" },
    { label: "Truck Dispatched", date: "28 July 2025, 4:32 PM" },
    { label: "Driver Reached Pickup", date: "28 July 2025, 4:45 PM" },
    { label: "Vehicle Loaded", date: "28 July 2025, 5:00 PM" },
    { label: "Drop Complete", date: "28 July 2025, 5:30 PM" },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-xl font-semibold">Towing Details</h1>
          <p className="text-sm text-gray-500">Tow Request ID: {id}</p>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="rounded-xl overflow-hidden border">
        <Image
          src="/images/map-demo.png" // Replace with real map or static preview
          width={1200}
          height={400}
          alt="map"
          className="w-full h-[320px] object-cover"
        />
      </div>

      {/* PICKUP + DESTINATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pickup */}
        <div className="border rounded-xl p-4 flex items-start gap-3">
          <MapPin className="text-blue-600" size={22} />
          <div>
            <p className="font-semibold text-gray-800">Pickup Location</p>
            <p className="text-sm text-gray-600">
              123 Main Road, NH-123, Hyderabad-54
            </p>
          </div>
        </div>

        {/* Drop */}
        <div className="border rounded-xl p-4 flex items-start gap-3">
          <Navigation className="text-green-600" size={22} />
          <div>
            <p className="font-semibold text-gray-800">Destination</p>
            <p className="text-sm text-gray-600">
              Joe’s Auto Repair, ABC Road, Secundrabad
            </p>
          </div>
        </div>
      </div>

      {/* STATUS TIMELINE */}
      <div className="border rounded-xl p-5">
        <h2 className="font-semibold mb-4">Status Timeline</h2>

        <div className="space-y-4">
          {statusTimeline.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle size={22} className="text-green-500 mt-1" />
              <div>
                <p className="font-semibold">{item.label}</p>
                <p className="text-gray-500 text-sm">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDEBAR SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* BLANK */}
        <div className="lg:col-span-2"></div>

        {/* RIGHT DETAILS */}
        <div className="space-y-6">

          {/* DRIVER DETAILS */}
          <div className="border rounded-xl p-5">
            <p className="text-sm font-semibold text-gray-800 mb-3">Driver Details</p>

            <div className="flex items-center gap-3">
              <Image
                src="/images/driver.jpg"
                width={55}
                height={55}
                alt="driver"
                className="rounded-full object-cover"
              />

              <div className="flex-1">
                <p className="font-bold">John Smith</p>
                <p className="text-sm text-gray-600">⭐ 4.8 • 342 trips</p>
                <p className="text-xs text-gray-500">Heavy Duty Tow Truck</p>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm">
                  Chat
                </button>
                <button className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm">
                  Call
                </button>
              </div>
            </div>
          </div>

          {/* PAYMENT SUMMARY */}
          <div className="border rounded-xl p-5">
            <p className="text-sm font-semibold mb-3">Payment Summary</p>

            <div className="flex justify-between text-sm mb-2">
              <span>Base Fare</span>
              <span>$60.00</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Distance Charges</span>
              <span>$20.00</span>
            </div>

            <div className="flex justify-between text-sm mb-3">
              <span>Service Fee</span>
              <span>$5.00</span>
            </div>

            <div className="border-t my-2" />

            <div className="flex justify-between text-orange-500 text-lg font-semibold">
              <span>Total Paid</span>
              <span>$85.00</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-3 gap-3">
            {/* Invoice */}
            <button
              onClick={() => setIsInvoice(true)}
              className="border rounded-xl py-3 flex flex-col items-center hover:bg-gray-50"
            >
              <FileDown size={20} />
              <span className="text-sm">Invoice</span>
            </button>

            {/* Rate driver */}
            <button
              onClick={() => setIsReview(true)}
              className="border rounded-xl py-3 flex flex-col items-center hover:bg-gray-50"
            >
              <Star size={20} />
              <span className="text-sm">Rate Driver</span>
            </button>

            {/* Complaint */}
            <button
              onClick={() => setIsComplaint(true)}
              className="border rounded-xl py-3 flex flex-col items-center hover:bg-gray-50"
            >
              <MessageSquare size={20} />
              <span className="text-sm">Complaint</span>
            </button>
          </div>

          {/* REQUEST AGAIN */}
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl">
            Request Towing Again
          </button>

        </div>
      </div>

      {/* MODALS ---------------------------------- */}

      {/* INVOICE MODAL */}
      {isInvoice && (
        <Dialog isOpen={isInvoice} onClose={() => setIsInvoice(false)}>
          <DialogBody>
            <TowInvoice onClose={() => setIsInvoice(false)} />
          </DialogBody>
        </Dialog>
      )}

      {/* REVIEW MODAL */}
      {isReview && (
        <Dialog isOpen={isReview} onClose={() => setIsReview(false)}>
          <DialogBody>
            <TowDriverReview onClose={() => setIsReview(false)} />
          </DialogBody>
        </Dialog>
      )}

      {/* COMPLAINT MODAL */}
      {isComplaint && (
        <Dialog isOpen={isComplaint} onClose={() => setIsComplaint(false)}>
          <DialogBody>
            <TowComplaint onClose={() => setIsComplaint(false)} />
          </DialogBody>
        </Dialog>
      )}

    </div>
  );
}
