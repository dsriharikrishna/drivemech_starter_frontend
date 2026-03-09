"use client";

import React from "react";
import { Settings, BarChart3, Car, Wrench, Users } from "lucide-react";

interface ConfigItem {
  icon: React.ReactNode;
  label: string;
  iconBgColor: string;
}

const SystemConfigurations: React.FC = () => {
  const configItems: ConfigItem[] = [
    {
      icon: <Settings size={20} />,
      label: "Settings",
      iconBgColor: "bg-gray-700",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Reports",
      iconBgColor: "bg-gray-700",
    },
    { icon: <Car size={20} />, label: "Loan Cars", iconBgColor: "bg-gray-700" },
    {
      icon: <Wrench size={20} />,
      label: "Manage Workshop",
      iconBgColor: "bg-gray-700",
    },
    {
      icon: <Users size={20} />,
      label: "Employees",
      iconBgColor: "bg-gray-700",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      {/* Header */}
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        System & Configurations
      </h3>

      {/* Config Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {configItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div
              className={`${item.iconBgColor} text-white w-12 h-12 rounded-lg flex items-center justify-center`}
            >
              {item.icon}
            </div>
            <span className="text-xs font-medium text-gray-900 text-center">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SystemConfigurations;
