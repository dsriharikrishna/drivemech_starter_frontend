import { z } from "zod";

export const vehicleSearchSchema = z.object({
    state: z.string().min(1, "State is required"),
    rego: z.string().min(1, "Registration number is required").max(10, "Registration number is too long"),
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    postcode: z.string().min(4, "Postcode must be at least 4 characters").max(6, "Postcode is too long"),
});

export type VehicleSearchFormData = z.infer<typeof vehicleSearchSchema>;
