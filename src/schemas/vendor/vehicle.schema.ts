import { z } from "zod";

export const vehicleSchema = z.object({
  id: z.string().optional(),
  regNumber: z.string().min(1, "Registration Number is required"),
  state: z.string().optional(),
  vehicleMake: z.string().min(1, "Make is required"), // Assuming simple string for now, or ID if select
  vehicleModel: z.string().min(1, "Model is required"),
  vehicleModelCode: z.string().optional(),
  vehicleModelSeries: z.string().optional(),
  vin: z.string().optional(),
  engineNumber: z.string().optional(),
  chassisNumber: z.string().optional(),
  engineCode: z.string().optional(),
  fleetCode: z.string().optional(), // "Fleet Code" in UI? or Paint? Screenshot says "Fleet Code" I think? Or "Paint Code"? Let's check. It says "Fleet Code".
  transmission: z.string().optional(),
  ac: z.boolean().optional(),
  bodyType: z.string().optional(),
  driveType: z.string().optional(),
  fuelType: z.string().optional(),
  regoDueDate: z.date().nullable().optional(),
  buildDate: z.date().nullable().optional(),
  nextServiceDate: z.date().nullable().optional(),
  nextServiceKms: z.number().optional(), // Input might be text, coerce to number
  manufacturingDate: z.date().nullable().optional(),
  cylinders: z.string().optional(), // "Cylinders" input
  tyreSize: z.string().optional(),
  importedId: z.string().optional(),
  notes: z.string().optional(),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;

// Mock Data Type
export type Vehicle = VehicleFormValues & {
  id: string;
  customerName: string; // For the list view
};
