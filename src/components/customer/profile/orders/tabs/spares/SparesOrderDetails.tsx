"use client";

import {
    ArrowLeft,
    CheckCircle,
    Package,
} from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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

    // dialog states
    const [isInvoice, setIsInvoice] = React.useState(false);
    const [isReview, setIsReview] = React.useState(false);
    const [isComplaint, setIsComplaint] = React.useState(false);
    const [isReorderService, setIsReorderService] = React.useState(false);

    // review flow
    const [isReviewed, setIsReviewed] = React.useState(false);
    const [rating, setRating] = React.useState(0);

    // complaint success
    const [isComplaintSuccess, setIsComplaintSuccess] = React.useState(false);

    const products = [
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
    ];

    const timeline = [
        { label: "Order Placed", date: "25 July, 10:00 AM" },
        { label: "Order Confirmed", date: "25 July, 10:15 AM" },
        { label: "Shipped", date: "26 July, 9:00 AM" },
        { label: "Out for Delivery", date: "28 July, 8:00 AM" },
        { label: "Delivered", date: "28 July, 2:30 PM" },
    ];


    return (
        <div className="p-6 space-y-6">

            {/* HEADER */}
            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                >
                    <ArrowLeft size={20} />
                </button>

                <div>
                    <h1 className="text-xl font-semibold">Order Details</h1>
                    <p className="text-sm text-gray-500">Order ID: {id}</p>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">

                    {/* PRODUCT DETAILS */}
                    <div className="border border-gray-200 rounded-xl p-4">
                        <h2 className="font-semibold mb-3">Product Details</h2>

                        {products.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border-b border-gray-200 last:border-none py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <Image src={item.img} width={40} height={40} alt="product" />

                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {item.brand} • Qty: {item.qty}
                                        </p>
                                    </div>
                                </div>

                                <p className="font-semibold text-orange-500">
                                    ${item.price.toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* TIMELINE */}
                    <div className="border border-gray-200 rounded-xl p-4">
                        <h2 className="font-semibold mb-3">Tracking Timeline</h2>

                        <div className="space-y-4">
                            {timeline.map((step, index) => (
                                <div key={index} className="flex gap-3 items-start">
                                    <CheckCircle className="text-green-500 mt-1" size={20} />
                                    <div>
                                        <p className="font-semibold text-gray-800">{step.label}</p>
                                        <p className="text-sm text-gray-500">{step.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-5">

                    {/* SHIPPING ADDRESS */}
                    <div className="border border-gray-200 rounded-xl p-4">
                        <h2 className="font-semibold mb-3">Shipping Address</h2>
                        <div className="flex items-start gap-3">
                            <Package size={20} className="text-gray-600 mt-1" />
                            <p className="text-sm text-gray-700">
                                123 Main Street, Apartment 4B, Downtown, City - 400 123
                            </p>
                        </div>
                    </div>

                    {/* COURIER INFO */}
                    <div className="border border-gray-200 rounded-xl p-4 space-y-2">
                        <h2 className="font-semibold">Courier Details</h2>
                        <div className="flex items-center gap-3">
                            <img src="/svgs/fast-ship-icon.svg" alt="fastship" />
                            <div>
                                <p className="font-medium text-gray-800">FastShip Express</p>
                                <p className="text-sm text-blue-500">Tracking: FS12345678901</p>
                            </div>
                        </div>
                        <p className="text-green-600 bg-green-100 px-3 py-2 rounded-lg text-sm">
                            ✔ Delivered on 28 July 2025
                        </p>
                    </div>

                    {/* PAYMENT SUMMARY */}
                    <div className="border border-gray-200 rounded-xl p-4 space-y-2">
                        <h2 className="font-semibold">Payment Summary</h2>

                        <div className="flex justify-between text-sm py-1">
                            <span>Product Cost</span>
                            <span>$168.00</span>
                        </div>

                        <div className="flex justify-between text-sm py-1">
                            <span>Shipping</span>
                            <span className="text-green-600">FREE</span>
                        </div>

                        <Divider />

                        <div className="flex justify-between font-semibold text-orange-500 text-lg">
                            <span>Total Paid</span>
                            <span>$168.00</span>
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={() => setIsInvoice(true)}
                            className="flex flex-col items-center border border-gray-200 rounded-xl py-3 hover:bg-gray-50"
                        >
                            <svg className="w-[20px] h-[20px]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.83008 12.2869V2.45703" stroke="currentColor" strokeWidth="1.63832" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M17.2024 12.2891V15.5657C17.2024 16.0002 17.0298 16.4169 16.7225 16.7242C16.4153 17.0314 15.9986 17.204 15.5641 17.204H4.09584C3.66133 17.204 3.24462 17.0314 2.93737 16.7242C2.63013 16.4169 2.45752 16.0002 2.45752 15.5657V12.2891" stroke="currentColor" strokeWidth="1.63832" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.73389 8.19141L9.82968 12.2872L13.9255 8.19141" stroke="currentColor" strokeWidth="1.63832" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm">Invoice</span>
                        </button>

                        <button
                            onClick={() => setIsReview(true)}
                            className="flex flex-col items-center border border-gray-200 rounded-xl py-3 hover:bg-gray-50"
                        >
                            <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFA500" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm">Write Review</span>
                        </button>

                        <button
                            onClick={() => setIsComplaint(true)}
                            className="flex flex-col items-center border border-gray-200 rounded-xl py-3 hover:bg-gray-50"
                        >
                            <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm">Complaint</span>
                        </button>
                    </div>

                    {/* RETURN REQUEST */}
                    <button
                        onClick={() =>
                            router.push(
                                `/customer/profile/my-orders/spares/return-request/${id}`
                            )
                        }
                        className="w-full border border-gray-200 rounded-xl py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Return Request
                    </button>
                    <button
                        onClick={() => setIsReorderService(true)}
                        className="w-full bg-primary-500 text-white border border-gray-200 rounded-xl py-2"
                    >
                        Reorder
                    </button>
                </div>

            </div>

            {/* INVOICE MODAL */}
            <Dialog isOpen={isInvoice} onClose={() => setIsInvoice(false)}>
                <DialogBody className="p-4">
                    <DialogHeader
                        title={"Invoice"}
                        onClose={() => setIsInvoice(false)}
                    />
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
            <Dialog isOpen={isComplaintSuccess} onClose={() => setIsComplaintSuccess(false)}>
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
