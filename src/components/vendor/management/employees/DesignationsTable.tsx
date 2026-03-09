"use client";

import React from "react";
import Table, { TableColumn } from "@/components/ui/Table";

import { PencilSimple, Trash } from "phosphor-react";
import Link from "next/link";

interface DesignationItem {
  id: string;
  sNo: string;
  designationInfo: string;
  description: string;
}

interface DesignationsTableProps {
  onEdit?: (item: DesignationItem) => void;
  onView?: (item: DesignationItem) => void;
  onDelete?: (item: DesignationItem) => void;
}

const DesignationsTable: React.FC<DesignationsTableProps> = ({
  onEdit,
  onView,
  onDelete,
}) => {
  // Mock Data
  const items: DesignationItem[] = [
    {
      id: "1",
      sNo: "01",
      designationInfo: "Technician",
      description: "Loream ipsum",
    },
    {
      id: "2",
      sNo: "02",
      designationInfo: "Supervisor",
      description: "Loream ipsum",
    },
    {
      id: "3",
      sNo: "03",
      designationInfo: "Store Keeper",
      description: "Loream ipsum",
    },
    {
      id: "4",
      sNo: "04",
      designationInfo: "Manager",
      description: "Loream ipsum",
    },
    {
      id: "5",
      sNo: "05",
      designationInfo: "Accountant",
      description: "Loream ipsum",
    },
    {
      id: "6",
      sNo: "06",
      designationInfo: "Data Entry Operator",
      description: "Loream ipsum",
    },
  ];

  const columns: TableColumn<DesignationItem>[] = [
    {
      key: "sNo",
      header: "S.No",
      width: "80px",
    },
    {
      key: "designationInfo",
      header: "Designation Info",
      width: "200px",
      render: (item) => (
        <Link
          href={`/vendor/management/employees/${item.id}`}
          className="text-blue-600 hover:underline font-medium cursor-pointer text-left bg-transparent border-none p-0"
        >
          {item.designationInfo}
        </Link>
      )
    },
    {
      key: "description",
      header: "Description",
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

export default DesignationsTable;
