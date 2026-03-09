"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import GatePassDetails from "@/components/vendor/gate-pass/GatePassDetails";

// Mock data - In production, this would come from an API based on orderId
const getMockOrderData = (orderId: string) => ({
  id: orderId,
  orderNumber: `123456789`,
  invoiceNumber: "123456789098",
  invoiceGeneratedOn: "16 May 2025",
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
  status: "Gate pass issued",
  services: [
    {
      sNo: 1,
      product: "Battery Replacement",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
    },
    {
      sNo: 2,
      product: "Roadworthy Inspection / Pink Slips",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
    },
    {
      sNo: 3,
      product: "Spark Plug",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
    },
    {
      sNo: 4,
      product: "AC Antibacterial Clean",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
    },
    {
      sNo: 5,
      product: "AC Compressor Relay Replacement",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
    },
    {
      sNo: 6,
      product: "Battery Replacement",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
    },
    {
      sNo: 7,
      product: "Spark Plug",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
    },
    {
      sNo: 8,
      product: "AC Antibacterial Clean",
      description:
        'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
      quantity: 1,
    },
  ],
});

interface PageProps {
  params: Promise<{
    orderId: string;
  }>;
}

const GatePassDetailPage = ({ params }: PageProps) => {
  const router = useRouter();
  const { orderId } = use(params);
  const order = getMockOrderData(orderId);

  const handleClose = () => {
    router.push("/vendor/gate-pass-issued");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Order Details */}
      <GatePassDetails order={order} onClose={handleClose} />
    </div>
  );
};

export default GatePassDetailPage;
