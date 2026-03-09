"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import DropDown from "@/components/ui/DropDown";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { Download, Printer, ChevronDown, ChevronUp } from "lucide-react";
import { DownloadIcon, PrinterIcon } from "@/components/icons/ManageWorkshopIcons";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface SalesReportCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
}

interface DropdownItem {
  id: string;
  name: string;
}

/* ---------------- COMPONENT ---------------- */

const SalesReportCard: React.FC<SalesReportCardProps> = ({
  form,
  isExpanded,
  onToggle,
}) => {
  const orderByOptions: DropdownItem[] = [
    { id: "date", name: "Date" },
    { id: "amount", name: "Amount" },
    { id: "customer", name: "Customer" },
  ];

  const searchByOptions: DropdownItem[] = [
    { id: "invoice", name: "Invoice Number" },
    { id: "customer", name: "Customer Name" },
    { id: "vehicle", name: "Vehicle" },
  ];

  const customerTypeOptions: DropdownItem[] = [
    { id: "all", name: "All" },
    { id: "retail", name: "Retail" },
    { id: "corporate", name: "Corporate" },
  ];

  const handleDownload = () => {
    console.log("Download Sales Report");
  };

  const handlePrint = () => {
    console.log("Print Sales Report");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      {/* Header */}
      <ReportsHeader
        title="Sales Report"
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
              name="salesStartDate"
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
              name="salesEndDate"
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
                name="salesOrderBy"
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
                name="salesSearchBy"
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
            <CommonTextInput
              name="salesStartRange"
              label="Start Range"
              placeholder="Enter Start Range"
            />
            <CommonTextInput
              name="salesEndRange"
              label="End Range"
              placeholder="Enter End Range"
            />
            <div>
              <Controller
                name="salesCustomerType"
                control={form.control}
                render={({ field }) => (
                  <DropDown
                    label="Customer Type"
                    items={customerTypeOptions}
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

export default SalesReportCard;
