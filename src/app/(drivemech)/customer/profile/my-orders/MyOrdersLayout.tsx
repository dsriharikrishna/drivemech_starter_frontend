"use client";

import InsuranceTab from "@/components/customer/profile/orders/tabs/insurance/InsuranceTab";
import ServicesTab from "@/components/customer/profile/orders/tabs/services/ServicesTab";
import SparesTab from "@/components/customer/profile/orders/tabs/spares/SparesTab";
import TowingTab from "@/components/customer/profile/orders/tabs/towing/TowingTab";
import Divider from "@/components/ui/Divider";
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
    <div className="flex flex-col h-full p-2 min-w-0">
      {/* ---- TABS ---- */}
      <div className="flex w-full gap-1.5 py-2 sticky top-0 z-10 bg-white">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;

          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex-1 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm font-medium transition
                ${isActive
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

      <Divider variant="solid" className="my-2" />

      {/* ---- TAB CONTENT ---- */}
      <div className="p-1 md:p-2 mt-2 flex-1 min-w-0">
        {activeTab === "Services" && <ServicesTab />}
        {activeTab === "Spares" && <SparesTab />}
        {activeTab === "Towing" && <TowingTab />}
        {activeTab === "Insurance" && <InsuranceTab />}
      </div>
    </div>
  );
}
