"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Truck, ArrowLeft, TrendingUp, Clock, AlertCircle } from "lucide-react";
import Table, { TableColumn } from "@/components/ui/Table";
import type { TowingRequest } from "@/schemas/vendor/towing.schema";
import { Eye } from "phosphor-react";
import ActionMenu from "@/components/vendor/ActionMenu";
import VendorFilterSection from "@/components/vendor/VendorFilterSection";

const TowingServicesPage = () => {
  const router = useRouter();
  const [requests, setRequests] = useState<TowingRequest[]>([
    {
      id: "1",
      requestId: "TOW-2024-001",
      customer: "Amit Verma",
      customerPhone: "+91 98765 43210",
      vehicle: "Hyundai Creta",
      vehicleReg: "KA-01-AB-1234",
      issue: "Engine Breakdown",
      location: "MG Road, Bangalore",
      distance: "5.2 km away",
      status: "new",
      priority: "high",
      createdAt: "09:30 AM",
    },
    {
      id: "2",
      requestId: "TOW-2024-002",
      customer: "Priya Sharma",
      customerPhone: "+91 98765 43210",
      vehicle: "Maruti Swift",
      vehicleReg: "KA-02-CD-5678",
      issue: "Engine Breakdown",
      location: "MG Road, Bangalore",
      distance: "5.2 km away",
      status: "assigned",
      priority: "medium",
      driver: "Rajesh Kumar",
      createdAt: "09:30 AM",
    },
    {
      id: "3",
      requestId: "TOW-2024-003",
      customer: "Vikram Singh",
      customerPhone: "+91 98765 43210",
      vehicle: "Toyota Innova",
      vehicleReg: "KA-03-EF-9012",
      issue: "Engine Breakdown",
      location: "MG Road, Bangalore",
      distance: "5.2 km away",
      status: "enroute",
      priority: "high",
      driver: "Suresh Patil",
      eta: "15 mins",
      createdAt: "09:30 AM",
    },
    {
      id: "4",
      requestId: "TOW-2024-004",
      customer: "Sneha Reddy",
      customerPhone: "+91 98765 43210",
      vehicle: "Honda City",
      vehicleReg: "KA-04-GH-3456",
      issue: "Engine Breakdown",
      location: "MG Road, Bangalore",
      distance: "5.2 km away",
      status: "pickedup",
      priority: "low",
      driver: "Rajesh Kumar",
      createdAt: "09:30 AM",
    },
    {
      id: "5",
      requestId: "TOW-2024-005",
      customer: "Karthik Iyer",
      customerPhone: "+91 98765 43210",
      vehicle: "Maruti Swift",
      vehicleReg: "KA-05-CD-5678",
      issue: "Engine Breakdown",
      location: "MG Road, Bangalore",
      distance: "5.2 km away",
      status: "completed",
      priority: "high",
      driver: "Ganesh Kumar",
      createdAt: "09:30 AM",
    },
  ]);

  const stats = [
    {
      icon: <Truck size={20} className="text-blue-600" />,
      label: "Total Requests",
      value: "89",
      change: "+15%",
      bgColor: "bg-blue-50",
    },
    {
      icon: <AlertCircle size={20} className="text-orange-600" />,
      label: "Active Tows",
      value: "12",
      change: "+3",
      bgColor: "bg-orange-50",
    },
    {
      icon: <TrendingUp size={20} className="text-green-600" />,
      label: "Completed Today",
      value: "8",
      change: "+25%",
      bgColor: "bg-green-50",
    },
    {
      icon: <Clock size={20} className="text-purple-600" />,
      label: "Avg Response Time",
      value: "18 min",
      change: "-5 min",
      bgColor: "bg-purple-50",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: "New Request", className: "bg-blue-100 text-blue-700" },
      assigned: {
        label: "Assigned",
        className: "bg-purple-100 text-purple-700",
      },
      enroute: {
        label: "En Route",
        className: "bg-orange-100 text-orange-700",
      },
      pickedup: {
        label: "Picked Up",
        className: "bg-yellow-100 text-yellow-700",
      },
      completed: {
        label: "Completed",
        className: "bg-green-100 text-green-700",
      },
    };
    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: "HIGH", className: "bg-red-100 text-red-700" },
      medium: { label: "MEDIUM", className: "bg-yellow-100 text-yellow-700" },
      low: { label: "LOW", className: "bg-gray-100 text-gray-700" },
    };
    const config =
      priorityConfig[priority as keyof typeof priorityConfig] ||
      priorityConfig.medium;
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  const columns: TableColumn<TowingRequest>[] = [
    {
      key: "requestId",
      header: "Request ID",
      width: "140px",
      render: (request) => (
        <div>
          <div className="font-medium text-gray-900">{request.requestId}</div>
          <div className="text-xs text-gray-500">{request.createdAt}</div>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (request) => (
        <div>
          <div className="font-medium text-gray-900">{request.customer}</div>
          <div className="text-xs text-gray-500">{request.customerPhone}</div>
        </div>
      ),
    },
    {
      key: "vehicle",
      header: "Vehicle",
      render: (request) => (
        <div>
          <div className="font-medium text-gray-900">{request.vehicle}</div>
          <div className="text-xs text-gray-500">{request.vehicleReg}</div>
        </div>
      ),
    },
    {
      key: "issue",
      header: "Issue",
      width: "150px",
    },
    {
      key: "location",
      header: "Location",
      render: (request) => (
        <div>
          <div className="text-sm text-gray-900">{request.location}</div>
          <div className="text-xs text-gray-500">{request.distance}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "140px",
      render: (request) => (
        <div className="space-y-1">
          {getStatusBadge(request.status)}
          {request.driver && (
            <div className="text-xs text-gray-600">
              Driver: {request.driver}
            </div>
          )}
          {request.eta && (
            <div className="text-xs text-orange-600">ETA: {request.eta}</div>
          )}
        </div>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      width: "100px",
      render: (request) => getPriorityBadge(request.priority),
    },
    {
      key: "actions",
      header: "Actions",
      width: "120px",
      render: (request) => (
        <button
          onClick={() =>
            router.push(
              `/vendor/operations/towing-services/${request.requestId}`
            )
          }
          className="flex-1 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          <Eye size={20} />
          <span className="text-xs">View Details</span>
        </button>
      ),
    },
  ];
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="bg-gray-800 text-white px-6 py-5 rounded-xl shadow-lg shrink-0">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight">Towing Requests</h1>
          <p className="text-sm text-gray-300">
            Manage and track all towing service requests and emergency breakdowns
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center gap-4 py-4"
          >
            <div className={`p-3 rounded-xl ${stat.bgColor} shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900 leading-none mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Area - Filter + Table */}
      <div
        className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden"
        style={{ height: "calc(100vh - 300px)" }}
      >
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/30">
          <VendorFilterSection />
        </div>

        {/* Scrollable Table Container */}
        <div className="flex-1 overflow-auto">
          <Table
            columns={columns}
            data={requests}
            keyExtractor={(item) => item.id}
            pagination
            pageSize={10}
            hoverable
            striped={false}
            className="h-full"
            style={{ height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TowingServicesPage;
