"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface MechanicBarcodeListCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

/* ---------------- COMPONENT ---------------- */

const MechanicBarcodeListCard: React.FC<MechanicBarcodeListCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const handleDownload = () => {
    console.log("Download Mechanic Barcode List");
  };

  const handlePrint = () => {
    console.log("Print Mechanic Barcode List");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Mechanic Barcode List"
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

export default MechanicBarcodeListCard;
