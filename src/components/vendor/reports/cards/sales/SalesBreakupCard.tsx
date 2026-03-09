"use client";

import React, { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface SalesBreakupCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
  summaryChecked: boolean;
  onSummaryChange: (checked: boolean) => void;
}

interface DropdownItem {
  id: string;
  name: string;
}

/* ---------------- COMPONENT ---------------- */

const SalesBreakupCard: React.FC<SalesBreakupCardProps> = ({
  form,
  isExpanded,
  onToggle,
  summaryChecked,
  onSummaryChange,
}) => {
  const orderByOptions: DropdownItem[] = [
    { id: "yes", name: "Yes" },
    { id: "no", name: "No" },
  ];

  const handleDownload = () => {
    console.log("Download Sales Breakup");
  };

  const handlePrint = () => {
    console.log("Print Sales Breakup");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Sales Breakup"
        isExpanded={isExpanded}
        onToggle={onToggle}
        handleDownload={handleDownload}
        handlePrint={handlePrint}
      />

      {/* Content */}
      {isExpanded && (
        <div className="p-4 bg-white rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <DatePicker label="Start Date" placeholder="Select" />
            </div>
            <div>
              <DatePicker label="End Date" placeholder="Select" />
            </div>
            <div className="pt-7">
              <ToggleSwitch
                checked={summaryChecked}
                onChange={onSummaryChange}
                label="Summary"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Controller
                name="salesBreakupOrderBy"
                control={form.control}
                render={({ field }) => (
                  <DropDown
                    label="Order By"
                    items={orderByOptions}
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

export default SalesBreakupCard;
