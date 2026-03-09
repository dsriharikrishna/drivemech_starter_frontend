"use client";

import React from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface TextMessageReportCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

/* ---------------- COMPONENT ---------------- */

const TextMessageReportCard: React.FC<TextMessageReportCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const handleDownload = () => {
    console.log("Download Text Message Report");
  };

  const handlePrint = () => {
    console.log("Print Text Message Report");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Text Message Report"
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
              name="textMessageReportStartDate"
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
              name="textMessageReportEndDate"
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

export default TextMessageReportCard;
