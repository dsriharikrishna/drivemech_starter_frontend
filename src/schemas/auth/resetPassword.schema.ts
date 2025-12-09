import { z } from "zod";

/**
 * Password strength requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character (optional but recommended)
 */
export const resetPasswordSchema = z.object({
    token: z
        .string()
        .min(1, "Reset token is required"),

    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password must not exceed 128 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),

    confirmPassword: z
        .string()
        .min(1, "Please confirm your password"),
}).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

/**
 * Strong password schema with special character requirement
 */
export const resetPasswordStrongSchema = z.object({
    token: z
        .string()
        .min(1, "Reset token is required"),

    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password must not exceed 128 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),

    confirmPassword: z
        .string()
        .min(1, "Please confirm your password"),
}).refine(
    (data) => data.newPassword === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

// Export types inferred from schemas
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordStrongFormData = z.infer<typeof resetPasswordStrongSchema>;
