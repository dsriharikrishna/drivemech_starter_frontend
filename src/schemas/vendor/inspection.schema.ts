import { z } from "zod";

// New Inspection Form Schema
export const newInspectionSchema = z.object({
  // Customer Details
  customerType: z.enum(["cash", "company", "individual", "nonBiller"]),
  customerName: z.string().min(1, "Customer name is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  phoneNumber: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address1: z.string().optional(),
  address2: z.string().optional(),
  suburb: z.string().optional(),
  postcode: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  importerId: z.string().optional(),
  businessNumber: z.string().optional(),
  salesTaxFree: z.boolean(),
  customerLimit: z.boolean(),
  vipCustomer: z.boolean(),

  // Vehicle Details
  vehicleRegNumber: z
    .string()
    .min(1, "Vehicle registration number is required"),
  vehicleState: z.string().optional(),
  vehicleMake: z.string().min(1, "Vehicle make is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  vehicleModelCode: z.string().optional(),
  vehicleModelSeries: z.string().optional(),
  engineNumber: z.string().optional(),
  driveType: z.string().optional(),
  model: z.string().optional(),
  rearCode: z.string().optional(),
  transmission: z.string().optional(),
  ac: z.boolean(),
  bodyType: z.string().optional(),
  fuelType: z.string().optional(),
  regoRunDate: z.string().optional(),
  buildDate: z.string().optional(),
  nextServiceDate: z.string().optional(),
  nextServiceKMs: z.string().optional(),
  odometer: z.string().optional(),
  cylinders: z.string().optional(),
  tyreSize: z.string().optional(),
  manufacturer: z.string().optional(),
  warrantyExpiry: z.string().optional(),
  notes: z.string().optional(),

  // Inspection Details
  reasonForInspection: z.string().min(1, "Reason for inspection is required"),
  referredInspectionDateTime: z.string().optional(),
  inspectionNotes: z.string().optional(),
  passedInspections: z.string().optional(),
});

export type NewInspectionFormValues = z.infer<typeof newInspectionSchema>;

// Inspection Template Schema
export const inspectionSectionSchema = z.object({
  status: z.string().optional(),
  description: z.string().optional(),
  productCode: z.string().optional(),
  comment: z.string().optional(),
});

export const inspectionTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  commentLabel1: z.string().optional(),
  commentLabel2: z.string().optional(),
  description: z.string().optional(),
  exterior: z.array(inspectionSectionSchema),
  standard: z.array(inspectionSectionSchema),
  interior: z.array(inspectionSectionSchema),
  tyres: z.array(inspectionSectionSchema),
  underBody: z.array(inspectionSectionSchema),
  underBonnet: z.array(inspectionSectionSchema),
});

export type InspectionTemplateFormValues = z.infer<
  typeof inspectionTemplateSchema
>;

// Inspection Settings Schema
export const inspectionSettingsSchema = z.object({
  defaultProductId: z.string().optional(),
  defaultServiceAdvisor: z.string().optional(),
  defaultContactName: z.string().optional(),
  defaultContactNumber: z.string().optional(),
  defaultContactEmail: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),
  hideEstimateCost: z.boolean(),
  hideEstimateHours: z.boolean(),
  notifyOnApproval: z.boolean(),
  notifyOnRefusal: z.boolean(),
  hideEstimateProductCost: z.boolean(),
  hideEstimateProductPrice: z.boolean(),
});

export type InspectionSettingsFormValues = z.infer<
  typeof inspectionSettingsSchema
>;

// Table Data Types
export interface InspectionTemplate {
  id: string;
  sNo: string;
  name: string;
  description: string;
}
