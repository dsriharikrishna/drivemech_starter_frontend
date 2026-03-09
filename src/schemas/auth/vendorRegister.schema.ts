import { z } from "zod";

/**
 * Vendor Registration Schema - Step 1: Basic Information
 * Fields: Business Name, Full Name, Email, Phone
 */
export const vendorRegisterStep1Schema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must not exceed 100 characters")
    .regex(
      /^[a-zA-Z0-9\s&.,'-]+$/,
      "Business name contains invalid characters"
    ),

  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters"),

  email: z.string().email("Invalid email address").toLowerCase(),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),

  countryCode: z.string().default("+91"),
});

/**
 * Vendor OTP Verification Schema - Step 2: OTP Verification
 */
export const vendorOtpVerificationSchema = z.object({
  otp: z
    .string()
    .length(4, "OTP must be exactly 4 digits")
    .regex(/^\d{4}$/, "OTP must contain only numbers"),
});

/**
 * Vendor MPN Creation Schema - Step 3: Create MPN
 */
export const vendorMpinSchema = z
  .object({
    mpin: z
      .string()
      .length(4, "MPIN must be exactly 4 digits")
      .regex(/^\d{4}$/, "MPIN must contain only numbers"),

    confirmMpin: z
      .string()
      .length(4, "MPIN must be exactly 4 digits")
      .regex(/^\d{4}$/, "MPIN must contain only numbers"),
  })
  .refine((data) => data.mpin === data.confirmMpin, {
    message: "MPINs do not match",
    path: ["confirmMpin"],
  });

/**
 * Complete Vendor Registration Schema - All steps combined
 */
export const vendorCompleteRegistrationSchema = z.object({
  // Step 1: Basic Information
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must not exceed 100 characters"),

  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),

  email: z.string().email("Invalid email address").toLowerCase(),

  phone: z.string().min(10, "Phone number must be at least 10 digits"),

  countryCode: z.string().default("+91"),

  // Step 2: OTP
  otp: z.string().length(4, "OTP must be exactly 4 digits").optional(),

  // Step 3: MPIN
  mpin: z.string().length(4, "MPIN must be exactly 4 digits").optional(),

  confirmMpin: z.string().length(4, "MPIN must be exactly 4 digits").optional(),
});

// Export types inferred from schemas
export type VendorRegisterStep1Data = z.infer<typeof vendorRegisterStep1Schema>;
export type VendorOtpVerificationData = z.infer<
  typeof vendorOtpVerificationSchema
>;
export type VendorMpinData = z.infer<typeof vendorMpinSchema>;
export type VendorCompleteRegistrationData = z.infer<
  typeof vendorCompleteRegistrationSchema
>;
