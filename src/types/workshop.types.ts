import { z } from "zod";
import {
  basicInfoSchema,
  workshopDetailsSchema,
  taxSettingsSchema,
  invoiceSettingsSchema,
  timeZoneSecuritySchema,
  cashDrawerSchema,
  marketingDetailsSchema,
  communicationSettingsSchema,
  servicesOfferedSchema,
  facilitiesSchema,
  offeringsSchema,
  financialsSchema,
  employeeBenefitsSchema,
  branchLocationsSchema,
  contactDetailsSchema,
} from "@/schemas/workshop.schema";

/* ---------------- INFERRED TYPES ---------------- */

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
export type WorkshopDetailsFormValues = z.infer<typeof workshopDetailsSchema>;
export type TaxSettingsFormValues = z.infer<typeof taxSettingsSchema>;
export type InvoiceSettingsFormValues = z.infer<typeof invoiceSettingsSchema>;
export type TimeZoneSecurityFormValues = z.infer<typeof timeZoneSecuritySchema>;
export type CashDrawerFormValues = z.infer<typeof cashDrawerSchema>;
export type MarketingDetailsFormValues = z.infer<typeof marketingDetailsSchema>;
export type CommunicationSettingsFormValues = z.infer<
  typeof communicationSettingsSchema
>;
export type ServicesOfferedFormValues = z.infer<typeof servicesOfferedSchema>;
export type FacilitiesFormValues = z.infer<typeof facilitiesSchema>;
export type OfferingsFormValues = z.infer<typeof offeringsSchema>;
export type FinancialsFormValues = z.infer<typeof financialsSchema>;
export type EmployeeBenefitsFormValues = z.infer<typeof employeeBenefitsSchema>;
export type BranchLocationsFormValues = z.infer<typeof branchLocationsSchema>;
export type ContactDetailsFormValues = z.infer<typeof contactDetailsSchema>;

/* ---------------- DROPDOWN ITEM TYPES ---------------- */

export interface DropdownItem {
  id: string;
  name: string;
  description?: string;
}

export interface WorkshopSectionProps {
  isOpen: boolean;
  onToggle: () => void;
}
