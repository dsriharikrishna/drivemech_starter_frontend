"use client";

import React from "react";
import {
  Package,
  AlertTriangle,
  XCircle,
  Truck,
  ListFilter,
} from "lucide-react";
import ActionMenu from "../ActionMenu";
import Button from "@/components/ui/Button";

interface InventoryItem {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  labelColor: string;
  badge: string;
  badgeColor: string;
  badgeBgColor: string;
  cardBgColor: string;
  iconBgColor: string;
  valueColor: string;
  additionalInfo?: string;
  additionalInfoColor?: string;
}

const InventoryOverview: React.FC = () => {
  const items: InventoryItem[] = [
    {
      icon: <Package size={20} className="text-blue-600" />,
      value: "1234",
      label: "Total Items",
      labelColor: "text-blue-600",
      badge: "In Stock",
      badgeColor: "text-white",
      badgeBgColor: "bg-blue-600",
      cardBgColor: "bg-blue-50",
      iconBgColor: "bg-blue-200",
      valueColor: "text-blue-900",
      additionalInfo: "Value: $12,345.00",
      additionalInfoColor: "text-blue-600",
    },
    {
      icon: <AlertTriangle size={20} className="text-yellow-700" />,
      value: "23",
      label: "Low Stock Items",
      labelColor: "text-yellow-700",
      badge: "Warning",
      badgeColor: "text-white",
      badgeBgColor: "bg-yellow-600",
      cardBgColor: "bg-yellow-50",
      iconBgColor: "bg-yellow-200",
      valueColor: "text-yellow-900",
      additionalInfo: "Reorder Recommended",
      additionalInfoColor: "text-yellow-700",
    },
    {
      icon: <XCircle size={20} className="text-white" />,
      value: "8",
      label: "Out of Stock",
      labelColor: "text-red-600",
      badge: "Critical",
      badgeColor: "text-white",
      badgeBgColor: "bg-red-600",
      cardBgColor: "bg-red-50",
      iconBgColor: "bg-red-600",
      valueColor: "text-red-900",
      additionalInfo: "Urgent action needed",
      additionalInfoColor: "text-red-600",
    },
    {
      icon: <Truck size={20} className="text-green-700" />,
      value: "156",
      label: "Stock Movement",
      labelColor: "text-green-600",
      badge: "active",
      badgeColor: "text-white",
      badgeBgColor: "bg-green-600",
      cardBgColor: "bg-green-50",
      iconBgColor: "bg-green-200",
      valueColor: "text-green-900",
      additionalInfo: "Today",
      additionalInfoColor: "text-green-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-900">Inventory Overview</h3>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            startIcon={<Package size={16} className="text-blue-600" />}
            variant="custom"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium border border-blue-400"
          >
            Manage Inventory →
          </Button>
          <ActionMenu
            items={[
              {
                id: "daily",
                label: "Daily",
                onClick: () => console.log("daily"),
              },
              {
                id: "weekly",
                label: "Weekly",
                onClick: () => console.log("weekly"),
              },
              {
                id: "monthly",
                label: "Monthly",
                onClick: () => console.log("monthly"),
              },
              {
                id: "yearly",
                label: "Yearly",
                onClick: () => console.log("yearly"),
              },
            ]}
            trigger={
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <span className="text-sm font-medium text-gray-700">Daily</span>
                <ListFilter size={16} className="text-gray-500" />
              </div>
            }
          />
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Real-time stock management and analytics
      </p>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`${item.cardBgColor} rounded-2xl p-4 relative overflow-hidden`}
          >
            {/* Decorative blob */}
            <div
              className={`absolute -top-8 -right-8 w-32 h-32 ${item.iconBgColor} rounded-full opacity-40`}
            ></div>

            <div className="relative z-10 bg">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`${item.iconBgColor} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  {item.icon}
                </div>
                <span
                  className={`${item.badgeBgColor} ${item.badgeColor} text-xs px-3 py-1 rounded-full font-medium`}
                >
                  {item.badge}
                </span>
              </div>
              <div className={`text-2xl font-bold ${item.valueColor} mb-2`}>
                {item.value}
              </div>
              <div className={`text-sm font-medium ${item.labelColor} mb-1`}>
                {item.label}
              </div>
              {item.additionalInfo && (
                <div
                  className={`text-xs pt-2 border-t border-gray-300 ${item.additionalInfoColor}`}
                >
                  {item.additionalInfo}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryOverview;
