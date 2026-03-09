"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import CommonTextInput from "@/components/forms/CommonTextInput";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface ItemSalesCardProps {
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

const ItemSalesCard: React.FC<ItemSalesCardProps> = ({
  form,
  isExpanded,
  onToggle,
  summaryChecked,
  onSummaryChange,
}) => {
  const orderByOptions: DropdownItem[] = [
    { id: "item", name: "Item Name" },
    { id: "quantity", name: "Quantity" },
    { id: "revenue", name: "Revenue" },
  ];

  const searchByOptions: DropdownItem[] = [
    { id: "item", name: "Item Name" },
    { id: "category", name: "Category" },
    { id: "sku", name: "SKU" },
  ];

  const internalOnlyOptions: DropdownItem[] = [
    { id: "yes", name: "Yes" },
    { id: "no", name: "No" },
  ];

  const handleDownload = () => {
    console.log("Download Item Sales");
  };

  const handlePrint = () => {
    console.log("Print Item Sales");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Item Sales"
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
              name="itemSalesStartDate"
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
              name="itemSalesEndDate"
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
              <div>
                <Controller
                  name="itemSalesOrderBy"
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
              <div>
                <Controller
                  name="itemSalesSearchBy"
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
            <CommonTextInput
              name="itemStartRange"
              label="Start Range"
              placeholder="Enter Start Range"
            />
            <CommonTextInput
              name="itemEndRange"
              label="End Range"
              placeholder="Enter End Range"
            />
            <div className="pt-7">
              <ToggleSwitch
                checked={summaryChecked}
                onChange={onSummaryChange}
                label="Summary"
              />
            </div>
            <div>
              <Controller
                name="itemSalesInternalOnly"
                control={form.control}
                render={({ field }) => (
                  <DropDown
                    label="Internal Only"
                    items={internalOnlyOptions}
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

export default ItemSalesCard;
