import { z } from "zod";

// Service Item Schema for line items in the service table
export const serviceItemSchema = z.object({
  id: z.string().optional(),
  product: z.string().min(1, "Product is required"),
  description: z.string().optional(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Unit price must be positive"),
  tax: z.number().min(0, "Tax must be positive"),
  total: z.number().min(0, "Total must be positive"),
});

export type ServiceItemFormValues = z.infer<typeof serviceItemSchema>;

// Service Assignment Schema
export const serviceAssignmentSchema = z.object({
  assignedEmployee: z.string().min(1, "Employee assignment is required"),
  estimatedDate: z.string().min(1, "Estimated date is required"),
  estimatedTime: z.string().min(1, "Estimated time is required"),
});

export type ServiceAssignmentFormValues = z.infer<
  typeof serviceAssignmentSchema
>;

// Complete Service Request Schema
export const serviceRequestSchema = z.object({
  // Service Items
  serviceItems: z
    .array(serviceItemSchema)
    .min(1, "At least one service item is required"),

  // Assignment Details
  assignedEmployee: z.string().min(1, "Employee assignment is required"),
  estimatedDate: z.string().min(1, "Estimated date is required"),
  estimatedTime: z.string().min(1, "Estimated time is required"),

  // Calculated Totals
  subTotal: z.number().min(0),
  freight: z.number().min(0),
  salesTax: z.number().min(0),
  total: z.number().min(0),
});

export type ServiceRequestFormValues = z.infer<typeof serviceRequestSchema>;

// Service Request Table Interface (for display)
export interface ServiceRequest {
  id: string;
  sNo: string;
  customerName: string;
  orderId: string;
  serviceType: string;
  regNumber: string;
  vehicleMake: string;
  year: string;
  orderSource: string;
  status: string;
  appointmentDate: string;
  appointmentTime: string;
}
