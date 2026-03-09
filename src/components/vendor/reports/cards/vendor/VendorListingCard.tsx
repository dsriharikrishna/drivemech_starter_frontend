"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DropDown from "@/components/ui/DropDown";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface VendorListingCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

interface DropdownItem {
  id: string;
  name: string;
}

/* ---------------- COMPONENT ---------------- */

const VendorListingCard: React.FC<VendorListingCardProps> = ({
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
    console.log("Download Vendor Listing");
  };

  const handlePrint = () => {
    console.log("Print Vendor Listing");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Vendor Listing"
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
                name="vendorListingOrderBy"
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

export default VendorListingCard;
