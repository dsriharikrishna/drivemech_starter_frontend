// src/schemas/customer/serviceSelection.schema.ts
import { z } from 'zod';

/**
 * Service Selection Schema
 * Validates service selection and additional notes
 */

export const serviceSelectionSchema = z.object({
    // Selected services (array of service IDs)
    selectedServices: z
        .array(z.string())
        .min(1, 'Please select at least one service')
        .max(10, 'You can select maximum 10 services at once'),

    // Search query (optional)
    searchQuery: z
        .string()
        .max(100, 'Search query cannot exceed 100 characters')
        .optional()
        .default(''),

    // Additional notes (optional)
    addtionalNotes: z
        .string()
        .max(500, 'Additional notes cannot exceed 500 characters')
        .optional()
        .default(''),
});

// Type export
export type ServiceSelectionFormData = z.infer<typeof serviceSelectionSchema>;

// Validation for individual service selection
export const serviceItemSchema = z.object({
    id: z.string().min(1, 'Service ID is required'),
    name: z.string().min(1, 'Service name is required'),
    price: z.number().min(0, 'Price cannot be negative').optional(),
    hasNested: z.boolean().default(false),
});

export type ServiceItem = z.infer<typeof serviceItemSchema>;
