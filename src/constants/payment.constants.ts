// src/constants/payment.constants.ts

/**
 * Payment Constants
 * Global constants for payment-related data
 */

// Payment methods
export const PAYMENT_METHODS = [
  {
    id: "saved",
    name: "Saved Cards",
    icon: "💳",
    description: "Use your saved payment methods",
  },
  {
    id: "upi",
    name: "UPI",
    icon: "📱",
    description: "Pay using UPI ID",
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: "💳",
    description: "Pay using card",
  },
  {
    id: "online",
    name: "Online Banking",
    icon: "🏦",
    description: "Pay via net banking",
  },
  {
    id: "workshop",
    name: "Pay at Workshop",
    icon: "🏪",
    description: "Pay when you visit",
  },
] as const;

// Supported banks for online banking
export const SUPPORTED_BANKS = [
  {
    id: "hsbc",
    name: "HSBC Bank Malaysia",
    logo: "/banks/hsbc.png",
    code: "HSBC",
  },
  {
    id: "hong-leong",
    name: "Hong Leong Bank",
    logo: "/banks/hong.png",
    code: "HLB",
  },
  {
    id: "maybank",
    name: "Maybank",
    logo: "/banks/maybank.png",
    code: "MBB",
  },
  {
    id: "cimb",
    name: "CIMB Bank",
    logo: "/banks/cimb.png",
    code: "CIMB",
  },
  {
    id: "public-bank",
    name: "Public Bank",
    logo: "/banks/public.png",
    code: "PBB",
  },
] as const;

// Card types
export const CARD_TYPES = [
  { id: "visa", name: "Visa", icon: "💳", pattern: /^4/ },
  { id: "mastercard", name: "Mastercard", icon: "💳", pattern: /^5[1-5]/ },
  { id: "amex", name: "American Express", icon: "💳", pattern: /^3[47]/ },
  { id: "discover", name: "Discover", icon: "💳", pattern: /^6(?:011|5)/ },
] as const;

// Payment status
export const PAYMENT_STATUS = [
  { id: "pending", name: "Pending", color: "yellow", icon: "⏳" },
  { id: "processing", name: "Processing", color: "blue", icon: "🔄" },
  { id: "completed", name: "Completed", color: "green", icon: "✅" },
  { id: "failed", name: "Failed", color: "red", icon: "❌" },
  { id: "refunded", name: "Refunded", color: "orange", icon: "↩️" },
  { id: "cancelled", name: "Cancelled", color: "gray", icon: "🚫" },
] as const;

// Transaction types
export const TRANSACTION_TYPES = [
  { id: "booking", name: "Booking Payment", icon: "📅" },
  { id: "service", name: "Service Payment", icon: "🔧" },
  { id: "addon", name: "Add-on Service", icon: "➕" },
  { id: "refund", name: "Refund", icon: "↩️" },
  { id: "cancellation", name: "Cancellation Fee", icon: "🚫" },
] as const;

// Currency
export const CURRENCY = {
  code: "USD",
  symbol: "$",
  name: "US Dollar",
} as const;

// Tax rates
export const TAX_RATES = {
  service: 0.18, // 18% service tax
  gst: 0.05, // 5% GST
} as const;

// Payment fees
export const PAYMENT_FEES = {
  upi: 0, // No fee for UPI
  card: 0.02, // 2% for card payments
  online: 0, // No fee for online banking
  workshop: 0, // No fee for workshop payment
} as const;

// Minimum/Maximum amounts
export const PAYMENT_LIMITS = {
  min: 10, // Minimum $10
  max: 10000, // Maximum $10,000
  upiMax: 5000, // UPI max $5,000
} as const;

// Type exports
export type PaymentMethod = (typeof PAYMENT_METHODS)[number]["id"];
export type SupportedBank = (typeof SUPPORTED_BANKS)[number];
export type CardType = (typeof CARD_TYPES)[number]["id"];
export type PaymentStatus = (typeof PAYMENT_STATUS)[number]["id"];
export type TransactionType = (typeof TRANSACTION_TYPES)[number]["id"];
