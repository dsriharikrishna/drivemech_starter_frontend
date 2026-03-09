"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import {
  serviceItemSchema,
  type ServiceItemFormValues,
} from "@/schemas/vendor/transaction.schema";
import DropDown from "@/components/ui/DropDown";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { Plus } from "lucide-react";

interface AddServiceItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ServiceItemFormValues) => void;
  initialData?: ServiceItemFormValues | null;
  mode?: "add" | "edit";
}

export default function AddServiceItemDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode = "add",
}: AddServiceItemDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ServiceItemFormValues>({
    resolver: zodResolver(serviceItemSchema),
    defaultValues: initialData || {
      product: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      total: 0,
    },
  });

  // Pre-fill form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        product: "",
        description: "",
        quantity: 1,
        unitPrice: 0,
        tax: 0,
        total: 0,
      });
    }
  }, [initialData, reset, isOpen]);

  // Auto-calculate tax and total
  const quantity = watch("quantity");
  const unitPrice = watch("unitPrice");

  useEffect(() => {
    const subtotal = quantity * unitPrice;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    setValue("tax", tax);
    setValue("total", total);
  }, [quantity, unitPrice, setValue]);

  const onSubmit = (data: ServiceItemFormValues) => {
    onSave(data);
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  // Type options for dropdown
  const typeOptions = [
    { id: "service", name: "Service" },
    { id: "part", name: "Part" },
    { id: "labor", name: "Labor" },
  ];

  return (
    <Dialog isOpen={isOpen} onClose={handleCancel}>
      <DialogBody className="max-w-5xl p-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <DialogHeader
              title={mode === "edit" ? "Edit Product" : "Add Product"}
              onClose={handleCancel}
            />

            <div className="mt-6 space-y-6">
              {/* Row 1: Item Code, Description, Description 2, Searchable Tags */}
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Code
                  </label>
                  <input
                    {...register("product")}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Abc"
                  />
                  {errors.product && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.product.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    {...register("description")}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description 2
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Searchable Tags
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Row 2: Group, Category, Vendor, Brand */}
              <div className="grid grid-cols-4 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-10 p-1 bg-gray-800 hover:bg-gray-900 rounded-full transition-colors"
                  >
                    <Plus size={14} className="text-white" />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendor
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Row 3: Type, Qty on Hand, Minimum, Maximum */}
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <DropDown
                    items={typeOptions}
                    selectedItem={null}
                    onSelect={() => { }}
                    placeholder="Select"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qty on Hand
                  </label>
                  <input
                    {...register("quantity", { valueAsNumber: true })}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Row 4: Location, GST Fee, Don't Upd Qty, Required Serial Number */}
              <div className="grid grid-cols-4 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-10 p-1 bg-gray-800 hover:bg-gray-900 rounded-full transition-colors"
                  >
                    <Plus size={14} className="text-white" />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GST Fee
                  </label>
                  <ToggleSwitch checked={false} onChange={() => { }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Don't Upd Qty
                  </label>
                  <ToggleSwitch checked={false} onChange={() => { }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Serial Number
                  </label>
                  <ToggleSwitch checked={false} onChange={() => { }} />
                </div>
              </div>

              {/* Row 5: Price Look up, Retail Price, Cost (Excl Tax), Cost (Incl Tax) */}
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Look up
                  </label>
                  <ToggleSwitch checked={false} onChange={() => { }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Retail Price
                  </label>
                  <input
                    {...register("unitPrice", { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.unitPrice && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.unitPrice.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost (Excl Tax)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost (Incl Tax)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={watch("total").toFixed(2)}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 6: Price 2, Price 3, Price 4, Imported ID */}
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price 2
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price 3
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price 4
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imported ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Row 7: Comment, Job card Comment */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comment
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job card Comment
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <DialogFooter
              leftTitle="Cancel"
              rightTitle="Save"
              onCancel={handleCancel}
              onConfirm={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
