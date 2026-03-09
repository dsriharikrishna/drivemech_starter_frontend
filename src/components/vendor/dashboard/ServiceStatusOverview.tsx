"use client";

import React from "react";
import {
  Clock,
  Truck,
  Car,
  CheckCircle,
  Key,
  XCircle,
  Filter,
  ListFilter,
} from "lucide-react";
import ActionMenu from "../ActionMenu";
import { useRouter } from "next/navigation";

interface StatusItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
  iconColor: string;
  decorativeColor: string;
  path: string;
}

const ServiceCard = ({ item }: { item: StatusItem }) => {
  const router = useRouter();
  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl
        bg-white
        border border-[#E6EDF7]
        p-3
        transition-shadow duration-200
        hover:shadow-sm cursor-pointer
      "
      onClick={() => router.push(item.path)}
    >
      {/* Decorative blob */}
      <div
        className={`absolute -right-10 -bottom-10 w-20 h-20 ${item.decorativeColor} rounded-full opacity-20`}
      />

      <div className="relative z-10 flex items-center gap-4">
        {/* Icon */}
        <div
          className={`${item.bgColor} p-3 rounded-lg flex items-center justify-center`}
        >
          {item.icon}
        </div>

        {/* Text */}
        <div>
          <p className="text-sm font-medium text-gray-500">{item.label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {String(item.value).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
};

const ServiceStatusOverview: React.FC = () => {
  const statusItems: StatusItem[] = [
    {
      id: "under-servicing",
      icon: (
        <img
          src="/svgs/transaction-center/under-servicing.svg"
          alt="Under Servicing"
          className="w-8 h-8"
        />
      ),
      label: "Under Servicing",
      value: 10,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      decorativeColor: "bg-orange-100",
      path: "/vendor/operations/transaction-center/under-servicing",
    },
    {
      id: "next-day-delivery",
      icon: (
        <img
          src="/svgs/transaction-center/next-day-delivery.svg"
          alt="Next Day Delivery"
          className="w-8 h-8"
        />
      ),
      label: "Next Day Delivery",
      value: 5,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      decorativeColor: "bg-blue-100",
      path: "/vendor/operations/transaction-center/next-day-delivery",
    },
    {
      id: "test-drive",
      icon: (
        <img
          src="/svgs/transaction-center/test-drive.svg"
          alt="Test Drive"
          className="w-8 h-8"
        />
      ),
      label: "Test Drive",
      value: 7,
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
      decorativeColor: "bg-gray-100",
      path: "/vendor/operations/transaction-center/test-drive",
    },
    {
      id: "ready-for-delivery",
      icon: (
        <img
          src="/svgs/transaction-center/ready-for-delivery.svg"
          alt="Ready For Delivery"
          className="w-8 h-8"
        />
      ),
      label: "Ready For Delivery",
      value: 3,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      decorativeColor: "bg-green-100",
      path: "/vendor/operations/transaction-center/ready-for-delivery",
    },
    {
      id: "gate-pass-issued",
      icon: (
        <img
          src="/svgs/transaction-center/gate-pass.svg"
          alt="Gate Pass Issued"
          className="w-8 h-8"
        />
      ),
      label: "Gate Pass Issued",
      value: 3,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      decorativeColor: "bg-yellow-100",
      path: "/vendor/operations/transaction-center/gate-pass-issued",
    },
    {
      id: "cancelled",
      icon: (
        <img
          src="/svgs/transaction-center/cancelled.svg"
          alt="Cancelled"
          className="w-8 h-8"
        />
      ),
      label: "Cancelled",
      value: 1,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      decorativeColor: "bg-red-100",
      path: "/vendor/operations/transaction-center/cancelled",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Service Status Overview
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Real-time workshop activity
          </p>
        </div>
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
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-sm font-medium text-gray-700">Daily</span>
              <ListFilter size={16} className="text-gray-600" />
            </div>
          }
        />
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {statusItems.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ServiceStatusOverview;
