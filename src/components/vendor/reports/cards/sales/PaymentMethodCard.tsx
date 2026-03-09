"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface PaymentMethodCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

/* ---------------- COMPONENT ---------------- */

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const handleDownload = () => {
    console.log("Download Sales by Payment Method");
  };

  const handlePrint = () => {
    console.log("Print Sales by Payment Method");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Sales by Payment Method"
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
              <DatePicker label="Start Date" placeholder="Select" />
            </div>
            <div>
              <DatePicker label="End Date" placeholder="Select" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;
