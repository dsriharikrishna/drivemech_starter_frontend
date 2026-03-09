"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SparePartsOrderDetails from "@/components/vendor/operations/spare-parts/SparePartsOrderDetails";
import type { SparePartOrder } from "@/schemas/vendor/spareParts.schema";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

const OrderDetailPage = ({ params }: OrderDetailPageProps) => {
  const router = useRouter();
  const [id, setId] = React.useState<string>("");

  React.useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  // Sample order data - in production, this would be fetched based on id
  const sampleOrder: SparePartOrder = {
    id: "1",
    orderId: id,
    customer: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com",
      address: "123, MG Road, Koramangala, Bangalore - 560034",
    },
    items: [
      {
        id: "1",
        productName: "Brake Pads - Front Set",
        sku: "BRK-PAD-001",
        quantity: 2,
        unitPrice: 40,
        total: 80,
        stockStatus: "in_stock",
        stockQuantity: 15,
      },
      {
        id: "2",
        productName: "Engine Oil 5W-30 (4L)",
        sku: "ENG-OIL-002",
        quantity: 2,
        unitPrice: 40,
        total: 80,
        stockStatus: "low_stock",
        stockQuantity: 8,
      },
      {
        id: "3",
        productName: "Air Filter",
        sku: "AIR-FLT-003",
        quantity: 2,
        unitPrice: 40,
        total: 80,
        stockStatus: "in_stock",
        stockQuantity: 25,
      },
      {
        id: "4",
        productName: "Spark Plugs (Set of 4)",
        sku: "SPK-PLG-004",
        quantity: 2,
        unitPrice: 40,
        total: 80,
        stockStatus: "out_of_stock",
        stockQuantity: 0,
      },
    ],
    totalAmount: 320,
    status: "confirmed",
    createdAt: "2024-11-25 at 10:30 AM",
    timeline: [
      {
        id: "1",
        title: "New",
        timestamp: "25 Nov, 10:30 AM",
        status: "completed",
      },
      {
        id: "2",
        title: "Confirmed",
        timestamp: "25 Nov, 11:00 AM",
        status: "completed",
      },
      { id: "3", title: "Packed", timestamp: "", status: "pending" },
      { id: "4", title: "Ready", timestamp: "", status: "pending" },
      { id: "5", title: "Completed", timestamp: "", status: "pending" },
    ],
    stockAlerts: [
      {
        id: "1",
        productName: "Engine Oil 5W-30 (4L)",
        message: "Only 8 left",
        severity: "warning",
      },
      {
        id: "2",
        productName: "Spark Plugs (Set of 4)",
        message: "Out of stock",
        severity: "error",
      },
      {
        id: "3",
        productName: "Clutch Plate Assembly",
        message: "Only 3 left",
        severity: "warning",
      },
    ],
  };

  const handleBack = () => {
    router.back();
  };

  if (!id) return null;

  return <SparePartsOrderDetails order={sampleOrder} onBack={handleBack} />;
};

export default OrderDetailPage;
