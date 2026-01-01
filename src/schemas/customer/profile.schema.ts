import { z } from "zod";

// ============================================
// PROFILE VALIDATION SCHEMAS
// ============================================

/**
 * Personal Information Schema
 * Validates first name, last name, date of birth, and gender
 */
export const personalInfoSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must not exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters"),

    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must not exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters"),

    dateOfBirth: z
        .string()
        .optional()
        .refine(
            (date) => {
                if (!date) return true;
                const birthDate = new Date(date);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                return age >= 18 && age <= 120;
            },
            { message: "You must be at least 18 years old" }
        ),

    gender: z.enum(["male", "female", "other"]).optional(),
});

/**
 * Contact Information Schema
 * Validates email and phone number
 */
export const contactInfoSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address")
        .min(5, "Email must be at least 5 characters")
        .max(100, "Email must not exceed 100 characters"),

    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must not exceed 15 digits")
        .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
});

/**
 * Address Information Schema
 * Validates address fields - maps to Redux Address type
 */
export const addressInfoSchema = z.object({
    address: z
        .string()
        .min(5, "Address must be at least 5 characters")
        .max(200, "Address must not exceed 200 characters")
        .optional(),

    city: z
        .string()
        .min(2, "City must be at least 2 characters")
        .max(50, "City must not exceed 50 characters")
        .optional(),

    state: z
        .string()
        .min(2, "State must be at least 2 characters")
        .max(50, "State must not exceed 50 characters")
        .optional(),

    pincode: z
        .string()
        .regex(/^[0-9]{5,10}$/, "Please enter a valid pincode")
        .optional(),

    addressNotes: z
        .string()
        .max(500, "Address notes must not exceed 500 characters")
        .optional(),
});

/**
 * Avatar Upload Schema
 * Validates avatar file upload
 */
export const avatarUploadSchema = z.object({
    avatar: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "File size must be less than 5MB",
        })
        .refine(
            (file) => ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type),
            {
                message: "Only JPG, PNG, or GIF files are allowed",
            }
        ),
});

/**
 * Complete Profile Update Schema
 * Combines all profile sections for full profile update
 */
export const profileUpdateSchema = personalInfoSchema
    .merge(contactInfoSchema)
    .merge(addressInfoSchema);

/**
 * TypeScript types inferred from schemas
 */
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;
export type AddressInfoFormData = z.infer<typeof addressInfoSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type AvatarUploadFormData = z.infer<typeof avatarUploadSchema>;

/**
 * Helper function to transform form data to API payload
 * Combines firstName and lastName into fullName for Redux/API
 */
export const transformProfileFormToPayload = (formData: ProfileUpdateFormData) => {
    const { firstName, lastName, address, addressNotes, ...rest } = formData;

    return {
        fullName: `${firstName} ${lastName}`.trim(),
        ...rest,
        // Address fields are optional and handled separately via address endpoints
    };
};

/**
 * Helper function to transform API data to form data
 * Splits fullName into firstName and lastName for form
 */
export const transformProfilePayloadToForm = (profile: {
    fullName?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: "male" | "female" | "other";
}): Partial<ProfileUpdateFormData> => {
    const nameParts = profile.fullName?.split(" ") || [];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    return {
        firstName,
        lastName,
        email: profile.email || "",
        phone: profile.phone || "",
        dateOfBirth: profile.dateOfBirth || "",
        gender: profile.gender,
        // Address fields would come from separate address endpoint
        address: "",
        city: "",
        state: "",
        pincode: "",
        addressNotes: "",
    };
};
