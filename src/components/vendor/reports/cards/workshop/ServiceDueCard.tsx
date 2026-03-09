"use client";

import React from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface ServiceDueCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

/* ---------------- COMPONENT ---------------- */

const ServiceDueCard: React.FC<ServiceDueCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const handleDownload = () => {
    console.log("Download Service Due Report");
  };

  const handlePrint = () => {
    console.log("Print Service Due Report");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Service Due"
        isExpanded={isExpanded}
        onToggle={onToggle}
        handleDownload={handleDownload}
        handlePrint={handlePrint}
      />

      {/* Content */}
      {isExpanded && (
        <div className="p-4 bg-white rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="serviceDueStartDate"
              control={form.control}
              render={({ field }) => (
                <DatePicker
                  label="Start Date"
                  placeholder="Select"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString())}
                />
              )}
            />
            <Controller
              name="serviceDueEndDate"
              control={form.control}
              render={({ field }) => (
                <DatePicker
                  label="End Date"
                  placeholder="Select"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString())}
                />
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDueCard;
