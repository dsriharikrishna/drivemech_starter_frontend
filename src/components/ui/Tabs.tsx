"use client";

import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: "default" | "pills";
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onTabChange,
  variant = "default",
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

  if (variant === "pills") {
    return (
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex flex-nowrap gap-1 p-0.5 w-fit rounded-xl">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`
                                px-6 py-2 cursor-pointer rounded-md text-sm font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0
                                ${isActive
                    ? "bg-[#E7F0FF]  text-[#2B7FFF] shadow-sm"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50/50"
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
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex flex-nowrap gap-2 border-b border-slate-100 min-w-full">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`
                            px-6 py-3 cursor-pointer text-sm font-bold transition-all whitespace-nowrap flex-shrink-0
                            ${isActive
                  ? "text-[#2B7FFF] bg-gradient-to-b from-[#E7F0FF] to-[#FFFFFF] rounded-t-xl"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50/30 rounded-t-xl"
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

export default Tabs;
