"use client";

import React, { useState } from "react";
import { Edit, FileText, Trash2 } from "lucide-react";
import Table, { TableColumn } from "@/components/ui/Table";

interface CustomerVehiclesSectionProps {
  customerId: string;
  onEdit?: (vehicle: CustomerVehicle) => void;
  onDelete?: (vehicle: CustomerVehicle) => void;
}

export interface CustomerVehicle {
  id: string;
  sNo: string;
  rego: string;
  make: string;
  model: string;
  state: string;
}

const mockVehicles: CustomerVehicle[] = [
  { id: "1", sNo: "1", rego: "10 BMK", make: "Freighter", model: "Model", state: "Model Code" },
  { id: "2", sNo: "2", rego: "10 BMK", make: "Freighter", model: "Model", state: "Model Code" },
  { id: "3", sNo: "3", rego: "10 BMK", make: "Freighter", model: "Model", state: "Model Code" },
];

const CustomerVehiclesSection: React.FC<CustomerVehiclesSectionProps> = ({
  customerId,
  onEdit,
  onDelete,
}) => {
  const [vehicles] = useState<CustomerVehicle[]>(mockVehicles);

  const columns: TableColumn<CustomerVehicle>[] = [
    { key: "sNo", header: "S.NO", width: "80px" },
    { key: "rego", header: "Rego" },
    { key: "make", header: "Make" },
    { key: "model", header: "Model" },
    { key: "state", header: "State" },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (vehicle) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onEdit?.(vehicle)}
            className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
            title="Edit"
          >
            <Edit size={16} className="text-white" />
          </button>
          <button
            onClick={() => console.log("Invoice", vehicle)}
            className="w-8 h-8 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors"
            title="Invoice"
          >
            <FileText size={16} className="text-white" />
          </button>
          <button
            onClick={() => onDelete?.(vehicle)}
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
    <div className="p-4">
      {vehicles.length > 0 ? (
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "300px" }}>
          <Table
            columns={columns}
            data={vehicles}
            keyExtractor={(vehicle) => vehicle.id}
            pagination
            pageSize={10}
            hoverable
            striped={false}
            className="h-full"
            style={{ height: "100%" }}
          />
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No vehicles found for this customer</p>
        </div>
      )}
    </div>
  );
};

export default CustomerVehiclesSection;
