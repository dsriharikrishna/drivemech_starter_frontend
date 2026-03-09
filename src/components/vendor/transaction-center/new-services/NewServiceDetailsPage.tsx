"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Tabs from "@/components/ui/Tabs";
import Avatar from "@/components/ui/Avatar";
import {
  Phone,
  Video,
  Mail,
  Trash2,
  Calendar,
  Edit2,
  Plus,
  Eye,
  Printer,
  MessageSquare,
  Upload,
} from "lucide-react";
import {
  ServiceItemFormValues,
  serviceRequestSchema,
  type ServiceRequestFormValues,
} from "@/schemas/vendor/transaction.schema";
import ServicesBookedTab from "./tabs/ServicesBookedTab";
import CustomerNotesTab from "./tabs/CustomerNotesTab";
import WorkshopNotesTab from "./tabs/WorkshopNotesTab";
import TrackingStatusTab from "./tabs/TrackingStatusTab";
import CustomerHistoryTab from "./tabs/CustomerHistoryTab";
import RescheduleDialog from "./modals/RescheduleDialog";
import MediaUploadDialog from "./modals/MediaUploadDialog";
import CustomerInfoHeader from "../../CustomerInfoHeader";
import AppointmentInfoBar from "../../AppointmentInfoBar";
import Button from "@/components/ui/Button";
import ViewLogsModal from "../../next-day-delivery/ViewLogsModal";


interface PageProps {
  id: string;
}

export default function NewServiceDetailsPage({ id }: PageProps) {
  const [activeTab, setActiveTab] = useState("order-details");
  const [activeSubTab, setActiveSubTab] = useState("services-booked");
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [isMediaUploadDialogOpen, setIsMediaUploadDialogOpen] = useState(false);
  const [isJobAssigned, setIsJobAssigned] = useState(false);
  const [showViewLogsModal, setShowViewLogsModal] = useState(false);

  // Mock data
  const serviceData = {
    customer: {
      name: "Ramesh Babu",
      avatar: "https://ui-avatars.com/api/?name=Ramesh+Babu&background=random",
      phone: "+91 9876543210",
      email: "ramesh@example.com",
    },
    orderId: "123456789",
    vehicle: {
      make: "BMW",
      model: "X7",
      registration: "TS09FJ0007",
      year: "2024",
      type: "SUV",
    },
    service: {
      type: "General Service",
      source: "Walk-In",
    },
    status: "New Service Request",
    appointmentDate: "Thursday, Oct 13, 2024",
    appointmentTime: "Walk In 3:00 PM - 5:00 PM",
  };

  // Employee options
  const employeeOptions = [
    { id: "john", name: "John Doe" },
    { id: "jane", name: "Jane Smith" },
    { id: "mike", name: "Mike Johnson" },
    { id: "sarah", name: "Sarah Williams" },
  ];

  // Initialize form with React Hook Form + Zod
  const methods = useForm<ServiceRequestFormValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      serviceItems: [
        {
          id: "1",
          product: "Battery Replacement",
          description:
            'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
          quantity: 1,
          unitPrice: 10,
          tax: 1,
          total: 11,
        },
        {
          id: "2",
          product: "Roadworthy Inspection / Pink Slips",
          description:
            'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
          quantity: 1,
          unitPrice: 5,
          tax: 0.5,
          total: 5.5,
        },
        {
          id: "3",
          product: "Spark Plug",
          description:
            'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
          quantity: 1,
          unitPrice: 10,
          tax: 1,
          total: 11,
        },
      ],
      assignedEmployee: "",
      estimatedDate: "",
      estimatedTime: "",
      subTotal: 0,
      freight: 1,
      salesTax: 0,
      total: 0,
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const { fields, append, remove, update } = useFieldArray({
    control: methods.control,
    name: "serviceItems",
  });

  const serviceItems = watch("serviceItems");
  const freight = watch("freight");

  // Calculate totals automatically
  useEffect(() => {
    const subTotal = serviceItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    const salesTax = serviceItems.reduce(
      (sum, item) => sum + item.tax * item.quantity,
      0
    );
    const total = subTotal + freight + salesTax;

    setValue("subTotal", subTotal);
    setValue("salesTax", salesTax);
    setValue("total", total);
  }, [serviceItems, freight, setValue]);

  const tabs = [
    { id: "order-details", label: "Order Details" },
    { id: "tracking-status", label: "Tracking Status" },
    { id: "customer-history", label: "Customer History" },
  ];

  // Sub-tabs shown only before assignment
  const subTabs = [
    { id: "services-booked", label: "Services Booked" },
    { id: "customer-notes", label: "Customer Notes" },
    { id: "workshop-notes", label: "Workshop Notes" },
  ];

  // Bottom tabs shown only after assignment
  const bottomTabs = [
    { id: "customer-notes", label: "Customer Notes" },
    { id: "workshop-notes", label: "Workshop Notes" },
  ];

  // Form submission handlers with useCallback for performance
  const onSubmit = useCallback((data: ServiceRequestFormValues) => {
    console.log("Service Request Data:", data);
    // TODO: Implement API call to save service request
  }, []);

  const handleDecline = useCallback(() => {
    console.log("Service request declined");
    // TODO: Implement decline logic
  }, []);

  const handleAssignAndStart = useCallback(() => {
    handleSubmit(onSubmit)();
    setIsJobAssigned(true);
    setActiveSubTab("customer-notes");
  }, [handleSubmit, onSubmit]);

  const handleAddServiceItem = useCallback(
    (item: ServiceItemFormValues) => {
      append(item);
    },
    [append]
  );

  const handleUpdateServiceItem = useCallback(
    (index: number, item: ServiceItemFormValues) => {
      update(index, item);
    },
    [update]
  );

  const handleDeleteServiceItem = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const handleReschedule = useCallback((data: any) => {
    console.log("Reschedule Data:", data);
    // TODO: Implement API call to reschedule appointment
    setIsRescheduleDialogOpen(false);
  }, []);

  const handleMediaUpload = useCallback((files: File[]) => {
    console.log("Uploaded Files:", files);
    // TODO: Implement API call to upload media files
    setIsMediaUploadDialogOpen(false);
  }, []);

  // Memoized form field change handlers
  const handleEmployeeChange = useCallback(
    (employeeId: string) => {
      setValue("assignedEmployee", employeeId);
    },
    [setValue]
  );

  const handleDateChange = useCallback(
    (date: string) => {
      setValue("estimatedDate", date);
    },
    [setValue]
  );

  const handleTimeChange = useCallback(
    (time: string) => {
      setValue("estimatedTime", time);
    },
    [setValue]
  );

  // Memoized data object to prevent unnecessary re-renders
  const servicesBookedData = useMemo(
    () => ({
      serviceItems,
      totals: {
        subTotal: watch("subTotal"),
        freight: watch("freight"),
        salesTax: watch("salesTax"),
        total: watch("total"),
      },
      assignment: {
        employeeOptions,
        assignedEmployee: watch("assignedEmployee"),
        estimatedDate: watch("estimatedDate"),
        estimatedTime: watch("estimatedTime"),
      },
      errors: {
        assignedEmployee: errors.assignedEmployee,
        estimatedDate: errors.estimatedDate,
        estimatedTime: errors.estimatedTime,
      },
    }),
    [serviceItems, watch, employeeOptions, errors]
  );

  // Memoized actions object to prevent unnecessary re-renders
  const servicesBookedActions = useMemo(
    () => ({
      onEmployeeChange: handleEmployeeChange,
      onDateChange: handleDateChange,
      onTimeChange: handleTimeChange,
      onDecline: handleDecline,
      onAssignAndStart: handleAssignAndStart,
      onAddItem: handleAddServiceItem,
      onUpdateItem: handleUpdateServiceItem,
      onDeleteItem: handleDeleteServiceItem,
    }),
    [
      handleEmployeeChange,
      handleDateChange,
      handleTimeChange,
      handleDecline,
      handleAssignAndStart,
      handleAddServiceItem,
      handleUpdateServiceItem,
      handleDeleteServiceItem,
    ]
  );

  const handleGoBack = useCallback(() => {
    setIsJobAssigned(false);
    setActiveSubTab("services-booked");
  }, []);

  const handleGoToWorkshopNotes = useCallback(() => {
    setActiveSubTab("workshop-notes");
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50 pb-4">
        <div className="px-2 py-2 flex flex-col gap-4 overflow-visible">
          {/* Customer Info Header */}
          <CustomerInfoHeader
            customer={serviceData.customer}
            orderNumber={serviceData.orderId}
            vehicle={serviceData.vehicle}
            service={serviceData.service}
            status={serviceData.status}
          />

          <div className="border border-gray-200 bg-white p-2 rounded-xl">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              variant="pills"
            />
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Tab Content */}
            {activeTab === "order-details" && (
              <div className="px-4 py-2 flex flex-col gap-4 pb-4">
                {/* Appointment Info */}
                <AppointmentInfoBar
                  appointmentDate={serviceData.appointmentDate}
                  appointmentTime={serviceData.appointmentTime}
                  assignedTo="Ravindra"
                  onReschedule={() => setIsRescheduleDialogOpen(true)}
                  actions={[
                    {
                      id: "message",
                      icon: MessageSquare,
                      onClick: () => console.log("Send mail"),
                      variant: "message",
                    },
                    {
                      id: "phone",
                      icon: Phone,
                      onClick: () => console.log("Make call"),
                      variant: "phone",
                    },
                    {
                      id: "view-log",
                      icon: Eye,
                      onClick: () => setShowViewLogsModal(true),
                      variant: "text",
                      label: "View Log",
                    },
                  ]}
                  printLabel="Print Job Card"
                  printActions={[
                    {
                      id: "print-invoice",
                      label: "Print Invoice",
                      icon: <Printer size={16} />,
                      onClick: () => console.log("Print Invoice"),
                    },
                    {
                      id: "print-cash-invoice",
                      label: "Print Cash Invoice",
                      icon: <Printer size={16} />,
                      onClick: () => console.log("Print Cash Invoice"),
                    },
                    {
                      id: "print-job-card",
                      label: "Print Job Card",
                      icon: <Printer size={16} />,
                      onClick: () => console.log("Print Job Card"),
                    },
                  ]}
                  emailActions={[
                    {
                      id: "email-invoice",
                      label: "Email Invoice",
                      icon: <Mail size={16} />,
                      onClick: () => console.log("Email Invoice"),
                    },
                    {
                      id: "email-job-card",
                      label: "Email Job Card",
                      icon: <Mail size={16} />,
                      onClick: () => console.log("Email Job Card"),
                    },
                  ]}
                  smsActions={[
                    {
                      id: "sms-invoice",
                      label: "SMS Invoice",
                      icon: <MessageSquare size={16} />,
                      onClick: () => console.log("SMS Invoice"),
                    },
                    {
                      id: "sms-job-card",
                      label: "SMS Job Card",
                      icon: <MessageSquare size={16} />,
                      onClick: () => console.log("SMS Job Card"),
                    },
                  ]}
                />

                {/* Sub Tabs - Only show before assignment */}
                {!isJobAssigned && (
                  <Tabs
                    tabs={subTabs}
                    activeTab={activeSubTab}
                    onTabChange={setActiveSubTab}
                    variant="default"
                  />
                )}

                {/* Services Table - Show when services-booked tab is active OR after assignment */}
                {(!isJobAssigned && activeSubTab === "services-booked") ||
                  isJobAssigned ? (
                  <ServicesBookedTab
                    data={servicesBookedData}
                    actions={servicesBookedActions}
                    isJobAssigned={isJobAssigned}
                  />
                ) : null}

                {/* Customer Notes - Show before assignment when tab is active */}
                {!isJobAssigned && activeSubTab === "customer-notes" && (
                  <CustomerNotesTab />
                )}

                {/* Workshop Notes - Show before assignment when tab is active */}
                {!isJobAssigned && activeSubTab === "workshop-notes" && (
                  <WorkshopNotesTab />
                )}

                {/* Bottom Tabs - Only show after assignment */}
                {isJobAssigned && (
                  <>
                    <Tabs
                      tabs={bottomTabs}
                      activeTab={activeSubTab}
                      onTabChange={setActiveSubTab}
                      variant="default"
                    />
                    {activeSubTab === "customer-notes" && <CustomerNotesTab />}
                    {activeSubTab === "workshop-notes" && <WorkshopNotesTab />}
                  </>
                )}

                {isJobAssigned && activeSubTab !== "workshop-notes" ? (
                  <div className="flex items-center justify-center gap-2 py-4 border border-gray-200 rounded-lg">
                    <Button
                      variant="outline"
                      size="md"
                      className="w-20 border border-orange-500 text-orange-500 px-4 "
                      onClick={handleGoBack}
                    >
                      Back
                    </Button>
                    <Button
                      size="md"
                      className="w-20 px-4"
                      onClick={handleGoToWorkshopNotes}
                    >
                      Next
                    </Button>
                  </div>
                ) : null}
              </div>
            )}

            {activeTab === "tracking-status" && (
              <div className="px-4 py-4">
                <TrackingStatusTab />
              </div>
            )}

            {activeTab === "customer-history" && (
              <div className="px-4 py-4">
                <CustomerHistoryTab />
              </div>
            )}

          </div>
        </div>

        {/* Reschedule Dialog */}
        <RescheduleDialog
          isOpen={isRescheduleDialogOpen}
          onClose={() => setIsRescheduleDialogOpen(false)}
          onSubmit={handleReschedule}
          employeeOptions={employeeOptions}
        />

        {/* Media Upload Dialog */}
        <MediaUploadDialog
          isOpen={isMediaUploadDialogOpen}
          onClose={() => setIsMediaUploadDialogOpen(false)}
          onSubmit={handleMediaUpload}
        />

        <ViewLogsModal
          isOpen={showViewLogsModal}
          onClose={() => setShowViewLogsModal(false)}
          data={{
            id: serviceData.orderId,
            orderNumber: serviceData.orderId,
            customer: { name: serviceData.customer.name },
            status: serviceData.status,
          }}
        />
      </div>
    </FormProvider>
  );
}
