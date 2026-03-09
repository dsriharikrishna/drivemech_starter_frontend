import { z } from "zod";

export const designationSchema = z.object({
  designationName: z.string().min(1, "Designation name is required"),
  description: z.string().optional(),
  permissions: z.array(z.string()).min(0),
});

export type DesignationFormValues = z.infer<typeof designationSchema>;

export const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  designation: z.string().min(1, "Designation is required"),
  contactNumber: z
    .string()
    .regex(/^\+?[0-9\s-]{10,}$/, "Invalid contact number"),
  email: z.string().email("Invalid email address"),
  streetAddress: z.string().min(1, "Street address is required"),
  postCode: z.string().min(1, "Postcode is required"),
  landmark: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  docType: z.string().min(1, "Document type is required"),
  joiningDate: z.string().min(1, "Joining date is required"),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
