"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DropDown from "@/components/ui/DropDown";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface InvoicePaymentStatusCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

interface DropdownItem {
  id: string;
  name: string;
}

/* ---------------- COMPONENT ---------------- */

const InvoicePaymentStatusCard: React.FC<InvoicePaymentStatusCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const searchByOptions: DropdownItem[] = [
    { id: "invoice", name: "Invoice Number" },
    { id: "customer", name: "Customer Name" },
    { id: "date", name: "Date" },
  ];

  const handleDownload = () => {
    console.log("Download Invoice/Payment Status");
  };

  const handlePrint = () => {
    console.log("Print Invoice/Payment Status");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Invoice/Payment Status"
        isExpanded={isExpanded}
        onToggle={onToggle}
        handleDownload={handleDownload}
        handlePrint={handlePrint}
      />

      {/* Content */}
      {isExpanded && (
        <div className="p-4 bg-white rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Controller
                name="invoicePaymentSearchBy"
                control={form.control}
                render={({ field }) => (
                  <DropDown
                    label="Search By"
                    items={searchByOptions}
                    selectedItem={field.value}
                    onSelect={(item) => field.onChange(item)}
                    placeholder="Select"
                  />
                )}
              />
            </div>
            <CommonTextInput
              name="invoiceNumber"
              label="Invoice Number"
              placeholder="Enter Invoice Number"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePaymentStatusCard;
