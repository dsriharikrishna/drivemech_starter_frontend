"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Tabs from "@/components/ui/Tabs";
import { Printer, Mail, Phone, Eye } from "lucide-react";
import {
  ServiceItemFormValues,
  serviceRequestSchema,
  type ServiceRequestFormValues,
} from "@/schemas/vendor/transaction.schema";
import ServicesBookedTab from "../new-services/tabs/ServicesBookedTab";
import CustomerNotesTab from "../new-services/tabs/CustomerNotesTab";
import WorkshopNotesTab from "../new-services/tabs/WorkshopNotesTab";
import TrackingStatusTab from "../new-services/tabs/TrackingStatusTab";
import CustomerHistoryTab from "../new-services/tabs/CustomerHistoryTab";
import RescheduleDialog from "../new-services/modals/RescheduleDialog";
import MediaUploadDialog from "../new-services/modals/MediaUploadDialog";
import CustomerInfoHeader from "../../CustomerInfoHeader";
import AppointmentInfoBar from "../../AppointmentInfoBar";
import Button from "@/components/ui/Button";
import ViewLogsModal from "../../next-day-delivery/ViewLogsModal";

interface PageProps {
  id: string;
}

export default function UnderServicingDetailsPage({ id }: PageProps) {
  const [activeTab, setActiveTab] = useState("order-details");
  const [activeSubTab, setActiveSubTab] = useState("customer-notes");
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [isMediaUploadDialogOpen, setIsMediaUploadDialogOpen] = useState(false);
  const [isJobAssigned, setIsJobAssigned] = useState(true);
  const [showViewLogsModal, setShowViewLogsModal] = useState(false);

  // Mock data
  const serviceData = {
    customer: {
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=random",
      phone: "+91 1234567890",
      email: "sarah.johnson@example.com",
    },
    orderId: "ORD-201",
    vehicle: {
      make: "Mercedes-Benz",
      model: "C-Class C 300",
      registration: "TS10AB1234",
      year: "2023",
      type: "Sedan",
    },
    service: {
      type: "Major Service",
      source: "Walk-In",
    },
    status: "Under Servicing",
    appointmentDate: "Thursday, Aug 8, 2025",
    appointmentTime: "10:00 AM - 12:00 PM",
  };

  // Employee options
  const employeeOptions = [
    { id: "john", name: "John Doe" },
    { id: "jane", name: "Jane Smith" },
    { id: "mike", name: "Mike Johnson" },
    { id: "sarah", name: "Sarah Williams" },
  ];

  // Initialize form
  const methods = useForm<ServiceRequestFormValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      serviceItems: [
        {
          id: "1",
          product: "Engine Oil Change",
          description: "Full synthetic engine oil change with premium filter replacement.",
          quantity: 1,
          unitPrice: 150,
          tax: 15,
          total: 165,
        },
        {
          id: "2",
          product: "Brake Pad Replacement",
          description: "Front and rear brake pad replacement with inspection.",
          quantity: 1,
          unitPrice: 200,
          tax: 20,
          total: 220,
        },
      ],
      assignedEmployee: "john",
      estimatedDate: "2025-08-08",
      estimatedTime: "14:00",
      subTotal: 0,
      freight: 10,
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
  const { append, remove, update } = useFieldArray({
    control: methods.control,
    name: "serviceItems",
  });

  const serviceItems = watch("serviceItems");
  const freight = watch("freight");

  // Totals calculation
  useEffect(() => {
    const subTotal = serviceItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const salesTax = serviceItems.reduce((sum, item) => sum + item.tax * item.quantity, 0);
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

  const subTabs = [
    { id: "services-booked", label: "Services Booked" },
    { id: "customer-notes", label: "Customer Notes" },
    { id: "workshop-notes", label: "Workshop Notes" },
  ];

  const bottomTabs = [
    { id: "customer-notes", label: "Customer Notes" },
    { id: "workshop-notes", label: "Workshop Notes" },
  ];

  // Handlers
  const onSubmit = useCallback((data: ServiceRequestFormValues) => {
    console.log("Saving Under Servicing Data:", data);
  }, []);

  const handleReschedule = useCallback((data: any) => {
    console.log("Reschedule Data:", data);
    setIsRescheduleDialogOpen(false);
  }, []);

  const handleMediaUpload = useCallback((files: File[]) => {
    console.log("Uploaded Files:", files);
    setIsMediaUploadDialogOpen(false);
  }, []);

  const handleAssignAndStart = useCallback(() => {
    handleSubmit(onSubmit)();
    setIsJobAssigned(true);
    setActiveSubTab("customer-notes");
  }, [handleSubmit, onSubmit]);

  const handleAddServiceItem = useCallback((item: ServiceItemFormValues) => append(item), [append]);
  const handleUpdateServiceItem = useCallback((index: number, item: ServiceItemFormValues) => update(index, item), [update]);
  const handleDeleteServiceItem = useCallback((index: number) => remove(index), [remove]);

  const handleEmployeeChange = useCallback((id: string) => setValue("assignedEmployee", id), [setValue]);
  const handleDateChange = useCallback((date: string) => setValue("estimatedDate", date), [setValue]);
  const handleTimeChange = useCallback((time: string) => setValue("estimatedTime", time), [setValue]);

  // Memoized Data & Actions
  const servicesBookedData = useMemo(() => ({
    serviceItems,
    totals: { subTotal: watch("subTotal"), freight: watch("freight"), salesTax: watch("salesTax"), total: watch("total") },
    assignment: { employeeOptions, assignedEmployee: watch("assignedEmployee"), estimatedDate: watch("estimatedDate"), estimatedTime: watch("estimatedTime") },
    errors: { assignedEmployee: errors.assignedEmployee, estimatedDate: errors.estimatedDate, estimatedTime: errors.estimatedTime },
  }), [serviceItems, watch, employeeOptions, errors]);

  const servicesBookedActions = useMemo(() => ({
    onEmployeeChange: handleEmployeeChange,
    onDateChange: handleDateChange,
    onTimeChange: handleTimeChange,
    onDecline: () => console.log("Declined"),
    onAssignAndStart: handleAssignAndStart,
    onAddItem: handleAddServiceItem,
    onUpdateItem: handleUpdateServiceItem,
    onDeleteItem: handleDeleteServiceItem,
  }), [handleEmployeeChange, handleDateChange, handleTimeChange, handleAssignAndStart, handleAddServiceItem, handleUpdateServiceItem, handleDeleteServiceItem]);

  const handleGoBack = useCallback(() => {
    setIsJobAssigned(false);
    setActiveSubTab("services-booked");
  }, []);

  const handleGoToWorkshopNotes = useCallback(() => {
    setActiveSubTab("workshop-notes");
  }, []);

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-white pb-4">
        <div className="px-2 py-2 flex flex-col gap-2">
          <CustomerInfoHeader
            customer={serviceData.customer}
            orderNumber={serviceData.orderId}
            vehicle={serviceData.vehicle}
            service={serviceData.service}
            status={serviceData.status}
            statusVariant="under-servicing"
          />

          <div className="px-2 py-2 bg-white rounded-lg border border-gray-200">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} variant="pills" />
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {activeTab === "order-details" && (
              <div className="px-4 py-2 flex flex-col gap-4 pb-4">
                <AppointmentInfoBar
                  appointmentDate={serviceData.appointmentDate}
                  appointmentTime={serviceData.appointmentTime}
                  assignedTo="John Doe"
                  onReschedule={() => setIsRescheduleDialogOpen(true)}
                  actions={[
                    { id: "mail", icon: Mail, onClick: () => { }, variant: "mail" },
                    { id: "phone", icon: Phone, onClick: () => { }, variant: "phone" },
                    { id: "view-log", icon: Eye, onClick: () => setShowViewLogsModal(true), variant: "text", label: "View Log" },
                  ]}
                  printLabel="Print Job Card"
                  printActions={[{ id: "print-invoice", label: "Print Invoice", icon: <Printer size={16} />, onClick: () => { } }]}
                />

                {!isJobAssigned && (
                  <Tabs tabs={subTabs} activeTab={activeSubTab} onTabChange={setActiveSubTab} />
                )}

                {(!isJobAssigned && activeSubTab === "services-booked") || isJobAssigned ? (
                  <ServicesBookedTab data={servicesBookedData} actions={servicesBookedActions} isJobAssigned={isJobAssigned} />
                ) : null}

                {!isJobAssigned && activeSubTab === "customer-notes" && <CustomerNotesTab />}
                {!isJobAssigned && activeSubTab === "workshop-notes" && <WorkshopNotesTab />}

                {isJobAssigned && (
                  <>
                    <Tabs tabs={bottomTabs} activeTab={activeSubTab} onTabChange={setActiveSubTab} />
                    {activeSubTab === "customer-notes" && <CustomerNotesTab />}
                    {activeSubTab === "workshop-notes" && <WorkshopNotesTab />}
                  </>
                )}

                {isJobAssigned && activeSubTab !== "workshop-notes" && (
                  <div className="flex items-center justify-center gap-2 py-4 border border-gray-100 rounded-lg bg-gray-50/30">
                    <Button variant="outline" size="md" className="w-24 border-orange-500 text-orange-500" onClick={handleGoBack}>
                      Back
                    </Button>
                    <Button size="md" className="w-24" onClick={handleGoToWorkshopNotes}>
                      Next
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "tracking-status" && <div className="px-4 py-4"><TrackingStatusTab /></div>}
            {activeTab === "customer-history" && <div className="px-4 py-4"><CustomerHistoryTab /></div>}
          </div>
        </div>

        <RescheduleDialog isOpen={isRescheduleDialogOpen} onClose={() => setIsRescheduleDialogOpen(false)} onSubmit={handleReschedule} employeeOptions={employeeOptions} />
        <MediaUploadDialog isOpen={isMediaUploadDialogOpen} onClose={() => setIsMediaUploadDialogOpen(false)} onSubmit={handleMediaUpload} />

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
