"use client";

import React, { useState } from "react";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import { Search, FileText } from "lucide-react";
import { DownloadIcon } from "@/components/icons/TransactionIcons";
import { AddCircleIcon } from "@/components/icons/ManagementModuleIcons";

// Mock data
const mockInvoices = Array.from({ length: 15 }, (_, i) => ({
  id: `invoice-${i + 1}`,
  sNo: String(i + 1).padStart(2, "0"),
  invoiceNumber: `VINV-${String(i + 1).padStart(4, "0")}`,
  vendorName: "XYZ Services Pvt Ltd",
  invoiceDate: "2024-01-15",
  dueDate: "2024-02-15",
  amount: (Math.random() * 8000 + 500).toFixed(2),
  status: ["Paid", "Pending", "Overdue", "Partial"][i % 4],
  category: ["Services", "Parts", "Equipment", "Maintenance"][i % 4],
}));

const VendorInvoicesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      key: "sNo",
      header: "S.No",
      width: "80px",
    },
    {
      key: "invoiceNumber",
      header: "Invoice #",
      width: "130px",
    },
    {
      key: "vendorName",
      header: "Vendor Name",
      flex: 1,
    },
    {
      key: "category",
      header: "Category",
      width: "120px",
    },
    {
      key: "invoiceDate",
      header: "Invoice Date",
      width: "130px",
    },
    {
      key: "dueDate",
      header: "Due Date",
      width: "130px",
    },
    {
      key: "amount",
      header: "Amount",
      width: "120px",
      render: (item: any) => `$${item.amount}`,
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (item: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "Paid"
              ? "bg-green-100 text-green-700"
              : item.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : item.status === "Overdue"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
            }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "100px",
      render: () => (
        <div className="flex gap-2">
          <Button variant="icon-edit" size="sm" title="View Invoice">
            <FileText size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full w-full bg-gray-50 p-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Vendor Invoices</h1>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64"
                />
              </div>
              {/* Buttons */}
              <Button
                variant="primary-blue"
                size="sm"
                startIcon={<AddCircleIcon size={16} />}
              >
                Add Invoice
              </Button>
              <Button
                variant="outline"
                size="sm"
                startIcon={<DownloadIcon size={16} />}
              >
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="border-t border-gray-200 bg-white overflow-hidden" style={{
          height: "calc(100vh - 250px)"
        }}>
          <Table
            columns={columns as any}
            data={mockInvoices}
            keyExtractor={(item) => item.id}
            pagination
            pageSize={10}
            hoverable
            striped={false}
            className="h-full"
            style={{ height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default VendorInvoicesPage;
