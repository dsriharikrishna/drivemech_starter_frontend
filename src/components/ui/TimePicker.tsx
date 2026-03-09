"use client";

import React, { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimePickerProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (time: string) => void;
  required?: boolean;
  use24Hour?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const TimePicker: React.FC<TimePickerProps> = ({
  label = "Estimated Time",
  placeholder = "Select Time",
  value,
  onChange,
  required = false,
  use24Hour = false,
  startIcon,
  endIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAbove, setOpenAbove] = useState(false);

  // Parse initial value or use current time as fallback
  const parseTimeString = (timeStr?: string) => {
    if (!timeStr) {
      const now = new Date();
      return {
        hours: use24Hour ? now.getHours() : now.getHours() % 12 || 12,
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        period: (now.getHours() >= 12 ? "PM" : "AM") as "AM" | "PM",
      };
    }

    const timeMatch = timeStr.match(/(\d+):(\d+):(\d+)\s*(AM|PM)?/);
    if (timeMatch) {
      const [, h, m, s, p] = timeMatch;
      return {
        hours: parseInt(h, 10),
        minutes: parseInt(m, 10),
        seconds: parseInt(s, 10),
        period: (p || "AM") as "AM" | "PM",
      };
    }

    // Fallback to current time if parsing fails
    const now = new Date();
    return {
      hours: use24Hour ? now.getHours() : now.getHours() % 12 || 12,
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      period: (now.getHours() >= 12 ? "PM" : "AM") as "AM" | "PM",
    };
  };

  const initialTime = parseTimeString(value);
  const [hours, setHours] = useState(initialTime.hours);
  const [minutes, setMinutes] = useState(initialTime.minutes);
  const [seconds, setSeconds] = useState(initialTime.seconds);
  const [period, setPeriod] = useState<"AM" | "PM">(initialTime.period);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);

  const maxHours = use24Hour ? 23 : 12;
  const hoursList = Array.from(
    { length: maxHours + (use24Hour ? 1 : 0) },
    (_, i) => (use24Hour ? i : i + 1)
  );
  const minutesList = Array.from({ length: 60 }, (_, i) => i);
  const secondsList = Array.from({ length: 60 }, (_, i) => i);

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

  // Sync with external value prop changes
  useEffect(() => {
    if (value !== undefined) {
      const parsed = parseTimeString(value);
      setHours(parsed.hours);
      setMinutes(parsed.minutes);
      setSeconds(parsed.seconds);
      setPeriod(parsed.period);
    }
  }, [value, use24Hour]);

  // Check available space and position dropdown
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 400; // Approximate height of the dropdown

      setOpenAbove(spaceBelow < dropdownHeight && rect.top > dropdownHeight);
    }
  }, [isOpen]);

  const formatTime = () => {
    if (!hours && !minutes && !seconds) return "";
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");
    return use24Hour ? `${h}:${m}:${s}` : `${h}:${m}:${s} ${period}`;
  };

  const handleTimeChange = (
    type: "hours" | "minutes" | "seconds" | "period",
    value: number | string
  ) => {
    // Update state
    let newHours = hours;
    let newMinutes = minutes;
    let newSeconds = seconds;
    let newPeriod = period;

    if (type === "hours") {
      setHours(value as number);
      newHours = value as number;
    }
    if (type === "minutes") {
      setMinutes(value as number);
      newMinutes = value as number;
    }
    if (type === "seconds") {
      setSeconds(value as number);
      newSeconds = value as number;
    }
    if (type === "period") {
      setPeriod(value as "AM" | "PM");
      newPeriod = value as "AM" | "PM";
    }

    // Format time with new values
    const h = String(newHours).padStart(2, "0");
    const m = String(newMinutes).padStart(2, "0");
    const s = String(newSeconds).padStart(2, "0");
    const newTime = use24Hour
      ? `${h}:${m}:${s}`
      : `${h}:${m}:${s} ${newPeriod}`;

    onChange?.(newTime);
  };

  const scrollToValue = (
    ref: React.RefObject<HTMLDivElement | null>,
    value: number,
    itemsList: number[]
  ) => {
    if (ref.current) {
      const itemHeight = 40; // h-10
      const containerHeight = 120; // h-[120px]
      const index = itemsList.indexOf(value);
      // Center the selected item: scroll to item position minus half container height plus half item height
      const scrollPosition =
        index * itemHeight - containerHeight / 2 + itemHeight / 2;
      ref.current.scrollTop = scrollPosition;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToValue(hoursRef, hours, hoursList);
        scrollToValue(minutesRef, minutes, minutesList);
        scrollToValue(secondsRef, seconds, secondsList);
      }, 10);
    }
  }, [isOpen, hours, minutes, seconds, hoursList, minutesList, secondsList]);

  const renderScrollList = (
    items: number[],
    selectedValue: number,
    onChange: (value: number) => void,
    ref: React.RefObject<HTMLDivElement | null>
  ) => (
    <div
      ref={ref}
      className="h-[120px] overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      <div className="py-10">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`
                            w-full h-10 flex items-center justify-center text-xl
                            transition-all duration-200
                            ${item === selectedValue
                ? "text-gray-900 font-bold"
                : "text-gray-400 font-medium hover:text-gray-600"
              }
                        `}
          >
            {String(item).padStart(2, "0")}
          </button>
        ))}
      </div>
    </div>
  );

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
          className={`text-sm ${formatTime() ? "text-gray-900" : "text-gray-400"}`}
        >
          {formatTime() || placeholder}
        </span>
        {endIcon ? endIcon : <Clock size={16} className="text-gray-400" strokeWidth={2.5} />}
      </div>

      {/* Time Picker Dropdown */}
      {isOpen && (
        <div
          className={`absolute ${openAbove ? "bottom-full mb-2" : "top-full mt-2"} left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden w-full min-w-[320px]`}
        >
          {/* Scrollable Time Selectors */}
          <div className="relative px-4 py-3">
            {/* Top Divider Line */}
            <div className="absolute top-[calc(50%-20px)] left-0 right-0 h-[1px] bg-gray-300 pointer-events-none z-20" />

            {/* Selection Highlight Background */}
            <div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 bg-gray-50/50 pointer-events-none z-10" />

            {/* Bottom Divider Line */}
            <div className="absolute top-[calc(50%+20px)] left-0 right-0 h-[1px] bg-gray-300 pointer-events-none z-20" />

            <div className="flex gap-3 relative z-30">
              {/* Hours */}
              <div className="flex-1">
                {renderScrollList(
                  hoursList,
                  hours,
                  (v) => handleTimeChange("hours", v),
                  hoursRef
                )}
              </div>

              {/* Colon Separator */}
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">:</span>
              </div>

              {/* Minutes */}
              <div className="flex-1">
                {renderScrollList(
                  minutesList,
                  minutes,
                  (v) => handleTimeChange("minutes", v),
                  minutesRef
                )}
              </div>

              {/* Colon Separator */}
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">:</span>
              </div>

              {/* Seconds */}
              <div className="flex-1">
                {renderScrollList(
                  secondsList,
                  seconds,
                  (v) => handleTimeChange("seconds", v),
                  secondsRef
                )}
              </div>

              {/* AM/PM */}
              {!use24Hour && (
                <>
                  {/* Spacer */}
                  <div className="w-3" />

                  <div className="w-14 h-[120px] flex flex-col items-center justify-center gap-2">
                    {/* Empty first row - aligns with top time */}
                    <div className="h-10" />

                    {/* AM button - aligns with middle time */}
                    <button
                      type="button"
                      onClick={() => handleTimeChange("period", "AM")}
                      className={`
                                                h-10 px-4 text-base
                                                transition-all duration-200
                                                ${period === "AM"
                          ? "text-gray-900 font-bold"
                          : "text-gray-400 font-medium hover:text-gray-600"
                        }
                                            `}
                    >
                      AM
                    </button>

                    {/* PM button - aligns with bottom time */}
                    <button
                      type="button"
                      onClick={() => handleTimeChange("period", "PM")}
                      className={`
                                                h-10 px-4 text-base
                                                transition-all duration-200
                                                ${period === "PM"
                          ? "text-gray-900 font-bold"
                          : "text-gray-400 font-medium hover:text-gray-600"
                        }
                                            `}
                    >
                      PM
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bottom Border Line */}
          <div className="h-px bg-gray-100" />
        </div>
      )}
    </div>
  );
};

export default TimePicker;
