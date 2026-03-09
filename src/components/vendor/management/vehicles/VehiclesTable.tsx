import React from "react";
import Table, { TableColumn } from "@/components/ui/Table";
import { Eye, FileText, Calendar, Trash2 } from "lucide-react";
import { Vehicle } from "@/schemas/vendor/vehicle.schema";
import { EditIcon } from "@/components/icons/ManagementModuleIcons";
import { CalendarIcon } from "@/components/icons/TransactionIcons";

interface VehiclesTableProps {
  vehicles: Vehicle[];
  onView: (vehicle: Vehicle) => void;
  onRowClick?: (vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onViewInvoices?: (vehicle: Vehicle) => void;
  onViewBookings?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
}

const VehiclesTable = ({
  vehicles,
  onView,
  onRowClick,
  onEdit,
  onViewInvoices,
  onViewBookings,
  onDelete,
}: VehiclesTableProps) => {
  const columns: TableColumn<Vehicle>[] = [
    {
      key: "id",
      header: "S.No",
      width: "80px",
      render: (_, index) => (
        <div className="text-gray-900">
          {String(index + 1).padStart(2, "0")}
        </div>
      ),
    },
    {
      key: "regNumber",
      header: "Rego",
      render: (vehicle) => (
        <span
          className="font-medium text-blue-600 cursor-pointer hover:underline"
          onClick={() => onView(vehicle)}
        >
          {vehicle.regNumber}
        </span>
      ),
    },
    {
      key: "vehicleMake",
      header: "Make",
    },
    {
      key: "vehicleModel",
      header: "Model",
    },
    {
      key: "customerName",
      header: "Customer Name",
      render: (vehicle) => (
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => onView(vehicle)}
        >
          {vehicle.customerName}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "left",
      flex: 1,
      render: (vehicle) => (
        <div
          className="flex items-start justify-start gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {onView && (
            <button
              onClick={() => onView(vehicle)}
              className="w-8 h-8 cursor-pointer rounded-full bg-[#00C271]  hover:opacity-90 flex items-center justify-center transition-all shadow-sm"
              title="View"
            >
              <Eye size={16} className="text-white" />
            </button>
          )}
          {onViewInvoices && (
            <button
              onClick={() => onViewInvoices(vehicle)}
              className="w-8 h-8 cursor-pointer rounded-full bg-[#F9B300] hover:opacity-90 flex items-center justify-center transition-all shadow-sm"
              title="View Invoices"
            >
              <FileText size={16} className="text-white" />
            </button>
          )}
          {onViewBookings && (
            <button
              onClick={() => onViewBookings(vehicle)}
              className="w-8 h-8 cursor-pointer rounded-full bg-[#42C3F8] hover:opacity-90 flex items-center justify-center transition-all shadow-sm"
              title="View Bookings"
            >
              <CalendarIcon size={16} className="text-white" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={vehicles}
      keyExtractor={(vehicle) => vehicle.id || vehicle.regNumber}
      pagination
      pageSize={10}
      totalItems={256}
      hoverable
      striped={false}
      onRowClick={onRowClick}
      className="h-full"
      style={{ height: "100%" }}
    />
  );
};

export default VehiclesTable;
