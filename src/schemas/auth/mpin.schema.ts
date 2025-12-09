import { z } from "zod";

/**
 * Weak MPIN patterns to reject
 */
const WEAK_MPIN_PATTERNS = [
    "0000", "1111", "2222", "3333", "4444",
    "5555", "6666", "7777", "8888", "9999",
    "1234", "4321", "0123", "9876",
];

/**
 * Create MPIN Schema - For creating a new 4-digit MPIN
 */
export const createMpinSchema = z.object({
    mpin: z
        .string()
        .length(4, "MPIN must be exactly 4 digits")
        .regex(/^\d{4}$/, "MPIN must contain only numbers")
        .refine(
            (val) => !WEAK_MPIN_PATTERNS.includes(val),
            {
                message: "Please choose a more secure MPIN. Avoid common patterns like 1234 or 1111",
            }
        )
        .refine(
            (val) => {
                // Check for sequential digits (ascending or descending)
                const digits = val.split("").map(Number);
                const isSequential = digits.every((digit, i) =>
                    i === 0 || digit === digits[i - 1] + 1 || digit === digits[i - 1] - 1
                );
                return !isSequential;
            },
            {
                message: "MPIN cannot be sequential digits",
            }
        ),

    confirmMpin: z
        .string()
        .length(4, "MPIN must be exactly 4 digits")
        .regex(/^\d{4}$/, "MPIN must contain only numbers"),
}).refine(
    (data) => data.mpin === data.confirmMpin,
    {
        message: "MPINs do not match",
        path: ["confirmMpin"],
    }
);

/**
 * Verify MPIN Schema - For MPIN login
 */
export const verifyMpinSchema = z.object({
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

/**
 * Forgot MPIN Schema - Request MPIN reset
 */
export const forgotMpinSchema = z.object({
    identifier: z.string().optional(),
    email: z
        .string()
        .email("Invalid email address")
        .optional(),

    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .optional(),
}).refine(
    (data) => data.email || data.phone || data.identifier,
    {
        message: "Either email or phone number is required",
        path: ["identifier"],
    }
);

/**
 * Reset MPIN Schema - Reset MPIN with verification code
 */
export const resetMpinSchema = z.object({
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
        .length(6, "Verification code must be exactly 6 digits")
        .regex(/^\d{6}$/, "Verification code must contain only numbers"),

    newMpin: z
        .string()
        .length(4, "MPIN must be exactly 4 digits")
        .regex(/^\d{4}$/, "MPIN must contain only numbers")
        .refine(
            (val) => !WEAK_MPIN_PATTERNS.includes(val),
            {
                message: "Please choose a more secure MPIN",
            }
        ),

    confirmMpin: z
        .string()
        .length(4, "MPIN must be exactly 4 digits")
        .regex(/^\d{4}$/, "MPIN must contain only numbers"),
}).refine(
    (data) => data.email || data.phone,
    {
        message: "Either email or phone number is required",
        path: ["email"],
    }
).refine(
    (data) => data.newMpin === data.confirmMpin,
    {
        message: "MPINs do not match",
        path: ["confirmMpin"],
    }
);

// Export types inferred from schemas
export type CreateMpinFormData = z.infer<typeof createMpinSchema>;
export type VerifyMpinFormData = z.infer<typeof verifyMpinSchema>;
export type ForgotMpinFormData = z.infer<typeof forgotMpinSchema>;
export type ResetMpinFormData = z.infer<typeof resetMpinSchema>;
