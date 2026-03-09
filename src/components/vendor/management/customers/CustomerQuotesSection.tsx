"use client";

import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import Table, { TableColumn } from "@/components/ui/Table";
import { FormProvider, useForm } from "react-hook-form";

export interface Quote {
  id: string;
  quoteNumber: string;
  quoteDate: string;
  expiryDate: string;
  status: string;
  description: string;
  total: number;
}

interface CustomerQuotesSectionProps {
  customerId: string;
  onEdit?: (quote: Quote) => void;
  onDelete?: (quote: Quote) => void;
}

// Mock data
const mockQuotes: Quote[] = [
  {
    id: "1",
    quoteNumber: "QT-001",
    quoteDate: "10/05/25",
    expiryDate: "10/06/25",
    status: "Sent",
    description: "Full service + tyre rotation",
    total: 520.0,
  },
  {
    id: "2",
    quoteNumber: "QT-002",
    quoteDate: "10/10/25",
    expiryDate: "10/11/25",
    status: "Draft",
    description: "Brake service",
    total: 250.0,
  },
];

const statusOptions = [
  { id: "all", name: "All" },
  { id: "draft", name: "Draft" },
  { id: "sent", name: "Sent" },
  { id: "accepted", name: "Accepted" },
  { id: "declined", name: "Declined" },
];

const statusBadgeClass: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Sent: "bg-blue-100 text-blue-700",
  Accepted: "bg-green-100 text-green-800",
  Declined: "bg-red-100 text-red-700",
};

const CustomerQuotesSection: React.FC<CustomerQuotesSectionProps> = ({
  customerId,
  onEdit,
  onDelete,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const methods = useForm({ defaultValues: { reference: "" } });

  const columns: TableColumn<Quote>[] = [
    {
      key: "quoteNumber",
      header: "Quote #",
      width: "120px",
      render: (q) => (
        <span className="text-blue-600 hover:underline cursor-pointer">
          {q.quoteNumber}
        </span>
      ),
    },
    { key: "quoteDate", header: "Quote Date", width: "120px" },
    { key: "expiryDate", header: "Expiry Date", width: "120px" },
    {
      key: "status",
      header: "Status",
      width: "110px",
      render: (q) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass[q.status] ?? "bg-gray-100 text-gray-700"}`}
        >
          {q.status}
        </span>
      ),
    },
    { key: "description", header: "Description" },
    {
      key: "total",
      header: "Total",
      width: "110px",
      render: (q) => `$${q.total.toFixed(2)}`,
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      width: "100px",
      render: (q) => (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(q)}
            className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
            title="Edit"
          >
            <Edit2 size={15} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(q)}
            className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
            title="Delete"
          >
            <Trash2 size={15} className="text-white" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <FormProvider {...methods}>
      <div className="p-4 space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            placeholder="Select Date"
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={setEndDate}
            placeholder="Select Date"
          />
          <DropDown
            label="Status"
            items={statusOptions}
            selectedItem={selectedStatus}
            onSelect={setSelectedStatus}
            placeholder="All Statuses"
          />
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
          <Table
            columns={columns}
            data={mockQuotes}
            keyExtractor={(q) => q.id}
            pagination
            pageSize={10}
            hoverable
            striped={false}
            className="h-full"
            style={{ height: "100%" }}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default CustomerQuotesSection;
