"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Avatar from "@/components/ui/Avatar";
import Tabs from "@/components/ui/Tabs";
import Button from "@/components/ui/Button";
import Table, { TableColumn } from "@/components/ui/Table";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonNumberInput from "@/components/forms/CommonNumberInput";
import {
  Eye,
  Printer,
  Trash2,} from "lucide-react";
import PaymentLinkModal from "./PaymentLinkModal";
import PaymentConfirmationModal from "./PaymentConfirmationModal";
import PaymentSuccessModal from "./PaymentSuccessModal";
import GatePassSuccessModal from "./GatePassSuccessModal";
import ViewLogsModal from "./ViewLogsModal";
import CustomerInfoHeader from "../CustomerInfoHeader";
import AppointmentInfoBar from "../AppointmentInfoBar";
import { useRouter } from "next/navigation";
import OrderTotalsSummary from "../OrderTotalsSummary";

interface OrderService {
  sNo: number;
  product: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  lineTotal: number;
}

interface NextDayDeliveryDetailsProps {
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

// Inline editable cell component
interface EditableCellProps {
  value: string | number;
  type?: "text" | "number";
  fieldName: string;
  onSave: (value: string | number) => void;
  min?: number;
  max?: number;
  step?: number;
  allowFloat?: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  type = "text",
  fieldName,
  onSave,
  min,
  max,
  step,
  allowFloat = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const methods = useForm({
    defaultValues: {
      [fieldName]: value,
    },
  });

  const { handleSubmit, reset } = methods;

  const handleSave = (data: any) => {
    const newValue = data[fieldName];
    if (newValue !== value) {
      onSave(newValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(handleSave)();
    } else if (e.key === "Escape") {
      reset({ [fieldName]: value });
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSubmit(handleSave)();
  };

  React.useEffect(() => {
    reset({ [fieldName]: value });
  }, [value, fieldName, reset]);

  if (isEditing) {
    return (
      <div className="w-full" onClick={(e) => e.stopPropagation()}>
        <FormProvider {...methods}>
          {type === "number" ? (
            <CommonNumberInput
              name={fieldName}
              compact
              min={min}
              max={max}
              step={step}
              allowFloat={allowFloat}
              decimalPlaces={2}
              autoFocus
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          ) : (
            <CommonTextInput
              name={fieldName}
              compact
              autoFocus
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
          )}
        </FormProvider>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 px-2 py-1 rounded transition-all border border-gray-300 bg-gray-50"
      title="Click to edit"
    >
      {type === "number" && typeof value === "number"
        ? allowFloat
          ? value.toFixed(2)
          : value
        : value}
    </div>
  );
};

const NextDayDeliveryDetails: React.FC<NextDayDeliveryDetailsProps> = ({
  order,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("order-details");
  const [services, setServices] = useState<OrderService[]>(order.services);
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

  const router = useRouter();

  // Handlers for service management
  const handleUpdateField = (
    index: number,
    field: keyof OrderService,
    value: string | number
  ) => {
    const updatedServices = [...services];
    const service = { ...updatedServices[index], [field]: value };

    // Recalculate lineTotal if quantity, unitPrice, or tax changes
    if (field === "quantity" || field === "unitPrice" || field === "tax") {
      const quantity =
        field === "quantity" ? (value as number) : service.quantity;
      const unitPrice =
        field === "unitPrice" ? (value as number) : service.unitPrice;
      const tax = field === "tax" ? (value as number) : service.tax;
      service.lineTotal = quantity * unitPrice + quantity * tax;
    }

    updatedServices[index] = service;
    setServices(updatedServices);
  };

  const handleDeleteService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleAddService = () => {
    const newService: OrderService = {
      sNo: services.length + 1,
      product: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      lineTotal: 0,
    };
    setServices([...services, newService]);
  };

  // Table columns for services with inline editing
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
      render: (service, index) => (
        <EditableCell
          value={service.product}
          fieldName={`product-${index}`}
          onSave={(value) =>
            handleUpdateField(index!, "product", value as string)
          }
        />
      ),
    },
    {
      key: "description",
      header: "Description",
      minWidth: "300px",
      render: (service, index) => (
        <EditableCell
          value={service.description}
          fieldName={`description-${index}`}
          onSave={(value) =>
            handleUpdateField(index!, "description", value as string)
          }
        />
      ),
    },
    {
      key: "quantity",
      header: "Quantity",
      width: "100px",
      render: (service, index) => (
        <EditableCell
          value={service.quantity}
          type="number"
          fieldName={`quantity-${index}`}
          min={1}
          step={1}
          onSave={(value) =>
            handleUpdateField(index!, "quantity", value as number)
          }
        />
      ),
    },
    {
      key: "unitPrice",
      header: "Unit Price ($)",
      width: "120px",
      render: (service, index) => (
        <EditableCell
          value={service.unitPrice}
          type="number"
          fieldName={`unitPrice-${index}`}
          min={0}
          step={0.01}
          allowFloat
          onSave={(value) =>
            handleUpdateField(index!, "unitPrice", value as number)
          }
        />
      ),
    },
    {
      key: "tax",
      header: "Tax (10%) ($)",
      width: "120px",
      render: (service, index) => (
        <EditableCell
          value={service.tax}
          type="number"
          fieldName={`tax-${index}`}
          min={0}
          step={0.01}
          allowFloat
          onSave={(value) => handleUpdateField(index!, "tax", value as number)}
        />
      ),
    },
    {
      key: "lineTotal",
      header: "Line Total ($)",
      width: "120px",
      render: (service) => (
        <span className="text-sm font-medium text-gray-900">
          ${service.lineTotal.toFixed(2)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "80px",
      render: (service, index) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleDeleteService(index!)}
            className="p-1 hover:bg-red-50 rounded transition-colors"
            title="Delete service"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  // Calculate totals from services state
  const subTotal = services.reduce(
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
        statusVariant="next-day-delivery"
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
        <div className="px-2 py-0">
          {/* Appointment Info */}
          <AppointmentInfoBar
            appointmentDate={order.appointment.date}
            appointmentTime={order.appointment.time}
            printLabel="Print Job Card"
            // onReschedule={() => false}
            inTime="In Time"
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

          {/* Services Table */}
          <div className="mb-6 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">
                Service Items
              </h3>
            </div>
            <div className="border-t border-gray-200" style={{ height: "calc(100vh - 250px)" }}>
              <Table
                columns={serviceColumns}
                data={services}
                keyExtractor={(service) => service.sNo}
                emptyMessage="No services found"
                striped={false}
                hoverable
                className="h-full"
                style={{ height: "100%" }}
              />
            </div>

            {/* Quick Add Row Button */}
            {/* <div className="px-4 py-3 border-t border-gray-200">
              <button
                onClick={handleAddService}
                className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 border border-blue-200 hover:border-blue-300"
              >
                <Plus size={16} />
                Add Row
              </button>
            </div> */}
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
              className="px-12 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Initiate Payment Link (${total.toFixed(2)})
            </Button>
          </div>
        </div>
      )}

      {activeTab === "tracking-status" && (
        <div className="p-2">
          <p className="text-center text-gray-500 py-8">
            Tracking status information will appear here
          </p>
        </div>
      )}

      {activeTab === "customer-history" && (
        <div className="p-2">
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
          // Navigate to gate pass page
        }}
        onGoToHomepage={() => {
          setShowGatePassModal(false);
          onClose();
          router.push("/vendor/dashboard");
        }}
      />

      <ViewLogsModal
        isOpen={showViewLogsModal}
        onClose={() => setShowViewLogsModal(false)}
        data={order}
      />
    </div>
  );
};

export default NextDayDeliveryDetails;
