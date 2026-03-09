import React from "react";
import Avatar from "@/components/ui/Avatar";
import {
  Video,
  CreditCard,
  UserRound,
  CircleDot,
} from "lucide-react";
import { CalendarManagementIcon } from "../icons/ManagementModuleIcons";
import { CarIcon, SettingIcon } from "../icons/DashboardIcons";
import { EmailIcon, PhoneIcon, WhatsAppIcon, UserIcon, HashtagIcon, StoryIcon, MessagesIcon, ChipIcon } from "../icons/TransactionIcons";

interface CustomerInfoHeaderProps {
  customer: {
    name: string;
    avatar?: string;
    phone: string;
    email: string;
  };
  orderNumber: string;
  vehicle: {
    make: string;
    model: string;
    registration: string;
    year: string;
    type: string;
  };
  service: {
    type: string;
    source: string;
  };
  status: string;
  statusVariant?:
  | "default"
  | "test-drive"
  | "ready-for-delivery"
  | "gate-pass"
  | "next-day-delivery"
  | "under-servicing"
  | "cancelled";
}

const CustomerInfoHeader: React.FC<CustomerInfoHeaderProps> = ({
  customer,
  orderNumber,
  vehicle,
  service,
  status,
  statusVariant = "default",
}) => {
  // Define status badge styles based on variant
  const getStatusBadgeClass = () => {
    switch (statusVariant) {
      case "test-drive":
        return "bg-purple-100 text-purple-600";
      case "ready-for-delivery":
        return "bg-green-100 text-green-600";
      case "gate-pass":
        return "bg-blue-100 text-blue-600";
      case "next-day-delivery":
        return "bg-yellow-100 text-yellow-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      case "under-servicing":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-orange-100 text-orange-600";
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 p-6 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 items-start w-full">
        {/* COLUMN 1 – Customer */}
        <div className="flex items-start gap-3 min-w-0">
          <Avatar src={customer.avatar} name={customer.name} size="xl" className="rounded-lg w-12 h-12" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-1.5">
              <UserIcon size={14} className="text-gray-400" />
              <p className="text-xs text-gray-400">Customer Name</p>
            </div>
            <p className="text-sm font-semibold text-gray-800 truncate">
              {customer.name}
            </p>

            <div className="flex items-center gap-1.5  ">
              <HashtagIcon size={14} className="text-gray-400" />
              <p className="text-xs text-gray-400">Order ID</p>
            </div>
            <p className="text-sm font-medium text-gray-700 truncate">
              #{orderNumber}
            </p>
          </div>
        </div>

        {/* COLUMN 2 – Connect + Service */}
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 mb-2">
              Connect with {customer.name.split(" ")[0]}
            </p>
            <div className="flex gap-2">
              <button
                className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                aria-label="Call"
                title="Call"
              >
                <PhoneIcon size={18} className="text-red-500" />
              </button>
              <button
                className="w-8 h-8 rounded-full bg-green-50 hover:bg-green-100 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <WhatsAppIcon size={22} className="text-green-500" />
              </button>
              <button
                className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                aria-label="Video Call"
                title="Video Call"
              >
                <MessagesIcon size={18} className="text-red-500" />
              </button>
              <button
                className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                aria-label="Email"
                title="Email"
              >
                <EmailIcon size={18} className="text-red-500" />
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <SettingIcon size={14} className="text-gray-400" />
              <p className="text-xs text-gray-400">Service Type</p>
            </div>
            <p className="text-sm font-medium text-gray-700">{service.type}</p>
          </div>
        </div>

        {/* COLUMN 3 – Reg Number + Order Source */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <ChipIcon size={14} className="text-gray-400 fill-gray-400" />
              <p className="text-xs text-gray-400">Reg. Number</p>
            </div>
            <p className="text-sm font-semibold text-gray-800">
              {vehicle.registration}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <UserRound size={14} className="text-gray-400" />
              <p className="text-xs text-gray-400">Order Source</p>
            </div>
            <p className="text-sm font-medium text-gray-700">
              {service.source}
            </p>
          </div>
        </div>

        {/* COLUMN 4 – Vehicle + Status */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <CarIcon size={14} className="text-gray-400 fill-gray-400" />
              <p className="text-xs text-gray-400">Vehicle Make & Model</p>
            </div>
            <p className="text-sm font-semibold text-gray-800">
              {vehicle.make} {vehicle.model}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <StoryIcon size={14} className="text-gray-400 fill-gray-400" />
              <p className="text-xs text-gray-400">Status</p>
            </div>
            <span
              className={`inline-block px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusBadgeClass()}`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* COLUMN 5 – Year & Type */}
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <CalendarManagementIcon size={14} className="text-gray-400 " />
            <p className="text-xs text-gray-400">Year & Type</p>
          </div>
          <p className="text-sm font-medium text-gray-700">
            {vehicle.year} - {vehicle.type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoHeader;
