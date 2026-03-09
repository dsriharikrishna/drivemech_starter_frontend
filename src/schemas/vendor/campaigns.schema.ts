import { z } from "zod";

// SMS Campaign Schema
export const smsCampaignSchema = z.object({
  campaignName: z.string().min(1, "Campaign name is required"),
  audience: z.string().min(1, "Please select an audience"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(160, "SMS message cannot exceed 160 characters"),
  schedule: z.string().optional(),
});

export type SMSCampaignFormValues = z.infer<typeof smsCampaignSchema>;

// Email Campaign Schema
export const emailCampaignSchema = z.object({
  campaignName: z.string().min(1, "Campaign name is required"),
  subjectLine: z.string().min(1, "Subject line is required"),
  audience: z.string().min(1, "Please select an audience"),
  emailContent: z.string().min(1, "Email content is required"),
  schedule: z.string().optional(),
});

export type EmailCampaignFormValues = z.infer<typeof emailCampaignSchema>;

// Audience Schema
export const audienceSchema = z.object({
  audienceName: z.string().min(1, "Audience name is required"),
  criteria: z
    .object({
      serviceDue: z.boolean().optional(),
      serviceCompleted: z.boolean().optional(),
      totalSpent: z.boolean().optional(),
      noVisit: z.boolean().optional(),
      firstVisit: z.boolean().optional(),
      byLocation: z.boolean().optional(),
    })
    .refine((data) => Object.values(data).some((value) => value === true), {
      message: "Please select at least one criteria",
    }),
});

export type AudienceFormValues = z.infer<typeof audienceSchema>;
