import React from "react";
import { ServiceRequest } from "@/lib/schemas/transaction-center";
import {
  User,
  Phone,
  Users,
  Wrench,
  Fuel,
  Gauge,
  FileText,
  Clock,
  DollarSign,
  Percent,
  History,
  Car,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { EmptyMeterIcon, FuelIcon } from "@/components/icons/DashboardIcons";

interface UnderServicingCardProps {
  request: ServiceRequest;
}

const ActionButton = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <div className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer min-h-[80px]">
    <div className="p-2 bg-slate-600 rounded-lg mb-2 text-white">
      <Icon size={18} />
    </div>
    <span className="text-xs text-gray-700 font-medium text-center">
      {label}
    </span>
  </div>
);

export default function UnderServicingCard({
  request,
}: UnderServicingCardProps) {
  const isPetrol = request.fuelType === "Petrol";

  return (
    <div
      className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden ${isPetrol ? "border-red-300" : "border-green-300"}`}
    >
      {/* Header */}
      <div
        className={`px-4 lg:px-6 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 ${isPetrol ? "bg-red-50" : "bg-green-50"}`}
      >
        <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <Avatar
              name={request.customerName}
              size="sm"
              src={request.image}
              className="rounded-full w-7 h-7"
            />
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
              LIVE
            </span>
            <span
              className={`font-bold ${isPetrol ? "text-red-700" : "text-green-700"} text-sm lg:text-xs`}
            >
              {request.vehicleRegNo}
            </span>
          </div>

          <div className="hidden lg:block h-4 w-px bg-gray-300"></div>

          <div className="flex items-center gap-2 text-gray-700 bg-white/50 px-2 py-1 rounded-md lg:bg-transparent lg:p-0">
            <Car
              size={16}
              className={isPetrol ? "text-red-500" : "text-green-500"}
            />
            <span className="font-semibold">
              {request.vehicleMake} {request.vehicleModel}
            </span>
          </div>

          <div className="hidden lg:block h-4 w-px bg-gray-300"></div>

          <span
            className={`font-medium px-2 py-1 rounded-md bg-white/50 lg:bg-transparent lg:p-0 ${isPetrol ? "text-red-600" : "text-green-600"}`}
          >
            {request.year} | {request.fuelType === "Petrol" ? "SUV" : "Sedan"}
          </span>

          <div className="hidden lg:block h-4 w-px bg-gray-300"></div>

          <div className="flex items-center gap-2 font-semibold bg-white/50 px-2 py-1 rounded-md lg:bg-transparent lg:p-0">
            <Gauge
              size={16}
              className={isPetrol ? "text-red-500" : "text-green-500"}
            />
            <span className={isPetrol ? "text-red-600" : "text-green-600"}>
              {request.kmReading}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm mt-1 lg:mt-0">
          <div
            className={`flex items-center gap-2 font-bold ${isPetrol ? "text-red-600" : "text-green-600"}`}
          >
            <FuelIcon
              size={18}
              className={isPetrol ? "text-red-500" : "text-green-500"}
            />
            <span>{request.fuelType}</span>
          </div>
          <div
            className={`flex items-center gap-2 font-bold ${isPetrol ? "text-red-600" : "text-green-600"}`}
          >
            <EmptyMeterIcon
              size={18}
              className={isPetrol ? "text-red-500" : "text-green-500"}
            />
            <span>{request.fuelLevel}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 lg:p-6 flex flex-col lg:flex-row justify-between gap-6">
        {/* Info Section */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Info Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500 text-[10px] lg:text-xs">
                <User size={14} />
                <span>Customer Name</span>
              </div>
              <p className="font-bold text-gray-900 text-xs truncate">
                {request.customerName}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500 text-[10px] lg:text-xs">
                <Phone size={14} />
                <span>Phone Number</span>
              </div>
              <p className="font-bold text-gray-900 text-xs">
                {request.phoneNumber}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500 text-[10px] lg:text-xs">
                <Users size={14} />
                <span>Supervisor</span>
              </div>
              <p className="font-bold text-gray-900 text-xs">
                {request.supervisor}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500 text-[10px] lg:text-xs">
                <Wrench size={14} />
                <span>Technician</span>
              </div>
              <p className="font-bold text-gray-900 text-xs">
                {request.technician}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 lg:gap-3">
            <ActionButton icon={FileText} label="JC/Est" />
            <ActionButton icon={Clock} label="Status" />
            <ActionButton icon={History} label="History" />
            <ActionButton icon={DollarSign} label="Payments" />
            <ActionButton icon={Percent} label="Discount" />
            <ActionButton icon={FileText} label="Invoice" />
          </div>
        </div>

        {/* Progress Circle */}
        <div className="flex items-center justify-center lg:justify-end flex-shrink-0 pt-4 lg:pt-0 border-t border-gray-100 lg:border-none">
          <div className="relative w-24 h-24 lg:w-28 lg:h-28 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#fb923c"
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset="167.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center flex flex-col">
              <span className="text-xs font-bold text-gray-800">2/6</span>
              <span className="text-[10px] text-gray-400 font-medium">hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
