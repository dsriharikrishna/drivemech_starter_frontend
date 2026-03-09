"use client";

import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Trash2 } from "lucide-react";
import type { LineItem } from "@/schemas/vendor/supplier.schema";

interface LineItemsTableProps {
  name: string;
}

const LineItemsTable: React.FC<LineItemsTableProps> = ({ name }) => {
  const { register, control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const lineItems = watch(name) as LineItem[];

  const handleAddRow = () => {
    append({
      id: `item-${Date.now()}`,
      product: "",
      description: "",
      quantity: 0,
      unitPrice: 0,
      tax: 0,
      total: 0,
    });
  };

  const calculateRowTotal = (index: number) => {
    const item = lineItems[index];
    if (!item) return;

    const quantity = item.quantity || 0;
    const unitPrice = item.unitPrice || 0;
    const tax = item.tax || 0;

    const subtotal = quantity * unitPrice;
    const total = subtotal + (subtotal * tax) / 100;

    setValue(`${name}.${index}.total`, total);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                S.No
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Unit Price ($)
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Tax (10%)
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Total
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                <td className="px-4 py-3">
                  <input
                    {...register(`${name}.${index}.product`)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    {...register(`${name}.${index}.description`)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    {...register(`${name}.${index}.quantity`, {
                      valueAsNumber: true,
                      onChange: () => calculateRowTotal(index),
                    })}
                    type="number"
                    min="0"
                    className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    {...register(`${name}.${index}.unitPrice`, {
                      valueAsNumber: true,
                      onChange: () => calculateRowTotal(index),
                    })}
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    {...register(`${name}.${index}.tax`, {
                      valueAsNumber: true,
                      onChange: () => calculateRowTotal(index),
                    })}
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {lineItems[index]?.total?.toFixed(2) || "0"}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={handleAddRow}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 flex items-center gap-2"
      >
        <span className="text-base">+</span>
        Add
      </button>
    </div>
  );
};

export default LineItemsTable;
