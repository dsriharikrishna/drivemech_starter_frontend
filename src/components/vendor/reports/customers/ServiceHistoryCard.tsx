"use client";

import React from "react";
import { Download, Bell, Car, Calendar } from "lucide-react";

/* ---------------- TYPES ---------------- */

export interface ServiceHistoryItem {
  id: string;
  vehicleName: string;
  vehicleRegistration: string;
  date: string;
  invoiceNumber: string;
  paymentMethod: string;
  services: string[];
  technician: string;
  duration: string;
  amount: number;
  paymentStatus: "Paid" | "UnPaid";
  serviceStatus: "Completed" | "InProgress";
}

interface ServiceHistoryCardProps {
  service: ServiceHistoryItem;
  onDownloadInvoice?: (serviceId: string) => void;
  onRemind?: (serviceId: string) => void;
}

/* ---------------- COMPONENT ---------------- */

const ServiceHistoryCard: React.FC<ServiceHistoryCardProps> = ({
  service,
  onDownloadInvoice,
  onRemind,
}) => {
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-[#DCFCE7] text-[#15803D]";
      case "UnPaid":
        return "bg-[#FEE2E2] text-[#EF4444]";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#DCFCE7] text-[#15803D]";
      case "InProgress":
        return "bg-[#E0F2FE] text-[#0369A1]";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 mb-4 hover:shadow-md transition-shadow">
      {/* Top Header Section */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="mt-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1A1C21]">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
            </svg>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <h3 className="text-base font-bold text-[#1A1C21]">
                {service.vehicleName}
              </h3>

              <div className="h-10 w-px bg-gray-100 mx-2" />

              <div className="flex items-center gap-4 text-[13px] font-medium text-[#94A3B8]">
                <span>Invoice : {service.invoiceNumber}</span>
                <div className="h-4 w-px bg-gray-200" />
                <span>Payment : {service.paymentMethod}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#94A3B8]">
              <Calendar size={14} />
              <span>{service.date}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${getServiceStatusColor(service.serviceStatus)}`}>
            {service.serviceStatus}
          </span>
          <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${getPaymentStatusColor(service.paymentStatus)}`}>
            {service.paymentStatus}
          </span>

          <button
            onClick={() => onDownloadInvoice?.(service.id)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-[#64748B] hover:bg-gray-50 transition-colors ml-2"
          >
            <Download size={16} />
            Invoice
          </button>

          {service.paymentStatus === "UnPaid" && (
            <button
              onClick={() => onRemind?.(service.id)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-[#1A1C21] hover:bg-gray-50 transition-colors"
            >
              <Bell size={16} />
              Remind
            </button>
          )}
        </div>
      </div>

      {/* Details Row */}
      <div className="grid grid-cols-4 gap-8 mt-8">
        <div>
          <p className="text-xs font-medium text-[#94A3B8] mb-3">Services</p>
          <div className="flex flex-wrap gap-2">
            {service.services.map((name, i) => (
              <span key={i} className="px-3 py-1.5 bg-[#F1F5F9] rounded-md text-[11px] font-bold text-[#64748B]">
                {name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-[#94A3B8] mb-3">Technician</p>
          <p className="text-sm font-bold text-[#1A1C21]">{service.technician}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-[#94A3B8] mb-3">Duration</p>
          <p className="text-sm font-bold text-[#1A1C21]">{service.duration}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-[#94A3B8] mb-3">Amount</p>
          <p className="text-[15px] font-bold text-[#2B7FFF]">$ {service.amount}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHistoryCard;
