import { z } from "zod";

// Line Item Schema (shared between Part Orders and Invoices)
export const lineItemSchema = z.object({
  id: z.string(),
  product: z.string().optional(),
  description: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be positive"),
  unitPrice: z.number().min(0, "Unit price must be positive"),
  tax: z.number().min(0, "Tax must be positive"),
  total: z.number().min(0, "Total must be positive"),
});

export type LineItem = z.infer<typeof lineItemSchema>;

// Supplier Details Schema
export const supplierDetailsSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  biller: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  countryCode: z.string().optional(),
  phone: z.string().optional(),
  cell: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  accountNumber: z.string().optional(),
  importedId: z.string().optional(),
  note: z.string().optional(),
  // Contact Person 1
  contactPerson1Name: z.string().optional(),
  contactPerson1Phone: z.string().optional(),
  contactPerson1Email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),
  // Contact Person 2
  contactPerson2Name: z.string().optional(),
  contactPerson2Phone: z.string().optional(),
  contactPerson2Email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),
});

export type SupplierDetailsFormValues = z.infer<typeof supplierDetailsSchema>;

// Supplier Part Order Schema (Form)
export const supplierPartOrderFormSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required"),
  orderDate: z.string().min(1, "Order date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  lineItems: z
    .array(lineItemSchema)
    .min(1, "At least one line item is required"),
  note: z.string().optional(),
  subTotal: z.number(),
  freight: z.number(),
  salesTax: z.number(),
  total: z.number(),
});

export type SupplierPartOrderFormValues = z.infer<
  typeof supplierPartOrderFormSchema
>;

// Supplier Invoice Schema (Form)
export const supplierInvoiceFormSchema = z.object({
  reference: z.string().min(1, "Reference is required"),
  postDate: z.string().min(1, "Post date is required"),
  priceIncludesTax: z.boolean(),
  invoiceType: z.string().min(1, "Invoice type is required"),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  lineItems: z
    .array(lineItemSchema)
    .min(1, "At least one line item is required"),
  note: z.string().optional(),
  subTotal: z.number(),
  freight: z.number(),
  salesTax: z.number(),
  total: z.number(),
});

export type SupplierInvoiceFormValues = z.infer<
  typeof supplierInvoiceFormSchema
>;

// Supplier Payment Schema
export const supplierPaymentSchema = z.object({
  paymentNumber: z.string().min(1, "Payment number is required"),
  postDate: z.string().min(1, "Post date is required"),
  status: z.string().min(1, "Status is required"),
  appliedAmount: z.string().optional(),
  amount: z.number().min(0, "Amount must be positive"),
});

export type SupplierPaymentFormValues = z.infer<typeof supplierPaymentSchema>;

// Customer Info Type (for display)
export interface CustomerInfo {
  name: string;
  street: string;
  road: string;
  city: string;
  postalCode: string;
  phone: string;
  mobile: string;
  email: string;
  address: string;
}

// Table Data Types (for list views if needed)
export interface SupplierPartOrder {
  id: string;
  orderNo: string;
  date: string;
  dueDate: string;
  comment: string;
  status: string;
  amount: string;
}

export interface SupplierInvoice {
  id: string;
  reference: string;
  postDate: string;
  tranType: string;
  status: string;
  amount: string;
  balance: string;
}

export interface SupplierPayment {
  id: string;
  paymentNumber: string;
  postDate: string;
  status: string;
  appliedAmount: string;
  amount: string;
}

// Supplier Form Schema (for Add/Edit in list)
export const supplierFormSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  city: z.string().min(1, "City is required"),
  phone: z.string().min(1, "Phone number is required"),
  website: z.string().url("Invalid website URL").or(z.literal("")),
});

export type SupplierFormValues = z.infer<typeof supplierFormSchema>;

// Supplier Type (for list display)
export interface Supplier {
  id: string;
  name: string;
  city: string;
  phone: string;
  website: string;
}
