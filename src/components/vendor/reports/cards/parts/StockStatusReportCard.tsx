"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface StockStatusReportCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

interface DropdownItem {
  id: string;
  name: string;
}

/* ---------------- COMPONENT ---------------- */

const StockStatusReportCard: React.FC<StockStatusReportCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const statusOptions: DropdownItem[] = [
    { id: "all", name: "All" },
    { id: "in-stock", name: "In Stock" },
    { id: "low-stock", name: "Low Stock" },
    { id: "out-of-stock", name: "Out of Stock" },
  ];

  const handleDownload = () => {
    console.log("Download Stock Status Report");
  };

  const handlePrint = () => {
    console.log("Print Stock Status Report");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Stock Status Report"
        isExpanded={isExpanded}
        onToggle={onToggle}
        handleDownload={handleDownload}
        handlePrint={handlePrint}
      />

      {/* Content */}
      {isExpanded && (
        <div className="p-4 bg-white rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="stockStatusStartDate"
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
              name="stockStatusEndDate"
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
            <div>
              <Controller
                name="stockStatusStatus"
                control={form.control}
                render={({ field }) => (
                  <DropDown
                    label="Status"
                    items={statusOptions}
                    selectedItem={field.value}
                    onSelect={(item) => field.onChange(item)}
                    placeholder="Select"
                  />
                )}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockStatusReportCard;
