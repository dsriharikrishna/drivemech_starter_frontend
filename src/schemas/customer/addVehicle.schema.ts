// src/schemas/customer/addVehicle.schema.ts
import { z } from 'zod';

/**
 * Add Vehicle Schema
 * Validates vehicle registration and details
 */

export const addVehicleSchema = z.object({
    // Registration number
    registrationNumber: z
        .string()
        .min(1, 'Registration number is required')
        .min(3, 'Registration number must be at least 3 characters')
        .max(20, 'Registration number cannot exceed 20 characters')
        .regex(
            /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/i,
            'Invalid registration format (e.g., KA01AB1234)'
        )
        .transform((val) => val.toUpperCase().replace(/\s/g, '')),

    // Make (vehicle manufacturer)
    make: z
        .string()
        .min(1, 'Vehicle make is required'),

    // Model
    model: z
        .string()
        .min(1, 'Vehicle model is required'),

    // Cubic capacity (engine size)
    cubicCapacity: z
        .string()
        .min(1, 'Cubic capacity is required')
        .regex(/^[0-9]+$/, 'Cubic capacity must be a number')
        .refine(
            (val) => {
                const capacity = parseInt(val);
                return capacity >= 50 && capacity <= 10000;
            },
            'Cubic capacity must be between 50cc and 10000cc'
        ),

    // Manufacturing year
    manufacturingYear: z
        .string()
        .min(1, 'Manufacturing year is required')
        .regex(/^[0-9]{4}$/, 'Year must be 4 digits')
        .refine(
            (val) => {
                const year = parseInt(val);
                const currentYear = new Date().getFullYear();
                return year >= 1900 && year <= currentYear + 1;
            },
            'Please enter a valid manufacturing year'
        ),
});

// Type export
export type AddVehicleFormData = z.infer<typeof addVehicleSchema>;

// Optional: Extended schema with additional fields
export const addVehicleExtendedSchema = addVehicleSchema.extend({
    fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'LPG'], {
        message: 'Fuel type is required',
    }),

    transmission: z.enum(['Manual', 'Automatic', 'CVT', 'AMT'], {
        message: 'Transmission type is required',
    }),

    color: z
        .string()
        .min(1, 'Vehicle color is required')
        .optional(),

    ownerName: z
        .string()
        .min(1, 'Owner name is required')
        .regex(/^[a-zA-Z\s'-]+$/, 'Invalid name format')
        .optional(),
});

export type AddVehicleExtendedFormData = z.infer<typeof addVehicleExtendedSchema>;
