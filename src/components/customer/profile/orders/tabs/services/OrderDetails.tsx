"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import DownLoadInvoice from "./DownLoadInvoice";
import WriteReview from "./WriteReview";
import Dialog from "@/components/modals/Dialog";
import RaiseComplaint from "./RaiseComplaint";
import DialogBody from "@/components/modals/DialogBody";
import Divider from "@/components/ui/Divider";
import ThankYouReview from "./ThankYouReview";
import DialogHeader from "@/components/modals/DialogHeader";
import ComplaintSubmitted from "./ComplaintSubmitted";

const tabs = [
  "Engine Oil Change",
  "Oil Filter Replacement",
  "Air Filter Cleaning",
  "Brake Inspection",
  "Tire Rotation",
];

export default function OrderDetails({ id }: { id: string }) {
  const router = useRouter();
  const [isDownLoadInvoice, setIsDownloadInvoice] = React.useState(false);
  const [isWriteReview, setIsWriteReview] = React.useState(false);
  const [isSendComplaint, setIsSendComplaint] = React.useState(false);
  const [isReorderService, setIsReorderService] = React.useState(false);
  const [isReturnRequest, setIsReturnRequest] = React.useState(false);

  const [isReviewed, setIsReviewed] = React.useState(false);
  const [rating, setRating] = React.useState(0);

  const [isComplaintSend, setIsComplaintSend] = React.useState(false);

  const tabs = useMemo(
    () => [
      "Engine Oil Change",
      "Oil Filter Replacement",
      "Air Filter Cleaning",
      "Brake Inspection",
      "Tire Rotation",
    ],
    []
  );

  const downloadInvoice = useCallback(() => {
    setIsDownloadInvoice(true);
  }, []);

  const writeReview = useCallback(() => {
    setIsWriteReview(true);
  }, []);

  const sendComplaint = useCallback(() => {
    setIsSendComplaint(true);
  }, []);

  const reorderService = useCallback(() => {
    setIsReorderService(true);
  }, []);

  const returnRequest = useCallback(() => {
    setIsReturnRequest(true);
  }, []);

  return (
    <div className="p-4 bg-white flex flex-col">
      {/* HEADER */}
      <div className="flex items-center gap-2.5 mb-4 border-b border-gray-200 pb-1.5">
        <button
          onClick={() => router.back()}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700" />
        </button>

        <div>
          <h1 className="text-lg font-semibold">Order Details</h1>
          <p className="text-gray-500 text-xs mt-0.5">Order ID: {id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT SECTION - SERVICE SUMMARY */}
        <div className="lg:col-span-2 bg-white border border-gray-200  rounded-2xl p-4">
          <h2 className="font-semibold text-base mb-3">Service Summary</h2>

          <p className="text-gray-500 font-medium mb-1.5 text-xs">
            Tasks Performed
          </p>

          <ul className="space-y-2.5 mb-4">
            {tabs.map((task) => (
              <li
                key={task}
                className="flex items-center gap-2.5 text-gray-700 text-xs"
              >
                <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <img
                    src="/svgs/check-icon.svg"
                    alt="check"
                    className="w-3.5 h-3.5"
                  />
                </span>
                {task}
              </li>
            ))}
          </ul>
          <Divider />

          <p className="text-gray-500 font-medium mb-1 text-xs">Parts Used</p>

          <div className="flex justify-between text-gray-700 text-xs border-border -b py-1.5">
            <span>Castrol Engine Oil 5W-30</span>
            <span>$45.00</span>
          </div>

          <div className="flex justify-between text-gray-700 text-xs py-1.5">
            <span>Oil Filter</span>
            <span>$12.00</span>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-4">
          {/* Workshop Card */}
          <div className="bg-white border-border  rounded-2xl shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-800 mb-2.5">
              Workshop
            </p>

            <div className="flex items-center gap-2.5">
              <Image
                src="/images/Workshop/AtoZ.png"
                width={48}
                height={48}
                alt="garage"
                className="rounded-xl object-cover"
              />

              <div className="flex-1">
                <p className="font-bold text-xs">A to Z Services</p>
                <p className="text-xs flex items-center gap-1 text-gray-600">
                  ⭐ 4.5 <span className="text-gray-400">(120)</span>
                </p>
              </div>

              <div className="flex gap-1.5">
                <button className="p-1.5 bg-blue-50 rounded-full">
                  <img
                    src="/svgs/direction-fill.svg"
                    alt="phone"
                    className="w-4 h-4"
                  />
                </button>
                <button className="p-1.5 bg-green-50 rounded-full">
                  <img
                    src="/svgs/call-icon.svg"
                    alt="chat"
                    className="w-4 h-4"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Vehicle Card */}
          <div className="bg-white border-border  rounded-2xl shadow-sm p-4">
            <p className="text-xs font-semibold mb-2.5">Vehicle</p>

            <div className="flex items-center gap-2.5">
              <Image
                src="/images/workshop/car.png"
                width={56}
                height={56}
                alt="vehicle"
                className="object-contain"
              />

              <div>
                <p className="font-semibold text-xs">
                  Toyota Hilux • ABC1234 D
                </p>
                <p className="text-gray-500 text-[11px] leading-tight">
                  2021 Petrol Automatic 2.5 Liters Hybrid AWD-i
                </p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white border-border rounded-2xl shadow-sm p-4">
            <p className="text-xs font-semibold mb-2.5">Payment Summary</p>

            <div className="flex justify-between text-xs py-0.5">
              <span>Service Charges</span>
              <span>$92.00</span>
            </div>
            <Divider />

            <div className="flex justify-between text-xs py-0.5">
              <span>Parts Cost</span>
              <span>$57.00</span>
            </div>
            <Divider />

            <div className="flex justify-between font-semibold text-base text-orange-500">
              <span>Total Paid</span>
              <span>$149.00</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={downloadInvoice}
              className="border border-gray-200 rounded-xl py-1.5 text-xs flex flex-col items-center gap-1.5 hover:bg-gray-50"
            >
              <img
                src="/svgs/download-icon.svg"
                alt="invoice"
                className="w-4 h-4"
              />
              <span className="text-[11px]">Invoice</span>
            </button>

            <button
              onClick={writeReview}
              className="border border-gray-200  rounded-xl py-1.5 text-xs flex flex-col items-center gap-1.5 hover:bg-gray-50"
            >
              <img
                src="/svgs/like-icon.svg"
                alt="rate-driver"
                className="w-4 h-4"
              />
              <span className="text-[11px]">Write Review</span>
            </button>

            <button
              onClick={sendComplaint}
              className="border border-gray-200  rounded-xl py-1.5 text-xs flex flex-col items-center gap-1.5 hover:bg-gray-50"
            >
              <img
                src="/svgs/chat-icon.svg"
                alt="complaint"
                className="w-4 h-4"
              />
              <span className="text-[11px]">Complaint</span>
            </button>
          </div>

          {/* Reorder Button */}
          <button
            onClick={returnRequest}
            className="w-full text-gray-600 border border-gray-200 font-semibold py-1.5 rounded-xl text-xs"
          >
            Return Request
          </button>

          <button
            onClick={reorderService}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1.5 rounded-xl text-xs"
          >
            Reorder
          </button>
        </div>
      </div>

      {isDownLoadInvoice && (
        <Dialog
          isOpen={isDownLoadInvoice}
          onClose={() => setIsDownloadInvoice(false)}
        >
          <DialogBody className="p-4">
            <DialogHeader
              title="Invoice"
              onClose={() => setIsDownloadInvoice(false)}
            />
            <DownLoadInvoice />
          </DialogBody>
        </Dialog>
      )}

      {/* WRITE REVIEW MODAL */}
      <Dialog isOpen={isWriteReview} onClose={() => setIsWriteReview(false)}>
        <DialogBody className="p-4">
          <DialogHeader
            title={"Rate Your Experience"}
            onClose={() => setIsWriteReview(false)}
          />
          <WriteReview
            onClose={() => setIsWriteReview(false)}
            setIsReviewed={(v) => {
              setIsWriteReview(false);
              setIsReviewed(v);
            }}
            setRatingFromChild={setRating}
          />
        </DialogBody>
      </Dialog>

      {/* THANK YOU MODAL */}
      <Dialog isOpen={isReviewed} onClose={() => setIsReviewed(false)}>
        <DialogBody className="p-4">
          <DialogHeader title={"Review"} onClose={() => setIsReviewed(false)} />
          <ThankYouReview
            rating={rating}
            serviceName="Periodic Maintenance"
            onDone={() => setIsReviewed(false)}
            onClose={() => setIsReviewed(false)}
          />
        </DialogBody>
      </Dialog>

      {isSendComplaint && (
        <Dialog
          isOpen={isSendComplaint}
          onClose={() => setIsSendComplaint(false)}
        >
          <DialogBody className="p-6">
            <DialogHeader
              title={"Raise a Complaint"}
              onClose={() => setIsSendComplaint(false)}
            />
            <RaiseComplaint
              setIsSendComplaint={setIsSendComplaint}
              setIsComplaintSend={setIsComplaintSend}
            />
          </DialogBody>
        </Dialog>
      )}

      {isComplaintSend && (
        <Dialog
          isOpen={isComplaintSend}
          onClose={() => setIsComplaintSend(false)}
        >
          <DialogBody className="p-4">
            <DialogHeader
              title={"Complaint sent"}
              onClose={() => setIsComplaintSend(false)}
            />
            <ComplaintSubmitted />
          </DialogBody>
        </Dialog>
      )}
    </div>
  );
}
