import { z } from "zod";

/**
 * Login Schema - Supports both email and phone login
 * Either email or phone must be provided
 */
export const loginSchema = z.object({
    identifier: z.string().optional(),
    email: z
        .string()
        .email("Invalid email address")
        .optional(),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^[0-9+\s()-]+$/, "Invalid phone number format")
        .optional(),
    password: z
        .string()
        .optional(), // Optional for OTP-based login
}).refine(
    (data) => data.email || data.phone || data.identifier,
    {
        message: "Either email or phone number is required",
        path: ["identifier"],
    }
);

/**
 * MPIN Login Schema - For MPIN-based authentication
 */
export const mpinLoginSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .optional(),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .optional(),
    mpin: z
        .string()
        .length(4, "MPIN must be exactly 4 digits")
        .regex(/^\d{4}$/, "MPIN must contain only numbers"),
}).refine(
    (data) => data.email || data.phone,
    {
        message: "Either email or phone number is required",
        path: ["email"],
    }
);

// Export types inferred from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type MpinLoginFormData = z.infer<typeof mpinLoginSchema>;
