"use client";

import React from "react";
import {
  ArrowLeft,
  Search,
  Bell,
  Plus,
  Calendar,
  FileText,
  DollarSign,
  Package,
  Receipt,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import ActionMenu, { ActionMenuOption } from "./ActionMenu";

const VendorCommonHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [notifications, setNotifications] = React.useState([]);
  const [selectedLanguage, setSelectedLanguage] = React.useState("English");
  console.log(notifications);
  const router = useRouter();
  const pathname = usePathname();

  // Define main routes where the back button should be hidden
  const MAIN_ROUTES = [
    "/vendor/dashboard",
    "/vendor/operations",
    "/vendor/operations/transaction-center",
    "/vendor/operations/spare-parts",
    "/vendor/operations/towing-services",
    "/vendor/operations/inspections",
    "/vendor/management",
    "/vendor/management/customers",
    "/vendor/management/vehicles",
    "/vendor/management/employees",
    "/vendor/inventory/suppliers",
    "/vendor/inventory/inventory",
    "/vendor/reports/sales",
    "/vendor/reports/customers",
    "/vendor/configurations",
    "/vendor/configurations/system/insurance-provider",
    "/vendor/configurations/system/tax-rates",
    "/vendor/configurations/system/terms-conditions",
    "/vendor/configurations/system/vehicle-category",
    "/vendor/configurations/system/vehicle-checklist",
    "/vendor/configurations/system/vendors-purchases",
    "/vendor/configurations/system/vehicle-models",
    "/vendor/configurations/system/logs",
    "/vendor/configurations/integrations",
    "/vendor/configurations/settings",
    "/vendor/manage-workshop",
    "/vendor/campaigns",
  ];

  const isMainRoute = MAIN_ROUTES.some(
    (route) => pathname === route || pathname === route + "/"
  );

  // Action menu items for "Create New"
  const createMenuItems: ActionMenuOption[] = [
    {
      id: "customer-booking",
      label: "Customer Booking",
      icon: <Calendar size={20} className="text-teal-500" />,
      onClick: () => {
        router.push("/vendor/operations/create-booking");
      },
    },
    {
      id: "customer-invoice",
      label: "Customer Invoice",
      icon: <FileText size={20} className="text-red-500" />,
      onClick: () => {
        router.push("/vendor/management/customers/invoices");
      },
    },
    {
      id: "customer-payments",
      label: "Customer Payments",
      icon: <DollarSign size={20} className="text-blue-500" />,
      onClick: () => {
        router.push("/vendor/management/customers/payments");
      },
    },
    {
      id: "supplier-parts-order",
      label: "Supplier Parts Order",
      icon: <Package size={20} className="text-orange-500" />,
      onClick: () => {
        router.push("/vendor/management/suppliers/parts-order");
      },
    },
    {
      id: "vendor-invoice",
      label: "Vendor Invoice",
      icon: <Receipt size={20} className="text-teal-500" />,
      onClick: () => {
        router.push("/vendor/management/vendors/invoices");
      },
    },
    {
      id: "vendor-payment",
      label: "Vendor Payment",
      icon: <CreditCard size={20} className="text-pink-500" />,
      onClick: () => {
        router.push("/vendor/management/vendors/payments");
      },
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 rounded-lg">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Back Button — hidden on main/top-level routes */}
        {!isMainRoute && (
          <button
            onClick={() => {
              router.back();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors order-1"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        )}

        {/* Search - Order 3 on mobile (new line), Order 2 on desktop */}
        <div className="relative w-full md:w-auto md:flex-1 md:max-w-md order-3 md:order-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Right Section - Order 2 on mobile (top right), Order 3 on desktop */}
        <div className="flex items-center gap-2 sm:gap-3 order-2 md:order-3 ml-auto">
          {/* Notification Bell */}
          <button
            onClick={() => {
              setNotifications([]);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Language Selector - Hidden text on small mobile if needed, but flex-wrap handles it. Keeping as is but maybe reducing padding */}
          <button
            onClick={() => {
              setSelectedLanguage("Hindi");
            }}
            className="flex items-center gap-2 px-2 sm:px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
              <Image
                src="/images/flags/uk.png"
                alt="English"
                width={20}
                height={20}
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              {selectedLanguage}
            </span>
          </button>

          {/* Add Button with ActionMenu */}
          <ActionMenu
            items={createMenuItems}
            trigger={
              <div className="p-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors cursor-pointer">
                <Plus
                  size={16}
                  className="text-orange-500 bg-white rounded-full"
                  strokeWidth={1.5}
                />
              </div>
            }
            align="right"
            width={240}
            title="Create New"
          />
        </div>
      </div>
    </header>
  );
};

export default VendorCommonHeader;
