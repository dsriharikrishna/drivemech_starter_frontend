"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import NextDayDeliveryDetails from "@/components/vendor/next-day-delivery/NextDayDeliveryDetails";

// Mock data - In production, this would come from an API based on orderId
const getMockOrderData = (orderId: string) => ({
  id: orderId,
  orderNumber: `12345${orderId}`,
  customer: {
    name: "Ramesh Babu",
    avatar: undefined,
    phone: "TS09FJ0007",
    email: "ramesh@example.com",
  },
  vehicle: {
    make: "BMW",
    model: "X7",
    registration: "ABC 123 D",
    year: "2024",
    type: "SUV",
  },
  service: {
    type: "General Service",
    source: "Walk-In",
  },
  status: "Next Day Delivery",
  appointment: {
    date: "Thursday, Oct 13, 2024",
    time: "Walk in 3:00 PM - 5:00 PM",
  },
  services: [
    {
      sNo: 1,
      product: "Battery Replacement",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
      unitPrice: 10,
      tax: 1,
      lineTotal: 11,
    },
    {
      sNo: 2,
      product: "Roadworthy Inspection / Pink Slips",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
      unitPrice: 5,
      tax: 0.5,
      lineTotal: 5.5,
    },
    {
      sNo: 3,
      product: "Spark Plug",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
      unitPrice: 10,
      tax: 1,
      lineTotal: 11,
    },
    {
      sNo: 4,
      product: "AC Antibacterial Clean",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
      unitPrice: 5,
      tax: 0.5,
      lineTotal: 5.5,
    },
    {
      sNo: 5,
      product: "AC Compressor Relay Replacement",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
      unitPrice: 10,
      tax: 1,
      lineTotal: 11,
    },
    {
      sNo: 6,
      product: "Battery Replacement",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      lineTotal: 0,
    },
    {
      sNo: 7,
      product: "Spark Plug",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      lineTotal: 0,
    },
    {
      sNo: 8,
      product: "AC Antibacterial Clean",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      lineTotal: 0,
    },
  ],
});

interface PageProps {
  params: Promise<{
    orderId: string;
  }>;
}

const NextDayDeliveryDetailPage = ({ params }: PageProps) => {
  const router = useRouter();
  const { orderId } = use(params);
  const order = getMockOrderData(orderId);

  const handleClose = () => {
    router.push("/vendor/next-day-delivery");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Order Details */}
      <NextDayDeliveryDetails order={order} onClose={handleClose} />
    </div>
  );
};

export default NextDayDeliveryDetailPage;
