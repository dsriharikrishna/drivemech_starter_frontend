"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Star, CreditCard } from "lucide-react";
import { Bike } from "lucide-react";

import ModuleHeader from "@/components/common/ModuleHeader";
import LeftLayout from "@/components/Layout/LeftLayout";
import RightLayout from "@/components/Layout/RightLayout";
import Section from "@/components/customer/select-service/Section";
import InfoBlock from "@/components/customer/select-service/InfoBlock";
import DetailRow from "@/components/customer/select-service/DetailRow";
import Button from "@/components/ui/Button";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { clearBookingFormData } from "@/store/slices/booking/bookingSlice";
import { useRazorpay } from "@/hooks/useRazorpay";

// ─── ENV ──────────────────────────────────────────────────────────────────────
// Set NEXT_PUBLIC_RAZORPAY_KEY_ID in your .env.local
// e.g.  NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
// ──────────────────────────────────────────────────────────────────────────────

export default function PaymentProcessLayout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // ── Redux data ───────────────────────────────────────────────────────────
  const bookingFormData = useAppSelector(
    (state) => state.booking.bookingFormData
  );

  // ── Razorpay hook ─────────────────────────────────────────────────────────
  const { openCheckout } = useRazorpay({
    keyId: RAZORPAY_KEY_ID,
    name: "DriveMech",
    description: "Service Booking Payment",
    themeColor: "#f97316",
  });

  // ── Convert amount to paise (Razorpay expects smallest currency unit) ──────
  const totalAmount = bookingFormData?.totalAmount ?? 0;
  const amountInPaise = Math.round(totalAmount * 100);

  // ── Payment handler ────────────────────────────────────────────────────────
  const handlePayNow = useCallback(async () => {
    if (!RAZORPAY_KEY_ID) {
      (window as any).addToast?.(
        "Payment gateway not configured. Contact support.",
        "error"
      );
      return;
    }

    setIsProcessing(true);

    try {
      /**
       * TODO: Call your backend to create a Razorpay Order and get order_id.
       * Example:
       *   const { data } = await axios.post("/api/payment/create-order", {
       *     amount: amountInPaise,
       *     currency: "INR",
       *     receipt: `booking_${Date.now()}`,
       *   });
       *   const orderId = data.id;
       *
       * For now we pass undefined so Razorpay works in key-only mode (test).
       */
      const orderId: string | undefined = undefined;

      await openCheckout({
        amount: amountInPaise,
        orderId,
        prefill: {
          name: bookingFormData?.personalInfo?.fullName,
          email: bookingFormData?.personalInfo?.email,
          contact: bookingFormData?.personalInfo?.phone,
        },
        notes: {
          booking_date: bookingFormData?.date ?? "",
          booking_time: bookingFormData?.time ?? "",
          mode: bookingFormData?.mode ?? "",
        },
        onSuccess: async (response) => {
          /**
           * TODO: Verify payment signature on your backend.
           * Example:
           *   await axios.post("/api/payment/verify", {
           *     razorpay_payment_id: response.razorpay_payment_id,
           *     razorpay_order_id:   response.razorpay_order_id,
           *     razorpay_signature:  response.razorpay_signature,
           *   });
           */
          console.log("Razorpay payment success:", response);

          dispatch(clearBookingFormData());
          (window as any).addToast?.("Payment successful!", "success");
          router.push("/customer/booking-success");
        },
        onDismiss: () => {
          (window as any).addToast?.(
            "Payment cancelled. You can try again.",
            "warning"
          );
          setIsProcessing(false);
        },
      });
    } catch (error: any) {
      console.error("Razorpay error:", error);
      (window as any).addToast?.(
        error?.message ?? "Payment failed. Please try again.",
        "error"
      );
      setIsProcessing(false);
    }
  }, [openCheckout, amountInPaise, bookingFormData, dispatch, router]);

  return (
      <div className="container mx-auto  flex flex-col gap-2">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* ─────────────────── LEFT — Pay button ─────────────────── */}
        <LeftLayout>
          <div className="mx-auto w-full flex flex-col gap-4">
            <ModuleHeader
              title="Complete Payment"
              onBack={() => router.back()}
            />

            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-6">
              {/* Razorpay badge */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <CreditCard size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Secure Payment via Razorpay
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Pay with UPI, Cards, Net Banking, Wallets & more
                  </p>
                </div>
              </div>

              {/* Supported methods */}
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
                  Accepted Payment Methods
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "UPI",
                    "Credit Card",
                    "Debit Card",
                    "Net Banking",
                    "Wallets",
                    "EMI",
                  ].map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 bg-gray-50"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amount summary */}
              <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-100 rounded-xl">
                <span className="text-sm font-medium text-gray-700">
                  Total Amount Due
                </span>
                <span className="text-xl font-bold text-orange-600">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>

              {/* Pay button */}
              <Button
                variant="primary"
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-3 text-base font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all"
              >
                {isProcessing ? "Opening Payment..." : `Pay ₹${totalAmount.toFixed(2)}`}
              </Button>

              <p className="text-center text-xs text-gray-400">
                🔒 Your payment is 100% secure and encrypted by Razorpay
              </p>
            </div>
          </div>
        </LeftLayout>

        {/* ─────────────────── RIGHT — Booking summary ─────────────────── */}
        <RightLayout>
          <div className="flex flex-col gap-0 p-2 bg-white rounded-2xl">
            <h2 className="text-md font-semibold">Your Booking Summary</h2>

            {/* Vehicle Details */}
            <Section title="Vehicle Details">
              <InfoBlock>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">
                    {bookingFormData?.vehicle?.registration ?? "ABC 1234 D"}
                  </span>
                  <button className="text-blue-500 text-xs">Change</button>
                </div>

                <div className="flex justify-center">
                  <Image
                    src="/images/workshop/car.png"
                    width={130}
                    height={80}
                    alt="Vehicle"
                  />
                </div>

                <p className="text-sm text-center font-medium mt-2">
                  {bookingFormData?.vehicle?.name ?? "Toyota Hilux"}
                </p>
                <p className="text-xs text-center text-gray-500">
                  {bookingFormData?.vehicle?.specs ??
                    "2021 Petrol Automatic 2.5 Liters Hybrid AWD-i"}
                </p>
              </InfoBlock>
            </Section>

            {/* Workshop */}
            <Section title="Selected Workshop">
              <InfoBlock>
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/workshop/AtoZ.png"
                    width={60}
                    height={60}
                    className="rounded-lg"
                    alt="Workshop"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-semibold">A to Z Services</p>

                    <div className="flex items-center gap-2 text-xs mt-1">
                      <span className="flex items-center gap-1">
                        4.5
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      </span>
                      <span>(120)</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                      <Bike size={14} /> 2Kms{" "}
                      <span>⏱ 5 Mins Drive</span>
                    </div>
                  </div>
                </div>
              </InfoBlock>
            </Section>

            {/* Service Details */}
            <Section title="Service Details">
              <div className="space-y-3">
                <DetailRow
                  label="Mode"
                  value={
                    bookingFormData?.mode === "pickup" ? "Pickup" : "Walk-In"
                  }
                />
                <DetailRow
                  label="Date"
                  value={bookingFormData?.date ?? "July 30, 2025"}
                />
                <DetailRow
                  label="Time"
                  value={bookingFormData?.time ?? "2:00 PM - 3:00 PM"}
                />
                {bookingFormData?.location?.address && (
                  <DetailRow
                    label="Address"
                    value={bookingFormData.location.address}
                  />
                )}
              </div>
            </Section>

            {/* Pricing */}
            <Section title="Bill Details">
              <div className="space-y-3">
                <DetailRow
                  label="Items total"
                  value={`₹${(bookingFormData?.totalAmount ?? 230).toFixed(2)}`}
                />
                <DetailRow
                  label="Add-on Services"
                  value={`₹${(bookingFormData?.addOnsTotal ?? 0).toFixed(2)}`}
                />
                <div className="border-t border-border pt-3">
                  <DetailRow
                    label="Grand Total"
                    value={
                      <span className="font-semibold text-orange-600">
                        ₹{totalAmount.toFixed(2)}
                      </span>
                    }
                  />
                </div>
              </div>
            </Section>
          </div>
        </RightLayout>
      </div>
    </div>
  );
}
