"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ActionMenu, { ActionMenuOption } from "./ActionMenu";
import { DownloadIcon, SortIcon } from "../icons/TransactionIcons";
import { AddCircleIcon } from "../icons/ManagementModuleIcons";
import Button from "../ui/Button";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FilterItem extends ActionMenuOption { }

export interface VendorFilterSectionProps {
  /** Section title shown on the left (default: "Orders") */
  title?: string;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Controlled search value */
  searchValue?: string;
  /** Called when the search input changes */
  onSearch?: (value: string) => void;
  /** Status dropdown items — hides the dropdown when empty / undefined */
  statusItems?: FilterItem[];
  /** Label shown on the status trigger button (default: "Status") */
  statusLabel?: string;
  /** Time dropdown items — hides the dropdown when empty / undefined */
  timeItems?: FilterItem[];
  /** Label shown on the time trigger button (default: "All time") */
  timeLabel?: string;
  /** Called when Export is clicked */
  onExport?: () => void;
  /** Hide the Export button entirely */
  hideExport?: boolean;
  /** Hide the search input entirely */
  hideSearch?: boolean;
  /** Called when Add is clicked — renders an Add button when provided */
  onAdd?: () => void;
  /** Label for the Add button (default: "Add") */
  addLabel?: string;
}

/* ------------------------------------------------------------------ */
/*  Default items                                                       */
/* ------------------------------------------------------------------ */

const DEFAULT_STATUS_ITEMS: FilterItem[] = [
  { id: "all", label: "All Statuses" },
  { id: "new", label: "New" },
  { id: "confirmed", label: "Confirmed" },
  { id: "packed", label: "Packed" },
  { id: "ready", label: "Ready for Pickup" },
  { id: "completed", label: "Completed" },
];

const DEFAULT_TIME_ITEMS: FilterItem[] = [
  { id: "all", label: "All time" },
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "year", label: "This Year" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

const VendorFilterSection = ({
  title = "Orders",
  searchPlaceholder = "Search",
  searchValue,
  onSearch,
  statusItems = DEFAULT_STATUS_ITEMS,
  statusLabel = "Status",
  timeItems = DEFAULT_TIME_ITEMS,
  timeLabel = "All time",
  onExport,
  hideExport = false,
  hideSearch = false,
  onAdd,
  addLabel = "Add",
}: VendorFilterSectionProps) => {
  const [internalSearch, setInternalSearch] = useState("");

  const searchVal = searchValue !== undefined ? searchValue : internalSearch;
  const handleSearch = (value: string) => {
    setInternalSearch(value);
    onSearch?.(value);
  };

  const triggerClass =
    "w-full lg:w-auto px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-1.5 text-sm text-gray-700 transition-colors cursor-pointer whitespace-nowrap";

  return (
    <div className="bg-[#EBF3FE] rounded-lg px-4 py-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
      {/* Title */}
      <h2 className="text-sm font-semibold text-gray-900 shrink-0">{title}</h2>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 w-full lg:w-auto">

        {/* Search */}
        {!hideSearch && (
          <div className="relative w-full lg:w-48">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={15}
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchVal}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        )}

        {/* Status Filter */}
        {statusItems.length > 0 && (
          <ActionMenu
            items={statusItems}
            trigger={
              <div className={triggerClass}>
                <SortIcon size={15} />
                <span>{statusLabel}</span>
              </div>
            }
            align="right"
            width={180}
          />
        )}

        {/* Time Filter */}
        {timeItems.length > 0 && (
          <ActionMenu
            items={timeItems}
            trigger={
              <div className={triggerClass}>
                <SortIcon size={15} />
                <span>{timeLabel}</span>
              </div>
            }
            align="right"
            width={150}
          />
        )}

        {/* Add Button */}
        {onAdd && (
          <Button
            size="sm"
            variant="primary-blue"
            className="w-full lg:w-auto whitespace-nowrap"
            startIcon={<AddCircleIcon size={15} />}
            onClick={onAdd}
          >
            {addLabel}
          </Button>
        )}

        {/* Export Button */}
        {!hideExport && (
          <Button

            size="sm"
            variant="outline-blue"
            className="w-full lg:w-auto rounded-lg border border-blue-600 text-blue-600 hover:text-blue-600 whitespace-nowrap"
            startIcon={<DownloadIcon size={15} />}
            onClick={onExport}
          >
            Export
          </Button>
        )}
      </div>
    </div>
  );
};

export default VendorFilterSection;
