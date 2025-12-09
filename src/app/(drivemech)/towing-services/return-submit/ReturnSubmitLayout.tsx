"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { resetBooking } from "@/store/slicers/towing-services/towingServiceSlicer";
import CustomCard from "@/components/ui/CustomCard";
import Button from "@/components/ui/Button";
import {
    Star,
    Phone,
    MessageCircle,
    Share2,
    MapPin,
    Car,
    Clock,
} from "lucide-react";
import LeftLayout from "@/components/Layout/LeftLayout";
import RightLayout from "@/components/Layout/RightLayout";

/**
 * Figma-accurate Request Submitted layout
 * - Centered success header
 * - Full-width orange banner (Request ID | ETA)
 * - Full-width blue info bar
 * - 3 centered action buttons row
 * - Two-column content: left empty space (visually) and right column with:
 *   Driver Card, Trip Details, Your Vehicle, Booking Details, Share Trip box
 *
 * Note: relies on existing CustomCard and Button components.
 */

export default function ReturnSubmitLayout() {
    const router = useRouter();
    const dispatch = useDispatch();

    // Redux selectors (fall back to sensible defaults)
    const driver = useSelector((s: RootState) => s.towingService.selectedDriver);
    const formData = useSelector((s: RootState) => s.towingService.formData);
    const bookingId = useSelector((s: RootState) => s.towingService.bookingId);
    const paymentMethod = useSelector((s: RootState) => s.towingService.paymentMethod);

    useEffect(() => {
        if (!formData || !bookingId) {
            router.push("/towing-services");
        }
    }, [formData, bookingId, router]);

    // Actions
    const handleCancel = () => {
        dispatch(resetBooking());
        router.push("/towing-services");
    };

    const handleTrack = () => {
        router.push(`/towing-services/track/${bookingId}`);
    };

    const handleShare = async () => {
        const link = `${location.origin}/towing-services/track/${bookingId}`;
        const text = `Track my tow request ${bookingId}: ${link}`;

        if (navigator.share) {
            try {
                await navigator.share({ title: "Track my tow", text, url: link });
            } catch {
                /* user cancelled */
            }
        } else {
            await navigator.clipboard.writeText(link);
            // small user feedback fallback
            // eslint-disable-next-line no-alert
            alert("Trip link copied to clipboard");
        }
    };

    if (!formData || !bookingId) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6 text-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    // Derived values / fallbacks
    const phoneDisplay = formData.phone || formData.mobileNo || "+91 98765 43210";
    const requestId = bookingId ?? `TOW${Math.floor(Math.random() * 900000) + 10000}`;
    const estimatedTime = "15-30 minutes";

    const tripDetails = {
        pickup: formData.pickup || "Unknown",
        destination: formData.destination || "Unknown",
        vehicleReg: formData.reg || "ABC 1234",
        vehicleMake:
            typeof formData.make === "string" ? formData.make : formData.make?.name || "Toyota",
        vehicleModel:
            typeof formData.model === "string" ? formData.model : formData.model?.name || "Camry",
    };

    const bookingInfo = {
        bookingDate: new Date().toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }),
        serviceType: "Emergency Towing",
        paymentMethod: paymentMethod === "card" ? "Credit Card" : paymentMethod === "cash" ? "Cash" : "—",
        totalAmount: driver?.price ?? 75,
    };

    return (
        <section className="w-full bg-white px-4 py-20">
            <div className="max-w-7xl mx-auto flex gap-4">
                <LeftLayout>
                    {/* -------- SUCCESS HEADER (CENTERED) -------- */}
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
                                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Request Submitted !</h1>
                        <p className="text-sm text-gray-600 mt-2 max-w-2xl">
                            Our towing team has been notified. We’ll contact you at{" "}
                            <span className="font-medium text-gray-900">{phoneDisplay}</span> shortly
                        </p>
                    </div>

                    {/* -------- ORANGE BANNER (FULL WIDTH INSIDE CONTAINER) -------- */}
                    <div className="mb-4">
                        <div className="rounded-xl border border-orange-200 bg-orange-50 px-5 py-4">
                            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div className="text-center sm:text-left">
                                    <p className="text-xs text-gray-600">Request ID</p>
                                    <p className="font-semibold text-gray-900 mt-1">#{requestId}</p>
                                </div>
                                <div className="text-center sm:text-right">
                                    <p className="text-xs text-gray-600">Estimated Response Time</p>
                                    <p className="font-semibold text-orange-600 mt-1">{estimatedTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* -------- BLUE INFO BAR (FULL WIDTH) -------- */}
                    <div className="mb-6">
                        <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-3">
                            <div className="max-w-7xl mx-auto flex items-center gap-3 text-sm text-blue-800">
                                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">i</div>
                                <div>
                                    A driver will be assigned shortly. You'll receive a call and can track the tow truck in real-time.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* -------- ACTION BUTTONS (CENTERED ROW) -------- */}
                    <div className="mb-10 flex justify-center">
                        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <Button
                                variant="outline"
                                className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                onClick={handleCancel}
                            >
                                Cancel Order
                            </Button>

                            <Button variant="gradient" onClick={handleTrack}>
                                Track Tow Truck
                            </Button>

                            <Button variant="outline" onClick={handleShare} startIcon={<Share2 size={14} />}>
                                Share Trip
                            </Button>
                        </div>
                    </div>

                </LeftLayout>
                <RightLayout>
                    <div className="flex flex-col gap-4">

                        {/* Driver Card */}
                        <CustomCard className="p-6 rounded-2xl border">
                            <div className="flex items-start gap-4">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={driver?.photo || "/avatar-placeholder.png"}
                                        alt={driver?.name || "Driver"}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">{driver?.name || "Michael Rodriguez"}</p>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                <Star className="w-4 h-4 text-orange-400" />
                                                <span className="font-medium text-gray-700">{driver?.rating ?? "4.5"}</span>
                                                <span className="text-gray-400">({driver?.trips ?? 342} Trips)</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">{driver?.vehicleType ?? "Flatbed Tow Truck"}</p>
                                        </div>

                                        <div className="text-right">
                                            <span className="inline-block px-3 py-1 text-xs bg-green-50 text-green-700 rounded-full">On the way</span>
                                            <div className="mt-2 text-sm text-gray-600">
                                                <p className="text-xs">Arriving In</p>
                                                <p className="font-semibold text-orange-600">{driver?.arrivalTime ?? "4 Mins"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <Button variant="gradient" className="h-10" onClick={() => { /* call */ }}>
                                            Call Driver
                                        </Button>
                                        <Button variant="outline" className="h-10" onClick={() => { /* chat */ }}>
                                            Chat
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CustomCard>

                        {/* Trip Details Card */}
                        <CustomCard className="p-5 rounded-2xl border">
                            <h4 className="text-sm font-semibold text-gray-700 mb-4">Trip Details</h4>

                            <div className="text-sm space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 bg-orange-500 rounded-full" />
                                        <div className="w-[1px] h-10 bg-gray-200 mt-2" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500">Pickup Location</p>
                                        <p className="font-medium text-gray-800">{tripDetails.pickup}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500">Destination</p>
                                        <p className="font-medium text-gray-800">{tripDetails.destination}</p>
                                    </div>
                                </div>

                                <div className="border-t border-border pt-3 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Distance</p>
                                        <p className="font-semibold text-gray-900">0.8 km away</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Estimate Arrival</p>
                                        <p className="font-semibold text-gray-900">4 Mins</p>
                                    </div>
                                </div>
                            </div>
                        </CustomCard>

                        {/* Vehicle Card */}
                        <CustomCard className="p-5 rounded-2xl border">
                            <h4 className="text-sm font-semibold text-gray-700 mb-4">Your Vehicle</h4>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Car className="w-6 h-6 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{tripDetails.vehicleMake} {tripDetails.vehicleModel}</p>
                                    <p className="text-xs text-gray-500">Reg: {tripDetails.vehicleReg} • SUV</p>
                                </div>
                            </div>
                        </CustomCard>

                        {/* Booking Details Card */}
                        <CustomCard className="p-5 rounded-2xl border">
                            <h4 className="text-sm font-semibold text-gray-700 mb-4">Booking Details</h4>

                            <div className="text-sm space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Booking Date</span>
                                    <span className="font-medium text-gray-900">{bookingInfo.bookingDate}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Service Type</span>
                                    <span className="font-medium text-gray-900">{bookingInfo.serviceType}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Payment Method</span>
                                    <span className="font-medium text-gray-900">{bookingInfo.paymentMethod}</span>
                                </div>

                                <div className="border-t border-border pt-3 flex justify-between items-center">
                                    <span className="font-semibold text-gray-900">Total Amount</span>
                                    <span className="font-bold text-gray-900">${bookingInfo.totalAmount}</span>
                                </div>
                            </div>
                        </CustomCard>

                        {/* Share Trip Box */}
                        <CustomCard className="p-4 rounded-2xl border bg-blue-50 border-blue-100">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                                    <Share2 className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-blue-900 text-sm">Share Your Trip</p>
                                    <p className="text-xs text-blue-700 mt-1">Share your live location with family and friends for added safety</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <Button variant="outline" onClick={handleShare} className="h-9 px-3">
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </CustomCard>
                    </div>

                </RightLayout>

            </div>
        </section >
    );
}
