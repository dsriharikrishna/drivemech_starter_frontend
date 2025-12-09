import { z } from "zod";

/**
 * OTP Verification Schema - 6-digit OTP code
 */
export const otpVerifySchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .optional(),

    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .optional(),

    code: z
        .string()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only numbers"),
}).refine(
    (data) => data.email || data.phone,
    {
        message: "Either email or phone number is required",
        path: ["email"],
    }
);

/**
 * Resend OTP Schema
 */
export const resendOtpSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .optional(),

    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .optional(),
}).refine(
    (data) => data.email || data.phone,
    {
        message: "Either email or phone number is required",
        path: ["email"],
    }
);

// Export types inferred from schemas
export type OtpVerifyFormData = z.infer<typeof otpVerifySchema>;
export type ResendOtpFormData = z.infer<typeof resendOtpSchema>;
