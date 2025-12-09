import { z } from "zod";

/**
 * Forgot Password Schema - Request password reset
 */
export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .toLowerCase(),
});

/**
 * Validate Reset Token Schema
 */
export const validateResetTokenSchema = z.object({
    token: z
        .string()
        .min(1, "Reset token is required"),
});

// Export types inferred from schemas
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ValidateResetTokenFormData = z.infer<typeof validateResetTokenSchema>;
