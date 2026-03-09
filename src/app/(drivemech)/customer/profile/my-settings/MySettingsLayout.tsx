"use client";

import { useForm, FormProvider } from "react-hook-form";
import Image from "next/image";
import { ShieldCheck, Lock } from "phosphor-react";
import { useCallback, useMemo } from "react";

import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

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

export default function MySettingsLayout() {
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

  const notificationItems = useMemo(
    () => [
      {
        icon: "/svgs/settings/notify-icon.svg",
        title: "Push Notifications",
        subtitle: "Receive app notifications",
        key: "push" as const,
      },
      {
        icon: "/svgs/settings/mobile-icon.svg",
        title: "SMS Notifications",
        subtitle: "Receive text messages",
        key: "sms" as const,
      },
      {
        icon: "/svgs/settings/notify-icon.svg",
        title: "Email Notifications",
        subtitle: "Receive email updates",
        key: "email" as const,
      },
    ],
    []
  );

  const securityItems = useMemo(
    () => [
      {
        icon: "/svgs/settings/mobile-icon.svg",
        title: "Face ID / Biometric",
        subtitle: "Use biometric authentication",
        key: "biometric" as const,
      },
      {
        icon: "/svgs/settings/shield-icon.svg",
        title: "Two-Factor Authentication",
        subtitle: "Add an extra layer of security",
        key: "twoFactor" as const,
      },
    ],
    []
  );

  const handleToggle = useCallback(
    (key: keyof FormValues, value: boolean) => {
      setValue(key, value);
    },
    [setValue]
  );

  return (
    <FormProvider {...methods}>
      <div className="w-full mx-auto bg-white rounded-xl p-3 space-y-4">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <Typography variant="h4" weight="semibold">
            Settings
          </Typography>
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
              onChange={(v) => handleToggle(item.key, v)}
              showDivider={i !== notificationItems.length - 1}
            />
          ))}
        </SettingsSection>

        {/* ACCOUNT SECURITY */}
        <SettingsSection title="Account Security">
          <SettingActionRow
            icon="/svgs/settings/edit-Icon.svg"
            title="Change Password"
            subtitle="Update your account password"
            actionLabel="Update"
          />

          {securityItems.map((item, i) => (
            <SettingRow
              key={item.key}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              value={watch(item.key)}
              onChange={(v) => handleToggle(item.key, v)}
              showDivider={i !== securityItems.length - 1}
            />
          ))}
        </SettingsSection>

        {/* PRIVACY */}
        <SettingsSection title="Privacy">
          <SettingActionRow
            icon="/svgs/settings/eye-icon.svg"
            title="Privacy Settings"
            actionLabel="Manage"
          />
          <SettingActionRow
            icon="/svgs/trash-icon.svg"
            title="Delete Account"
            actionLabel="Delete"
            titleClass="text-red-500"
            actionClass="text-red-500"
            showDivider={false}
          />
        </SettingsSection>

        {/* SECURITY INFO */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-1.5">
            <Lock size={16} className="text-blue-600 mt-0.5" weight="fill" />
            <div>
              <Typography weight="semibold" className="text-xs">
                Your data is secure
              </Typography>
              <Typography
                variant="small"
                color="muted"
                className="text-[11px] mt-0.5"
              >
                DriveMech uses industry-standard encryption to protect your
                personal information and payment details.
              </Typography>
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-center pt-1.5">
          <Button variant="gradient" className="px-6 text-xs">
            Save Changes
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
