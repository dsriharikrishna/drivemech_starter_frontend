import { z } from "zod";

// Product Schema
export const productSchema = z.object({
  itemCode: z.string().min(1, "Item code is required"),
  description: z.string().min(1, "Description is required"),
  description2: z.string().optional(),
  searchableTags: z.string().optional(),
  group: z.string().optional(),
  category: z.string().optional(),
  vendor: z.string().optional(),
  brand: z.string().optional(),
  type: z.string().optional(),
  qtyOnHand: z.number().min(0, "Quantity must be positive").optional(),
  minimum: z.number().min(0, "Minimum must be positive").optional(),
  maximum: z.number().min(0, "Maximum must be positive").optional(),
  location: z.string().optional(),
  gstFee: z.boolean().optional(),
  dontUpdateQty: z.boolean().optional(),
  requiredSerialNumber: z.boolean().optional(),
  priceLookup: z.boolean().optional(),
  retailPrice: z.number().min(0, "Price must be positive").optional(),
  costExclTax: z.number().min(0, "Cost must be positive").optional(),
  costInclTax: z.number().min(0, "Cost must be positive").optional(),
  price2: z.number().min(0, "Price must be positive").optional(),
  price3: z.number().min(0, "Price must be positive").optional(),
  price4: z.number().min(0, "Price must be positive").optional(),
  importedId: z.string().optional(),
  comment: z.string().optional(),
  jobCardComment: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

// Product (for the table display)
export interface Product {
  id: string;
  itemCode: string;
  image?: string;
  name: string;
  brand: string;
  retailPrice: number;
  storePrice: number;
  inStock: number;
  warranty: string;
}
