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
import DialogHeader from "@/components/modals/DialogHeader";

import TowInvoice from "./TowInvoice";
import TowDriverReview from "./TowDriverReview";
import TowComplaint from "./TowComplaint";

// Success screens

import LeftLayout from "@/components/Layout/LeftLayout";
import RightLayout from "@/components/Layout/RightLayout";
import ThankYouReview from "./ThankYouReview";
import ComplaintSubmitted from "./ComplaintSubmitted";

export default function TowingOrderDetails({ id }: { id: string }) {
  const router = useRouter();

  // Primary modals
  const [isInvoice, setIsInvoice] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [isComplaint, setIsComplaint] = useState(false);

  // Success dialogs shown after submitting child forms
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [isComplaintSubmitted, setIsComplaintSubmitted] = useState(false);

  const statusTimeline = [
    { label: "Request Accepted", date: "28 July 2025, 4:30 PM" },
    { label: "Truck Dispatched", date: "28 July 2025, 4:32 PM" },
    { label: "Driver Reached Pickup", date: "28 July 2025, 4:45 PM" },
    { label: "Vehicle Loaded", date: "28 July 2025, 5:00 PM" },
    { label: "Drop Complete", date: "28 July 2025, 5:30 PM" },
  ];

  return (
    <div className="flex">

      {/* LEFT SECTION */}
      <LeftLayout>
        <div className="p-4 flex flex-col gap-4">

          {/* HEADER */}
          <div className="flex items-center gap-3 border-b border-border pb-2">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="text-xl font-semibold">Towing Details</h1>
              <p className="text-sm text-gray-500">Tow Request ID: {id}</p>
            </div>
          </div>

          {/* MAP */}
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <Image
              src="/images/map-demo.png"
              width={500}
              height={400}
              alt="map"
              className="w-full h-[320px] object-cover"
            />
          </div>

          {/* PICKUP + DESTINATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pickup */}
            <div className="border border-gray-200 rounded-xl p-4 flex items-start gap-3 bg-white">
              <MapPin size={22} className="text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">Pickup Location</p>
                <p className="text-sm text-gray-600">
                  123 Main Road, NH-123, Hyderabad-54
                </p>
              </div>
            </div>

            {/* Destination */}
            <div className="border border-gray-200 rounded-xl p-4 flex items-start gap-3 bg-white">
              <Navigation size={22} className="text-green-600" />
              <div>
                <p className="font-semibold text-gray-800">Destination</p>
                <p className="text-sm text-gray-600">
                  Joe’s Auto Repair, ABC Road, Secundrabad
                </p>
              </div>
            </div>
          </div>

          {/* STATUS TIMELINE */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
            <h2 className="font-semibold mb-4">Status Timeline</h2>

            <div className="space-y-4">
              {statusTimeline.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1" size={22} />
                  <div>
                    <p className="font-semibold">{step.label}</p>
                    <p className="text-sm text-gray-500">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </LeftLayout>

      {/* RIGHT SIDEBAR */}
      <RightLayout>
        <div className="flex flex-col gap-4 p-4">

          {/* DRIVER DETAILS */}
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
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
                <p className="text-xs text-gray-500">Flatbed Towing</p>
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
          <div className="border border-gray-200 rounded-xl p-5 bg-white">
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
            <button
              onClick={() => setIsInvoice(true)}
              className="border border-gray-200 rounded-xl py-3 flex flex-col items-center hover:bg-gray-50"
            >
              <FileDown size={20} />
              <span className="text-sm">Invoice</span>
            </button>

            <button
              onClick={() => setIsReview(true)}
              className="border border-gray-200 rounded-xl py-3 flex flex-col items-center hover:bg-gray-50"
            >
              <Star size={20} />
              <span className="text-sm">Rate Driver</span>
            </button>

            <button
              onClick={() => setIsComplaint(true)}
              className="border border-gray-200 rounded-xl py-3 flex flex-col items-center hover:bg-gray-50"
            >
              <MessageSquare size={20} />
              <span className="text-sm">Complaint</span>
            </button>
          </div>

          {/* REQUEST AGAIN */}
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold">
            Request Towing Again
          </button>
        </div>
      </RightLayout>

      {/* ================= MODALS ================= */}

      {/* INVOICE MODAL */}
      <Dialog isOpen={isInvoice} onClose={() => setIsInvoice(false)}>
        <DialogBody className="p-4">
          <DialogHeader title="Tow Invoice" onClose={() => setIsInvoice(false)} />
          <TowInvoice onClose={() => setIsInvoice(false)} />
        </DialogBody>
      </Dialog>

      {/* REVIEW MODAL */}
      <Dialog isOpen={isReview} onClose={() => setIsReview(false)}>
        <DialogBody className="p-4">
          <DialogHeader title="Rate Towing Service" onClose={() => setIsReview(false)} />
          {/* Pass onSubmitted to open the ThankYou dialog after the review is submitted */}
          <TowDriverReview
            onClose={() => setIsReview(false)}
            onSubmitted={() => {
              setIsReview(false);
              setIsReviewSubmitted(true);
            }}
          />
        </DialogBody>
      </Dialog>

      {/* REVIEW THANK YOU DIALOG */}
      <Dialog isOpen={isReviewSubmitted} onClose={() => setIsReviewSubmitted(false)}>
        <DialogBody className="p-4">
          <DialogHeader title="Thank You!" onClose={() => setIsReviewSubmitted(false)} />
          <ThankYouReview
            rating={4} 
            serviceName="Towing Service"
            onDone={() => setIsReviewSubmitted(false)}
            onClose={() => setIsReviewSubmitted(false)}
          />
        </DialogBody>
      </Dialog>

      {/* COMPLAINT MODAL */}
      <Dialog isOpen={isComplaint} onClose={() => setIsComplaint(false)}>
        <DialogBody className="p-4">
          <DialogHeader title="Raise a Complaint" onClose={() => setIsComplaint(false)} />
          {/* Pass onSubmitted so child can trigger success screen */}
          <TowComplaint
            onClose={() => setIsComplaint(false)}
            onSubmitted={() => {
              setIsComplaint(false);
              setIsComplaintSubmitted(true);
            }}
          />
        </DialogBody>
      </Dialog>

      {/* COMPLAINT SUBMITTED DIALOG */}
      <Dialog isOpen={isComplaintSubmitted} onClose={() => setIsComplaintSubmitted(false)}>
        <DialogBody className="p-4">
          <DialogHeader title="Complaint Submitted" onClose={() => setIsComplaintSubmitted(false)} />
          <ComplaintSubmitted />
        </DialogBody>
      </Dialog>



    </div>
  );
}
