"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Tabs from "@/components/ui/Tabs";
import Button from "@/components/ui/Button";
import { Phone, Mail, MessageCircle, Video, Calendar } from "lucide-react";
import {
  ViewIcon,
  MessageIcon,
  PhoneIcon,
  EmailIcon,
} from "../../icons/TransactionIcons";
import TestDriveSuccessModal from "./TestDriveSuccessModal";
import {
  ServicesBookedTab,
  CustomerNotesTab,
  WorkshopNotesTab,
  TestDriveNotesTab,
} from "./tabs";
import { TrackingStatusTab, CustomerHistoryTab } from "./main-tabs";
import CustomerInfoHeader from "../CustomerInfoHeader";
import AppointmentInfoBar from "../AppointmentInfoBar";
import ViewLogsModal from "../next-day-delivery/ViewLogsModal";

interface OrderService {
  sNo: number;
  product: string;
  description: string;
  quantity: number;
}

interface TestDriveCheckItem {
  sNo: number;
  service: string;
  qcDescription: string;
  status: "Pass" | "Fail" | null;
}

interface TestDriveDetailsProps {
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
    testDriveChecks: TestDriveCheckItem[];
  };
  onClose: () => void;
}

const TestDriveDetails: React.FC<TestDriveDetailsProps> = ({
  order,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("order-details");
  const [activeServiceTab, setActiveServiceTab] = useState("services-booked");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showViewLogsModal, setShowViewLogsModal] = useState(false);
  const [checkStatuses, setCheckStatuses] = useState<
    Record<number, "Pass" | "Fail" | null>
  >(
    order.testDriveChecks.reduce(
      (acc, check) => ({ ...acc, [check.sNo]: check.status }),
      {}
    )
  );

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

  const handleStatusChange = (sNo: number, status: "Pass" | "Fail") => {
    setCheckStatuses((prev) => ({ ...prev, [sNo]: status }));
  };

  const handleComplete = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-white h-full w-full p-1 flex flex-col gap-2">
      {/* Customer Info Header */}
      <CustomerInfoHeader
        customer={order.customer}
        orderNumber={order.orderNumber}
        vehicle={order.vehicle}
        service={order.service}
        status={order.status}
        statusVariant="test-drive"
      />

      {/* Main Tabs */}
      <div className="px-2 py-2 bg-white rounded-lg border border-gray-200">
        <Tabs
          tabs={mainTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="pills"
        />
      </div>

      {/* Tab Content */}
      {activeTab === "order-details" && (
        <div className="p-0">
          {/* Appointment Info */}
          <AppointmentInfoBar
            appointmentDate={order.appointment.date}
            appointmentTime={order.appointment.time}
            actions={[

              {
                id: "view-log",
                label: "View Log",
                icon: ViewIcon,
                variant: "view",
                onClick: () => setShowViewLogsModal(true),
              },
            ]}
          />

          {/* Service Tabs */}
          <Tabs
            tabs={serviceTabs}
            activeTab={activeServiceTab}
            onTabChange={setActiveServiceTab}
          />

          {/* Service Tab Content */}
          {activeServiceTab === "services-booked" && (
            <ServicesBookedTab
              services={order.services}
              allChecked={order.testDriveChecks.every(check => checkStatuses[check.sNo] !== null)}
            />
          )}

          {activeServiceTab === "customer-notes" && <CustomerNotesTab />}

          {activeServiceTab === "workshop-notes" && <WorkshopNotesTab />}

          {activeServiceTab === "test-drive-notes" && (
            <TestDriveNotesTab
              testDriveChecks={order.testDriveChecks}
              checkStatuses={checkStatuses}
              onStatusChange={handleStatusChange}
              onComplete={handleComplete}
            />
          )}
        </div>
      )}

      {activeTab === "tracking-status" && <TrackingStatusTab />}

      {activeTab === "customer-history" && <CustomerHistoryTab />}

      {/* Success Modal */}
      <TestDriveSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        vehicleNumber={order.vehicle.registration}
        onGoToHomepage={() => {
          setShowSuccessModal(false);
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

export default TestDriveDetails;
