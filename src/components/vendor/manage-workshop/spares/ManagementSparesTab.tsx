"use client";

import React, { useState } from "react";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Upload,
  Wrench,
} from "lucide-react";
import CategorySelector from "@/components/vendor/vendor-onboard/steppers/spare-parts/CategorySelector";
import BrandSelector from "@/components/vendor/vendor-onboard/steppers/spare-parts/BrandSelector";
import InventoryForm from "@/components/vendor/vendor-onboard/steppers/spare-parts/InventoryForm";
import EnhancedInventoryTable from "./EnhancedInventoryTable";
import InventoryUpload from "@/components/vendor/vendor-onboard/steppers/spare-parts/InventoryUpload";
import Button from "@/components/ui/Button";
import {
  Category,
  Brand,
  InventoryItem,
  PartFormData,
} from "@/components/vendor/vendor-onboard/steppers/spare-parts/types";

// Validation Schema
const sparePartsSchema = z.object({
  selectedCategories: z
    .array(z.string())
    .min(1, "Select at least one category"),
  selectedBrands: z.array(z.string()),
  inventory: z.array(
    z.object({
      partName: z.string().min(1, "Part name is required"),
      category: z.string().min(1, "Category is required"),
      brand: z.string(),
      partNumber: z.string().min(1, "Part number is required"),
      price: z.number().min(0, "Price must be positive"),
      stockQuantity: z.number().min(0, "Stock must be non-negative"),
    })
  ),
});

type SparePartsFormData = z.infer<typeof sparePartsSchema>;

import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setSelectedCategories,
  setSelectedBrands,
  setInventory,
} from "@/store/slices/vendor-onboarding/sparePartsSlice";

import {
  AirConditioningIcon,
  AutoGlassIcon,
  BatteryIcon,
  ClutchIcon,
  OilLeakIcon,
  RoadworthyIcon,
  SparkPlugIcon,
  SuspensionIcon,
  TimingBeltIcon,
  TransmissionIcon,
  WheelsIcon,
} from "@/components/icons/ServiceIcons";

const ManagementSparesTab = () => {
  const dispatch = useAppDispatch();
  const {
    selectedCategories: reduxSelectedCategories,
    selectedBrands: reduxSelectedBrands,
    inventory: reduxInventory,
  } = useAppSelector((state) => state.vendorSpareParts);

  const [isLoading, setIsLoading] = useState(false);

  // Move images to categories
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "engine-parts",
      name: "Engine Parts",
      icon: <SparkPlugIcon size={24} />,
      selected: false,
    },
    {
      id: "tires",
      name: "Tires & Wheels",
      icon: <WheelsIcon size={24} />,
      selected: false,
    },
    {
      id: "transmission",
      name: "Transmission",
      icon: <TransmissionIcon size={24} />,
      selected: false,
    },
    {
      id: "cooling",
      name: "Cooling & AC",
      icon: <AirConditioningIcon size={24} />,
      selected: false,
    },
    {
      id: "electrical",
      name: "Electrical System",
      icon: <BatteryIcon size={24} />,
      selected: false,
    },
    {
      id: "suspension",
      name: "Suspension & Steering",
      icon: <SuspensionIcon size={24} />,
      selected: false,
    },
    {
      id: "brakes",
      name: "Brakes & Clutch",
      icon: <ClutchIcon size={24} />,
      selected: false,
    },
    {
      id: "inspection",
      name: "General Inspection",
      icon: <RoadworthyIcon size={24} />,
      selected: false,
    },
    {
      id: "oil-fluid",
      name: "Oil & Fluid Services",
      icon: <OilLeakIcon size={24} />,
      selected: false,
    },
    {
      id: "glass",
      name: "Glass & Accessories",
      icon: <AutoGlassIcon size={24} />,
      selected: false,
    },
  ]);

  // Mock data for brands
  const brands: Brand[] = [
    {
      id: "hyundai",
      name: "Hyundai",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969028.png",
    },
    {
      id: "honda",
      name: "Honda",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969116.png",
    },
    {
      id: "kia",
      name: "Kia",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969168.png",
    },
    {
      id: "ford",
      name: "Ford",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969074.png",
    },
    {
      id: "fiat",
      name: "Fiat",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969071.png",
    },
    {
      id: "toyota",
      name: "Toyota",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969189.png",
    },
    {
      id: "vw",
      name: "Volkswagen",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969317.png",
    },
    {
      id: "nissan",
      name: "Nissan",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969190.png",
    },
    {
      id: "hyundai2",
      name: "Hyundai",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969028.png",
    },
    {
      id: "honda2",
      name: "Honda",
      logo: "https://cdn-icons-png.flaticon.com/512/5969/5969116.png",
    },
  ];

  // Form initialization
  const methods = useForm<SparePartsFormData>({
    resolver: zodResolver(sparePartsSchema),
    mode: "onChange",
    defaultValues: {
      selectedCategories: reduxSelectedCategories || [],
      selectedBrands: reduxSelectedBrands || [],
      inventory: (reduxInventory as unknown as InventoryItem[]) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "inventory",
  });

  const selectedCategories = methods.watch("selectedCategories") || [];
  const selectedBrands = methods.watch("selectedBrands") || [];

  // Sync categories with form state for InventoryForm
  const categoriesWithSelection = categories.map((cat) => ({
    ...cat,
    selected: selectedCategories.includes(cat.id),
  }));

  // Handlers
  const handleToggleCategory = (categoryId: string) => {
    const current = methods.getValues("selectedCategories");
    const updated = current.includes(categoryId)
      ? current.filter((id) => id !== categoryId)
      : [...current, categoryId];

    methods.setValue("selectedCategories", updated, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleToggleBrand = (brandId: string) => {
    const current = methods.getValues("selectedBrands");
    const updated = current.includes(brandId)
      ? current.filter((id) => id !== brandId)
      : [...current, brandId];

    methods.setValue("selectedBrands", updated);
  };

  const handleAddPart = (formData: PartFormData) => {
    const newPart: InventoryItem = {
      partName: formData.partName,
      category: formData.category,
      brand: formData.brand,
      partNumber: formData.partNumber,
      price: parseFloat(formData.price),
      stockQuantity: parseInt(formData.stockQuantity),
    };

    append(newPart);
  };

  const handleDeleteItem = (index: number) => {
    remove(index);
  };

  const handleBulkUpload = (file: File) => {
    // TODO: Implement bulk upload logic
    console.log("Bulk upload file:", file);
  };

  const handleUpdateDetails = async () => {
    setIsLoading(true);
    const formData = methods.getValues();
    console.log("Form data:", formData);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Dispatch to Redux
      dispatch(setSelectedCategories(formData.selectedCategories));
      dispatch(setSelectedBrands(formData.selectedBrands));

      // Map formatted form data to Redux inventory items if needed, or pass directly if typed correctly
      const inventoryItems = formData.inventory.map((item) => ({
        partName: item.partName,
        category: item.category,
        brand: item.brand,
        partNumber: item.partNumber,
        price: item.price,
        stockQuantity: item.stockQuantity,
      }));

      dispatch(setInventory(inventoryItems));

      alert("Spare parts details updated successfully!");
    } catch (error) {
      console.error("Failed to update details:", error);
      alert("Failed to update details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4 p-4 bg-white">
        {/* Spare Part Categories & Brands Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Wrench size={18} className="text-gray-900" />
            <h4 className="text-base font-semibold text-gray-900">
              Spare Part Categories & Brands
            </h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Select the categories and brands you work with
          </p>

          <div className="space-y-6">
            <CategorySelector
              categories={categoriesWithSelection}
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
            />

            {/* Brands Associations */}
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">
                Brands Associations
              </h5>
              <BrandSelector
                brands={brands}
                selectedBrands={selectedBrands}
                onToggleBrand={handleToggleBrand}
              />
            </div>
          </div>
        </div>

        {/* Add Inventory Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Upload size={18} className="text-gray-900" />
            <h4 className="text-base font-semibold text-gray-900">
              Add Inventory
            </h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Upload bulk inventory or add items individually
          </p>

          <div className="space-y-6">
            {/* Bulk Upload */}
            <InventoryUpload onFileUpload={handleBulkUpload} />

            {/* Individual Addition */}
            <InventoryForm
              categories={categoriesWithSelection}
              brands={brands}
              onAddPart={handleAddPart}
            />
          </div>
        </div>

        {/* Added Parts Table */}
        {fields.length > 0 && (
          <EnhancedInventoryTable
            items={fields as InventoryItem[]}
            categories={categories}
            onDeleteItem={handleDeleteItem}
          />
        )}

        {/* Management Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mt-4">
          <div className="flex-shrink-0 mt-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div>
            <h5 className="font-medium text-blue-900 mb-1">Management Tips</h5>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>
                Regularly update your stock quantities to avoid order
                cancellations.
              </li>
              <li>Use the bulk upload feature for large inventory updates.</li>
              <li>
                Ensure prices are inclusive of all taxes and valid for at least
                30 days.
              </li>
            </ul>
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-center">
          <Button
            type="button"
            variant="primary"
            onClick={methods.handleSubmit(handleUpdateDetails)}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Details"}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default ManagementSparesTab;
