"use client";

import React from "react";
import { Customer } from "@/schemas/vendor/customer.schema";
import {
  Edit,
  MessageCircle,
  FileText,
  FileSpreadsheet,
  Calendar,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import Table, { TableColumn } from "@/components/ui/Table";
import {
  DeviceMessageIcon,
  DocumentTextIcon,
  EditIcon,
  ReceiptItemIcon,
  IncomeIcon,
} from "@/components/icons/ManagementModuleIcons";
import { CalendarIcon } from "@/components/icons/TransactionIcons";
import { CarIcon } from "@/components/icons/DashboardIcons";
import { ChatIcon } from "@/components/icons/InventoryIcons";

interface CustomersTableProps {
  customers: Customer[];
  onView: (customer: Customer) => void;
  onRowClick?: (customer: Customer) => void;
  onEdit?: (customer: Customer) => void;
  onAddVehicle?: (customer: Customer) => void;
  onMessage?: (customer: Customer) => void;
  onInvoice?: (customer: Customer) => void;
  onPayment?: (customer: Customer) => void;
  onQuote?: (customer: Customer) => void;
  onBooking?: (customer: Customer) => void;
}

const CustomersTable: React.FC<CustomersTableProps> = ({
  customers,
  onView,
  onRowClick,
  onEdit,
  onAddVehicle,
  onMessage,
  onInvoice,
  onPayment,
  onQuote,
  onBooking,
}) => {
  const columns: TableColumn<Customer>[] = [
    {
      key: "sNo",
      header: "S.No",
      width: "80px",
      render: (customer, index) => String(index + 1).padStart(2, "0"),
    },
    {
      key: "name",
      header: "Name",
      flex: 1,
      render: (customer) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {customer.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {customer.name}
          </span>
        </div>
      ),
    },
    {
      key: "mobileNumber",
      header: "Mobile Number",
      flex: 1,
      render: (customer) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          {customer.mobileNumber}
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      flex: 1,
      render: (customer) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {customer.location}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "left",
      flex: 1,
      render: (customer) => (
        <div
          className="flex items-start justify-start gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {onEdit && (
            <button
              onClick={() => onEdit(customer)}
              className="w-8 h-8 cursor-pointer rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
              title="Edit Profile"
            >
              <EditIcon size={16} className="text-white" />
            </button>
          )}

          {onAddVehicle && (
            <button
              onClick={() => onAddVehicle(customer)}
              className="w-8 h-8 cursor-pointer rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
              title="Add Vehicle"
            >
              <CarIcon size={16} className="text-white" />
            </button>
          )}

          {onMessage && (
            <button
              onClick={() => onMessage(customer)}
              className="w-8 h-8 cursor-pointer rounded-full bg-teal-500 hover:bg-teal-600 flex items-center justify-center transition-colors"
              title="Message"
            >
              <DeviceMessageIcon size={16} className="text-white" />
            </button>
          )}

          {onInvoice && (
            <button
              onClick={() => onInvoice(customer)}
              className="w-8 h-8 cursor-pointer rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors"
              title="Invoice"
            >
              <DocumentTextIcon size={16} className="text-white" />
            </button>
          )}

          {onQuote && (
            <button
              onClick={() => onQuote(customer)}
              className="w-8 h-8 cursor-pointer rounded-full bg-orange-400 hover:bg-orange-500 flex items-center justify-center transition-colors"
              title="Quote"
            >
              <ChatIcon size={16} className="text-white" />
            </button>
          )}

          {onBooking && (
            <button
              onClick={() => onBooking(customer)}
              className="w-8 h-8 cursor-pointer rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center transition-colors"
              title="Booking"
            >
              <CalendarIcon size={16} className="text-white" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={customers}
      keyExtractor={(customer) => customer.id}
      pagination
      pageSize={10}
      totalItems={256}
      hoverable
      striped={false}
      onRowClick={onRowClick}
      className="h-full"
      style={{ height: "100%" }}
    />
  );
};

export default CustomersTable;
