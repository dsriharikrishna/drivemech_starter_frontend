"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface CustomerOpenDepositsCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

/* ---------------- COMPONENT ---------------- */

const CustomerOpenDepositsCard: React.FC<CustomerOpenDepositsCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const handleDownload = () => {
    console.log("Download Customer Open Deposits");
  };

  const handlePrint = () => {
    console.log("Print Customer Open Deposits");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Customer Open Deposits"
        isExpanded={isExpanded}
        onToggle={onToggle}
        handleDownload={handleDownload}
        handlePrint={handlePrint}
      />

      {/* Content */}
      {isExpanded && (
        <div className="p-4 bg-white rounded-xl">
          <div className="text-center text-gray-500 py-8">
            No additional filters required
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOpenDepositsCard;
