// src/schemas/customer/selectService.schema.ts
import { z } from 'zod';

/**
 * Select Service Schema
 * Validates booking details, personal information, and service preferences
 */

// Location schema
const locationSchema = z.object({
    address: z
        .string()
        .min(1, 'Address is required')
        .min(10, 'Address must be at least 10 characters')
        .max(200, 'Address cannot exceed 200 characters'),
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
});

// Main select service schema
export const selectServiceSchema = z.object({
    // Service mode
    mode: z.enum(['walkin', 'pickup'], {
        message: 'Please select service mode (walkin or pickup)',
    }),

    // Date validation
    date: z
        .string()
        .min(1, 'Service date is required')
        .refine((val) => {
            const selectedDate = new Date(val);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate >= today;
        }, 'Service date cannot be in the past'),

    // Time validation
    time: z
        .string()
        .min(1, 'Service time is required')
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),

    // Personal details
    fullName: z
        .string()
        .min(1, 'Full name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .regex(
            /^[a-zA-Z\s'-]+$/,
            'Name can only contain letters, spaces, hyphens, and apostrophes'
        ),

    phone: z
        .string()
        .min(1, 'Phone number is required')
        .regex(
            /^[6-9][0-9]{9}$/,
            'Phone number must be 10 digits starting with 6-9'
        ),

    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address')
        .toLowerCase(),

    // Add-ons (optional)
    addOns: z
        .array(z.string())
        .optional(),

    // Notes (optional)
    notes: z
        .string()
        .max(1000, 'Notes cannot exceed 1000 characters')
        .optional(),

    // Guest checkout
    guest: z.boolean().optional(),

    // Location (required only for pickup mode)
    location: locationSchema.optional(),
}).refine(
    (data) => {
        // If mode is pickup, location is required
        if (data.mode === 'pickup') {
            return data.location !== undefined && data.location.address.length > 0;
        }
        return true;
    },
    {
        message: 'Pickup address is required for pickup service',
        path: ['location'],
    }
);

// Type export
export type SelectServiceFormData = z.infer<typeof selectServiceSchema>;
export type LocationData = z.infer<typeof locationSchema>;

// Helper schemas for individual sections (if needed)
export const personalDetailsSchema = z.object({
    fullName: selectServiceSchema.shape.fullName,
    phone: selectServiceSchema.shape.phone,
    email: selectServiceSchema.shape.email,
});

export const dateTimeSchema = z.object({
    date: selectServiceSchema.shape.date,
    time: selectServiceSchema.shape.time,
});

export type PersonalDetailsData = z.infer<typeof personalDetailsSchema>;
export type DateTimeData = z.infer<typeof dateTimeSchema>;
