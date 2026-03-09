"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Package,
  Wrench,
  Lightbulb,
  Settings,
  Filter,
  TestTube,
  Box,
  Zap,
  ShoppingBag,
} from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import HorizontalStepper from "@/components/ui/HorizontalStepper";
import CategorySelector from "./spare-parts/CategorySelector";
import BrandSelector from "./spare-parts/BrandSelector";
import InventoryUpload from "./spare-parts/InventoryUpload";
import InventoryForm from "./spare-parts/InventoryForm";
import InventoryTable from "./spare-parts/InventoryTable";
import {
  Category,
  Brand,
  InventoryItem,
  PartFormData,
} from "./spare-parts/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setSelectedCategories,
  setSelectedBrands,
  setInventory,
} from "@/store/slices/vendor-onboarding/sparePartsSlice";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  sparePartsSchema,
  sparePartsStep1Schema,
  sparePartsStep2Schema,
} from "@/schemas/vendor-onboarding/sparePartsSchema";

// ... imports remain the same

// Define form values type locally or import if available
interface SparePartsFormValues {
  selectedCategories: string[];
  selectedBrands: string[];
  inventory: InventoryItem[];
}

const SparePartsStepper = () => {
  const dispatch = useAppDispatch();

  const currentStep = useAppSelector(
    (state) => state.vendorSpareParts.currentSubStep
  );
  const reduxSelectedCategories = useAppSelector(
    (state) => state.vendorSpareParts.selectedCategories
  );
  const reduxSelectedBrands = useAppSelector(
    (state) => state.vendorSpareParts.selectedBrands
  );
  const reduxInventory = useAppSelector(
    (state) => state.vendorSpareParts.inventory
  );
  const showStepErrors = useAppSelector(
    (state) => state.vendorOnboarding.showStepErrors
  );

  // Initialize form with Redux state as default values
  const defaults: SparePartsFormValues = {
    selectedCategories: reduxSelectedCategories,
    selectedBrands: reduxSelectedBrands,
    inventory: reduxInventory,
  };

  // Select schema based on current step
  const schema =
    currentStep === 1 ? sparePartsStep1Schema : sparePartsStep2Schema;

  const form = useForm<SparePartsFormValues>({
    defaultValues: defaults,
    mode: "onChange",
    resolver: zodResolver(schema as any),
  });

  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  const selectedCategories = watch("selectedCategories");
  const selectedBrands = watch("selectedBrands");
  const inventoryItems = watch("inventory");

  // Sync Form -> Redux
  useEffect(() => {
    dispatch(setSelectedCategories(selectedCategories || []));
  }, [selectedCategories, dispatch]);

  useEffect(() => {
    dispatch(setSelectedBrands(selectedBrands || []));
  }, [selectedBrands, dispatch]);

  useEffect(() => {
    console.log("Checking Inventory Change:", inventoryItems);
    dispatch(setInventory(inventoryItems || []));
  }, [inventoryItems, dispatch]);

  // Trigger validation when showStepErrors changes (e.g., user clicked Next)
  useEffect(() => {
    if (showStepErrors) {
      trigger();
    }
  }, [showStepErrors, currentStep, trigger]);

  const [categories] = useState<Category[]>([
    {
      id: "engine",
      name: "Engine Parts",
      icon: <Settings size={18} />,
      selected: false, // This property is now ignored by selector in favor of ID list
    },
    {
      id: "suspension",
      name: "Suspension and Steering Parts",
      icon: <Wrench size={18} />,
      selected: false,
    },
    {
      id: "brake",
      name: "Brake System",
      icon: <Box size={18} />,
      selected: false,
    },
    {
      id: "lights",
      name: "Lights And Accessories",
      icon: <Lightbulb size={18} />,
      selected: false,
    },
    {
      id: "transmission",
      name: "Transmission System",
      icon: <Settings size={18} />,
      selected: false,
    },
    {
      id: "exhaust",
      name: "Exhaust System",
      icon: <Zap size={18} />,
      selected: false,
    },
    {
      id: "wheel",
      name: "Wheel Bearings and Hubs",
      icon: <Settings size={18} />,
      selected: false,
    },
    {
      id: "cooling",
      name: "Cooling System",
      icon: <Settings size={18} />,
      selected: false,
    },
    {
      id: "clutch",
      name: "Clutch System",
      icon: <Settings size={18} />,
      selected: false,
    },
    {
      id: "filters",
      name: "Filters",
      icon: <Filter size={18} />,
      selected: false,
    },
    {
      id: "electrical",
      name: "Electrical and Electronic Components",
      icon: <Zap size={18} />,
      selected: false,
    },
    {
      id: "engine-mounts",
      name: "Engine Mounts And Mechanical Components",
      icon: <Settings size={18} />,
      selected: false,
    },
    {
      id: "chemical",
      name: "Chemical and Fluids Category",
      icon: <TestTube size={18} />,
      selected: false,
    },
    {
      id: "oem",
      name: "Original Manufacturer (OE) Parts",
      icon: <ShoppingBag size={18} />,
      selected: false,
    },
  ]);

  const [brands] = useState<Brand[]>([
    { id: "hyundai", name: "Hyundai", logo: "🚗" },
    { id: "honda", name: "Honda", logo: "🚗" },
    { id: "kia", name: "Kia", logo: "🚗" },
    { id: "ford", name: "Ford", logo: "🚗" },
    { id: "fiat", name: "Fiat", logo: "🚗" },
  ]);

  const toggleCategory = useCallback(
    (categoryId: string) => {
      const current = selectedCategories || [];
      const index = current.indexOf(categoryId);
      let newCategories;

      if (index > -1) {
        newCategories = [...current];
        newCategories.splice(index, 1);
      } else {
        newCategories = [...current, categoryId];
      }
      setValue("selectedCategories", newCategories);
    },
    [selectedCategories, setValue]
  );

  const toggleBrand = useCallback(
    (brandId: string) => {
      const current = selectedBrands || [];
      const index = current.indexOf(brandId);
      let newBrands;

      if (index > -1) {
        newBrands = [...current];
        newBrands.splice(index, 1);
      } else {
        newBrands = [...current, brandId];
      }
      setValue("selectedBrands", newBrands);
    },
    [selectedBrands, setValue]
  );

  const handleFileUpload = useCallback((file: File) => {
    // TODO: Parse CSV/Excel file and populate inventory items
    console.log("File uploaded:", file.name);
  }, []);

  const handleAddPart = useCallback(
    (formData: PartFormData) => {
      const newItem: InventoryItem = {
        partName: formData.partName,
        category: formData.category,
        brand: formData.brand,
        partNumber: formData.partNumber,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
      };

      console.log("Adding Part to Form State:", newItem);
      const updatedInventory = [...(inventoryItems || []), newItem];
      console.log("New Inventory State:", updatedInventory);
      setValue("inventory", updatedInventory);
      dispatch(setInventory(updatedInventory)); // Direct dispatch for immediate sync
    },
    [inventoryItems, setValue]
  );

  const handleDeleteItem = useCallback(
    (index: number) => {
      const current = [...(inventoryItems || [])];
      current.splice(index, 1);
      setValue("inventory", current);
      dispatch(setInventory(current));
    },
    [inventoryItems, setValue]
  );

  return (
    <FormProvider {...form}>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Package size={24} className="text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Spare Parts</h3>
        </div>

        {/* Horizontal Stepper */}
        <div className="mb-8">
          <HorizontalStepper
            steps={[
              { label: "Categories", isCompleted: currentStep > 1 },
              { label: "Inventory", isCompleted: currentStep > 2 },
            ]}
            currentStep={currentStep}
            variant="default"
          />
        </div>

        {/* Step 1: Categories & Brands Selection */}
        {currentStep === 1 && (
          <div className="space-y-8">
            {/* Section Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package size={20} className="text-gray-700" />
                <h4 className="text-lg font-bold text-gray-900">
                  Spare Part Categories & Brands
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                Select the categories and brands you deal with
              </p>
              {errors.selectedCategories && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.selectedCategories.message}
                </p>
              )}
              {errors.selectedBrands && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.selectedBrands.message}
                </p>
              )}
            </div>

            {/* Categories */}
            <CategorySelector
              categories={categories}
              onToggleCategory={toggleCategory}
              selectedCategories={selectedCategories || []}
            />

            {/* Brands Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag size={20} className="text-gray-700" />
                <h4 className="text-lg font-bold text-gray-900">
                  Brands Associations
                </h4>
              </div>
              <BrandSelector
                brands={brands}
                selectedBrands={selectedBrands || []}
                onToggleBrand={toggleBrand}
              />
            </div>
          </div>
        )}

        {/* Step 2: Add Inventory */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Section Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package size={20} className="text-gray-700" />
                <h4 className="text-lg font-bold text-gray-900">
                  Add Inventory
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                Upload bulk inventory or add items individually
              </p>
              {errors.inventory && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.inventory.message}
                </p>
              )}
            </div>

            {/* File Upload */}
            <InventoryUpload onFileUpload={handleFileUpload} />

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Manual Entry Form */}
            <InventoryForm
              categories={categories}
              brands={brands}
              onAddPart={handleAddPart}
            />

            {/* Added Parts Table */}
            <InventoryTable
              items={inventoryItems || []}
              categories={categories}
              onDeleteItem={handleDeleteItem}
            />
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default SparePartsStepper;
