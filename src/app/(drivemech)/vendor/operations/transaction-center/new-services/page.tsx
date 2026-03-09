"use client";

import React from "react";
import { ServiceRequest } from "@/lib/schemas/transaction-center";
import { Check, X } from "lucide-react";
import ServiceRequestTable from "@/components/vendor/ServiceRequestTable";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogFooter from "@/components/modals/DialogFooter";

export default function NewServicesPage() {
  const [selectedServiceRequest, setSelectedServiceRequest] =
    React.useState<ServiceRequest | null>(null);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = React.useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = React.useState(false);

  // Mock Data
  const newServiceRequests: ServiceRequest[] = [
    {
      id: "101",
      orderId: "ORD-001",
      customerName: "John Smith",
      phoneNumber: "1234567890",
      email: "johnsmith@gmail.com",
      vehicleMake: "BMW X7",
      vehicleModel: "ABC 007 K",
      vehicleRegNo: "ABC 007 K",
      serviceType: "Periodic",
      modeOfService: "Walk-In",
      status: "Pending",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "3:00 PM - 4:00 PM",
    },
    {
      id: "102",
      orderId: "ORD-002",
      customerName: "Daniel Danny",
      phoneNumber: "9876543210",
      email: "danieldanny@gmail.com",
      vehicleMake: "Toyota Camry",
      vehicleModel: "1 ABC 234",
      vehicleRegNo: "1 ABC 234",
      serviceType: "Oil Change",
      modeOfService: "Pick-Up",
      status: "Pending",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "3:00 PM - 4:00 PM",
    },
    {
      id: "103",
      orderId: "ORD-003",
      customerName: "John Smith",
      phoneNumber: "1234567890",
      email: "johnsmith@gmail.com",
      vehicleMake: "BMW X7",
      vehicleModel: "ABC 007 K",
      vehicleRegNo: "ABC 007 K",
      serviceType: "Periodic",
      modeOfService: "Walk-In",
      status: "Pending",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "3:00 PM - 4:00 PM",
    },
    {
      id: "104",
      orderId: "ORD-004",
      customerName: "Daniel Danny",
      phoneNumber: "9876543210",
      email: "danieldanny@gmail.com",
      vehicleMake: "Toyota Camry",
      vehicleModel: "1 ABC 234",
      vehicleRegNo: "1 ABC 234",
      serviceType: "Oil Change",
      modeOfService: "Pick-Up",
      status: "Pending",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "3:00 PM - 4:00 PM",
    },
    {
      id: "105",
      orderId: "ORD-005",
      customerName: "John Smith",
      phoneNumber: "1234567890",
      email: "johnsmith@gmail.com",
      vehicleMake: "BMW X7",
      vehicleModel: "ABC 007 K",
      vehicleRegNo: "ABC 007 K",
      serviceType: "Periodic",
      modeOfService: "Walk-In",
      status: "Pending",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "3:00 PM - 4:00 PM",
    },
    {
      id: "106",
      orderId: "ORD-006",
      customerName: "Daniel Danny",
      phoneNumber: "9876543210",
      email: "danieldanny@gmail.com",
      vehicleMake: "Toyota Camry",
      vehicleModel: "1 ABC 234",
      vehicleRegNo: "1 ABC 234",
      serviceType: "Oil Change",
      modeOfService: "Pick-Up",
      status: "Pending",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "3:00 PM - 4:00 PM",
    },
    {
      id: "107",
      orderId: "ORD-007",
      customerName: "John Smith",
      phoneNumber: "1234567890",
      email: "johnsmith@gmail.com",
      vehicleMake: "BMW X7",
      vehicleModel: "ABC 007 K",
      vehicleRegNo: "ABC 007 K",
      serviceType: "Periodic",
      modeOfService: "Walk-In",
      status: "Pending",
      date: "Thursday, 8 Aug 2025",
      timeSlot: "3:00 PM - 4:00 PM",
    },
  ];

  const handleDecline = (item: ServiceRequest) => {
    setSelectedServiceRequest(item);
    setIsDeclineModalOpen(true);
  };

  const handleAccept = (item: ServiceRequest) => {
    setSelectedServiceRequest(item);
    setIsAcceptModalOpen(true);
  };

  const confirmDecline = () => {
    console.log("Declined:", selectedServiceRequest);
    setIsDeclineModalOpen(false);
    setSelectedServiceRequest(null);
  };

  const confirmAccept = () => {
    console.log("Accepted:", selectedServiceRequest);
    setIsAcceptModalOpen(false);
    setSelectedServiceRequest(null);
  };

  return (
    <>
      <ServiceRequestTable
        data={newServiceRequests}
        basePath="/vendor/operations/transaction-center/new-services"
        title="New Services"
        titleBgColor="bg-slate-900"
        actionButtons={[
          {
            label: "Decline",
            icon: X,
            variant: "danger",
            onClick: handleDecline,
          },
          {
            label: "Accept",
            icon: Check,
            variant: "success",
            onClick: handleAccept,
          },
        ]}
      />

      {/* Decline Dialog */}
      <Dialog
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
      >
        <DialogBody className="h-auto p-4">
          <DialogHeader
            title="Decline Service Request"
            onClose={() => setIsDeclineModalOpen(false)}
          />
          <p className="text-gray-600">
            Are you sure you want to decline this service request from{" "}
            <strong>{selectedServiceRequest?.customerName}</strong>? This action
            cannot be undone.
          </p>
          <DialogFooter
            leftTitle="Cancel"
            rightTitle="Decline"
            onConfirm={confirmDecline}
            onCancel={() => setIsDeclineModalOpen(false)}
          />
        </DialogBody>
      </Dialog>

      {/* Accept Dialog */}
      <Dialog
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
      >
        <DialogBody className="h-auto p-4">
          <DialogHeader
            title="Accept Service Request"
            onClose={() => setIsAcceptModalOpen(false)}
          />
          <p className="text-gray-600">
            Are you sure you want to accept this service request from{" "}
            <strong>{selectedServiceRequest?.customerName}</strong>?
          </p>
          <DialogFooter
            leftTitle="Cancel"
            rightTitle="Accept"
            onConfirm={confirmAccept}
            onCancel={() => setIsAcceptModalOpen(false)}
          />
        </DialogBody>
      </Dialog>
    </>
  );
}
