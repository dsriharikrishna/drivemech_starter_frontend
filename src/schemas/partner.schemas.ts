// src/schemas/partner.schemas.ts
import { z } from 'zod';

export const partnerSchema = z.object({
    company: z
        .string()
        .min(1, 'Company name is required')
        .min(2, 'Company name must be at least 2 characters')
        .max(100, 'Company name cannot exceed 100 characters'),

    contactName: z
        .string()
        .min(1, 'Contact name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .refine(
            (val) => /^[a-zA-Z\s'-]+$/.test(val),
            'Name can only contain letters, spaces, hyphens, and apostrophes'
        ),

    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),

    phoneNumber: z
        .string()
        .min(1, 'Phone number is required')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number cannot exceed 15 digits')
        .regex(/^[0-9]+$/, 'Phone number must contain only numbers'),

    serviceArea: z
        .string()
        .min(1, 'Service area is required')
        .min(2, 'Service area must be at least 2 characters')
        .max(100, 'Service area cannot exceed 100 characters'),

    vehicleCount: z
        .string()
        .min(1, 'Number of vehicles is required')
        .regex(/^[0-9]+$/, 'Must be a valid number'),

    additionalInfo: z
        .string()
        .max(500, 'Additional information cannot exceed 500 characters')
        .optional()
});

export type RegisterFormData = z.infer<typeof partnerSchema>;