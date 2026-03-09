"use client";

import React, { useState } from "react";
import Tabs from "@/components/ui/Tabs";
import Button from "@/components/ui/Button";
import Table, { TableColumn } from "@/components/ui/Table";
import {
  Eye,
  Printer,
} from "lucide-react";
import CustomerInfoHeader from "../CustomerInfoHeader";
import PaymentLinkModal from "../next-day-delivery/PaymentLinkModal";
import PaymentConfirmationModal from "../next-day-delivery/PaymentConfirmationModal";
import PaymentSuccessModal from "../next-day-delivery/PaymentSuccessModal";
import GatePassSuccessModal from "../next-day-delivery/GatePassSuccessModal";
import AppointmentInfoBar from "../AppointmentInfoBar";
import OrderTotalsSummary from "../OrderTotalsSummary";
import ViewLogsModal from "../next-day-delivery/ViewLogsModal";

interface OrderService {
  sNo: number;
  product: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  lineTotal: number;
}

interface ReadyForDeliveryDetailsProps {
  order: {
    id: string;
    orderNumber: string;
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
    appointment: {
      date: string;
      time: string;
    };
    services: OrderService[];
  };
  onClose: () => void;
}

const ReadyForDeliveryDetails: React.FC<ReadyForDeliveryDetailsProps> = ({
  order,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("order-details");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showGatePassModal, setShowGatePassModal] = useState(false);
  const [showViewLogsModal, setShowViewLogsModal] = useState(false);
  const [paymentData, setPaymentData] = useState({ email: "", mobile: "" });

  const mainTabs = [
    { id: "order-details", label: "Order Details" },
    { id: "tracking-status", label: "Tracking Status" },
    { id: "customer-history", label: "Customer History" },
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
      minWidth: "300px",
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
    {
      key: "unitPrice",
      header: "Unit Price ($)",
      width: "120px",
      render: (service) => (
        <span className="text-sm text-gray-900">
          {service.unitPrice.toFixed(2)}
        </span>
      ),
    },
    {
      key: "tax",
      header: "Tax (10%) ($)",
      width: "120px",
      render: (service) => (
        <span className="text-sm text-gray-900">{service.tax.toFixed(2)}</span>
      ),
    },
    {
      key: "lineTotal",
      header: "Line Total ($)",
      width: "120px",
      render: (service) => (
        <span className="text-sm font-medium text-gray-900">
          {service.lineTotal.toFixed(2)}
        </span>
      ),
    },
  ];

  // Calculate totals
  const subTotal = order.services.reduce(
    (sum, service) => sum + service.lineTotal,
    0
  );
  const freight = 1.0;
  const salesTax = subTotal * 0.1;
  const total = subTotal + freight + salesTax;

  const handlePaymentLinkSubmit = (data: any) => {
    console.log("Payment link data:", data);
    setPaymentData(data);
    setShowPaymentModal(false);
    setShowPaymentConfirmation(true);
  };

  const handleInitiatePayment = () => {
    setShowPaymentModal(true);
  };

  const handleResendOrUpdate = () => {
    setShowPaymentConfirmation(false);
    setShowPaymentModal(true);
  };

  const handlePaymentReceived = () => {
    setShowPaymentConfirmation(false);
    setShowPaymentSuccess(true);
  };

  const handleProceedToGatePass = () => {
    setShowPaymentSuccess(false);
    setShowGatePassModal(true);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col gap-2">
      {/* Customer Info Header */}
      <CustomerInfoHeader
        customer={order.customer}
        orderNumber={order.orderNumber}
        vehicle={order.vehicle}
        service={order.service}
        status={order.status}
        statusVariant="ready-for-delivery"
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
        <div className="px-2 py-0">
          {/* Appointment Info */}
          <AppointmentInfoBar
            appointmentDate={order.appointment.date}
            appointmentTime={order.appointment.time}
            inTime="In Time"
            printLabel="Print Job Card"
            actions={[
              {
                id: "view-log",
                icon: Eye,
                onClick: () => setShowViewLogsModal(true),
                variant: "text",
                label: "View Log",
              },
            ]}
            printActions={[
              {
                id: "print-invoice",
                label: "Print Invoice",
                icon: <Printer size={16} />,
                onClick: () => console.log("Print Invoice"),
              },
              {
                id: "print-job-card",
                label: "Print Job Card",
                icon: <Printer size={16} />,
                onClick: () => console.log("Print Job Card"),
              },
            ]}
          />

          <div className="mb-6 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
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

          {/* Totals */}
          <OrderTotalsSummary
            subTotal={subTotal}
            freight={freight}
            salesTax={salesTax}
            total={total}
            className="mb-6"
          />

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              variant="primary"
              onClick={handleInitiatePayment}
              className="px-12 py-3"
            >
              Initiate Payment Link (${total.toFixed(2)})
            </Button>
          </div>
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

      {/* Modals */}
      <PaymentLinkModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        totalAmount={total}
        onSubmit={handlePaymentLinkSubmit}
      />

      <PaymentConfirmationModal
        isOpen={showPaymentConfirmation}
        onClose={() => setShowPaymentConfirmation(false)}
        totalAmount={total}
        email={paymentData.email}
        mobile={paymentData.mobile}
        onResendOrUpdate={handleResendOrUpdate}
        onPaymentReceived={handlePaymentReceived}
      />

      <PaymentSuccessModal
        isOpen={showPaymentSuccess}
        onClose={() => setShowPaymentSuccess(false)}
        totalAmount={total}
        onProceedToGatePass={handleProceedToGatePass}
      />

      <GatePassSuccessModal
        isOpen={showGatePassModal}
        onClose={() => setShowGatePassModal(false)}
        gatePassNumber="GP-139323"
        onGoToGatePass={() => {
          setShowGatePassModal(false);
        }}
        onGoToHomepage={() => {
          setShowGatePassModal(false);
          onClose();
        }}
      />

      <ViewLogsModal
        isOpen={showViewLogsModal}
        onClose={() => setShowViewLogsModal(false)}
        data={{
          id: order.id,
          orderNumber: order.orderNumber,
          customer: { name: order.customer.name },
          status: order.status,
        }}
      />
    </div>
  );
};

export default ReadyForDeliveryDetails;
