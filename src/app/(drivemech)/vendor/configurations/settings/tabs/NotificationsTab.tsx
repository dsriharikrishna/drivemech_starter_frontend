"use client";

import React, { useState } from "react";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

interface NotificationSettings {
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
    sound: boolean;
  };
  types: {
    serviceReminders: boolean;
    paymentAlerts: boolean;
    systemUpdates: boolean;
    marketingCommunications: boolean;
  };
}

const NotificationsTab = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    channels: {
      email: true,
      sms: false,
      push: true,
      sound: false,
    },
    types: {
      serviceReminders: false,
      paymentAlerts: false,
      systemUpdates: false,
      marketingCommunications: false,
    },
  });

  const handleChannelChange = (
    channel: keyof NotificationSettings["channels"],
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: value,
      },
    }));
  };

  const handleTypeChange = (
    type: keyof NotificationSettings["types"],
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      types: {
        ...prev.types,
        [type]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Notification Channels Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Notification Channels
        </h3>

        <div className="space-y-4">
          <ToggleSwitch
            checked={settings.channels.email}
            onChange={(value) => handleChannelChange("email", value)}
            label="Email Notifications"
            description="Receive important updates and notifications via email."
            variant="primary"
          />

          <ToggleSwitch
            checked={settings.channels.sms}
            onChange={(value) => handleChannelChange("sms", value)}
            label="SMS Notifications"
            description="Receive important updates and notifications via SMS."
            variant="primary"
          />

          <ToggleSwitch
            checked={settings.channels.push}
            onChange={(value) => handleChannelChange("push", value)}
            label="Push Notifications"
            description="Receive browser push notifications."
            variant="primary"
          />

          <ToggleSwitch
            checked={settings.channels.sound}
            onChange={(value) => handleChannelChange("sound", value)}
            label="Sound Notifications"
            description="Play sound for notifications."
            variant="primary"
          />
        </div>
      </div>

      {/* Notification Types Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Notification Types
        </h3>

        <div className="space-y-4">
          <ToggleSwitch
            checked={settings.types.serviceReminders}
            onChange={(value) => handleTypeChange("serviceReminders", value)}
            label="Service Reminders"
            variant="primary"
          />

          <ToggleSwitch
            checked={settings.types.paymentAlerts}
            onChange={(value) => handleTypeChange("paymentAlerts", value)}
            label="Payment Alerts"
            variant="primary"
          />

          <ToggleSwitch
            checked={settings.types.systemUpdates}
            onChange={(value) => handleTypeChange("systemUpdates", value)}
            label="System Updates"
            variant="primary"
          />

          <ToggleSwitch
            checked={settings.types.marketingCommunications}
            onChange={(value) =>
              handleTypeChange("marketingCommunications", value)
            }
            label="Marketing Communications"
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
