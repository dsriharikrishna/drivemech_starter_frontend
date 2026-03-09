"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DropDown from "@/components/ui/DropDown";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface CustomerListingsCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

interface DropdownItem {
  id: string;
  name: string;
}

/* ---------------- COMPONENT ---------------- */

const CustomerListingsCard: React.FC<CustomerListingsCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const orderByOptions: DropdownItem[] = [
    { id: "name", name: "Name" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Phone" },
    { id: "date", name: "Date Added" },
  ];

  const handleDownload = () => {
    console.log("Download Customer Listings");
  };

  const handlePrint = () => {
    console.log("Print Customer Listings");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Customer Listings"
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
                name="customerListingsOrderBy"
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

export default CustomerListingsCard;
