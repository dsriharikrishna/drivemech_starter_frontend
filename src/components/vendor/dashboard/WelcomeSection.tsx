"use client";

import React, { useState } from "react";

interface WelcomeSectionProps {
  workshopName?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  workshopName = "AutoCare Motors",
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Format current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = now.toLocaleDateString("en-US", options);
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${date} • ${time}`;
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div className="min-w-0 flex-1">
        <h1 className="text-lg md:text-2xl font-bold text-gray-900 flex flex-col md:flex-row flex-wrap">
          <span className="text-gray-900"> Welcome back,</span>
          <span className="text-gray-600"> {workshopName}</span>
        </h1>
        <p className="text-sm text-gray-600">{getCurrentDateTime()}</p>
      </div>

      {/* Bookings Toggle */}
      <div className="flex items-center gap-3 self-start md:self-auto">
        <span className="text-sm font-medium text-gray-700">Bookings</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative inline-flex h-9 w-24 items-center rounded-full transition-all duration-300 ${isOpen ? "bg-blue-500" : "bg-gray-400"
            }`}
        >
          {/* Text inside the toggle */}
          <span
            className={`absolute left-3 text-sm font-semibold text-white transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"
              }`}
          >
            Open
          </span>
          <span
            className={`absolute left-9 text-sm font-semibold text-white transition-opacity duration-200 ${!isOpen ? "opacity-100" : "opacity-0"
              }`}
          >
            Closed
          </span>

          {/* White circular toggle */}
          <span
            className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition-transform duration-300 ${isOpen ? "translate-x-[66px]" : "translate-x-1"
              }`}
          />
        </button>
      </div>
    </div>
  );
};

export default WelcomeSection;
