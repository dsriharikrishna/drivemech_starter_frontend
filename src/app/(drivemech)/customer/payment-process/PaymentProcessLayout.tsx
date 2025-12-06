"use client";

import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PaymentMethodList from "@/components/customer/payment/PaymentMethodList";
import SavedCardsPanel from "@/components/customer/payment/panels/SavedCardsPanel";
import UpiPanel from "@/components/customer/payment/panels/UpiPanel";
import OnlineBankingPanel from "@/components/customer/payment/panels/OnlineBankingPanel";
import CardPanel from "@/components/customer/payment/panels/CardPanel";

import { PaymentMethod, SavedCard, BankOption } from "@/types/payment";
import { useRouter } from "next/navigation";

import ModuleHeader from "@/components/common/ModuleHeader";
import LeftLayout from "@/components/Layout/LeftLayout";
import RightLayout from "@/components/Layout/RightLayout";
import Section from "@/components/customer/select-service/Section";
import InfoBlock from "@/components/customer/select-service/InfoBlock";
import DetailRow from "@/components/customer/select-service/DetailRow";
import Image from "next/image";
import { Star } from "phosphor-react";

export default function PaymentProcessLayout() {
  const [method, setMethod] = useState<PaymentMethod>("saved");
  const [selectedCard, setSelectedCard] = useState("1");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("Hong Leong Bank");

  const router = useRouter();

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

  const handleNext = useCallback(() => {
    router.push("/customer/booking-success");
  }, [router]);

  return (
    <FormProvider {...form}>
      <div className="p-6 max-w-7xl mx-auto flex flex-col gap-4">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* ================== LEFT LAYOUT ================== */}
          <LeftLayout>
            <div className="mx-auto w-full">

              <ModuleHeader
                title="Complete Payment"
                onBack={() => history.back()}
              />

              {/* MAIN CONTAINER */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-border bg-white p-6 rounded-xl ">

                {/* LEFT LIST */}
                <PaymentMethodList selected={method} onSelect={setMethod} />

                {/* RIGHT PANEL */}
                <div className="p-4 border border-gray-200 rounded-2xl">
                  {method === "saved" && (
                    <SavedCardsPanel
                      cards={savedCards}
                      selected={selectedCard}
                      setSelected={setSelectedCard}
                      handleNext={handleNext}
                    />
                  )}

                  {method === "upi" && (
                    <UpiPanel upiId={upiId} setUpiId={setUpiId} handleNext={handleNext} />
                  )}

                  {method === "card" && (
                    <CardPanel handleNext={handleNext} />
                  )}

                  {method === "online" && (
                    <OnlineBankingPanel
                      banks={banks}
                      selected={selectedBank}
                      setSelected={setSelectedBank}
                      handleNext={handleNext}
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
          </LeftLayout>

          {/* ================== RIGHT LAYOUT ================== */}
          <RightLayout>
            <div className="flex flex-col gap-0 p-2 bg-white rounded-2xl">
              <h2 className="text-md font-semibold">Your Booking Summary</h2>

              {/* Vehicle Details */}
              <Section title="Vehicle Details">
                <InfoBlock>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium">ABC 1234 D</span>
                    <button className="text-blue-500 text-xs">Change</button>
                  </div>

                  <div className="flex justify-center">
                    <Image src="/images/car-blue.png" width={130} height={80} alt="" />
                  </div>

                  <p className="text-sm text-center font-medium mt-2">Toyota Hilux</p>
                  <p className="text-xs text-center text-gray-500">
                    2021 Petrol Automatic 2.5 Liters Hybrid AWD-i
                  </p>
                </InfoBlock>
              </Section>

              {/* Workshop */}
              <Section title="Selected Workshop">
                <InfoBlock>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/workshop.jpg"
                      width={60}
                      height={60}
                      className="rounded-lg"
                      alt=""
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
                        🚴‍♂️ 2Kms <span>⏱ 5 Mins Drive</span>
                      </div>
                    </div>
                  </div>
                </InfoBlock>
              </Section>

              {/* Service Details */}
              <Section title="Service Details">
                <div className="space-y-3">
                  <DetailRow label="Mode" value="Pickup" />
                  <DetailRow label="Date" value="July 30, 2025" />
                  <DetailRow label="Time" value="2:00 PM - 3:00 PM" />
                  <DetailRow label="Address" value="Your entered address will appear here" />
                </div>
              </Section>

              {/* Pricing */}
              <Section title="Bill Details">
                <div className="space-y-3">
                  <DetailRow label="Items total" value="$230" />
                  <DetailRow label="Add-on Services" value="$25" />
                  <DetailRow label="Tax" value="$150" />
                  <DetailRow label="Safety & Warranty" value="$99" />
                  <div className="border-t border-border pt-3">
                    <DetailRow
                      label="Grand Total"
                      value={<span className="font-semibold">$579</span>}
                    />
                  </div>
                </div>
              </Section>

            </div>
          </RightLayout>

        </div>
      </div>
    </FormProvider>
  );
}
