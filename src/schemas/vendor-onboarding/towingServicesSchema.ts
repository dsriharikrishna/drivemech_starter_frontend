import { z } from "zod";

// Driver Schema
export const driverSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Driver name is required"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  email: z.string().email("Valid email is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  experience: z.string().min(1, "Experience is required"),
  emergencyContact: z.string().min(10, "Emergency contact is required"),
  photo: z.any().optional(),
  photoPreview: z.string().nullable().optional(),
  license: z.any().optional(),
  licensePreview: z.string().nullable().optional(),
  available24x7: z.boolean(),
});

// Step 1: Service Details & Drivers
export const towingServicesStep1Schema = z.object({
  towingServices: z.object({
    serviceLocations: z.string().min(1, "Service area is required"),
    vehicleTypes: z
      .array(z.string())
      .min(1, "Select at least one vehicle type"),
    is24x7: z.boolean(),
    description: z.string().optional(),
    baseCharge: z.string().min(1, "Base charge is required"),
    perKmCharge: z.string().min(1, "Per KM charge is required"),
    minDistance: z.string().optional(),
    waitingCharge: z.string().optional(),
  }),
  drivers: z.array(driverSchema).min(1, "At least one driver is required"),
});

// Step 2: Documents (Optional validation or specific requirements)
export const towingServicesStep2Schema = z.object({
  // Add document validation if needed, currently validated by existence in Redux or assumed optional
});

export type Driver = z.infer<typeof driverSchema>;
export type TowingServicesStep1 = z.infer<typeof towingServicesStep1Schema>;
