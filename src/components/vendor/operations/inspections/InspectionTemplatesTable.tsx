"use client";

import React, { useState } from "react";
import Table, { TableColumn } from "@/components/ui/Table";
import { Edit2 } from "lucide-react";
import type { InspectionTemplate } from "@/schemas/vendor/inspection.schema";

interface InspectionTemplatesTableProps {
  onEdit?: (id: string) => void;
}

const InspectionTemplatesTable: React.FC<InspectionTemplatesTableProps> = ({
  onEdit,
}) => {
  const [templates, setTemplates] = useState<InspectionTemplate[]>([
    {
      id: "1",
      sNo: "01",
      name: "SERVICE",
      description: "Service Check sheet",
    },
    {
      id: "2",
      sNo: "02",
      name: "VISUAL CHECK",
      description: "Complimentary Reliability & Safety Visual Checks",
    },
  ]);

  const columns: TableColumn<InspectionTemplate>[] = [
    {
      key: "sNo",
      header: "S.No",
      width: "100px",
    },
    {
      key: "name",
      header: "Name",
      width: "200px",
    },
    {
      key: "description",
      header: "Description",
    },
    {
      key: "actions",
      header: "",
      width: "80px",
      render: (template) => (
        <div className="flex items-center justify-end">
          <button
            onClick={() => onEdit?.(template.id)}
            className="p-2 text-white bg-green-500 hover:bg-green-600 rounded-full transition-colors"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
      <Table
        columns={columns}
        data={templates}
        keyExtractor={(item) => item.id}
        pagination
        pageSize={10}
        striped={false}
        hoverable
        className="h-full"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default InspectionTemplatesTable;
