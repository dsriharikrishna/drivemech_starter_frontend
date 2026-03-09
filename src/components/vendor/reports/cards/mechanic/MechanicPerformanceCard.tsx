"use client";

import React, { useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface MechanicPerformanceCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
  reportType: boolean;
  onReportTypeChange: (checked: boolean) => void;
  summery: boolean;
  onSummeryChange: (checked: boolean) => void;
  showOpenTransactions: boolean;
  onShowOpenTransactionsChange: (checked: boolean) => void;
}

/* ---------------- COMPONENT ---------------- */

const MechanicPerformanceCard: React.FC<MechanicPerformanceCardProps> = ({
  form,
  isExpanded,
  onToggle,
  reportType,
  onReportTypeChange,
  summery,
  onSummeryChange,
  showOpenTransactions,
  onShowOpenTransactionsChange,
}) => {
  const handleDownload = () => {
    console.log("Download Mechanic Performance Report");
  };

  const handlePrint = () => {
    console.log("Print Mechanic Performance Report");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="Mechanic Performance"
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
              name="mechanicPerformanceStartDate"
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
              name="mechanicPerformanceEndDate"
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
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-900">
                Report Type
              </label>
              <ToggleSwitch
                checked={reportType}
                onChange={onReportTypeChange}
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-900">
                Summery
              </label>
              <ToggleSwitch checked={summery} onChange={onSummeryChange} />
            </div>
            <Controller
              name="mechanicPerformanceInternalOnly"
              control={form.control}
              render={({ field }) => (
                <DatePicker
                  label="Internal Only"
                  placeholder="Select"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString())}
                />
              )}
            />
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-900">
                Show Open Transactions
              </label>
              <ToggleSwitch
                checked={showOpenTransactions}
                onChange={onShowOpenTransactionsChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MechanicPerformanceCard;
