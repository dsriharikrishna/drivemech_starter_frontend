"use client";

import ServicesTab from "@/components/customer/profile/orders/tabs/services/ServicesTab";
import SparesTab from "@/components/customer/profile/orders/tabs/spares/SparesTab";
import React from "react";

const tabs = [
  { label: "Services", icon: null },
  { label: "Spares", icon: null },
  { label: "Towing", icon: null },
  { label: "Insurance", icon: null },
];

export default function MyOrdersLayout() {
  const [activeTab, setActiveTab] = React.useState(tabs[0].label);

  return (
    <div className="flex flex-col h-full">

      {/* ---- TABS ---- */}
      <div
        className="
          flex gap-2 overflow-x-auto scrollbar-hide py-2 
          sticky top-0 z-10 bg-white 
        "
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;

          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-4 py-2 whitespace-nowrap rounded-lg border flex items-center gap-2 text-sm transition
                ${
                  isActive
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ---- TAB CONTENT ---- */}
      <div className="p-3 md:p-4 mt-2 flex-1">

        {activeTab === "Services" && <ServicesTab />}

        {activeTab === "Spares" && (
          <SparesTab />
        )}

        {activeTab === "Towing" && (
          <div className="text-sm text-gray-600">Towing Content</div>
        )}

        {activeTab === "Insurance" && (
          <div className="text-sm text-gray-600">Insurance Content</div>
        )}

      </div>
    </div>
  );
}
