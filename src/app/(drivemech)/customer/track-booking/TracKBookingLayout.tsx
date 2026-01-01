"use client";

import { FormProvider, useForm } from "react-hook-form";
import TrackingCard from "@/components/customer/tracking/TrackingCard";
import LeftLayout from "@/components/Layout/LeftLayout";
import RightLayout from "@/components/Layout/RightLayout";
import Section from "@/components/customer/select-service/Section";
import InfoBlock from "@/components/customer/select-service/InfoBlock";
import DetailRow from "@/components/customer/select-service/DetailRow";
import Image from "next/image";
import { Star } from "phosphor-react";
import ModuleHeader from "@/components/common/ModuleHeader";
import { Bike } from "lucide-react";

export default function TrackBookingLayout() {
  const form = useForm();

  const timeline = [
    {
      id: "1",
      title: "Pending",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: true,
      isActive: false,
    },
    {
      id: "2",
      title: "Assigned",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: true,
      isActive: false,
    },
    {
      id: "3",
      title: "Service In Progress",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: true,
    },
    {
      id: "4",
      title: "Awaiting Customer Confirmation",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "5",
      title: "Awaiting Parts",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "6",
      title: "Service Completed",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "7",
      title: "Test Drive in Progress",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "8",
      title: "Ready for Customer Pickup",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: false,
    },
    {
      id: "9",
      title: "Delivered / Picked up by Customer",
      description: "Order is created but not yet assigned to a mechanic.",
      date: "05 OCT 2024 10:00 AM",
      isCompleted: false,
      isActive: false,
    },
  ];

  return (
    <FormProvider {...form}>
      <div className="p-4 max-w-7xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4">

          {/* LEFT SIDE */}
          <LeftLayout>
            <div className="mx-auto p-2">
              {/* HEADER */}
              <ModuleHeader
                title="Track Booking"
                onBack={() => history.back()}
              />

              {/* MAIN TRACKING CARD */}
              <TrackingCard
                summary={{
                  status: "Booking Confirmed",
                  stage: "Service in Progress",
                  estimate: "Today, 2:00 PM - 3:00 PM",
                }}
                steps={timeline}
              />
            </div>
          </LeftLayout>

          {/* RIGHT SIDE */}
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
                    <Image src="/images/workshop/car.png" width={130} height={80} alt="" />
                  </div>

                  <p className="text-sm text-center font-medium mt-2">Toyota Hilux</p>
                  <p className="text-xs text-center text-gray-500">
                    2021 Petrol Automatic 2.5 Liters Hybrid AWD-i
                  </p>
                </InfoBlock>
              </Section>

              {/* Selected Workshop */}
              <Section title="Selected Workshop">
                <InfoBlock>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/workshop/AtoZ.png"
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
                        <Bike /> 2Kms <span>⏱ 5 Mins Drive</span>
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
                  <DetailRow
                    label="Address"
                    value="Your entered address will appear here"
                  />
                </div>
              </Section>

              {/* Bill Details */}
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
