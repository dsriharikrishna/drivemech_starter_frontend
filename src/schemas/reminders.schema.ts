import { z } from "zod";

/* ---------------- REMINDERS SCHEMA ---------------- */

export const remindersSchema = z.object({
  autoSendReminders: z.boolean(),
  defaultServiceMessage: z.boolean(),
  emailMessage: z.string().min(1, "Email message is required"),
  smsMessage: z
    .string()
    .min(1, "SMS message is required")
    .max(150, "SMS message must be 150 characters or less"),
});
