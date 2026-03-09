"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Calendar,
  UserPlus,
  Car,
  FileText,
  ArrowRight,
} from "lucide-react";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  isPrimary?: boolean;
  path: string;
}

const QuickActions: React.FC = () => {
  const router = useRouter();

  const actions: QuickAction[] = [
    {
      icon: <CreditCard size={18} strokeWidth={2} />,
      label: "New Transaction",
      isPrimary: true,
      path: "/vendor/operations/transaction-center/new-services",
    },
    {
      icon: <Calendar size={18} strokeWidth={2} />,
      label: "Book Appointment",
      path: "/vendor/operations/create-booking",
    },
    {
      icon: <UserPlus size={18} strokeWidth={2} />,
      label: "Add Customer",
      path: "/vendor/management/customers",
    },
    {
      icon: <Car size={18} strokeWidth={2} />,
      label: "Register Vehicle",
      path: "/vendor/management/vehicles",
    },
    {
      icon: <FileText size={18} strokeWidth={2} />,
      label: "Create Invoice",
      path: "/vendor/management/customers/invoices",
    },
  ];

  const handleActionClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
      {/* Header */}
      <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleActionClick(action.path)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all duration-200 group ${
              action.isPrimary
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              {action.icon}
              <span className="text-sm">{action.label}</span>
            </div>
            <ArrowRight
              size={16}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
