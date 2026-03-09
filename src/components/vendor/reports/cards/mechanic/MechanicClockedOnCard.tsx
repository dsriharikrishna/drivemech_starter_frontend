"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface MechanicClockedOnCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

/* ---------------- COMPONENT ---------------- */

const MechanicClockedOnCard: React.FC<MechanicClockedOnCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const handleDownload = () => {
    console.log("Download Mechanic Clocked On Report");
  };

  const handlePrint = () => {
    console.log("Print Mechanic Clocked On Report");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Mechanic Clocked On"
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

export default MechanicClockedOnCard;
