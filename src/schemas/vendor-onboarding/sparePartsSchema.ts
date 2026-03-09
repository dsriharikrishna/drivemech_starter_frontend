import { z } from "zod";

// Inventory Item Schema
export const inventoryItemSchema = z.object({
  partName: z.string().min(1, "Part name is required"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  partNumber: z.string().min(1, "Part number is required"),
  price: z.number().min(0, "Price must be positive"),
  stockQuantity: z.number().int().min(0, "Stock must be non-negative"),
});

// Spare Parts Schema
export const sparePartsSchema = z.object({
  enabled: z.boolean(),
  selectedCategories: z.array(z.string()).optional(),
  selectedBrands: z.array(z.string()).optional(),
  inventory: z.array(inventoryItemSchema).optional(),
});

// Type inference
export type InventoryItem = z.infer<typeof inventoryItemSchema>;
export type SpareParts = z.infer<typeof sparePartsSchema>;

// Step 1 Validation Schema: Categories & Brands
export const sparePartsStep1Schema = z.object({
  selectedCategories: z
    .array(z.string())
    .min(1, "Please select at least one category."),
  selectedBrands: z
    .array(z.string())
    .min(1, "Please select at least one brand."),
});

// Step 2 Validation Schema: Inventory
export const sparePartsStep2Schema = z.object({
  inventory: z
    .array(inventoryItemSchema)
    .min(1, "Please add at least one item to your inventory."),
});
