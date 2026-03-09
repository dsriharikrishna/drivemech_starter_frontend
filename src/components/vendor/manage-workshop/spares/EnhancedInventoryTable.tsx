"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import Table, { TableColumn } from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import {
  InventoryItem,
  Category,
} from "@/components/vendor/vendor-onboard/steppers/spare-parts/types";

interface EnhancedInventoryTableProps {
  items: InventoryItem[];
  categories: Category[];
  onDeleteItem: (index: number) => void;
}

const EnhancedInventoryTable: React.FC<EnhancedInventoryTableProps> = ({
  items,
  categories,
  onDeleteItem,
}) => {
  // Define table columns
  const columns: TableColumn<InventoryItem & { index: number }>[] = [
    {
      key: "sno",
      header: "S.No",
      width: "80px",
      align: "left",
      render: (item) => (
        <span className="font-medium text-gray-900">
          {String(item.index + 1).padStart(2, "0")}
        </span>
      ),
    },
    {
      key: "partName",
      header: "Part Name",
      flex: 1,
      minWidth: "150px",
      sortable: true,
      render: (item) => (
        <span className="font-medium text-gray-900">{item.partName}</span>
      ),
    },
    {
      key: "category",
      header: "Category",
      flex: 1,
      minWidth: "150px",
      sortable: true,
      render: (item) => {
        const categoryName =
          categories.find((cat) => cat.id === item.category)?.name ||
          item.category;
        return <span className="text-gray-600">{categoryName}</span>;
      },
    },
    {
      key: "price",
      header: "Price",
      width: "120px",
      align: "left",
      sortable: true,
      render: (item) => (
        <span className="font-medium text-gray-900">
          ${item.price.toFixed(2)}
        </span>
      ),
    },
    {
      key: "stockQuantity",
      header: "Stock",
      width: "100px",
      align: "left",
      sortable: true,
      render: (item) => (
        <span className="font-medium text-gray-900">{item.stockQuantity}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "80px",
      align: "center",
      render: (item) => (
        <Button
          variant="icon-delete"
          size="sm"
          onClick={() => onDeleteItem(item.index)}
          title="Delete item"
          startIcon={<Trash2 size={18} />}
        />
      ),
    },
  ];

  // Add index to items for proper tracking
  const itemsWithIndex = items.map((item, index) => ({
    ...item,
    index,
  }));

  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <h5 className="text-sm font-semibold text-gray-900 mb-3">
        Added Parts ({items.length})
      </h5>
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{ height: "calc(100vh - 250px)" }}>
        <Table
          columns={columns}
          data={itemsWithIndex}
          keyExtractor={(item) => `${item.partName}-${item.index}`}
          striped={false}
          hoverable
          bordered={false}
          className="h-full"
          style={{ height: "100%" }}
          emptyMessage="No parts added yet"
        />
      </div>
    </div>
  );
};

export default EnhancedInventoryTable;
