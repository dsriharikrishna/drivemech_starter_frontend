"use client";

import React from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import DatePicker from "@/components/ui/DatePicker";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { ChevronDown, ChevronUp } from "lucide-react";
import ReportsHeader from "../../ReportsHeader";

/* ---------------- TYPES ---------------- */

interface NoLaborTimesCardProps {
  form: UseFormReturn<any>;
  isExpanded: boolean;
  onToggle: () => void;
  summery: boolean;
  onSummeryChange: (checked: boolean) => void;
  showOpenTransactions: boolean;
  onShowOpenTransactionsChange: (checked: boolean) => void;
}

/* ---------------- COMPONENT ---------------- */

const NoLaborTimesCard: React.FC<NoLaborTimesCardProps> = ({
  form,
  isExpanded,
  onToggle,
  summery,
  onSummeryChange,
  showOpenTransactions,
  onShowOpenTransactionsChange,
}) => {
  const handleDownload = () => {
    console.log("Download No Labor Times Report");
  };

  const handlePrint = () => {
    console.log("Print No Labor Times Report");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
      <ReportsHeader
        title="No Labor Times"
        isExpanded={isExpanded}
        onToggle={onToggle}
        handleDownload={handleDownload}
        handlePrint={handlePrint}
      />

      {/* Content */}
      {isExpanded && (
        <div className="p-4 bg-white rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Controller
              name="noLaborTimesStartDate"
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
              name="noLaborTimesEndDate"
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
                Summery
              </label>
              <ToggleSwitch checked={summery} onChange={onSummeryChange} />
            </div>
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

export default NoLaborTimesCard;
