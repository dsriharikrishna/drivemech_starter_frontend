import { z } from "zod";

// Pricing Row Schema
export const pricingRowSchema = z.object({
  id: z.string(),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  serviceType: z.string().min(1, "Service type is required"),
  price: z.string().min(1, "Price is required"),
});

// Workshop Basic Info Schema
export const workshopBasicInfoSchema = z.object({
  vehicleTypes: z.array(z.string()).min(1, "Select at least one vehicle type"),
  workingDays: z.array(z.string()).min(1, "Select at least one working day"),
});

// Workshop Services and Brands Schema
export const workshopServicesSchema = z.object({
  selectedServices: z.array(z.string()).min(1, "Select at least one service"),
  selectedSubServices: z.array(z.string()).optional(),
  selectedBrands: z.array(z.string()).min(1, "Select at least one brand"),
  pricingRows: z.array(pricingRowSchema).optional(),
});

// Workshop Documents Schema
export const workshopDocumentsSchema = z.object({
  businessLicense: z.any().optional(),
  certifications: z.array(z.any()).optional(),
});

// Complete Workshop Setup Schema
export const workshopSetupSchema = z.object({
  basicInfo: workshopBasicInfoSchema,
  servicesAndBrands: workshopServicesSchema,
  documents: workshopDocumentsSchema.optional(),
});

// Type inference
export type PricingRow = z.infer<typeof pricingRowSchema>;
export type WorkshopBasicInfo = z.infer<typeof workshopBasicInfoSchema>;
export type WorkshopServices = z.infer<typeof workshopServicesSchema>;
export type WorkshopDocuments = z.infer<typeof workshopDocumentsSchema>;
export type WorkshopSetup = z.infer<typeof workshopSetupSchema>;
