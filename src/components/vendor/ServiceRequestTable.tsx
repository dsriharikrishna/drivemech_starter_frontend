"use client";

import React from "react";
import Table, { TableColumn } from "@/components/ui/Table";
import { ServiceRequest } from "@/lib/schemas/transaction-center";
import Avatar from "@/components/ui/Avatar";
import { useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";

export interface ActionButton {
  label: string;
  icon: LucideIcon;
  onClick: (item: ServiceRequest) => void;
  variant: "primary" | "success" | "danger" | "info";
  className?: string;
}

interface ServiceRequestTableProps {
  data: ServiceRequest[];
  basePath: string;
  title: string;
  titleBgColor?: string;
  showActions?: boolean;
  actionButtons?: ActionButton[];
  pageSize?: number;
  onRowClick?: (item: ServiceRequest) => void;
}

const variantClasses = {
  primary: "bg-blue-500 hover:bg-blue-600",
  success: "bg-green-500 hover:bg-green-600",
  danger: "bg-red-500 hover:bg-red-600",
  info: "bg-gray-500 hover:bg-gray-600",
};

export default function ServiceRequestTable({
  data,
  basePath,
  title,
  titleBgColor = "bg-slate-900",
  showActions = true,
  actionButtons = [],
  pageSize = 8,
  onRowClick,
}: ServiceRequestTableProps) {
  const router = useRouter();

  const handleRowClick = (item: ServiceRequest) => {
    if (onRowClick) {
      onRowClick(item);
    } else {
      router.push(`${basePath}/${item.id}`);
    }
  };

  const columns: TableColumn<ServiceRequest>[] = [
    {
      key: "customerName",
      header: "Customer",
      width: "250px",
      render: (item) => (
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleRowClick(item)}
        >
          <Avatar
            src={`https://ui-avatars.com/api/?name=${item.customerName}&background=random`}
            alt={item.customerName}
            size="md"
            className="rounded-xl"
          />
          <div>
            <div className="font-semibold text-gray-900">
              {item.customerName}
            </div>
            <div className="text-xs text-gray-500">{item.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "vehicleRegNo",
      header: "Vehicle & Reg. No",
      width: "200px",
      render: (item) => (
        <div>
          <div className="font-medium text-gray-900">{item.vehicleMake}</div>
          <div className="text-xs text-gray-500">{item.vehicleRegNo}</div>
        </div>
      ),
    },
    {
      key: "serviceType",
      header: "Service Type",
      width: "150px",
      render: (item) => (
        <span className="text-gray-700">{item.serviceType}</span>
      ),
    },
    {
      key: "modeOfService",
      header: "Mode of Service",
      width: "150px",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-md text-xs font-medium ${item.modeOfService === "Walk-In"
            ? "bg-red-50 text-red-600"
            : "bg-blue-50 text-blue-600"
            }`}
        >
          {item.modeOfService}
        </span>
      ),
    },
    {
      key: "date",
      header: "Scheduled Time",
      width: "200px",
      render: (item) => (
        <div>
          <div className="font-medium text-gray-900">
            {typeof item.date === "string"
              ? item.date
              : item.date.toLocaleDateString()}
          </div>
          <div className="text-xs text-blue-500 cursor-pointer hover:underline">
            {item.timeSlot}
          </div>
        </div>
      ),
    },
  ];

  // Add actions column if needed
  if (showActions && actionButtons.length > 0) {
    columns.push({
      key: "actions",
      header: "Actions",
      width: actionButtons.length === 1 ? "150px" : "200px",
      align: "right",
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          {actionButtons.map((button, index) => {
            const Icon = button.icon;
            return (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  button.onClick(item);
                }}
                className={`cursor-pointer flex items-center gap-1 px-3 py-1.5 text-white text-xs font-medium rounded-md transition-colors shadow-sm ${button.className || variantClasses[button.variant]
                  }`}
              >
                {button.label}{" "}
                <div className="bg-white/20 rounded-full p-0.5">
                  <Icon size={10} />
                </div>
              </button>
            );
          })}
        </div>
      ),
    });
  }

  return (
    <div className="h-full w-full bg-transparent">
      <div
        className="bg-white border border-gray-200 shadow-sm flex flex-col rounded-2xl overflow-hidden"
        style={{ maxHeight: "calc(100vh - 120px)" }}
      >
        <div className={`${titleBgColor} px-6 py-4 shrink-0`}>
          <h1 className="text-white text-lg font-bold tracking-tight">{title}</h1>
        </div>

        <div className="flex-1 overflow-auto">
          <Table
            columns={columns}
            data={data}
            keyExtractor={(item) => item.id}
            pagination
            pageSize={pageSize}
            hoverable
            striped={false}
            className="h-full"
            style={{ height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
