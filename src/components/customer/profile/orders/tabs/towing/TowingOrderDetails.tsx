"use client";

import { ArrowLeft, MapPin, Navigation, CheckCircle } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useCallback } from "react";

import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";

import TowInvoice from "./TowInvoice";
import TowDriverReview from "./TowDriverReview";
import TowComplaint from "./TowComplaint";
import DriverDetailsCard from "./DriverDetailsCard";

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

  const statusTimeline = useMemo(
    () => [
      { label: "Request Accepted", date: "28 July 2025, 4:30 PM" },
      { label: "Truck Dispatched", date: "28 July 2025, 4:32 PM" },
      { label: "Driver Reached Pickup", date: "28 July 2025, 4:45 PM" },
      { label: "Vehicle Loaded", date: "28 July 2025, 5:00 PM" },
      { label: "Drop Complete", date: "28 July 2025, 5:30 PM" },
    ],
    []
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="flex">
      {/* LEFT SECTION */}
      <LeftLayout>
        <div className="p-3 flex flex-col gap-3">
          {/* HEADER */}
          <div className="flex items-center gap-2.5 border-b border-border pb-1.5">
            <button
              onClick={handleBack}
              className="p-1.5 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-lg font-semibold">Towing Details</h1>
              <p className="text-xs text-gray-500">Tow Request ID: {id}</p>
            </div>
          </div>

          {/* MAP */}
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <Image
              src="/images/map-demo.png"
              width={500}
              height={400}
              alt="map"
              className="w-full h-[280px] object-cover"
            />
          </div>

          {/* PICKUP + DESTINATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Pickup */}
            <div className="border border-gray-200 rounded-xl p-3 flex items-start gap-2.5 bg-white">
              <MapPin size={18} className="text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800 text-xs">
                  Pickup Location
                </p>
                <p className="text-xs text-gray-600">
                  123 Main Road, NH-123, Hyderabad-54
                </p>
              </div>
            </div>

            {/* Destination */}
            <div className="border border-gray-200 rounded-xl p-3 flex items-start gap-2.5 bg-white">
              <Navigation size={18} className="text-green-600" />
              <div>
                <p className="font-semibold text-gray-800 text-xs">
                  Destination
                </p>
                <p className="text-xs text-gray-600">
                  Joe's Auto Repair, ABC Road, Secundrabad
                </p>
              </div>
            </div>
          </div>

          {/* STATUS TIMELINE */}
          <div className="border border-gray-200 rounded-xl p-4 bg-white">
            <h2 className="font-semibold mb-3 text-xs">Status Timeline</h2>

            <div className="space-y-3">
              {statusTimeline.map((step, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle className="text-green-500 mt-0.5" size={18} />
                  <div>
                    <p className="font-semibold text-xs">{step.label}</p>
                    <p className="text-xs text-gray-500">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LeftLayout>

      {/* RIGHT SIDEBAR */}
      <RightLayout>
        <div className="flex flex-col gap-3">
          {/* DRIVER DETAILS */}
          <DriverDetailsCard />

          {/* PAYMENT SUMMARY */}
          <div className="border border-gray-200 rounded-xl p-4 bg-white">
            <p className="text-xs font-semibold mb-2.5">Payment Summary</p>

            <div className="flex justify-between text-xs mb-1.5">
              <span>Base Fare</span>
              <span>$60.00</span>
            </div>

            <div className="flex justify-between text-xs mb-1.5">
              <span>Distance Charges</span>
              <span>$20.00</span>
            </div>

            <div className="flex justify-between text-xs mb-2.5">
              <span>Service Fee</span>
              <span>$5.00</span>
            </div>

            <div className="border-t my-1.5" />

            <div className="flex justify-between text-orange-500 text-base font-semibold">
              <span>Total Paid</span>
              <span>$85.00</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => setIsInvoice(true)}
              className="border border-gray-200 rounded-xl py-1.5 flex flex-col gap-0.5 items-center hover:bg-gray-50"
            >
              <img
                src="/svgs/download-icon.svg"
                alt="invoice"
                className="w-5 h-5"
              />
              <span className="text-xs">Invoice</span>
            </button>

            <button
              onClick={() => setIsReview(true)}
              className="border border-gray-200 rounded-xl py-1.5 flex flex-col gap-0.5 items-center hover:bg-gray-50"
            >
              <img
                src="/svgs/like-icon.svg"
                alt="rate-driver"
                className="w-5 h-5"
              />
              <span className="text-xs">Rate Driver</span>
            </button>

            <button
              onClick={() => setIsComplaint(true)}
              className="border border-gray-200 rounded-xl py-1.5 flex flex-col gap-0.5 items-center hover:bg-gray-50"
            >
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs">Complaint</span>
            </button>
          </div>

          {/* REQUEST AGAIN */}
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-semibold text-xs">
            Request Towing Again
          </button>
        </div>
      </RightLayout>

      {/* ================= MODALS ================= */}

      {/* INVOICE MODAL */}
      <Dialog isOpen={isInvoice} onClose={() => setIsInvoice(false)}>
        <DialogBody className="p-4">
          <DialogHeader
            title="Tow Invoice"
            onClose={() => setIsInvoice(false)}
          />
          <TowInvoice />
        </DialogBody>
      </Dialog>

      {/* REVIEW MODAL */}
      <Dialog isOpen={isReview} onClose={() => setIsReview(false)}>
        <DialogBody className="p-4">
          <DialogHeader
            title="Rate Towing Service"
            onClose={() => setIsReview(false)}
          />
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
      <Dialog
        isOpen={isReviewSubmitted}
        onClose={() => setIsReviewSubmitted(false)}
      >
        <DialogBody className="p-4">
          <DialogHeader
            title="Thank You!"
            onClose={() => setIsReviewSubmitted(false)}
          />
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
          <DialogHeader
            title="Raise a Complaint"
            onClose={() => setIsComplaint(false)}
          />
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
      <Dialog
        isOpen={isComplaintSubmitted}
        onClose={() => setIsComplaintSubmitted(false)}
      >
        <DialogBody className="p-4">
          <DialogHeader
            title="Complaint Submitted"
            onClose={() => setIsComplaintSubmitted(false)}
          />
          <ComplaintSubmitted />
        </DialogBody>
      </Dialog>
    </div>
  );
}
