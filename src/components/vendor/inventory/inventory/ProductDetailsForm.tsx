"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductFormValues,
  productSchema,
} from "@/schemas/vendor/product.schema";
import ModalDropdown from "@/components/ui/DropDown";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";

interface ProductDetailsFormProps {
  onCancel?: () => void;
  onSave?: (data: ProductFormValues) => void;
  defaultValues?: Partial<ProductFormValues>;
}

const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  onCancel,
  onSave,
  defaultValues,
}) => {
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      itemCode: "",
      description: "",
      description2: "",
      searchableTags: "",
      group: "",
      category: "",
      vendor: "",
      brand: "",
      type: "",
      location: "",
      qtyOnHand: 0,
      minimum: 0,
      maximum: 0,
      gstFee: false,
      dontUpdateQty: false,
      requiredSerialNumber: false,
      priceLookup: false,
      importedId: "",
      comment: "",
      jobCardComment: "",
    },
  });

  const { handleSubmit, setValue, watch } = methods;

  // Dropdown options
  const categoryOptions = [
    { id: "brake-parts", name: "Brake Parts" },
    { id: "engine-parts", name: "Engine Parts" },
    { id: "suspension", name: "Suspension" },
    { id: "electrical", name: "Electrical" },
  ];

  const vendorOptions = [
    { id: "vendor-1", name: "Vendor 1" },
    { id: "vendor-2", name: "Vendor 2" },
  ];

  const brandOptions = [
    { id: "abc", name: "ABC" },
    { id: "xyz", name: "XYZ" },
  ];

  const typeOptions = [
    { id: "type-1", name: "Type 1" },
    { id: "type-2", name: "Type 2" },
  ];

  const locationOptions = [
    { id: "warehouse-a", name: "Warehouse A" },
    { id: "warehouse-b", name: "Warehouse B" },
  ];

  const onSubmit = (data: ProductFormValues) => {
    onSave?.(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Row 1: Item Code, Description, Description 2, Searchable Tags */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CommonTextInput
            name="itemCode"
            label="Item Code"
            placeholder="Enter Item Code"
            required
          />
          <CommonTextInput name="description" label="Description" required />
          <CommonTextInput name="description2" label="Description 2" />
          <CommonTextInput name="searchableTags" label="Searchable Tags" />
        </div>

        {/* Row 2: Group, Category, Vendor, Brand */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CommonTextInput name="group" label="Group" />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <ModalDropdown
              items={categoryOptions}
              selectedItem={
                categoryOptions.find((opt) => opt.id === watch("category")) ||
                null
              }
              onSelect={(item) => setValue("category", item.id)}
              placeholder="Select"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vendor
            </label>
            <ModalDropdown
              items={vendorOptions}
              selectedItem={
                vendorOptions.find((opt) => opt.id === watch("vendor")) || null
              }
              onSelect={(item) => setValue("vendor", item.id)}
              placeholder="Select"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Brand
            </label>
            <ModalDropdown
              items={brandOptions}
              selectedItem={
                brandOptions.find((opt) => opt.id === watch("brand")) || null
              }
              onSelect={(item) => setValue("brand", item.id)}
              placeholder="Select"
            />
          </div>
        </div>

        {/* Row 3: Type, Qty on Hand, Minimum, Maximum */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type
            </label>
            <ModalDropdown
              items={typeOptions}
              selectedItem={
                typeOptions.find((opt) => opt.id === watch("type")) || null
              }
              onSelect={(item) => setValue("type", item.id)}
              placeholder="Select"
            />
          </div>
          <CommonTextInput
            name="qtyOnHand"
            label="Qty on Hand"
            type="number"
            min={0}
          />
          <CommonTextInput
            name="minimum"
            label="Minimum"
            type="number"
            min={0}
          />
          <CommonTextInput
            name="maximum"
            label="Maximum"
            type="number"
            min={0}
          />
        </div>

        {/* Row 4: Location, GST Fee, Don't Update Qty, Required Serial Number */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <ModalDropdown
              items={locationOptions}
              selectedItem={
                locationOptions.find((opt) => opt.id === watch("location")) ||
                null
              }
              onSelect={(item) => setValue("location", item.id)}
              placeholder="Select"
            />
          </div>
          <div className="flex items-center pt-6">
            <ControlledToggleSwitch name="gstFee" label="GST Fee" size="md" />
          </div>
          <div className="flex items-center pt-6">
            <ControlledToggleSwitch
              name="dontUpdateQty"
              label="Don't Upd Qty"
              size="md"
            />
          </div>
          <div className="flex items-center pt-6">
            <ControlledToggleSwitch
              name="requiredSerialNumber"
              label="Required Serial Number"
              size="md"
            />
          </div>
        </div>

        {/* Row 5: Price Look up, Retail Price, Cost (Excl Tax), Cost (Incl Tax) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <ControlledToggleSwitch
              name="priceLookup"
              label="Price Look up"
              size="md"
            />
          </div>
          <CommonTextInput
            name="retailPrice"
            label="Retail Price"
            type="number"
            step="0.01"
            min={0}
          />
          <CommonTextInput
            name="costExclTax"
            label="Cost (Excl Tax)"
            type="number"
            step="0.01"
            min={0}
          />
          <CommonTextInput
            name="costInclTax"
            label="Cost (Incl Tax)"
            type="number"
            step="0.01"
            min={0}
          />
        </div>

        {/* Row 6: Price 2, Price 3, Price 4, Imported ID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CommonTextInput
            name="price2"
            label="Price 2"
            type="number"
            step="0.01"
            min={0}
          />
          <CommonTextInput
            name="price3"
            label="Price 3"
            type="number"
            step="0.01"
            min={0}
          />
          <CommonTextInput
            name="price4"
            label="Price 4"
            type="number"
            step="0.01"
            min={0}
          />
          <CommonTextInput name="importedId" label="Imported ID" />
        </div>

        {/* Row 7: Comment, Job Card Comment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Comment
            </label>
            <textarea
              {...methods.register("comment")}
              id="comment"
              rows={3}
              className="border border-gray-300 text-sm rounded-xl block w-full px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="jobCardComment"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Job card Comment
            </label>
            <textarea
              {...methods.register("jobCardComment")}
              id="jobCardComment"
              rows={3}
              className="border border-gray-300 text-sm rounded-xl block w-full px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductDetailsForm;
