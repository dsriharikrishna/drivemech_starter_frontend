import { z } from "zod";

// Email Message Schema
export const emailMessageSchema = z.object({
  emailAddress: z
    .string()
    .email("Invalid email address")
    .min(1, "Email address is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type EmailMessageFormValues = z.infer<typeof emailMessageSchema>;
