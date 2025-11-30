"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PaymentMethodList from "@/components/customer/payment/PaymentMethodList";
import SavedCardsPanel from "@/components/customer/payment/panels/SavedCardsPanel";
import UpiPanel from "@/components/customer/payment/panels/UpiPanel";
import OnlineBankingPanel from "@/components/customer/payment/panels/OnlineBankingPanel";

import { PaymentMethod, SavedCard, BankOption } from "@/types/payment";
import CardPanel from "@/components/customer/payment/panels/CardPanel";

export default function PaymentProcessLayout() {
  const [method, setMethod] = useState<PaymentMethod>("saved");
  const [selectedCard, setSelectedCard] = useState("1");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("Hong Leong Bank");

  const form = useForm({
    defaultValues: {
      upiId: upiId,
      cardNumber: "",
      expiry: "",
      cvv: "",
      nameOnCard: "",
      savedCardCvv: ""
    }
  });

  const savedCards: SavedCard[] = [
    { id: "1", bankName: "Visa", masked: "****1234", expiry: "12/25" },
    { id: "2", bankName: "Visa", masked: "****9876", expiry: "12/25" },
  ];

  const banks: BankOption[] = [
    { name: "HSBC Bank Malaysia", logo: "/hsbc.png" },
    { name: "Hong Leong Bank", logo: "/hong.png" },
  ];

  return (
    <FormProvider {...form}>
      <div className="p-6 max-w-6xl mx-auto border-border">

        <h2 className="text-lg font-semibold mb-4">Complete Payment</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-border bg-white p-6 rounded-xl shadow-sm">

          {/* LEFT LIST */}
          <PaymentMethodList selected={method} onSelect={setMethod} />

          {/* RIGHT DYNAMIC PANEL */}
          <div className="p-4 border border-gray-200  rounded-2xl">
            {method === "saved" && (
              <SavedCardsPanel
                cards={savedCards}
                selected={selectedCard}
                setSelected={setSelectedCard}
              />
            )}

            {method === "upi" && (
              <UpiPanel upiId={upiId} setUpiId={setUpiId} />
            )}

            {method === "card" && <CardPanel />}

            {method === "online" && (
              <OnlineBankingPanel
                banks={banks}
                selected={selectedBank}
                setSelected={setSelectedBank}
              />
            )}

            {method === "workshop" && (
              <div className="border-border rounded-xl p-4 text-gray-700">
                Pay at Workshop selected
              </div>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
