"use client";

import React from "react";
import Dialog from "@/components/modals/Dialog";
import Button from "@/components/ui/Button";
import { X, Download, Check } from "lucide-react";

interface BillingTransaction {
  date: string;
  description: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
  invoiceId: string;
}

interface BillingHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BillingHistoryModal: React.FC<BillingHistoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Mock data - replace with actual data from API
  const transactions: BillingTransaction[] = [
    {
      date: "Oct 28, 2024",
      description: "Annual Subscription",
      amount: "$63.00",
      status: "Paid",
      invoiceId: "INV-2024-001",
    },
    {
      date: "Oct 28, 2023",
      description: "Annual Subscription",
      amount: "$63.00",
      status: "Paid",
      invoiceId: "INV-2023-001",
    },
    {
      date: "Oct 28, 2022",
      description: "Annual Subscription",
      amount: "$60.00",
      status: "Paid",
      invoiceId: "INV-2022-001",
    },
    {
      date: "Sep 15, 2022",
      description: "Setup Fee",
      amount: "$10.00",
      status: "Paid",
      invoiceId: "INV-2022-000",
    },
  ];

  const handleDownload = (invoiceId: string) => {
    console.log("Downloading invoice:", invoiceId);
    // TODO: Implement invoice download
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Billing History
            </h2>
            <p className="text-sm text-gray-500">
              View and download all your invoices
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">
                  Description
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-800">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                    {transaction.amount}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      <Check size={14} />
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleDownload(transaction.invoiceId)}
                      className="inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {transactions.length} transactions
          </p>
          <Button variant="outline" onClick={onClose} rounded="lg">
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default BillingHistoryModal;
