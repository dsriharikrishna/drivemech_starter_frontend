"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Table, { TableColumn } from "@/components/ui/Table";

interface CustomerInspectionsSectionProps {
  customerId: string;
  onEdit?: (inspection: Inspection) => void;
  onDelete?: (inspection: Inspection) => void;
}

export interface Inspection {
  id: string;
  inspectionNumber: string;
  date: string;
  description: string;
  status: string;
}

// Mock data
const mockInspections: Inspection[] = [
  {
    id: "1",
    inspectionNumber: "1000",
    date: "10/05/25",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    status: "Open",
  },
  {
    id: "2",
    inspectionNumber: "1000",
    date: "10/10/25",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    status: "Draft",
  },
];

const CustomerInspectionsSection: React.FC<CustomerInspectionsSectionProps> = ({
  customerId,
  onEdit,
  onDelete,
}) => {
  const columns: TableColumn<Inspection>[] = [
    {
      key: "inspectionNumber",
      header: "Inspection",
      width: "120px",
    },
    {
      key: "date",
      header: "Date",
      width: "120px",
    },
    {
      key: "description",
      header: "Description",
      render: (inspection) => (
        <span className="text-gray-600">{inspection.description}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      width: "120px",
      render: (inspection) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onEdit?.(inspection)}
            className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
            title="Edit"
          >
            <Edit size={16} className="text-white" />
          </button>
          <button
            onClick={() => onDelete?.(inspection)}
            className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
            title="Delete"
          >
            <Trash2 size={16} className="text-white" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      {mockInspections.length > 0 ? (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
          <Table
            columns={columns}
            data={mockInspections}
            keyExtractor={(inspection) => inspection.id}
            hoverable
            striped={false}
            className="h-full"
            style={{ height: "100%" }}
          />
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No inspections found for this customer
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerInspectionsSection;
