import { z } from "zod";

// Branch Schema
export const branchSchema = z.object({
  branchName: z.string().min(1, "Branch name is required"),
  representativeName: z.string().min(1, "Representative name is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  postCode: z.string().min(1, "Post code is required"),
  landmark: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});

// Contact Schema
export const contactSchema = z.object({
  contactPersonName: z.string().min(1, "Contact person name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  isPrimary: z.boolean().optional(),
});

// Business Information Schema (Section 1)
export const businessInfoSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  representativeName: z.string().min(1, "Representative name is required"),
  taxIdentificationNumber: z.string().min(1, "Tax ID is required"),
  businessLicenseNumber: z.string().min(1, "Business license is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  postCode: z.string().min(1, "Post code is required"),
  landmark: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});

// Branch Locations Schema (Section 2)
export const branchLocationsSchema = z.object({
  branches: z.array(branchSchema).min(1, "At least one branch is required"),
});

// Contact Details Schema (Section 3)
export const contactDetailsSchema = z.object({
  contacts: z.array(contactSchema).min(1, "At least one contact is required"),
});

// Complete Basic Info Schema (All sections combined)
export const basicInfoSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  representativeName: z.string().min(1, "Representative name is required"),
  taxIdentificationNumber: z.string().min(1, "Tax ID is required"),
  businessLicenseNumber: z.string().min(1, "Business license is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  postCode: z.string().min(1, "Post code is required"),
  landmark: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  branches: z.array(branchSchema).min(1, "At least one branch is required"),
  contacts: z.array(contactSchema).min(1, "At least one contact is required"),
});

// Type inference
export type Branch = z.infer<typeof branchSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type BusinessInfo = z.infer<typeof businessInfoSchema>;
export type BranchLocations = z.infer<typeof branchLocationsSchema>;
export type ContactDetails = z.infer<typeof contactDetailsSchema>;
export type BasicInfo = z.infer<typeof basicInfoSchema>;
