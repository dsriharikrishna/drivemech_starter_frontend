import { z } from "zod";

// Line Item Schema for Invoices
export const lineItemSchema = z.object({
  product: z.string().optional(),
  description: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be at least 0"),
  unitPrice: z.number().min(0, "Unit price must be positive"),
  tax: z.number().min(0, "Tax must be positive"),
  total: z.number().min(0, "Total must be positive"),
});

export type LineItemFormValues = z.infer<typeof lineItemSchema>;

// Customer Invoice Schema
export const customerInvoiceSchema = z.object({
  reference: z.string().optional(),
  invoiceNumber: z.string().optional(),
  jobCardNumber: z.string().optional(),
  orderNumber: z.string().optional(),
  postDate: z.string().min(1, "Post date is required"),
  invoiceType: z.string().min(1, "Invoice type is required"),
  accountType: z.boolean(),
  nextServiceKms: z.string().optional(),
  jobStatus: z.string().optional(),
  jobStatusComments: z.string().optional(),
  internalInvoice: z.boolean(),
  paymentTerms: z.string().optional(),
  customerSource: z.string().optional(),
  lineItems: z.array(lineItemSchema),
  invoiceNotes: z.string().optional(),
  jobCardNotes: z.string().optional(),
  subTotal: z.number().min(0),
  freight: z.number().min(0),
  salesTax: z.number().min(0),
  total: z.number().min(0),
});

export type CustomerInvoiceFormValues = z.infer<typeof customerInvoiceSchema>;

// Product Invoice (for the table display)
export interface ProductInvoice {
  id: string;
  invoiceNo: string;
  customer: string;
  postDate: string;
  tranType: string;
  status: string;
  qty: number;
  amount: number;
}
