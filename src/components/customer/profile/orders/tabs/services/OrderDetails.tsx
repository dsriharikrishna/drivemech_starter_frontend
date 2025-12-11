"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
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
]

export default function OrderDetails({ id }: { id: string }) {
    const router = useRouter();
    const [isDownLoadInvoice, setIsDownloadInvoice] = React.useState(false);
    const [isWriteReview, setIsWriteReview] = React.useState(false);
    const [isSendComplaint, setIsSendComplaint] = React.useState(false);
    const [isReorderService, setIsReorderService] = React.useState(false);

    const [isReviewed, setIsReviewed] = React.useState(false);
    const [rating, setRating] = React.useState(0);

    const [isComplaintSend, setIsComplaintSend] = React.useState(false);

    const downloadInvoice = () => {
                setIsDownloadInvoice(true);
        // TODO: Implement invoice generation
    };

    const writeReview = () => {
                setIsWriteReview(true);
        // TODO: Open modal or navigation
    };

    const sendComplaint = () => {
                setIsSendComplaint(true);
        // TODO: Open complaint form
    };

    const reorderService = () => {
                setIsReorderService(true);
        // TODO: Navigate to service booking
    };


    return (
        <div className="p-6 bg-white flex flex-col">

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-2">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>

                <div>
                    <h1 className="text-xl font-semibold">Order Details</h1>
                    <p className="text-gray-500 text-sm mt-1">Order ID: {id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT SECTION - SERVICE SUMMARY */}
                <div className="lg:col-span-2 bg-white border border-gray-200  rounded-2xl p-6">
                    <h2 className="font-semibold text-lg mb-4">Service Summary</h2>

                    <p className="text-gray-500 font-medium mb-2">Tasks Performed</p>

                    <ul className="space-y-3 mb-6">
                        {tabs.map((task) => (
                            <li
                                key={task}
                                className="flex items-center gap-3 text-gray-700"
                            >
                                <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                    ✓
                                </span>
                                {task}
                            </li>
                        ))}
                    </ul>
                    <Divider />

                    <p className="text-gray-500 font-medium mb-1">Parts Used</p>

                    <div className="flex justify-between text-gray-700 text-sm border-border -b py-2">
                        <span>Castrol Engine Oil 5W-30</span>
                        <span>$45.00</span>
                    </div>

                    <div className="flex justify-between text-gray-700 text-sm py-2">
                        <span>Oil Filter</span>
                        <span>$12.00</span>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="space-y-5">

                    {/* Workshop Card */}
                    <div className="bg-white border-border  rounded-2xl shadow-sm p-5">
                        <p className="text-sm font-semibold text-gray-800 mb-3">
                            Workshop
                        </p>

                        <div className="flex items-center gap-3">
                            <Image
                                src="/images/car-demo.jpg"
                                width={55}
                                height={55}
                                alt="garage"
                                className="rounded-xl object-cover"
                            />

                            <div className="flex-1">
                                <p className="font-bold">A to Z Services</p>
                                <p className="text-sm flex items-center gap-1 text-gray-600">
                                    ⭐ 4.5 <span className="text-gray-400">(120)</span>
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 bg-blue-50 rounded-full">📞</button>
                                <button className="p-2 bg-green-50 rounded-full">💬</button>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Card */}
                    <div className="bg-white border-border  rounded-2xl shadow-sm p-5">
                        <p className="text-sm font-semibold mb-3">Vehicle</p>

                        <div className="flex items-center gap-3">
                            <Image
                                src="/images/car-blue.png"
                                width={62}
                                height={62}
                                alt="vehicle"
                                className="object-contain"
                            />

                            <div>
                                <p className="font-semibold">Toyota Hilux • ABC1234 D</p>
                                <p className="text-gray-500 text-sm leading-tight">
                                    2021 Petrol Automatic 2.5 Liters Hybrid AWD-i
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-white border-border rounded-2xl shadow-sm p-5">
                        <p className="text-sm font-semibold mb-3">Payment Summary</p>

                        <div className="flex justify-between text-sm py-1">
                            <span>Service Charges</span>
                            <span>$92.00</span>
                        </div>
                        <Divider />

                        <div className="flex justify-between text-sm py-1">
                            <span>Parts Cost</span>
                            <span>$57.00</span>
                        </div>
                        <Divider />

                        <div className="flex justify-between font-semibold text-lg text-orange-500">
                            <span>Total Paid</span>
                            <span>$149.00</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        <button onClick={downloadInvoice} className="border border-gray-200 rounded-xl py-2 text-sm flex flex-col items-center gap-2 hover:bg-gray-50">
                            <span className="text-xl">⬇️</span>
                            Invoice
                        </button>

                        <button onClick={writeReview} className="border border-gray-200  rounded-xl py-2 text-sm flex flex-col items-center gap-2 hover:bg-gray-50">
                            <span className="text-xl">⭐</span>
                            Write Review
                        </button>

                        <button onClick={sendComplaint} className="border border-gray-200  rounded-xl py-2 text-sm flex flex-col items-center gap-2 hover:bg-gray-50">
                            <span className="text-xl">💬</span>
                            Complaint
                        </button>
                    </div>

                    {/* Reorder Button */}
                    <button onClick={reorderService} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl">
                        Reorder Service
                    </button>
                </div>

            </div>

            {isDownLoadInvoice && (
                <Dialog isOpen={isDownLoadInvoice} onClose={() => setIsDownloadInvoice(false)}>
                    <DialogBody>
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
                    <DialogHeader
                        title={"Review"}
                        onClose={() => setIsReviewed(false)}

                    />
                    <ThankYouReview
                        rating={rating}
                        serviceName="Periodic Maintenance"
                        onDone={() => setIsReviewed(false)}
                        onClose={() => setIsReviewed(false)}
                    />
                </DialogBody>
            </Dialog>

            {isSendComplaint && (
                <Dialog isOpen={isSendComplaint} onClose={() => setIsSendComplaint(false)}>
                    <DialogBody className="p-6">
                        <DialogHeader
                            title={"Raise a Complaint"}
                            onClose={() => setIsReviewed(false)}

                        />
                        <RaiseComplaint setIsSendComplaint={setIsSendComplaint} setIsComplaintSend={setIsComplaintSend} />
                    </DialogBody>
                </Dialog>
            )}

            {isComplaintSend && (
                <Dialog isOpen={isComplaintSend} onClose={() => setIsComplaintSend(false)}>
                    <DialogBody className="p-4">
                        <DialogHeader
                            title={"Comlina issued"}
                            onClose={() => setIsComplaintSend(false)}

                        />
                        <ComplaintSubmitted />
                    </DialogBody>
                </Dialog>
            )}

        </div>
    );
}
