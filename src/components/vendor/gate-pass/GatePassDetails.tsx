"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Tabs from "@/components/ui/Tabs";
import Button from "@/components/ui/Button";
import Table, { TableColumn } from "@/components/ui/Table";
import {
  Phone,
  Mail,
  MessageCircle,
  Video,
  FileText,
  Calendar,
} from "lucide-react";
import InvoiceInfoBar from "../InvoiceInfoBar";
import CustomerInfoHeader from "../CustomerInfoHeader";
import FilledTabs from "@/components/ui/FilledTabs";

interface OrderService {
  sNo: number;
  product: string;
  description: string;
  quantity: number;
}

interface GatePassDetailsProps {
  order: {
    id: string;
    orderNumber: string;
    invoiceNumber: string;
    invoiceGeneratedOn: string;
    customer: {
      name: string;
      avatar?: string;
      phone: string;
      email: string;
    };
    vehicle: {
      make: string;
      model: string;
      registration: string;
      year: string;
      type: string;
    };
    service: {
      type: string;
      source: string;
    };
    status: string;
    services: OrderService[];
  };
  onClose: () => void;
}

const GatePassDetails: React.FC<GatePassDetailsProps> = ({
  order,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("order-details");
  const [activeServiceTab, setActiveServiceTab] = useState("services-booked");

  const mainTabs = [
    { id: "order-details", label: "Order Details" },
    { id: "tracking-status", label: "Tracking Status" },
    { id: "customer-history", label: "Customer History" },
  ];

  const serviceTabs = [
    { id: "services-booked", label: "Services Booked" },
    { id: "customer-notes", label: "Customer Notes" },
    { id: "workshop-notes", label: "Workshop Notes" },
    { id: "test-drive-notes", label: "Test Drive Notes" },
  ];

  // Table columns for services
  const serviceColumns: TableColumn<OrderService>[] = [
    {
      key: "sNo",
      header: "S.No",
      width: "60px",
      render: (service) => (
        <span className="text-sm text-gray-900">{service.sNo}</span>
      ),
    },
    {
      key: "product",
      header: "Product",
      width: "200px",
      render: (service) => (
        <span className="text-sm text-gray-900">{service.product}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      minWidth: "500px",
      render: (service) => (
        <span className="text-sm text-gray-500">{service.description}</span>
      ),
    },
    {
      key: "quantity",
      header: "Quantity",
      width: "100px",
      render: (service) => (
        <span className="text-sm text-gray-900">{service.quantity}</span>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col gap-2">
      <CustomerInfoHeader
        customer={order.customer}
        orderNumber={order.orderNumber}
        vehicle={order.vehicle}
        service={order.service}
        status={order.status}
        statusVariant="gate-pass"
      />
      {/* Main Tabs */}
      <div className="px-2 py-2 bg-white rounded-xl border border-gray-100">
        <Tabs
          tabs={mainTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="pills"
        />
      </div>

      {/* Tab Content */}
      {activeTab === "order-details" && (
        <div className="p-0 flex flex-col gap-4">
          {/* Invoice Info */}
          <InvoiceInfoBar
            invoiceNumber={order.invoiceNumber}
            invoiceDate={order.invoiceGeneratedOn}
            onViewInvoice={() => console.log("View Invoice")}
            onShareInvoice={() => console.log("Share Invoice")}
          />

          {/* Service Tabs */}
          <div className="">
            <Tabs
              tabs={serviceTabs}
              activeTab={activeServiceTab}
              onTabChange={setActiveServiceTab}
            />
          </div>

          {/* Services Table */}
          {activeServiceTab === "services-booked" && (
            <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
              <Table
                columns={serviceColumns}
                data={order.services}
                keyExtractor={(service) => service.sNo}
                emptyMessage="No services found"
                striped={false}
                hoverable
                className="h-full"
                style={{ height: "100%" }}
              />
            </div>
          )}

          {activeServiceTab === "customer-notes" && (
            <div className="mt-6 p-8 text-center text-gray-500">
              Customer notes will appear here
            </div>
          )}

          {activeServiceTab === "workshop-notes" && (
            <div className="mt-6 p-8 text-center text-gray-500">
              Workshop notes will appear here
            </div>
          )}

          {activeServiceTab === "test-drive-notes" && (
            <div className="mt-6 p-8 text-center text-gray-500">
              Test drive notes will appear here
            </div>
          )}
        </div>
      )}

      {activeTab === "tracking-status" && (
        <div className="px-4 py-4">
          <p className="text-center text-gray-500 py-8">
            Tracking status information will appear here
          </p>
        </div>
      )}

      {activeTab === "customer-history" && (
        <div className="px-4 py-4">
          <p className="text-center text-gray-500 py-8">
            Customer history will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default GatePassDetails;
