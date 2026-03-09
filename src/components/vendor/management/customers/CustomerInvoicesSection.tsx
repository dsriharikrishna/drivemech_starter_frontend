"use client";

import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import CommonTextInput from "@/components/forms/CommonTextInput";
import Table, { TableColumn } from "@/components/ui/Table";
import { FormProvider, useForm } from "react-hook-form";

interface CustomerInvoicesSectionProps {
  customerId: string;
  onAdd?: () => void;
  onEdit?: (invoice: Invoice) => void;
  onDelete?: (invoice: Invoice) => void;
}

export interface Invoice {
  id: string;
  reference: string;
  postDate: string;
  tranType: string;
  status: string;
  type: string;
  amount: number;
  balance: number;
}

// Mock data
const mockInvoices: Invoice[] = [
  {
    id: "1",
    reference: "50003",
    postDate: "10/05/25",
    tranType: "Invoice",
    status: "Open",
    type: "Account",
    amount: 520.0,
    balance: 520.0,
  },
  {
    id: "2",
    reference: "50003",
    postDate: "10/05/25",
    tranType: "Invoice",
    status: "Open",
    type: "Account",
    amount: 520.0,
    balance: 520.0,
  },
];

const statusOptions = [
  { id: "all", name: "All" },
  { id: "open", name: "Open" },
  { id: "closed", name: "Closed" },
  { id: "pending", name: "Pending" },
];

const CustomerInvoicesSection: React.FC<CustomerInvoicesSectionProps> = ({
  customerId,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const methods = useForm({
    defaultValues: {
      reference: "",
    },
  });

  const columns: TableColumn<Invoice>[] = [
    {
      key: "reference",
      header: "Reference",
      width: "120px",
    },
    {
      key: "postDate",
      header: "Post Date",
      width: "120px",
    },
    {
      key: "tranType",
      header: "Tran Type",
      width: "120px",
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (invoice) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {invoice.status}
        </span>
      ),
    },
    {
      key: "type",
      header: "Type",
      width: "120px",
    },
    {
      key: "amount",
      header: "Amount",
      width: "120px",
      render: (invoice) => `$${invoice.amount.toFixed(2)}`,
    },
    {
      key: "balance",
      header: "Balance",
      width: "120px",
      render: (invoice) => `$${invoice.balance.toFixed(2)}`,
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      width: "100px",
      render: (invoice) => (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onEdit?.(invoice)}
            className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
            title="Edit"
          >
            <Edit2 size={15} className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(invoice)}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Start Date */}
          <div>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              placeholder="Select Date"
            />
          </div>

          {/* End Date */}
          <div>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              placeholder="Select Date"
            />
          </div>

          {/* Status */}
          <div>

            <DropDown
              label="Status"
              items={statusOptions}
              selectedItem={selectedStatus}
              onSelect={(item) => setSelectedStatus(item)}
              placeholder="Select"
            />
          </div>

          {/* Reference */}
          <div>
            <CommonTextInput
              name="reference"
              label="Reference"
              placeholder=""
            />
          </div>
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
          <Table
            columns={columns}
            data={mockInvoices}
            keyExtractor={(invoice) => invoice.id}
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

export default CustomerInvoicesSection;
