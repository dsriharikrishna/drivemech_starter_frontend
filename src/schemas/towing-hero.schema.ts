// src/schemas/towing-hero.schema.ts
import { z } from 'zod';

// Schema for dropdown items
const dropdownItemSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export const towingHeroSchema = z.object({
    pickup: z
        .string()
        .min(1, 'Pickup location is required')
        .min(3, 'Pickup location must be at least 3 characters')
        .max(100, 'Pickup location cannot exceed 100 characters'),

    destination: z
        .string()
        .min(1, 'Destination is required')
        .min(3, 'Destination must be at least 3 characters')
        .max(100, 'Destination cannot exceed 100 characters'),

    reg: z
        .string()
        .min(1, 'Vehicle registration number is required')
        .min(3, 'Registration number must be at least 3 characters')
        .max(20, 'Registration number cannot exceed 20 characters')
        .regex(
            /^[A-Z0-9\s-]+$/i,
            'Registration number can only contain letters, numbers, spaces, and hyphens'
        ),

    make: z
        .object({
            id: z.string(),
            name: z.string(),
        })
        .nullable()
        .refine((val) => val !== null, {
            message: 'Vehicle make is required',
        }),

    model: z
        .object({
            id: z.string(),
            name: z.string(),
        })
        .nullable()
        .refine((val) => val !== null, {
            message: 'Vehicle model is required',
        }),

    vehicleType: z
        .object({
            id: z.string(),
            name: z.string(),
        })
        .nullable()
        .refine((val) => val !== null, {
            message: 'Vehicle type is required',
        }),
});

export type TowingHeroFormData = z.infer<typeof towingHeroSchema>;
export type DropdownItem = z.infer<typeof dropdownItemSchema>;
