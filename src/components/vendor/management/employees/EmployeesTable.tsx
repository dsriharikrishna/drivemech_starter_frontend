"use client";

import React from "react";
import Table, { TableColumn } from "@/components/ui/Table";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { PencilSimple, Trash } from "phosphor-react";
import Link from "next/link";

interface EmployeeItem {
  id: string;
  sNo: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  designation: string;
  contactNumber: string;
  mobileAuth: boolean;
}

interface EmployeesTableProps {
  onEdit?: (item: EmployeeItem) => void;
  onView?: (item: EmployeeItem) => void;
  onDelete?: (item: EmployeeItem) => void;
}

const EmployeesTable: React.FC<EmployeesTableProps> = ({ onEdit, onView, onDelete }) => {
  // Mock Data
  const items: EmployeeItem[] = Array(10)
    .fill(null)
    .map((_, i) => ({
      id: (i + 1).toString(),
      sNo: (i + 1).toString().padStart(2, "0"),
      firstName: "John",
      lastName: "Wick",
      userName: "Johnwick07" + (i + 1),
      email: `johnwick07_${i + 1}@gmail.com`,
      designation: i % 2 === 0 ? "Technician" : "Manager",
      contactNumber: "70007 70007",
      mobileAuth: i % 2 === 0,
    }));

  const columns: TableColumn<EmployeeItem>[] = [
    { key: "sNo", header: "S.No", width: "60px" },
    {
      key: "firstName",
      header: "First Name",
      render: (item) => (
        <Link
          href={`/vendor/management/employees/${item.id}`}
          className="text-blue-600 hover:underline font-medium cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {item.firstName}
        </Link>
      )
    },
    { key: "lastName", header: "Last Name" },
    { key: "userName", header: "User Name" },
    {
      key: "email",
      header: "Email ID",
      render: (item) => (
        <Link
          href={`/vendor/management/employees/${item.id}`}
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {item.email}
        </Link>
      )
    },
    { key: "designation", header: "Designation" },
    { key: "contactNumber", header: "Contact Number" },
    {
      key: "mobileAuth",
      header: "Mobile Auth",
      render: (item) => (
        <div onClick={(e) => e.stopPropagation()}>
          <ToggleSwitch
            size="sm"
            checked={item.mobileAuth}
            onChange={() => { }}
          />
        </div>
      ),
    },
    {
      key: "id",
      header: "actions",
      width: "120px",
      render: (item) => (
        <div
          className="flex items-center justify-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onEdit?.(item)}
            className="cursor-pointer inline-flex items-center justify-center p-1 text-gray-500 hover:text-blue-600 transition-colors bg-blue-50 rounded"
          >
            <PencilSimple size={18} weight="fill" />
          </button>
          <button
            onClick={() => { onDelete?.(item) }}
            className="cursor-pointer inline-flex items-center justify-center p-1 text-gray-500 hover:text-red-600 transition-colors bg-red-50 rounded"
          >
            <Trash size={18} weight="fill" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      data={items}
      columns={columns}
      keyExtractor={(item) => item.id}
      pagination={true}
      pageSize={10}
      totalItems={items.length}
      selectable={false}
      compact={false}
      striped={false}
      hoverable={true}
      className="h-full"
      style={{ height: "100%" }}
    />
  );
};

export default EmployeesTable;
