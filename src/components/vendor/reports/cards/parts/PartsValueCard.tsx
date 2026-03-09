"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DropDown from "@/components/ui/DropDown";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface PartsValueCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
  printZeroParts: boolean;
  onPrintZeroPartsChange: (checked: boolean) => void;
}

interface DropdownItem {
  id: string;
  name: string;
}

/* ---------------- COMPONENT ---------------- */

const PartsValueCard: React.FC<PartsValueCardProps> = ({
  form,
  isExpanded,
  onToggle,
  printZeroParts,
  onPrintZeroPartsChange,
}) => {
  const groupByOptions: DropdownItem[] = [
    { id: "category", name: "Category" },
    { id: "brand", name: "Brand" },
    { id: "supplier", name: "Supplier" },
  ];

  const locationOptions: DropdownItem[] = [
    { id: "all", name: "All Locations" },
    { id: "warehouse1", name: "Warehouse 1" },
    { id: "warehouse2", name: "Warehouse 2" },
  ];

  const handleDownload = () => {
    console.log("Download Parts Value Report");
  };

  const handlePrint = () => {
    console.log("Print Parts Value Report");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Parts Value"
        isExpanded={isExpanded}
        onToggle={onToggle}
        handleDownload={handleDownload}
        handlePrint={handlePrint}
      />

      {/* Content */}
      {isExpanded && (
        <div className="p-4 bg-white rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-900">
                Print Zero Parts
              </label>
              <ToggleSwitch
                checked={printZeroParts}
                onChange={onPrintZeroPartsChange}
              />
            </div>
            <div>
              <Controller
                name="partsValueGroupBy"
                control={form.control}
                render={({ field }) => (
                  <DropDown
                    label="Group By"
                    items={groupByOptions}
                    selectedItem={field.value}
                    onSelect={(item) => field.onChange(item)}
                    placeholder="Select"
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="partsValueLocation"
                control={form.control}
                render={({ field }) => (
                  <DropDown
                    label="Location"
                    items={locationOptions}
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

export default PartsValueCard;
