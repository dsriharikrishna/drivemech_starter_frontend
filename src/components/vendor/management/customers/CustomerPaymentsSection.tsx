"use client";

import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import Table, { TableColumn } from "@/components/ui/Table";
import { FormProvider, useForm } from "react-hook-form";

export interface Payment {
  id: string;
  reference: string;
  paymentDate: string;
  paymentMethod: string;
  amount: number;
  status: string;
}

interface CustomerPaymentsSectionProps {
  customerId: string;
  onEdit?: (payment: Payment) => void;
  onDelete?: (payment: Payment) => void;
}

// Mock data
const mockPayments: Payment[] = [
  {
    id: "1",
    reference: "PAY-001",
    paymentDate: "10/05/25",
    paymentMethod: "Card",
    amount: 520.0,
    status: "Completed",
  },
  {
    id: "2",
    reference: "PAY-002",
    paymentDate: "10/10/25",
    paymentMethod: "Cash",
    amount: 250.0,
    status: "Completed",
  },
];

const methodOptions = [
  { id: "all", name: "All" },
  { id: "cash", name: "Cash" },
  { id: "card", name: "Card" },
  { id: "bank_transfer", name: "Bank Transfer" },
  { id: "cheque", name: "Cheque" },
  { id: "eft", name: "EFT" },
];

const CustomerPaymentsSection: React.FC<CustomerPaymentsSectionProps> = ({
  customerId,
  onEdit,
  onDelete,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const methods = useForm({ defaultValues: { reference: "" } });

  const columns: TableColumn<Payment>[] = [
    { key: "reference", header: "Reference", width: "140px" },
    { key: "paymentDate", header: "Payment Date", width: "130px" },
    { key: "paymentMethod", header: "Method", width: "130px" },
    {
      key: "amount",
      header: "Amount",
      width: "120px",
      render: (p) => `$${p.amount.toFixed(2)}`,
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (p) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {p.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      width: "100px",
      render: (p) => (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(p)}
            className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
            title="Edit"
          >
            <Edit2 size={15} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(p)}
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
            label="Payment Method"
            items={methodOptions}
            selectedItem={selectedMethod}
            onSelect={setSelectedMethod}
            placeholder="All Methods"
          />
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
          <Table
            columns={columns}
            data={mockPayments}
            keyExtractor={(p) => p.id}
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

export default CustomerPaymentsSection;
