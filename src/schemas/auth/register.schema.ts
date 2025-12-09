import { z } from "zod";

/**
 * Registration Schema - User registration with email and phone
 */
export const registerSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must not exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters"),

    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must not exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters"),

    email: z
        .string()
        .email("Invalid email address")
        .toLowerCase(),

    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        )
        .optional(), // Optional if using OTP-only registration
});

/**
 * Simplified registration schema for OTP-based registration
 */
export const registerOtpSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must not exceed 50 characters"),

    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must not exceed 50 characters"),

    email: z
        .string()
        .email("Invalid email address")
        .toLowerCase(),

    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),
});

// Export types inferred from schemas
export type RegisterFormData = z.infer<typeof registerSchema>;
export type RegisterOtpFormData = z.infer<typeof registerOtpSchema>;
