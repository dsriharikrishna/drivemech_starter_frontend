import { z } from "zod";

// Vehicle Search Schema
export const vehicleSearchSchema = z.object({
  regNumber: z.string().min(1, "Vehicle registration number is required"),
});

export type VehicleSearch = z.infer<typeof vehicleSearchSchema>;

// Job Card Item Schema
export const jobCardItemSchema = z.object({
  id: z.string(),
  product: z.string().min(1, "Product is required"),
  description: z.string().optional(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Unit price must be positive"),
  tax: z.number().min(0, "Tax must be positive"),
  total: z.number().min(0, "Total must be positive"),
});

export type JobCardItem = z.infer<typeof jobCardItemSchema>;

// New Registration Schema
export const newRegistrationSchema = z.object({
  // Vehicle Details
  vehicleRegNumber: z
    .string()
    .min(1, "Vehicle registration number is required"),
  state: z.string().min(1, "State is required"),
  vehicleMake: z.string().min(1, "Vehicle make is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  vehicleModelCode: z.string().optional(),
  vehicleModelSeries: z.string().optional(),
  vin: z.string().optional(),
  engineNumber: z.string().optional(),
  chassisNumber: z.string().optional(),
  engineCode: z.string().optional(),
  ac: z.string().optional(),
  bodyType: z.string().optional(),
  driveType: z.string().optional(),
  fuelType: z.string().optional(),
  transmission: z.string().optional(),
  regoDueDate: z.date().optional(),
  buildDate: z.date().optional(),
  nextServiceDate: z.date().optional(),
  nextServiceKms: z.string().optional(),
  manufacturingDate: z.date().optional(),
  cylinders: z.string().optional(),
  tyreSize: z.string().optional(),
  importedId: z.string().optional(),
  fleetCode: z.string().optional(),
  notes: z.string().optional(),

  // Customer Details
  customerName: z.string().min(1, "Customer name is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  emailId: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  street: z.string().optional(),
  customerState: z.string().optional(),
  country: z.string().optional(),

  // Workshop & Service Details
  technician: z.string().min(1, "Technician is required"),
  source: z.string().min(1, "Source is required"),
});

export type NewRegistration = z.infer<typeof newRegistrationSchema>;

// Booking Schema
export const bookingSchema = z.object({
  // Customer Details
  isCash: z.boolean().optional(),
  isCompany: z.boolean().optional(),
  isVip: z.boolean().optional(),
  customerName: z.string().min(1, "Customer name is required").optional(),
  mobileNumber: z.string().optional(),
  emailId: z.string().email().optional().or(z.literal("")),
  street: z.string().optional(),
  suburb: z.string().optional(),
  postcode: z.string().optional(),
  customerState: z.string().optional(),
  country: z.string().optional(),

  // Vehicle Details
  state: z.string().optional(),
  vehicleRegNumber: z.string().optional(),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  manufacturingDate: z.date().optional(),
  transmission: z.string().optional(),
  vin: z.string().optional(),
  fuelType: z.string().optional(),

  // Booking details
  reference: z.string().optional(),
  customerOrderNumber: z.string().min(1, "Customer order number is required"),
  bookingDate: z.date(),
  dueBy: z.date(),
  description: z.string().optional(),

  // Insurance Details
  updateInsurance: z.boolean(),
  insuranceClaims: z.enum(["yes", "no", "decideLater"]).optional(),
  insuranceClaimType: z.string().optional(),
  insuranceProviderName: z.string().optional(),
  policyExcess: z.string().optional(),
  insuranceExpiryDate: z.date().optional(),

  // Job Card
  jobCardItems: z
    .array(jobCardItemSchema)
    .min(1, "At least one job card item is required"),
  freight: z.number().min(0),
  salesTax: z.number().min(0),

  // Notes
  customerNotes: z.string().optional(),
  workshopNotes: z.string().optional(),
});

export type Booking = z.infer<typeof bookingSchema>;
