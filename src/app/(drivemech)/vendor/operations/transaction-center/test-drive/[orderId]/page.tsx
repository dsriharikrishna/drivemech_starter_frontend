"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import TestDriveDetails from "@/components/vendor/test-drive/TestDriveDetails";

// Mock data - In production, this would come from an API based on orderId
const getMockOrderData = (orderId: string) => ({
  id: orderId,
  orderNumber: `123456789`,
  customer: {
    name: "Ramesh Babu",
    avatar: undefined,
    phone: "TS09FJ0007",
    email: "ramesh@example.com",
  },
  vehicle: {
    make: "BMW",
    model: "X7",
    registration: "AP03 AR 8778",
    year: "2024",
    type: "SUV",
  },
  service: {
    type: "General Service",
    source: "Walk-In",
  },
  status: "Test Drive",
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
  testDriveChecks: [
    {
      sNo: 1,
      service: "Battery Replacement",
      qcDescription: "Ensure battery voltage is stable and clamps are secure.",
      status: "Pass" as const,
    },
    {
      sNo: 2,
      service: "Roadworthy Inspection / Pink Slips",
      qcDescription:
        "A required safety check of key components like brakes, tyres, and lights to certify your vehicle is safe to drive for registration renew...",
      status: "Fail" as const,
    },
    {
      sNo: 3,
      service: "Spark Plug",
      qcDescription: "Check engine idle smoothness after replacement.",
      status: "Pass" as const,
    },
    {
      sNo: 4,
      service: "AC Antibacterial Clean",
      qcDescription:
        "Verify no lingering odor and blower functions at all speeds.",
      status: "Pass" as const,
    },
    {
      sNo: 5,
      service: "AC Compressor Relay Replacement",
      qcDescription:
        "Verify no lingering odor and blower functions at all speeds.",
      status: "Pass" as const,
    },
    {
      sNo: 6,
      service: "Battery Replacement",
      qcDescription: "Ensure battery voltage is stable and clamps are secure.",
      status: "Pass" as const,
    },
    {
      sNo: 7,
      service: "Spark Plug",
      qcDescription: "Check engine idle smoothness after replacement.",
      status: "Fail" as const,
    },
    {
      sNo: 8,
      service: "AC Antibacterial Clean",
      qcDescription:
        "Verify no lingering odor and blower functions at all speeds.",
      status: "Fail" as const,
    },
  ],
});

interface PageProps {
  params: Promise<{
    orderId: string;
  }>;
}

const TestDriveDetailPage = ({ params }: PageProps) => {
  const router = useRouter();
  const { orderId } = use(params);
  const order = getMockOrderData(orderId);

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Order Details */}
      <TestDriveDetails order={order} onClose={handleClose} />
    </div>
  );
};

export default TestDriveDetailPage;
