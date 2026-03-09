import { z } from "zod";
import {
  smsMessageSchema,
  emailMessageSchema,
  messengerMessageSchema,
  whatsappMessageSchema,
  viberMessageSchema,
} from "@/schemas/messages.schema";

/* ---------------- INFERRED TYPES ---------------- */

export type SmsMessageFormValues = z.infer<typeof smsMessageSchema>;
export type EmailMessageFormValues = z.infer<typeof emailMessageSchema>;
export type MessengerMessageFormValues = z.infer<typeof messengerMessageSchema>;
export type WhatsappMessageFormValues = z.infer<typeof whatsappMessageSchema>;
export type ViberMessageFormValues = z.infer<typeof viberMessageSchema>;
