import { z } from "zod";
import { remindersSchema } from "@/schemas/reminders.schema";

/* ---------------- INFERRED TYPES ---------------- */

export type RemindersFormValues = z.infer<typeof remindersSchema>;
