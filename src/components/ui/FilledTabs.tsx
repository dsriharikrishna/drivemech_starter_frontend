"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface FilledTab {
  id: string;
  label: string;
}

interface FilledTabsProps {
  tabs: FilledTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

const FilledTabs: React.FC<FilledTabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
  className,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || "");

  const activeTab =
    controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };

  return (
    <div className={cn("w-full overflow-x-auto scrollbar-hide", className)}>
      <div className="bg-gray-50 p-1 rounded-lg inline-flex gap-1 min-w-full sm:min-w-0">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`
                                px-3 sm:px-6 py-2 sm:py-2.5 cursor-pointer rounded-lg 
                                text-xs sm:text-sm font-medium transition-all duration-200
                                whitespace-nowrap flex-shrink-0
                                ${isActive
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                }
                            `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilledTabs;
