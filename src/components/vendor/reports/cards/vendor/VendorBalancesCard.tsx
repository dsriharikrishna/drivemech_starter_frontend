"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface VendorBalancesCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

interface DropdownItem {
  id: string;
  name: string;
}

/* ---------------- COMPONENT ---------------- */

const VendorBalancesCard: React.FC<VendorBalancesCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const orderByOptions: DropdownItem[] = [
    { id: "name", name: "Name" },
    { id: "balance", name: "Balance" },
    { id: "date", name: "Date" },
  ];

  const handleDownload = () => {
    console.log("Download Vendor Balances");
  };

  const handlePrint = () => {
    console.log("Print Vendor Balances");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Vendor Balances"
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
                name="vendorBalancesOrderBy"
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
              name="vendorBalancesOlderThanDate"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorBalancesCard;
