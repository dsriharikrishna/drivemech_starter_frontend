"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import Table, { TableColumn } from "@/components/ui/Table";
import DropDown from "@/components/ui/DropDown";
import CommonTextInput from "@/components/forms/CommonTextInput";

interface PricingRow {
  id: string;
  make: string;
  model: string;
  serviceType: string;
  price: string;
}

interface PricingTableProps {
  pricingRows: PricingRow[];
  selectedBrands: string[];
  selectedServices: string[];
  onAddRow: () => void;
  onRemoveRow: (id: string) => void;
  onUpdateRow: (id: string, field: keyof PricingRow, value: string) => void;
}

const PricingTable: React.FC<PricingTableProps> = ({
  pricingRows,
  selectedBrands,
  selectedServices,
  onAddRow,
  onRemoveRow,
  onUpdateRow,
}) => {
  // Sample data - in real app this would come from selected brands/services
  const makeOptions = [
    { id: "kia", name: "Kia" },
    { id: "hyundai", name: "Hyundai" },
    { id: "honda", name: "Honda" },
    { id: "ford", name: "Ford" },
    { id: "fiat", name: "Fiat" },
  ];

  const modelOptions = [
    { id: "all-models", name: "All Models" },
    { id: "carnival", name: "Carnival" },
    { id: "sportage", name: "Sportage" },
    { id: "seltos", name: "Seltos" },
  ];

  const serviceTypeOptions = [
    { id: "logbook", name: "Logbook" },
    { id: "basic-service", name: "Basic Service" },
    { id: "air-conditioning", name: "Air Conditioning" },
    { id: "brakes", name: "Brakes" },
  ];

  // Define table columns
  const columns: TableColumn<PricingRow>[] = [
    {
      key: "make",
      header: "Make",
      width: "200px",
      render: (row) => (
        <DropDown
          items={makeOptions}
          selectedItem={makeOptions.find((m) => m.id === row.make) || null}
          onSelect={(item) => onUpdateRow(row.id, "make", item.id)}
          placeholder="Select Make"
        />
      ),
    },
    {
      key: "model",
      header: "Model",
      width: "200px",
      render: (row) => (
        <DropDown
          items={modelOptions}
          selectedItem={modelOptions.find((m) => m.id === row.model) || null}
          onSelect={(item) => onUpdateRow(row.id, "model", item.id)}
          placeholder="Select Model"
        />
      ),
    },
    {
      key: "serviceType",
      header: "Service Type",
      width: "200px",
      render: (row) => (
        <DropDown
          items={serviceTypeOptions}
          selectedItem={
            serviceTypeOptions.find((s) => s.id === row.serviceType) || null
          }
          onSelect={(item) => onUpdateRow(row.id, "serviceType", item.id)}
          placeholder="Select Service"
        />
      ),
    },
    {
      key: "price",
      header: "Price",
      width: "150px",
      render: (row) => (
        <CommonTextInput
          name={`pricing-${row.id}`}
          value={row.price}
          onChange={(e) => onUpdateRow(row.id, "price", e.target.value)}
          placeholder="$ 50.00"
          type="text"
        />
      ),
    },
    {
      key: "action",
      header: "Action",
      width: "80px",
      align: "center",
      render: (row) => (
        <button
          type="button"
          onClick={() => onRemoveRow(row.id)}
          className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 overflow-visible">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Define Pricing for{" "}
            {selectedBrands.length > 0
              ? selectedBrands.join(", ")
              : "Selected Brands"}
          </p>
          <p className="text-xs text-gray-500">
            Set pricing for your services and brands
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
        <Table
          columns={columns}
          data={pricingRows}
          keyExtractor={(row) => row.id}
          emptyMessage="No pricing rows added yet. Click 'Add Row' to start."
          striped={false}
          hoverable={true}
          bordered={false}
          allowOverflow={true}
          className="h-full"
          style={{ height: "100%" }}
        />
      </div>

      {/* Add Row Button */}
      <button
        type="button"
        onClick={onAddRow}
        className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors"
      >
        <Plus size={16} />
        Add Row
      </button>
    </div>
  );
};

export default PricingTable;
