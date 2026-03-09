"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface MechanicTimeSheetCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

interface DropdownItem {
  id: string;
  name: string;
}

/* ---------------- COMPONENT ---------------- */

const MechanicTimeSheetCard: React.FC<MechanicTimeSheetCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const mechanicOptions: DropdownItem[] = [
    { id: "all", name: "All Mechanics" },
    { id: "mechanic1", name: "John Doe" },
    { id: "mechanic2", name: "Jane Smith" },
    { id: "mechanic3", name: "Mike Johnson" },
  ];

  const handleDownload = () => {
    console.log("Download Mechanic Time Sheet");
  };

  const handlePrint = () => {
    console.log("Print Mechanic Time Sheet");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Mechanic Time Sheet"
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
              name="mechanicTimeSheetStartDate"
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
              name="mechanicTimeSheetEndDate"
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
                name="mechanicTimeSheetMechanic"
                control={form.control}
                render={({ field }) => (
                  <DropDown
                    label="Mechanic"
                    items={mechanicOptions}
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

export default MechanicTimeSheetCard;
