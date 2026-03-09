"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface ItemPurchasesCardProps {
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

const ItemPurchasesCard: React.FC<ItemPurchasesCardProps> = ({
  form,
  isExpanded,
  onToggle,
  summery,
  onSummeryChange,
}) => {
  const orderByOptions: DropdownItem[] = [
    { id: "date", name: "Date" },
    { id: "item", name: "Item" },
    { id: "quantity", name: "Quantity" },
  ];

  const searchByOptions: DropdownItem[] = [
    { id: "item-name", name: "Item Name" },
    { id: "vendor", name: "Vendor" },
    { id: "category", name: "Category" },
  ];

  const handleDownload = () => {
    console.log("Download Item Purchases Report");
  };

  const handlePrint = () => {
    console.log("Print Item Purchases Report");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Item Purchases"
        isExpanded={isExpanded}
        onToggle={onToggle}
        handleDownload={handleDownload}
        handlePrint={handlePrint}
      />

      {/* Content */}
      {isExpanded && (
        <div className="p-4 bg-white rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Controller
              name="itemPurchasesStartDate"
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
              name="itemPurchasesEndDate"
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
                name="itemPurchasesOrderBy"
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
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-900">
                Summery
              </label>
              <ToggleSwitch checked={summery} onChange={onSummeryChange} />
            </div>
            <CommonTextInput
              name="itemPurchasesStartRange"
              label="Start Range"
              placeholder="Enter Start Range"
            />
            <CommonTextInput
              name="itemPurchasesEndRange"
              label="End Range"
              placeholder="Enter End Range"
            />
            <div>
              <Controller
                name="itemPurchasesSearchBy"
                control={form.control}
                render={({ field }) => (
                  <DropDown
                    label="Search By"
                    items={searchByOptions}
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

export default ItemPurchasesCard;
