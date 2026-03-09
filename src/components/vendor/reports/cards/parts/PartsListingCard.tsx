"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DropDown from "@/components/ui/DropDown";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface PartsListingCardProps {
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

const PartsListingCard: React.FC<PartsListingCardProps> = ({
  form,
  isExpanded,
  onToggle,
  printZeroParts,
  onPrintZeroPartsChange,
}) => {
  const productTypeOptions: DropdownItem[] = [
    { id: "all", name: "All Products" },
    { id: "parts", name: "Parts" },
    { id: "accessories", name: "Accessories" },
    { id: "consumables", name: "Consumables" },
  ];

  const locationOptions: DropdownItem[] = [
    { id: "all", name: "All Locations" },
    { id: "warehouse1", name: "Warehouse 1" },
    { id: "warehouse2", name: "Warehouse 2" },
  ];

  const offsetOptions: DropdownItem[] = [
    { id: "0", name: "0" },
    { id: "10", name: "10" },
    { id: "20", name: "20" },
    { id: "50", name: "50" },
  ];

  const handleDownload = () => {
    console.log("Download Parts Listing Report");
  };

  const handlePrint = () => {
    console.log("Print Parts Listing Report");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Parts Listing"
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
              <Controller
                name="partsListingProductType"
                control={form.control}
                render={({ field }) => (
                  <DropDown
                    label="Product Type"
                    items={productTypeOptions}
                    selectedItem={field.value}
                    onSelect={(item) => field.onChange(item)}
                    placeholder="Select"
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="partsListingLocation"
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
            <div>
              <Controller
                name="partsListingOffset"
                control={form.control}
                render={({ field }) => (
                  <DropDown
                    label="Offset"
                    items={offsetOptions}
                    selectedItem={field.value}
                    onSelect={(item) => field.onChange(item)}
                    placeholder="Select"
                  />
                )}
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-900">
                Print Zero Parts
              </label>
              <ToggleSwitch
                checked={printZeroParts}
                onChange={onPrintZeroPartsChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartsListingCard;
