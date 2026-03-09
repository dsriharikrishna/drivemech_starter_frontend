import { z } from "zod";

// Order Status Enum
export const orderStatusEnum = z.enum([
  "new",
  "confirmed",
  "packed",
  "ready",
  "completed",
]);
export type OrderStatus = z.infer<typeof orderStatusEnum>;

// Stock Status Enum
export const stockStatusEnum = z.enum([
  "in_stock",
  "low_stock",
  "out_of_stock",
]);
export type StockStatus = z.infer<typeof stockStatusEnum>;

// Customer Information Schema
export const customerInformationSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
});

export type CustomerInformation = z.infer<typeof customerInformationSchema>;

// Order Item Schema
export const orderItemSchema = z.object({
  id: z.string(),
  productName: z.string(),
  sku: z.string(),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
  total: z.number().min(0),
  stockStatus: stockStatusEnum,
  stockQuantity: z.number().optional(),
  image: z.string().optional(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

// Timeline Event Schema
export const timelineEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  timestamp: z.string().optional(),
  status: z.enum(["completed", "active", "pending"]),
});

export type TimelineEvent = z.infer<typeof timelineEventSchema>;

// Stock Alert Schema
export const stockAlertSchema = z.object({
  id: z.string(),
  productName: z.string(),
  message: z.string(),
  severity: z.enum(["warning", "error"]),
});

export type StockAlert = z.infer<typeof stockAlertSchema>;

// Spare Part Order Schema
export const sparePartOrderSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  customer: customerInformationSchema,
  items: z.array(orderItemSchema),
  totalAmount: z.number().min(0),
  status: orderStatusEnum,
  createdAt: z.string(),
  timeline: z.array(timelineEventSchema),
  stockAlerts: z.array(stockAlertSchema).optional(),
});

export type SparePartOrder = z.infer<typeof sparePartOrderSchema>;

// Order List Item (for table display)
export interface OrderListItem {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  itemsCount: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}
