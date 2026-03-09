"use client";

import React, { useCallback } from "react";
import { Plus } from "lucide-react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import DropDown from "@/components/ui/DropDown";
import Button from "@/components/ui/Button";
import { PartFormData, Category, Brand } from "./types";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonNumberInput from "@/components/forms/CommonNumberInput";

interface InventoryFormProps {
  categories: Category[];
  brands: Brand[];
  onAddPart: (formData: PartFormData) => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  categories,
  brands,
  onAddPart,
}) => {
  const form = useForm<PartFormData>({
    defaultValues: {
      partName: "",
      category: "",
      brand: "",
      partNumber: "",
      price: "",
      stockQuantity: "",
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset } = form;

  const selectedCategoryOptions = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
  }));

  const selectedBrandOptions = brands.map((brand) => ({
    id: brand.id,
    name: brand.name,
  }));

  const onSubmit = useCallback(
    (data: PartFormData) => {
      onAddPart(data);
      reset({
        partName: "",
        category: "",
        brand: "",
        partNumber: "",
        price: "",
        stockQuantity: "",
      });
    },
    [onAddPart, reset]
  );

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <label className="block text-sm font-semibold text-gray-700 mb-4">
        Add Parts Individually
      </label>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Part Name */}
            <CommonTextInput
              label="Part Name"
              name="partName"
              placeholder="e.g., Engine Oil Filter"
              rules={{ required: "Part name is required" }}
              required
            />

            {/* Category */}
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <DropDown
                  label="Category"
                  items={selectedCategoryOptions}
                  selectedItem={
                    selectedCategoryOptions.find((cat) => cat.id === value) ||
                    null
                  }
                  onSelect={(item) => onChange(item.id)}
                  placeholder="Select Category"
                  error={error?.message}
                  required
                />
              )}
            />

            {/* Brand */}
            <Controller
              name="brand"
              control={control}
              rules={{ required: "Brand is required" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <DropDown
                  label="Brand"
                  items={selectedBrandOptions}
                  selectedItem={
                    selectedBrandOptions.find((brand) => brand.id === value) ||
                    null
                  }
                  onSelect={(item) => onChange(item.id)}
                  placeholder="Select Brand"
                  error={error?.message}
                  required
                />
              )}
            />

            {/* Part Number/SKU */}
            <CommonTextInput
              label="Part Number/SKU"
              name="partNumber"
              placeholder="e.g., SKU-12345"
              rules={{ required: "Part number is required" }}
              required
            />

            {/* Price */}
            <CommonNumberInput
              label="Price ($)"
              name="price"
              placeholder="0.00"
              required
              allowFloat
              min={0}
            />

            {/* Stock Quantity */}
            <CommonNumberInput
              label="Stock Quantity"
              name="stockQuantity"
              placeholder="0"
              required
              allowFloat
              min={0}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Add Part
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default InventoryForm;
