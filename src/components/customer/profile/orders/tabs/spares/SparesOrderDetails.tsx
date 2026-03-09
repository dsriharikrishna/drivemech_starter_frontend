"use client";

import { ArrowLeft, CheckCircle, Package } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";

import DownLoadSpareInvoice from "./DownLoadSpareInvoice";
import WriteSpareReview from "./WriteSpareReview";
import RaiseSpareComplaint from "./RaiseSpareComplaint";
import ThankYouSpareReview from "./ThankYouSpareReview";
import ComplaintSubmitted from "./ComplaintSubmitted";
import Divider from "@/components/ui/Divider";

export default function SparesOrderDetails({ id }: { id: string }) {
  const router = useRouter();

  const [isInvoice, setIsInvoice] = React.useState(false);
  const [isReview, setIsReview] = React.useState(false);
  const [isComplaint, setIsComplaint] = React.useState(false);
  const [isReorderService, setIsReorderService] = React.useState(false);
  const [isReviewed, setIsReviewed] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [isComplaintSuccess, setIsComplaintSuccess] = React.useState(false);

  const products = useMemo(
    () => [
      {
        name: "Bosch Brake Pad Set",
        brand: "Bosch",
        qty: 2,
        price: 118,
        img: "/images/orders/BreakPads.png",
      },
      {
        name: "Bosch Air Filter",
        brand: "Bosch",
        qty: 1,
        price: 28,
        img: "/images/orders/BoschFilter.png",
      },
      {
        name: "Wiper Blades Set",
        brand: "Bosch",
        qty: 1,
        price: 22,
        img: "/images/orders/Wipers.png",
      },
    ],
    []
  );

  const timeline = useMemo(
    () => [
      { label: "Order Placed", date: "25 July, 10:00 AM" },
      { label: "Order Confirmed", date: "25 July, 10:15 AM" },
      { label: "Shipped", date: "26 July, 9:00 AM" },
      { label: "Out for Delivery", date: "28 July, 8:00 AM" },
      { label: "Delivered", date: "28 July, 2:30 PM" },
    ],
    []
  );

  const handleReturnRequest = useCallback(() => {
    router.push(`/customer/profile/my-orders/spares/return-request/${id}`);
  }, [router, id]);

  return (
    <div className="p-4 space-y-4">
      {/* HEADER */}
      <div className="flex items-center gap-2.5 pb-1.5 border-b border-gray-200">
        <button
          onClick={() => router.back()}
          className="p-1.5 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-lg font-semibold">Order Details</h1>
          <p className="text-xs text-gray-500">Order ID: {id}</p>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-4">
          {/* PRODUCT DETAILS */}
          <div className="border border-gray-200 rounded-xl p-3">
            <h2 className="font-semibold mb-2.5 text-xs">Product Details</h2>

            {products.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-200 last:border-none py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <Image src={item.img} width={36} height={36} alt="product" />

                  <div>
                    <p className="font-medium text-xs">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.brand} • Qty: {item.qty}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-orange-500 text-xs">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* TIMELINE */}
          <div className="border border-gray-200 rounded-xl p-3">
            <h2 className="font-semibold mb-2.5 text-xs">Tracking Timeline</h2>

            <div className="space-y-3">
              {timeline.map((step, index) => (
                <div key={index} className="flex gap-2.5 items-start">
                  <CheckCircle className="text-green-500 mt-0.5" size={18} />
                  <div>
                    <p className="font-semibold text-gray-800 text-xs">
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-500">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          {/* SHIPPING ADDRESS */}
          <div className="border border-gray-200 rounded-xl p-3">
            <h2 className="font-semibold mb-2.5 text-xs">Shipping Address</h2>
            <div className="flex items-start gap-2.5">
              <Package size={18} className="text-gray-600 mt-0.5" />
              <p className="text-xs text-gray-700">
                123 Main Street, Apartment 4B, Downtown, City - 400 123
              </p>
            </div>
          </div>

          {/* COURIER INFO */}
          <div className="border border-gray-200 rounded-xl p-3 space-y-1.5">
            <h2 className="font-semibold text-xs">Courier Details</h2>
            <div className="flex items-center gap-2.5">
              <img
                src="/svgs/fast-ship-icon.svg"
                alt="fastship"
                className="w-5 h-5"
              />
              <div>
                <p className="font-medium text-gray-800 text-xs">
                  FastShip Express
                </p>
                <p className="text-xs text-blue-500">Tracking: FS12345678901</p>
              </div>
            </div>
            <p className="text-green-600 bg-green-100 px-2.5 py-1.5 rounded-lg text-xs">
              ✔ Delivered on 28 July 2025
            </p>
          </div>

          {/* PAYMENT SUMMARY */}
          <div className="border border-gray-200 rounded-xl p-3 space-y-1.5">
            <h2 className="font-semibold text-xs">Payment Summary</h2>

            <div className="flex justify-between text-xs py-0.5">
              <span>Product Cost</span>
              <span>$168.00</span>
            </div>

            <div className="flex justify-between text-xs py-0.5">
              <span>Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>

            <Divider />

            <div className="flex justify-between font-semibold text-orange-500 text-base">
              <span>Total Paid</span>
              <span>$168.00</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => setIsInvoice(true)}
              className="flex flex-col items-center gap-1.5 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50"
            >
              <img
                src="/svgs/download-icon.svg"
                alt="invoice"
                className="w-4 h-4"
              />
              <span className="text-[11px]">Invoice</span>
            </button>

            <button
              onClick={() => setIsReview(true)}
              className="flex flex-col items-center gap-1.5 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50"
            >
              <img src="/svgs/like-icon.svg" alt="review" className="w-4 h-4" />
              <span className="text-[11px]">Write Review</span>
            </button>

            <button
              onClick={() => setIsComplaint(true)}
              className="flex flex-col items-center gap-1.5 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50"
            >
              <img
                src="/svgs/chat-icon.svg"
                alt="complaint"
                className="w-4 h-4"
              />
              <span className="text-[11px]">Complaint</span>
            </button>
          </div>

          {/* RETURN REQUEST */}
          <button
            onClick={handleReturnRequest}
            className="w-full border border-gray-200 rounded-xl py-1.5 text-gray-700 hover:bg-gray-100 text-xs"
          >
            Return Request
          </button>
          <button
            onClick={() => setIsReorderService(true)}
            className="w-full bg-primary-500 text-white border border-gray-200 rounded-xl py-1.5 text-xs"
          >
            Reorder
          </button>
        </div>
      </div>

      {/* INVOICE MODAL */}
      <Dialog isOpen={isInvoice} onClose={() => setIsInvoice(false)}>
        <DialogBody className="p-4">
          <DialogHeader title={"Invoice"} onClose={() => setIsInvoice(false)} />
          <DownLoadSpareInvoice onClose={() => setIsInvoice(false)} />
        </DialogBody>
      </Dialog>

      {/* WRITE REVIEW MODAL */}
      <Dialog isOpen={isReview} onClose={() => setIsReview(false)}>
        <DialogBody className="p-4">
          <DialogHeader
            title={"Write Review"}
            onClose={() => setIsReview(false)}
          />
          <WriteSpareReview
            onClose={() => setIsReview(false)}
            setIsReviewed={setIsReviewed}
            setRatingFromChild={setRating}
          />
        </DialogBody>
      </Dialog>

      {/* THANK YOU MODAL */}
      <Dialog isOpen={isReviewed} onClose={() => setIsReviewed(false)}>
        <DialogBody className="p-4">
          <DialogHeader
            title={"Review Submitted"}
            onClose={() => setIsReviewed(false)}
          />
          <ThankYouSpareReview
            rating={rating}
            serviceName="Spares Order"
            onDone={() => setIsReviewed(false)}
            onClose={() => setIsReviewed(false)}
          />
        </DialogBody>
      </Dialog>

      {/* COMPLAINT MODAL */}
      <Dialog isOpen={isComplaint} onClose={() => setIsComplaint(false)}>
        <DialogBody className="p-4">
          <DialogHeader
            title={"Raise Complaint"}
            onClose={() => setIsComplaint(false)}
          />
          <RaiseSpareComplaint onClose={() => setIsComplaint(false)} />
        </DialogBody>
      </Dialog>

      {/* COMPLAINT SUCCESS MODAL */}
      <Dialog
        isOpen={isComplaintSuccess}
        onClose={() => setIsComplaintSuccess(false)}
      >
        <DialogBody className="p-4">
          <DialogHeader
            title={"Complaint Submitted"}
            onClose={() => setIsComplaintSuccess(false)}
          />
          <ComplaintSubmitted />
        </DialogBody>
      </Dialog>
    </div>
  );
}
