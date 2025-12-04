"use client";

import {
    ArrowLeft,
    CheckCircle,
    FileDown,
    MessageSquare,
    Star,
    Package,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Dialog from "@/components/modals/Dialog";

import DownLoadSpareInvoice from "./DownLoadSpareInvoice";
import WriteSpareReview from "./WriteSpareReview";
import RaiseSpareComplaint from "./RaiseSpareComplaint";
import DialogBody from "@/components/modals/DialogBody";

export default function SparesOrderDetails({ id }: { id: string }) {
    const router = useRouter();

    // Dialog states
    const [isInvoice, setIsInvoice] = React.useState(false);
    const [isReview, setIsReview] = React.useState(false);
    const [isComplaint, setIsComplaint] = React.useState(false);
    const [isReturn, setIsReturn] = React.useState(false);

    const products = [
        { name: "Bosch Brake Pad Set", brand: "Bosch", qty: 2, price: 118, img: "/images/spares/brakepad.png" },
        { name: "Bosch Air Filter", brand: "Bosch", qty: 1, price: 28, img: "/images/spares/airfilter.png" },
        { name: "Wiper Blades Set", brand: "Bosch", qty: 1, price: 22, img: "/images/spares/wiper.png" },
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
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft size={20} />
                </button>

                <div>
                    <h1 className="text-xl font-semibold">Order Details</h1>
                    <p className="text-sm text-gray-500">Order ID: {id}</p>
                </div>
            </div>

            <div className="border-t" />

            <div className="grid lg:grid-cols-3 gap-6">

                {/* LEFT SECTION */}
                <div className="lg:col-span-2 space-y-6">

                    {/* PRODUCT DETAILS */}
                    <div className="border rounded-xl p-4">
                        <h2 className="font-semibold mb-3">Product Details</h2>

                        {products.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-b last:border-none py-3">
                                <div className="flex items-center gap-3">
                                    <Image src={item.img} width={40} height={40} alt="product" />
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">{item.brand} • Qty: {item.qty}</p>
                                    </div>
                                </div>
                                <p className="font-semibold text-orange-500">${item.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    {/* TIMELINE */}
                    <div className="border rounded-xl p-4">
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

                {/* RIGHT SECTION */}
                <div className="space-y-6">

                    {/* SHIPPING ADDRESS */}
                    <div className="border rounded-xl p-4">
                        <h2 className="font-semibold mb-3">Shipping Address</h2>
                        <div className="flex items-start gap-3">
                            <Package size={20} className="text-gray-600 mt-1" />
                            <p className="text-sm text-gray-700">
                                123 Main Street, Apartment 4B, Downtown, City - 400 123
                            </p>
                        </div>
                    </div>

                    {/* COURIER DETAILS */}
                    <div className="border rounded-xl p-4 space-y-2">
                        <h2 className="font-semibold">Courier Details</h2>
                        <p className="font-medium text-gray-800">FastShip Express</p>
                        <p className="text-sm text-blue-500">Tracking: FS12345678901</p>
                        <p className="text-green-600 bg-green-100 px-3 py-2 rounded-lg text-sm">
                            ✔ Delivered on 28 July 2025
                        </p>
                    </div>

                    {/* PAYMENT SUMMARY */}
                    <div className="border rounded-xl p-4 space-y-2">
                        <h2 className="font-semibold">Payment Summary</h2>

                        <div className="flex justify-between text-sm py-1"><span>Product Cost</span><span>$168.00</span></div>
                        <div className="flex justify-between text-sm py-1"><span>Shipping</span><span className="text-green-600">FREE</span></div>

                        <div className="border-t my-2" />

                        <div className="flex justify-between text-orange-500 font-semibold text-lg">
                            <span>Total Paid</span>
                            <span>$168.00</span>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="grid grid-cols-3 gap-3">
                        <button onClick={() => setIsInvoice(true)} className="flex flex-col items-center border rounded-xl py-3 hover:bg-gray-50">
                            <FileDown size={20} />
                            <span className="text-sm">Invoice</span>
                        </button>

                        <button onClick={() => setIsReview(true)} className="flex flex-col items-center border rounded-xl py-3 hover:bg-gray-50">
                            <Star size={20} />
                            <span className="text-sm">Write Review</span>
                        </button>

                        <button onClick={() => setIsComplaint(true)} className="flex flex-col items-center border rounded-xl py-3 hover:bg-gray-50">
                            <MessageSquare size={20} />
                            <span className="text-sm">Complaint</span>
                        </button>
                    </div>

                    {/* RETURN REQUEST */}
                    <button
                        onClick={() =>
                            router.push(`/customer/profile/my-orders/spares/return-request/${id}`)
                        }
                        className="w-full border rounded-xl py-3 text-gray-700 hover:bg-gray-100"
                    >
                        Return Request
                    </button>

                </div>
            </div>

            {/* MODALS */}
            {isInvoice && (
                <Dialog isOpen={isInvoice} onClose={() => setIsInvoice(false)}>
                    <DialogBody>
                        <DownLoadSpareInvoice onClose={() => setIsInvoice(false)} />
                    </DialogBody>
                </Dialog>
            )}

            {isReview && (
                <Dialog isOpen={isReview} onClose={() => setIsReview(false)}>
                    <DialogBody>
                        <WriteSpareReview onClose={() => setIsReview(false)} />
                    </DialogBody>
                </Dialog>
            )}

            {isComplaint && (
                <Dialog isOpen={isComplaint} onClose={() => setIsComplaint(false)}>
                    <DialogBody>
                        <RaiseSpareComplaint onClose={() => setIsComplaint(false)} />
                    </DialogBody>
                </Dialog>
            )}

        </div>
    );
}
