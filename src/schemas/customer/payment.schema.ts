// src/schemas/customer/payment.schema.ts
import { z } from 'zod';

/**
 * Payment Schema - CRITICAL for Security
 * Validates all payment-related inputs
 */

// UPI Payment Schema
export const upiPaymentSchema = z.object({
    upiId: z
        .string()
        .min(1, 'UPI ID is required')
        .regex(
            /^[\w.-]+@[\w.-]+$/,
            'Invalid UPI ID format (e.g., user@paytm)'
        ),
});

// Card Payment Schema
export const cardPaymentSchema = z.object({
    cardNumber: z
        .string()
        .min(1, 'Card number is required')
        .regex(/^[0-9]{16}$/, 'Card number must be 16 digits')
        .transform((val) => val.replace(/\s/g, '')), // Remove spaces

    expiry: z
        .string()
        .min(1, 'Expiry date is required')
        .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Format must be MM/YY')
        .refine((val) => {
            const [month, year] = val.split('/');
            const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
            return expiry > new Date();
        }, 'Card has expired'),

    cvv: z
        .string()
        .min(1, 'CVV is required')
        .regex(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),

    nameOnCard: z
        .string()
        .min(1, 'Name on card is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
});

// Saved Card Payment Schema (only requires CVV)
export const savedCardPaymentSchema = z.object({
    savedCardId: z.string().min(1, 'Please select a card'),
    savedCardCvv: z
        .string()
        .min(1, 'CVV is required')
        .regex(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
});

// Online Banking Schema
export const onlineBankingSchema = z.object({
    bankName: z.string().min(1, 'Please select a bank'),
});

// Pay at Workshop Schema (no validation needed)
export const workshopPaymentSchema = z.object({
    confirmWorkshopPayment: z.boolean().refine((val) => val === true, {
        message: 'Please confirm payment at workshop',
    }),
});

// Combined Payment Schema with discriminated union
export const paymentSchema = z.discriminatedUnion('method', [
    z.object({
        method: z.literal('upi'),
        ...upiPaymentSchema.shape,
    }),
    z.object({
        method: z.literal('card'),
        ...cardPaymentSchema.shape,
    }),
    z.object({
        method: z.literal('saved'),
        ...savedCardPaymentSchema.shape,
    }),
    z.object({
        method: z.literal('online'),
        ...onlineBankingSchema.shape,
    }),
    z.object({
        method: z.literal('workshop'),
        confirmWorkshopPayment: z.boolean().default(true),
    }),
]);

// Type exports
export type UpiPaymentData = z.infer<typeof upiPaymentSchema>;
export type CardPaymentData = z.infer<typeof cardPaymentSchema>;
export type SavedCardPaymentData = z.infer<typeof savedCardPaymentSchema>;
export type OnlineBankingData = z.infer<typeof onlineBankingSchema>;
export type PaymentData = z.infer<typeof paymentSchema>;

// Helper function to get schema based on payment method
export const getPaymentSchemaByMethod = (method: string) => {
    switch (method) {
        case 'upi':
            return upiPaymentSchema;
        case 'card':
            return cardPaymentSchema;
        case 'saved':
            return savedCardPaymentSchema;
        case 'online':
            return onlineBankingSchema;
        case 'workshop':
            return workshopPaymentSchema;
        default:
            return z.object({});
    }
};
