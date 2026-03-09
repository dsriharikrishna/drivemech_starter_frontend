"use client";

import { CalendarView } from "@/types/vendor/operations/booking";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function CalendarHeader({
  currentDate,
  view,
  onViewChange,
  onPrevious,
  onNext,
}: CalendarHeaderProps) {
  const formatDateRange = () => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    if (view === "day") {
      return currentDate.toLocaleDateString("en-GB", options);
    } else if (view === "week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return `${startOfWeek.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} - ${endOfWeek.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`;
    } else {
      return currentDate.toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
      {/* Date Navigation */}
      <div className="flex items-center gap-2 md:gap-4 justify-center md:justify-start">
        <button
          onClick={onPrevious}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="min-w-0 flex-1 md:min-w-[280px] md:flex-none text-center">
          <span className="text-sm md:text-base font-medium text-gray-700">
            {formatDateRange()}
          </span>
        </div>

        <button
          onClick={onNext}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* View Switcher */}
      <div className="flex items-center gap-1 md:gap-2 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onViewChange("day")}
          className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            view === "day"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Day
        </button>
        <button
          onClick={() => onViewChange("week")}
          className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            view === "week"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Week
        </button>
        <button
          onClick={() => onViewChange("month")}
          className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            view === "month"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Month
        </button>
      </div>
    </div>
  );
}
