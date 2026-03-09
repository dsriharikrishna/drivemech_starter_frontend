"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DropDown from "@/components/ui/DropDown";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface VehicleListingCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

interface DropdownItem {
  id: string;
  name: string;
}

/* ---------------- COMPONENT ---------------- */

const VehicleListingCard: React.FC<VehicleListingCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const orderByOptions: DropdownItem[] = [
    { id: "registration", name: "Registration" },
    { id: "make", name: "Make" },
    { id: "model", name: "Model" },
    { id: "customer", name: "Customer" },
  ];

  const handleDownload = () => {
    console.log("Download Vehicle Listing");
  };

  const handlePrint = () => {
    console.log("Print Vehicle Listing");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Vehicle Listing"
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
                name="vehicleListingOrderBy"
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

export default VehicleListingCard;
