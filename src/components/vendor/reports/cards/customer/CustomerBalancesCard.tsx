"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface CustomerBalancesCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
  summery: boolean;
  onSummeryChange: (checked: boolean) => void;
}

interface DropdownItem {
  id: string;
  name: string;
}

/* ---------------- COMPONENT ---------------- */

const CustomerBalancesCard: React.FC<CustomerBalancesCardProps> = ({
  form,
  isExpanded,
  onToggle,
  summery,
  onSummeryChange,
}) => {
  const orderByOptions: DropdownItem[] = [
    { id: "name", name: "Name" },
    { id: "balance", name: "Balance" },
    { id: "date", name: "Date" },
  ];

  const handleDownload = () => {
    console.log("Download Customer Balances");
  };

  const handlePrint = () => {
    console.log("Print Customer Balances");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Customer Balances"
        isExpanded={isExpanded}
        onToggle={onToggle}
        handleDownload={handleDownload}
        handlePrint={handlePrint}
      />

      {/* Content */}
      {isExpanded && (
        <div className="p-4 bg-white rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Controller
                name="customerBalancesOrderBy"
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
            <Controller
              name="customerBalancesOlderThanDate"
              control={form.control}
              render={({ field }) => (
                <DatePicker
                  label="Older Than Date"
                  placeholder="Select"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString())}
                />
              )}
            />
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-900">
                Summery
              </label>
              <ToggleSwitch checked={summery} onChange={onSummeryChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerBalancesCard;
