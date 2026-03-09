"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  required?: boolean;
  showDeclineButton?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label = "Estimated Date",
  placeholder = "Select Date",
  value,
  onChange,
  required = false,
  showDeclineButton = false,
  startIcon,
  endIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAbove, setOpenAbove] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check available space and position dropdown
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 350; // Approximate height of the dropdown

      setOpenAbove(spaceBelow < dropdownHeight && rect.top > dropdownHeight);
    }
  }, [isOpen]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setSelectedDate(newDate);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDecline = () => {
    setSelectedDate(null);
    onChange?.(null);
    setIsOpen(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-11" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth.getMonth() &&
        selectedDate.getFullYear() === currentMonth.getFullYear();

      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentMonth.getMonth() &&
        new Date().getFullYear() === currentMonth.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`
                        h-8 w-8 rounded-lg flex items-center justify-center text-sm font-semibold
                        transition-all duration-200
                        ${isSelected
              ? "bg-primary-500 text-white shadow-md scale-105"
              : isToday
                ? "bg-primary-50 text-blue-600 border border-blue-200"
                : "text-gray-700 hover:bg-gray-100"
            }
                    `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Label */}
      {label && (
        <label className="inputLabel mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Field */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-between px-4 h-[40px] bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-all"
      >
        {startIcon}
        <span
          className={`text-sm ${selectedDate ? "text-gray-900" : "text-gray-400"}`}
        >
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        {endIcon ? endIcon : <Calendar size={16} className="text-gray-400" strokeWidth={2.5} />}
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div
          className={`absolute ${openAbove ? "bottom-full mb-2" : "top-full mt-2"} left-0 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden w-full min-w-[280px]`}
        >
          {/* Top Border Line */}
          <div className="h-px bg-gray-100" />

          <div className="p-2">
            {/* Decline Button */}
            {showDeclineButton && (
              <button
                onClick={handleDecline}
                className="mb-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
              >
                Decline
                <X size={16} />
              </button>
            )}

            {/* Month/Year Header */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handlePreviousMonth}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={18} className="text-gray-700" />
              </button>
              <div className="text-sm font-bold text-gray-900">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              <button
                onClick={handleNextMonth}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight size={18} className="text-gray-700" />
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day, index) => (
                <div
                  key={day}
                  className={`text-center text-xs font-semibold h-8 flex items-center justify-center ${index === 0 || index === 6
                    ? "text-orange-500"
                    : "text-gray-500"
                    }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </div>

          {/* Bottom Border Line */}
          <div className="h-px bg-gray-100" />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
