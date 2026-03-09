"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";
import Table, { TableColumn } from "@/components/ui/Table";
import type { OrderListItem } from "@/schemas/vendor/spareParts.schema";
import { Eye } from "phosphor-react";
import VendorFilterSection from "@/components/vendor/VendorFilterSection";

const SparePartsPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderListItem[]>([
    {
      id: "1",
      orderId: "ORD-2024-002",
      customerName: "Rajesh Kumar",
      customerPhone: "+91 98765 43210",
      itemsCount: 5,
      totalAmount: 89,
      status: "new",
      createdAt: "2024-11-25 10:30 AM",
    },
    {
      id: "2",
      orderId: "ORD-2024-002",
      customerName: "Priya Sharma",
      customerPhone: "+91 98765 43210",
      itemsCount: 5,
      totalAmount: 89,
      status: "confirmed",
      createdAt: "2024-11-25 11:00 AM",
    },
    {
      id: "3",
      orderId: "ORD-2024-002",
      customerName: "Amit Patel",
      customerPhone: "+91 98765 43210",
      itemsCount: 5,
      totalAmount: 89,
      status: "packed",
      createdAt: "2024-11-25 10:30 AM",
    },
    {
      id: "4",
      orderId: "ORD-2024-002",
      customerName: "Sneha Reddy",
      customerPhone: "+91 98765 43210",
      itemsCount: 5,
      totalAmount: 89,
      status: "ready",
      createdAt: "2024-11-25 10:30 AM",
    },
    {
      id: "5",
      orderId: "ORD-2024-002",
      customerName: "Vikram Singh",
      customerPhone: "+91 98765 43210",
      itemsCount: 5,
      totalAmount: 89,
      status: "completed",
      createdAt: "2024-11-25 10:30 AM",
    },
  ]);

  const stats = [
    {
      icon: <Package size={20} className="text-blue-600" />,
      label: "Total Orders",
      value: "156",
      change: "+12%",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Calendar size={20} className="text-orange-600" />,
      label: "Pending Orders",
      value: "23",
      change: "+5%",
      bgColor: "bg-orange-50",
    },
    {
      icon: <DollarSign size={20} className="text-green-600" />,
      label: "Revenue (Month)",
      value: "$2.4L",
      change: "+10%",
      bgColor: "bg-green-50",
    },
    {
      icon: <TrendingUp size={20} className="text-purple-600" />,
      label: "Avg Order Value",
      value: "$15,384",
      change: "+8%",
      bgColor: "bg-purple-50",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: "New", className: "bg-blue-100 text-blue-700" },
      confirmed: {
        label: "Confirmed",
        className: "bg-purple-100 text-purple-700",
      },
      packed: { label: "Packed", className: "bg-yellow-100 text-yellow-700" },
      ready: {
        label: "Ready for Pickup",
        className: "bg-orange-100 text-orange-700",
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

  const columns: TableColumn<OrderListItem>[] = [
    {
      key: "id",
      header: "S No",
      width: "80px",
      render: (order, index) => (
        <div className="text-gray-900 font-medium">
          {String(index + 1).padStart(2, "0")}
        </div>
      ),
    },
    {
      key: "orderId",
      header: "Order ID",
      width: "140px",
      render: (order) => (
        <div>
          <div className="font-medium text-gray-900">{order.orderId}</div>
          <div className="text-xs text-gray-500">{order.createdAt}</div>
        </div>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      render: (order) => (
        <div>
          <div className="font-medium text-gray-900">{order.customerName}</div>
          <div className="text-xs text-gray-500">{order.customerPhone}</div>
        </div>
      ),
    },
    {
      key: "itemsCount",
      header: "Items",
      width: "100px",
      render: (order) => (
        <div className="text-gray-900">{order.itemsCount} items</div>
      ),
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      width: "120px",
      render: (order) => (
        <div className="font-medium text-gray-900">${order.totalAmount}</div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "150px",
      render: (order) => getStatusBadge(order.status),
    },
    {
      key: "createdAt",
      header: "Created Date",
      width: "150px",
      render: (order) => (
        <div className="text-sm text-gray-900">
          {order.createdAt.split(" ")[0]}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "150px",
      render: (order) => (
        <button
          onClick={() =>
            router.push(`/vendor/operations/spare-parts/${order.orderId}`)
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
          <h1 className="text-xl font-bold tracking-tight">Spare Parts Orders</h1>
          <p className="text-sm text-gray-300">
            Manage and track all spare parts inventory and customer orders
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
          <VendorFilterSection
            title="Orders"
            searchPlaceholder="Search orders..."
            onSearch={(v) => console.log("search:", v)}
            statusItems={[
              { id: "all", label: "All Statuses", onClick: () => console.log("All") },
              { id: "new", label: "New", onClick: () => console.log("New") },
              { id: "confirmed", label: "Confirmed", onClick: () => console.log("Confirmed") },
              { id: "packed", label: "Packed", onClick: () => console.log("Packed") },
              { id: "ready", label: "Ready for Pickup", onClick: () => console.log("Ready") },
              { id: "completed", label: "Completed", onClick: () => console.log("Completed") },
            ]}
            timeItems={[
              { id: "all", label: "All time", onClick: () => console.log("All time") },
              { id: "today", label: "Today", onClick: () => console.log("Today") },
              { id: "week", label: "This Week", onClick: () => console.log("Week") },
              { id: "month", label: "This Month", onClick: () => console.log("Month") },
              { id: "year", label: "This Year", onClick: () => console.log("Year") },
            ]}
            onExport={() => console.log("Export orders")}
          />
        </div>

        {/* Scrollable Table Container */}
        <div className="flex-1 overflow-auto">
          <Table
            columns={columns}
            data={orders}
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

export default SparePartsPage;
