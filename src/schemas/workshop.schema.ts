import { z } from "zod";

/* ---------------- BASIC INFO SCHEMA ---------------- */

export const basicInfoSchema = z.object({
  workshopName: z.string().min(1, "Workshop name is required"),
  abn: z.string().min(1, "ABN is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  website: z.string().optional(),
  description: z.string().optional(),
});

/* ---------------- WORKSHOP DETAILS SCHEMA ---------------- */

export const workshopDetailsSchema = z.object({
  address: z.string().min(1, "Street address is required").optional(),
  suburb: z.string().min(1, "Suburb is required").optional(),
  state: z.string().min(1, "State is required").optional(),
  postcode: z.string().min(1, "Postcode is required").optional(),
  country: z.string().min(1, "Country is required").optional(),
  tradingHours: z.string().min(1, "Trading hours are required").optional(),
  serviceCapacity: z.string().min(1, "Service capacity is required").optional(),
  serviceCategory: z.string().min(1, "Service category is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  workingDays: z.string().min(1, "Working days are required"),
  specializations: z.string().optional(),
  brandsServiced: z.string().optional(),
  selectedServices: z.array(z.string()).optional(),
  selectedBrands: z.array(z.string()).optional(),
  pricingRows: z
    .array(
      z.object({
        id: z.string(),
        make: z.string(),
        model: z.string(),
        serviceType: z.string(),
        price: z.string(),
      })
    )
    .optional(),
});

/* ---------------- TAX SETTINGS SCHEMA ---------------- */

export const taxSettingsSchema = z.object({
  gstRegistered: z.boolean(),
  gstNumber: z.string().optional(),
  taxRate: z.string().min(1, "Tax rate is required"),
  includeTaxInPrices: z.boolean(),
  defaultTaxCode: z.string().optional(),
});

/* ---------------- INVOICE SETTINGS SCHEMA ---------------- */

export const invoiceSettingsSchema = z.object({
  invoicePrefix: z.string().min(1, "Invoice prefix is required"),
  nextInvoiceNumber: z.string().min(1, "Next invoice number is required"),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  lateFeePercentage: z.string().optional(),
  autoSendInvoices: z.boolean(),
  invoiceNotes: z.string().optional(),
  footerText: z.string().optional(),
});

/* ---------------- TIME ZONE & SECURITY SCHEMA ---------------- */

export const timeZoneSecuritySchema = z.object({
  timezone: z.string().min(1, "Timezone is required"),
  dateFormat: z.string().min(1, "Date format is required"),
  timeFormat: z.string().min(1, "Time format is required"),
  twoFactorAuth: z.boolean(),
  sessionTimeout: z.string().min(1, "Session timeout is required"),
  ipWhitelist: z.boolean(),
  auditLogging: z.boolean(),
});

/* ---------------- CASH DRAWER SCHEMA ---------------- */

export const cashDrawerSchema = z.object({
  openingBalance: z.string().min(1, "Opening balance is required"),
  countingFrequency: z.string().min(1, "Counting frequency is required"),
  varianceThreshold: z.string().min(1, "Variance threshold is required"),
});

/* ---------------- MARKETING DETAILS SCHEMA ---------------- */

export const marketingDetailsSchema = z.object({
  enableMarketing: z.boolean(),
  promotionalEmails: z.boolean(),
  smsMarketing: z.boolean(),
  socialMediaIntegration: z.boolean(),
});

/* ---------------- COMMUNICATION SETTINGS SCHEMA ---------------- */

export const communicationSettingsSchema = z.object({
  smsEnabled: z.boolean(),
  emailEnabled: z.boolean(),
  callEnabled: z.boolean(),
  whatsappEnabled: z.boolean(),
});

/* ---------------- SERVICES OFFERED SCHEMA ---------------- */

export const servicesOfferedSchema = z.object({
  engineRepair: z.boolean(),
  brakeService: z.boolean(),
  oilChange: z.boolean(),
  transmission: z.boolean(),
  electrical: z.boolean(),
  airConditioning: z.boolean(),
  suspension: z.boolean(),
  diagnostics: z.boolean(),
});

/* ---------------- FACILITIES SCHEMA ---------------- */

export const facilitiesSchema = z.object({
  waitingArea: z.boolean(),
  wifi: z.boolean(),
  parking: z.boolean(),
  refreshments: z.boolean(),
  shuttleService: z.boolean(),
});

/* ---------------- OFFERINGS SCHEMA ---------------- */

export const offeringsSchema = z.object({
  description: z.string().min(1, "Offerings description is required"),
});

/* ---------------- FINANCIALS SCHEMA ---------------- */

export const financialsSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  bsb: z.string().min(1, "BSB is required"),
  acceptCash: z.boolean(),
  acceptCard: z.boolean(),
  acceptEftpos: z.boolean(),
  acceptBankTransfer: z.boolean(),
});

/* ---------------- EMPLOYEE BENEFITS SCHEMA ---------------- */

export const employeeBenefitsSchema = z.object({
  healthInsurance: z.boolean(),
  paidLeave: z.boolean(),
  trainingPrograms: z.boolean(),
  performanceBonuses: z.boolean(),
  retirementPlans: z.boolean(),
});

/* ---------------- BRANCH LOCATIONS SCHEMA ---------------- */

export const branchLocationsSchema = z.object({
  branchName: z.string().min(1, "Branch name is required"),
  representativeName: z.string().min(1, "Representative name is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  postcode: z.string().min(1, "Postcode is required"),
  landmark: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});

/* ---------------- CONTACT DETAILS SCHEMA ---------------- */

export const contactDetailsSchema = z.object({
  primaryContactName: z.string().min(1, "Primary contact name is required"),
  primaryContactPhone: z.string().min(1, "Primary contact phone is required"),
  primaryContactEmail: z.string().email("Invalid email address"),

  secondaryContactName: z.string().optional(),
  secondaryContactPhone: z.string().optional(),
  secondaryContactEmail: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
});
