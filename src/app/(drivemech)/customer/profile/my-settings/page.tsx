"use client";

import { useForm, FormProvider } from "react-hook-form";

import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import CustomCard from "@/components/ui/CustomCard";

import SettingRow from "@/components/customer/profile/settings/SettingRow";
import SettingActionRow from "@/components/customer/profile/settings/SettingActionRow";
import SettingsSection from "@/components/customer/profile/settings/SettingsSection";

type FormValues = {
  push: boolean;
  sms: boolean;
  email: boolean;
  biometric: boolean;
  twoFactor: boolean;
};

export default function SettingsTab() {
  const methods = useForm<FormValues>({
    defaultValues: {
      push: true,
      sms: true,
      email: true,
      biometric: true,
      twoFactor: true,
    },
  });

  const { watch, setValue } = methods;

  const notificationItems = [
    { icon: "🔔", title: "Push Notifications", subtitle: "Receive app notifications", key: "push" as const },
    { icon: "📱", title: "SMS Notifications", subtitle: "Receive text messages", key: "sms" as const },
    { icon: "✉️", title: "Email Notifications", subtitle: "Receive email updates", key: "email" as const },
  ];

  const securityItems = [
    { icon: "🧿", title: "Face ID / Biometric", subtitle: "Use biometric authentication", key: "biometric" as const },
    { icon: "🛡️", title: "Two-Factor Authentication", subtitle: "Add an extra layer of security", key: "twoFactor" as const },
  ];

  return (
    <FormProvider {...methods}>
      <div className="w-full mx-auto bg-white rounded-xl flex flex-col gap-6 p-2">

        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-4 border-b border-border">
          <Typography variant="h4" weight="semibold">Settings</Typography>
          <Button variant="gradient" startIcon="➕">Add Vehicle</Button>
        </div>

        {/* NOTIFICATION SECTION */}
        <SettingsSection title="Notification Preferences">
          {notificationItems.map((item, i) => (
            <SettingRow
              key={item.key}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              value={watch(item.key)}
              onChange={(v) => setValue(item.key, v)}
              showDivider={i !== notificationItems.length - 1}
            />
          ))}
        </SettingsSection>

        {/* ACCOUNT SECURITY */}
        <SettingsSection title="Account Security">
          <SettingActionRow
            icon="🔐"
            title="Change Password"
            subtitle="Update your account password"
            actionLabel="Update →"
          />

          {securityItems.map((item, i) => (
            <SettingRow
              key={item.key}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              value={watch(item.key)}
              onChange={(v) => setValue(item.key, v)}
              showDivider={i !== securityItems.length - 1}
            />
          ))}
        </SettingsSection>

        {/* PRIVACY */}
        <SettingsSection title="Privacy">
          <SettingActionRow icon="👁️" title="Privacy Settings" actionLabel="Manage →" />
          <SettingActionRow
            icon="🗑️"
            title="Delete Account"
            actionLabel="Delete →"
            titleClass="text-red-500"
            actionClass="text-red-500"
            showDivider={false}
          />
        </SettingsSection>

        {/* SECURITY INFO */}
        <CustomCard className="p-4 bg-blue-50 border border-blue-100">
          <Typography weight="semibold">🔒 Your data is secure</Typography>
          <Typography variant="small" color="muted" className="mt-1">
            DriveMech uses industry-standard encryption to protect your personal information and payment details.
          </Typography>
        </CustomCard>

        {/* SAVE BUTTON */}
        <div className="flex justify-center mb-4">
          <Button variant="gradient" className="px-10 py-3">Save Changes</Button>
        </div>

      </div>
    </FormProvider>
  );
}
