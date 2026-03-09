import { z } from "zod";

/* ---------------- SMS MESSAGE SCHEMA ---------------- */

export const smsMessageSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(160, "SMS message must be 160 characters or less"),
});

/* ---------------- EMAIL MESSAGE SCHEMA ---------------- */

export const emailMessageSchema = z.object({
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

/* ---------------- MESSENGER MESSAGE SCHEMA ---------------- */

export const messengerMessageSchema = z.object({
  messengerId: z.string().min(1, "Messenger ID is required"),
  message: z.string().min(1, "Message is required"),
});

/* ---------------- WHATSAPP MESSAGE SCHEMA ---------------- */

export const whatsappMessageSchema = z.object({
  whatsappNumber: z.string().min(1, "WhatsApp number is required"),
  message: z.string().min(1, "Message is required"),
});

/* ---------------- VIBER MESSAGE SCHEMA ---------------- */

export const viberMessageSchema = z.object({
  viberId: z.string().min(1, "Viber ID is required"),
  message: z.string().min(1, "Message is required"),
});
