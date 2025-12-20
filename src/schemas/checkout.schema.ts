import { z } from 'zod';

export const addressFormSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
    countryCode: z.string(),
    addressLine1: z.string().min(5, 'Address line 1 is required'),
    addressLine2: z.string().optional(),
    postcode: z.string().min(4, 'Postcode is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    country: z.string().min(2, 'Country is required'),
    isDefault: z.boolean()
});

export type AddressFormData = z.infer<typeof addressFormSchema>;
