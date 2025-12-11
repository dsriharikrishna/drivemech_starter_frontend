// src/schemas/customer/nestedService.schema.ts
import { z } from 'zod';

/**
 * Nested Service Selection Schema
 * Validates nested service selection within a parent service
 */

export const nestedServiceSchema = z.object({
    // Parent service ID
    parentServiceId: z
        .string()
        .min(1, 'Parent service ID is required'),

    // Selected nested services
    selectedNestedServices: z
        .array(z.string())
        .min(1, 'Please select at least one service option')
        .max(15, 'You can select maximum 15 service options'),

    // Search query for nested services
    nestedSearchQuery: z
        .string()
        .max(100, 'Search query cannot exceed 100 characters')
        .optional()
        .default(''),

    // Additional notes for nested services
    nestedAddtionalServiceNotes: z
        .string()
        .max(500, 'Additional notes cannot exceed 500 characters')
        .optional()
        .default(''),
});

// Type export
export type NestedServiceFormData = z.infer<typeof nestedServiceSchema>;

// Validation for individual nested service
export const nestedServiceItemSchema = z.object({
    id: z.string().min(1, 'Service ID is required'),
    name: z.string().min(1, 'Service name is required'),
    description: z.string().optional(),
    price: z.number().min(0, 'Price cannot be negative').optional(),
    parentId: z.string().min(1, 'Parent service ID is required'),
});

export type NestedServiceItem = z.infer<typeof nestedServiceItemSchema>;

// Combined validation for parent + nested services
export const serviceWithNestedSchema = z.object({
    parentService: z.object({
        id: z.string(),
        name: z.string(),
    }),
    nestedServices: z.array(nestedServiceItemSchema),
});

export type ServiceWithNested = z.infer<typeof serviceWithNestedSchema>;
