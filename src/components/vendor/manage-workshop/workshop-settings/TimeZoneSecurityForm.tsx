"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";
import { ControlledDropdown } from "@/components/ui/ControlledDropdown";
import { z } from "zod";

// Schema for Time Zone & Security
const timeZoneSecuritySchema = z.object({
  timezone: z.string().min(1, "Timezone is required"),
  useMemberNumbers: z.boolean(),
  enable2FA: z.boolean(),
  requireSSO: z.boolean(),
});

type TimeZoneSecurityFormValues = z.infer<typeof timeZoneSecuritySchema>;

const TimeZoneSecurityForm = () => {
  const methods = useForm<TimeZoneSecurityFormValues>({
    resolver: zodResolver(timeZoneSecuritySchema),
    defaultValues: {
      timezone: "india_kolkata",
      useMemberNumbers: false,
      enable2FA: false,
      requireSSO: false,
    },
  });

  const onSubmit = (data: TimeZoneSecurityFormValues) => {
    console.log("Time Zone & Security:", data);
  };

  const timezoneOptions = [
    { value: "india_kolkata", label: "India - Kolkata (+5:30)" },
    { value: "australia_sydney", label: "Australia - Sydney (+11:00)" },
    { value: "australia_melbourne", label: "Australia - Melbourne (+11:00)" },
    { value: "australia_brisbane", label: "Australia - Brisbane (+10:00)" },
    { value: "australia_perth", label: "Australia - Perth (+8:00)" },
    { value: "us_eastern", label: "US - Eastern (-5:00)" },
    { value: "us_pacific", label: "US - Pacific (-8:00)" },
    { value: "uk_london", label: "UK - London (+0:00)" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        {/* Time Zone and Security Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Time Zone Dropdown */}
          <ControlledDropdown
            name="timezone"
            label="Time Zone"
            options={timezoneOptions}
            placeholder="Select timezone"
            required
          />

          {/* Use Member Numbers Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Use Member Numbers
            </label>
            <ControlledToggleSwitch name="useMemberNumbers" size="md" />
          </div>

          {/* Enable 2FA Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Enable 2FA
            </label>
            <ControlledToggleSwitch name="enable2FA" size="md" />
          </div>

          {/* Require SSO Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Require SSO (Single Sign-On)
            </label>
            <ControlledToggleSwitch name="requireSSO" size="md" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default TimeZoneSecurityForm;
