"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import {
  setPaymentMethod as setPaymentMethodAction,
  setBookingId,
  createTowingOrder,
} from "@/store/slices/customer/towing-services/towingServiceSlice";
import CustomCard from "@/components/ui/CustomCard";
import Button from "@/components/ui/Button";
import {
  Star,
  MapPin,
  Navigation,
  Car,
  CreditCard,
  Wallet,
  ArrowLeft,
  Clock,
  Info,
} from "lucide-react";

type PaymentMethod = "card" | "wallet" | "cash" | null;

export default function ConfirmBookingLayout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // router already declared above

  // local state
  const [promoCode, setPromoCode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);

  // redux selectors
  const driver = useSelector(
    (state: RootState) => state.towingService.selectedDriver
  );
  const formData = useSelector(
    (state: RootState) => state.towingService.formData
  );
  const paymentMethod = useSelector(
    (state: RootState) => state.towingService.paymentMethod
  );

  useEffect(() => {
    // redirect back to listing if no data
    if (!driver || !formData) {
      router.push("/towing-services");
    }
  }, [driver, formData, router]);

  useEffect(() => {
    if (paymentMethod) setSelectedPayment(paymentMethod as PaymentMethod);
  }, [paymentMethod]);

  const handleBack = useCallback(() => router.back(), [router]);

  const handleConfirm = useCallback(async () => {
    try {
      const result = await dispatch(createTowingOrder()).unwrap();
      if (result.bookingId) {
        dispatch(setBookingId(result.bookingId));
        router.push("/towing-services/return-submit");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      // Optional: User feedback here
      (window as any).addToast?.(
        "Failed to create booking. Please try again.",
        "error"
      );
    }
  }, [dispatch, router]);

  const handlePaymentMethodChange = useCallback(
    (method: PaymentMethod) => {
      setSelectedPayment(method);
      dispatch(setPaymentMethodAction(method));
    },
    [dispatch]
  );

  if (!driver || !formData) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 text-center">
        <p className="text-gray-500">Loading booking details…</p>
      </div>
    );
  }

  // Trip / price data (fallbacks)
  const tripDetails = {
    pickup: formData?.pickup || "Unknown pickup",
    destination: formData?.destination || "Unknown destination",
    vehicleReg: formData?.reg || "N/A",
    vehicleMake: formData?.make?.name || "N/A",
    vehicleModel: formData?.model?.name || "N/A",
    distance: "0.8 km",
    duration: "4 Mins",
  };

  const priceBreakdown = {
    baseFare: driver?.baseFare ?? 75,
    serviceFee: driver?.serviceFee ?? 5,
    tax: driver?.tax ?? 8,
    total: driver?.price ?? 88,
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-3">
      {/* header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-gray-heading">
            Confirm Booking
          </h2>
          <p className="text-[11px] text-gray-500">
            Review details before confirming
          </p>
        </div>
      </div>

      {/* main layout: left content + right sticky panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        {/* left column */}
        <div className="space-y-4">
          {/* driver card */}
          <CustomCard className="p-4 border rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="relative">
                <img
                  src={driver.photo || "/avatar-placeholder.png"}
                  alt={driver.name || "Driver"}
                  className="w-14 h-14 rounded-full object-cover"
                />
                {driver.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-heading">
                      {driver.name || "Driver Name"}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Star className="w-3.5 h-3.5 text-orange-400" />
                      <span className="font-medium text-gray-700">
                        {driver.rating ?? "4.5"}
                      </span>
                      <span className="text-gray-400">
                        ({driver.trips ?? 120} Trips)
                      </span>
                      <div className="mx-1.5 h-3 w-px bg-gray-200" />
                      <span className="text-[11px] text-gray-500">
                        {driver.vehicleType ?? "Flatbed Tow Truck"}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block text-[11px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                      Available Now
                    </span>
                    <div className="mt-1.5">
                      <p className="text-[11px] text-gray-500">Arriving in</p>
                      <p className="text-xs font-semibold text-orange-600">
                        {driver.arrivalTime ?? "4 Mins"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="gradient"
                    className="flex-1 h-9 text-xs"
                    onClick={() => {
                      /* call driver action */
                    }}
                  >
                    Call Driver
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 h-9 text-xs"
                    onClick={() => {
                      /* chat action */
                    }}
                  >
                    Chat
                  </Button>
                </div>
              </div>
            </div>
          </CustomCard>

          {/* trip details */}
          <CustomCard className="p-4 border rounded-2xl">
            <h4 className="font-semibold text-sm text-gray-heading mb-3">
              Trip Details
            </h4>

            <div className="space-y-3">
              {/* pickup / destination */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-50 p-1.5 rounded-md">
                      <MapPin className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500">Pickup</p>
                      <p className="font-medium text-xs text-gray-heading">
                        {tripDetails.pickup}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-50 p-1.5 rounded-md">
                      <Navigation className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500">Destination</p>
                      <p className="font-medium text-xs text-gray-heading">
                        {tripDetails.destination}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="text-[11px] text-orange-600 border border-orange-100 px-2.5 py-1 rounded-md bg-orange-50"
                    onClick={() => {
                      /* open directions */
                    }}
                  >
                    Directions
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-gray-500">Distance</p>
                  <p className="font-semibold text-xs text-gray-heading">
                    {tripDetails.distance}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500">
                    Estimate Time of Arrival
                  </p>
                  <p className="font-semibold text-xs text-gray-heading">
                    {tripDetails.duration}
                  </p>
                </div>
              </div>
            </div>
          </CustomCard>

          {/* vehicle details */}
          <CustomCard className="p-4 border rounded-2xl">
            <h4 className="font-semibold text-sm text-gray-heading mb-3">
              Vehicle Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <p className="text-[11px] text-gray-500">Registration Number</p>
                <p className="font-medium text-xs text-gray-heading">
                  {tripDetails.vehicleReg}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Type</p>
                <p className="font-medium text-xs text-gray-heading">SUV</p>
              </div>

              <div>
                <p className="text-[11px] text-gray-500 mt-2">Make</p>
                <p className="font-medium text-xs text-gray-heading">
                  {tripDetails.vehicleMake}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 mt-2">Model</p>
                <p className="font-medium text-xs text-gray-heading">
                  {tripDetails.vehicleModel}
                </p>
              </div>
            </div>
          </CustomCard>

          {/* payment methods */}
          <CustomCard className="p-5 border rounded-2xl">
            <h4 className="font-semibold text-gray-heading mb-4">
              Payment Method
            </h4>

            <div className="space-y-3">
              {/* card */}
              <div
                onClick={() => handlePaymentMethodChange("card")}
                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${
                  selectedPayment === "card"
                    ? "bg-orange-50 border-orange-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CreditCard className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-heading">
                    Credit / Debit Card
                  </p>
                  <p className="text-xs text-gray-500">
                    Visa • MasterCard • RuPay
                  </p>
                </div>
                {selectedPayment === "card" && (
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>

              {/* digital wallet */}
              <div
                onClick={() => handlePaymentMethodChange("wallet")}
                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${
                  selectedPayment === "wallet"
                    ? "bg-orange-50 border-orange-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Wallet className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-heading">
                    Digital Wallet
                  </p>
                  <p className="text-xs text-gray-500">
                    Apple Pay • Google Pay
                  </p>
                </div>
                {selectedPayment === "wallet" && (
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>

              {/* cash */}
              <div
                onClick={() => handlePaymentMethodChange("cash")}
                className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${
                  selectedPayment === "cash"
                    ? "bg-orange-50 border-orange-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Car className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-heading">Cash</p>
                  <p className="text-xs text-gray-500">Pay driver directly</p>
                </div>
                {selectedPayment === "cash" && (
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </div>
          </CustomCard>
        </div>

        {/* right column */}
        <div className="space-y-4">
          <div className="sticky top-6">
            <CustomCard className="p-4 border rounded-2xl">
              <h4 className="font-semibold text-sm text-gray-heading mb-3">
                Price Breakdown
              </h4>

              <div className="space-y-1.5 text-xs mb-3">
                <div className="flex justify-between text-gray-600">
                  <span>Base Fare</span>
                  <span className="font-medium text-gray-heading">
                    ${priceBreakdown.baseFare.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span className="font-medium text-gray-heading">
                    ${priceBreakdown.serviceFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium text-gray-heading">
                    ${priceBreakdown.tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-3 mb-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm text-gray-heading">
                    Total
                  </span>
                  <span className="font-bold text-xl text-gray-heading">
                    ${priceBreakdown.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount / promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  <Button variant="outline" className="px-3 text-xs">
                    Apply
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 mb-3 text-xs text-blue-700">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4" />
                  <div>
                    <div className="font-medium">Price Note</div>
                    <div className="text-[11px] text-blue-600">
                      Final price may vary based on actual distance and service
                      time.
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="gradient"
                fullWidth
                className="h-11 rounded-full font-semibold text-sm"
                onClick={handleConfirm}
              >
                Confirm Booking
              </Button>

              {/* safety / cancellation boxes under CTA */}
              <div className="mt-3 grid gap-2">
                <div className="bg-green-50 border border-green-200 rounded-xl p-2.5 flex items-start gap-2">
                  <div className="text-green-600 p-1 rounded-full bg-green-100">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 12.5l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-green-700">
                      Safe & Secure
                    </div>
                    <div className="text-[11px] text-green-700">
                      All drivers are licensed, insured, and background-checked
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-2.5 flex items-start gap-2">
                  <div className="text-red-600 p-1 rounded-full bg-red-100">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 9v4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 17h.01"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-red-700">
                      Cancellation Policy
                    </div>
                    <div className="text-[11px] text-red-600">
                      Free cancellation within 2 minutes of booking. After that,
                      a $10 cancellation fee applies.
                    </div>
                  </div>
                </div>
              </div>
            </CustomCard>
          </div>
        </div>
      </div>
    </div>
  );
}
