"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Tabs from "@/components/ui/Tabs";
import Button from "@/components/ui/Button";
import { Phone, Mail, MessageCircle, Video, Calendar } from "lucide-react";
import ServicesBookedTab from "./tabs/ServicesBookedTab";
import CustomerNotesTab from "./tabs/CustomerNotesTab";
import WorkshopNotesTab from "./tabs/WorkshopNotesTab";
import TrackingStatusTab from "./tabs/TrackingStatusTab";
import CustomerHistoryTab from "./tabs/CustomerHistoryTab";
import CustomerInfoHeader from "../CustomerInfoHeader";
import FilledTabs from "@/components/ui/FilledTabs";
import AppointmentInfoBar from "../AppointmentInfoBar";

interface OrderService {
  sNo: number;
  product: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
}

interface CancelledOrderDetailsProps {
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
    cancellationReason?: string;
  };
  onClose: () => void;
}

const CancelledOrderDetails: React.FC<CancelledOrderDetailsProps> = ({
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
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col gap-2">
      {/* Customer Info Header */}
      <CustomerInfoHeader
        customer={order.customer}
        orderNumber={order.orderNumber}
        vehicle={order.vehicle}
        service={order.service}
        status={order.status}
        statusVariant="cancelled"
      />

      {/* Main Tabs */}
      <div className="px-4 py-2 bg-white rounded-xl border border-gray-100">
        <Tabs
          tabs={mainTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="pills"
        />
      </div>

      {/* Tab Content */}
      {activeTab === "order-details" && (
        <div className="p-2 flex flex-col gap-2">
          {/* Appointment Info * */}
          <AppointmentInfoBar
            appointmentDate={order.appointment.date}
            appointmentTime={order.appointment.time}
          />

          {/* Service Tabs */}
          <Tabs
            tabs={serviceTabs}
            activeTab={activeServiceTab}
            onTabChange={setActiveServiceTab}
          />

          {/* Tab Content */}
          {activeServiceTab === "services-booked" && (
            <ServicesBookedTab
              services={order.services}
              cancellationReason={order.cancellationReason}
            />
          )}

          {activeServiceTab === "customer-notes" && (
            <CustomerNotesTab
              customerName={order.customer.name}
              customerAvatar={order.customer.avatar}
            />
          )}

          {activeServiceTab === "workshop-notes" && <WorkshopNotesTab />}
        </div>
      )}

      {activeTab === "tracking-status" && (
        <TrackingStatusTab customerName={order.customer.name} />
      )}

      {activeTab === "customer-history" && <CustomerHistoryTab />}

      {/* Go Back Button */}
      <div className="p-6 border-t border-gray-200 flex justify-center">
        <Button variant="primary" onClick={onClose} className="px-12">
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default CancelledOrderDetails;
