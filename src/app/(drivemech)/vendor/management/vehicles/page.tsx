"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, FileSpreadsheet, FileText } from "lucide-react";
import { ImportIcon } from "@/components/icons/ManagementModuleIcons";
import { DownloadIcon } from "@/components/icons/TransactionIcons";
import { AddCircleIcon } from "@/components/icons/ManagementModuleIcons";
import ActionDropdown from "@/components/ui/ActionDropdown";
import Button from "@/components/ui/Button";
import VehiclesTable from "@/components/vendor/management/vehicles/VehiclesTable";
import { Vehicle } from "@/schemas/vendor/vehicle.schema";
import VendorFilterSection from "@/components/vendor/VendorFilterSection";

/* ---------------- MOCK DATA ---------------- */

const mockVehicles: Vehicle[] = Array.from({ length: 10 }, (_, i) => ({
  id: `veh-${i + 1}`,
  regNumber: "TS09FJ0007",
  vehicleMake: "BMW",
  vehicleModel: "X7",
  customerName: "John Doe",
  vehicleModelCode: "G07",
  vehicleModelSeries: "2023",
  vin: "WBA1234567890",
  engineNumber: "B58B30M1",
  chassisNumber: "CH123456",
  engineCode: "B58",
  fleetCode: "FL-001",
  transmission: "opt1",
  ac: true,
  bodyType: "opt1",
  driveType: "opt1",
  fuelType: "opt1",
  regoDueDate: new Date("2025-05-20"),
  buildDate: new Date("2023-01-15"),
  nextServiceDate: new Date("2025-11-20"),
  nextServiceKms: 15000,
  manufacturingDate: new Date("2022-12-10"),
  cylinders: "6",
  tyreSize: "275/40R22",
  importedId: "IMP-123",
  notes: "Premium customer vehicle.",
}));

/* ---------------- PAGE ---------------- */

const VehiclesPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewVehicle = (vehicle: Vehicle) => {
    router.push(`/vendor/management/vehicles/${vehicle.id}`);
  };

  const handleViewInvoices = (vehicle: Vehicle) => {
    console.log("Navigating to Invoices for vehicle:", vehicle.regNumber);
    // router.push(`/vendor/management/vehicles/${vehicle.id}/invoices`);
  };

  const handleViewBookings = (vehicle: Vehicle) => {
    console.log("Navigating to Bookings for vehicle:", vehicle.regNumber);
    // router.push(`/vendor/management/vehicles/${vehicle.id}/bookings`);
  };

  return (
    <div className="w-full">
      <div className="p-2 flex flex-col gap-4">
        {/* Header */}
        <VendorFilterSection
          title="Vehicles"
          searchPlaceholder="Search vehicles..."
          onSearch={(v) => console.log("search:", v)}
          statusItems={[
            { id: "all", label: "All Types" },
            { id: "cash", label: "Cash" },
            { id: "credit", label: "Credit" },
            { id: "vip", label: "VIP" },
          ]}
          statusLabel="Type"
          timeItems={[
            { id: "all", label: "All time" },
            { id: "today", label: "Today" },
            { id: "week", label: "This Week" },
            { id: "month", label: "This Month" },
            { id: "year", label: "This Year" },
          ]}
          onExport={() => console.log("Export vehicles")}
        />

        {/* Table — max-height keeps it within viewport; overflow-y-auto scrolls inside */}
        <div
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-auto"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          <VehiclesTable
            vehicles={mockVehicles}
            onView={handleViewVehicle}
            onRowClick={handleViewVehicle}
            onViewInvoices={handleViewInvoices}
            onViewBookings={handleViewBookings}
          />
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;
        