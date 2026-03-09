"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Table, { TableColumn } from "@/components/ui/Table";
import { Phone, DollarSign, Star } from "lucide-react";
import {
  UserIcon,
  UserSearchIcon,
} from "@/components/icons/ManagementModuleIcons";
import { CalendarIcon } from "@/components/icons/TransactionIcons";
import { CustomerReports2Icon, ProfileTwoUserIcon } from "@/components/icons/DashboardIcons";

/* ---------------- TYPES ---------------- */

interface Customer {
  id: string;
  name: string;
  mobile: string;
  visits: number;
  lastVisit: string;
  totalSpends: number;
  rating: number;
}

/* ---------------- MOCK DATA ---------------- */

const mockCustomers: Customer[] = Array.from({ length: 256 }, (_, i) => ({
  id: `CUST-${String(i + 1).padStart(3, "0")}`,
  name: "John Doe",
  mobile: "+91 70607 12345",
  visits: 25,
  lastVisit: "29 Aug 2025",
  totalSpends: 45123.0,
  rating: 4.5,
}));

/* ---------------- COMPONENT ---------------- */

const CustomerReportsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const handleRowClick = (customer: Customer) => {
    router.push(`/vendor/reports/customers/${customer.id}`);
  };

  const columns: TableColumn<Customer>[] = [
    {
      key: "sno",
      header: "S.No",
      width: "80px",
      render: (_, index) => {
        const sno = (currentPage - 1) * 10 + index + 1;
        return String(sno).padStart(2, "0");
      },
    },
    {
      key: "name",
      header: "Customer Name",
      render: (customer) => (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleRowClick(customer)}
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <UserIcon size={16} className="text-blue-600" />
          </div>
          <span className="text-sm text-gray-900">{customer.name}</span>
        </div>
      ),
    },
    {
      key: "mobile",
      header: "Mobile Number",
      render: (customer) => (
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-gray-400" />
          <span className="text-sm text-gray-900">{customer.mobile}</span>
        </div>
      ),
    },
    {
      key: "visits",
      header: "Visits",
      width: "100px",
      render: (customer) => customer.visits,
    },
    {
      key: "lastVisit",
      header: "Last Visit",
      render: (customer) => (
        <div className="flex items-center gap-2">
          <CalendarIcon size={16} className="text-gray-400" />
          <span className="text-sm text-gray-900">{customer.lastVisit}</span>
        </div>
      ),
    },
    {
      key: "totalSpends",
      header: "Total Spends",
      render: (customer) => (
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-gray-400" />
          <span className="text-sm text-gray-900">
            {customer.totalSpends.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      width: "100px",
      render: (customer) => (
        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm text-gray-900">{customer.rating}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-full bg-white">
      <div className="px-3 py-3 space-y-4 border border-gray-200 rounded-lg">
        {/* Breadcrumb */}
        <div className="bg-blue-50 px-2 py-2.5 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <CustomerReports2Icon size={16} className="text-gray-700" />
            <span className="font-medium text-gray-900">Customer Reports</span>
          </div>
        </div>

        {/* Customer Directory Header */}
        <div className="flex items-center gap-2">
          <ProfileTwoUserIcon size={24} className="text-gray-900" />
          <h1 className="text-xl font-semibold text-gray-900">
            Customer Directory
          </h1>
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{
          height: "calc(100vh - 250px)"
        }}>
          <Table
            columns={columns}
            data={mockCustomers}
            keyExtractor={(customer) => customer.id}
            pagination
            pageSize={10}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
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

export default CustomerReportsPage;
