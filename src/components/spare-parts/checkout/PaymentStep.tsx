"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PaymentMethodList from "@/components/payment/PaymentMethodList";
import SavedCardsPanel from "@/components/payment/panels/SavedCardsPanel";
import UpiPanel from "@/components/payment/panels/UpiPanel";
import CardPanel from "@/components/payment/panels/CardPanel";
import OnlineBankingPanel from "@/components/payment/panels/OnlineBankingPanel";
import { PaymentMethod, SavedCard, BankOption } from "@/types/payment";
import { useAppDispatch } from "@/store/store";
import { submitOrder } from "@/store/slices/customer/spare-parts/sparePartsCheckoutSlice";

// Static data for demonstration
const SAVED_CARDS: SavedCard[] = [
  {
    id: "1",
    bankName: "HDFC Bank",
    masked: "**** 4242",
    expiry: "12/25",
  },
  {
    id: "2",
    bankName: "ICICI Bank",
    masked: "**** 8888",
    expiry: "06/26",
  },
];

const BANKS: BankOption[] = [
  { name: "HDFC Bank", logo: "/images/banks/hdfc.png" },
  { name: "ICICI Bank", logo: "/images/banks/icici.png" },
  { name: "State Bank of India", logo: "/images/banks/sbi.png" },
  { name: "Axis Bank", logo: "/images/banks/axis.png" },
];

interface PaymentStepProps {
  onComplete?: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({ onComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("saved");
  const [selectedCard, setSelectedCard] = useState<string>("1");
  const [selectedBank, setSelectedBank] = useState<string>("");

  const methods = useForm({
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvv: "",
      nameOnCard: "",
      upiId: "",
      savedCardCvv: "",
    },
  });

  const dispatch = useAppDispatch();

  const handleNext = async () => {
    console.log("Payment processing...");
    try {
      await dispatch(submitOrder()).unwrap();
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error("Order submission failed", error);
    }
  };

  const renderPaymentPanel = () => {
    switch (selectedMethod) {
      case "saved":
        return (
          <SavedCardsPanel
            cards={SAVED_CARDS}
            selected={selectedCard}
            setSelected={setSelectedCard}
            handleNext={handleNext}
          />
        );
      case "upi":
        return <UpiPanel handleNext={handleNext} />;
      case "card":
        return <CardPanel handleNext={handleNext} />;
      case "online":
        return (
          <OnlineBankingPanel
            banks={BANKS}
            selected={selectedBank}
            setSelected={setSelectedBank}
            handleNext={handleNext}
          />
        );
      case "workshop":
        return (
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Pay at Workshop
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              You can pay directly at the workshop when you visit for service.
            </p>
            <button
              onClick={handleNext}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold text-base shadow-sm hover:bg-orange-600 transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Payment Method List */}
          <div>
            <PaymentMethodList
              selected={selectedMethod}
              onSelect={setSelectedMethod}
            />
          </div>

          {/* Right: Payment Panel */}
          <div>{renderPaymentPanel()}</div>
        </div>
      </div>
    </FormProvider>
  );
};
