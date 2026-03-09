import { z } from "zod";

// Customer Type Enum
export const customerTypeEnum = z.enum(["cash", "company", "nonBiller"]);

// Customer Schema
export const customerSchema = z.object({
  // Customer Type
  customerType: customerTypeEnum,

  // Contact Information
  customerName: z.string().min(1, "Customer name is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  phoneNumber: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),

  // Address
  address1: z.string().optional(),
  address2: z.string().optional(),
  suburb: z.string().optional(),
  postcode: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),

  // Business Information
  importedId: z.string().optional(),
  businessNumber: z.string().optional(),
  preferredContactMethod: z.string().optional(),
  customerSource: z.string().optional(),

  // Flags
  salesTaxFree: z.boolean(),
  customerLimited: z.boolean(),
  vipCustomer: z.boolean(),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

// Customer Table Interface
export interface Customer {
  id: string;
  sNo: string;
  name: string;
  mobileNumber: string;
  location: string;
  customerType: "cash" | "company" | "nonBiller";
  email?: string;
  vipCustomer?: boolean;
}

// Customer Quote Schema
export const customerQuoteSchema = z.object({
  id: z.string(),
  quoteNumber: z.string(),
  date: z.string(),
  amount: z.number(),
  status: z.enum(["pending", "approved", "rejected", "expired"]),
  validUntil: z.string(),
});

export type CustomerQuote = z.infer<typeof customerQuoteSchema>;

// Customer Booking Schema
export const customerBookingSchema = z.object({
  id: z.string(),
  bookingNumber: z.string(),
  date: z.string(),
  serviceType: z.string(),
  status: z.enum(["scheduled", "inProgress", "completed", "cancelled"]),
  vehicle: z.string(),
});

export type CustomerBooking = z.infer<typeof customerBookingSchema>;

// Customer Inspection Schema
export const customerInspectionSchema = z.object({
  id: z.string(),
  inspectionNumber: z.string(),
  date: z.string(),
  vehicle: z.string(),
  inspector: z.string(),
  status: z.enum(["pending", "completed", "failed"]),
  nextInspectionDate: z.string().optional(),
});

export type CustomerInspection = z.infer<typeof customerInspectionSchema>;

// Customer Payment Schema
export const customerPaymentSchema = z.object({
  id: z.string(),
  paymentNumber: z.string(),
  date: z.string(),
  amount: z.number(),
  method: z.enum(["cash", "card", "bank", "upi"]),
  status: z.enum(["pending", "completed", "failed", "refunded"]),
  invoiceNumber: z.string().optional(),
});

export type CustomerPayment = z.infer<typeof customerPaymentSchema>;
