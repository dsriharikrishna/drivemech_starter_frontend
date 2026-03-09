"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { InventoryItem, Category } from "./types";

interface InventoryTableProps {
  items: InventoryItem[];
  categories: Category[];
  onDeleteItem: (index: number) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  categories,
  onDeleteItem,
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <h5 className="text-sm font-semibold text-gray-700 mb-3">
        Added Parts ({items.length})
      </h5>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                S.No
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Part Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.partName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {categories.find((cat) => cat.id === item.category)?.name ||
                    item.category}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.stockQuantity}
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    type="button"
                    onClick={() => onDeleteItem(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Delete item"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
