"use client";

import { useState } from "react";

export default function SettingsTab() {
  // Notification Toggles
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  // Account Security Toggles
  const [biometric, setBiometric] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Settings</h2>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          ➕ Add Vehicle
        </button>
      </div>

      {/* NOTIFICATION PREFERENCES */}
      <section className="border rounded-xl bg-gray-50">
        <p className="font-semibold p-4 border-b">Notification Preferences</p>

        <div className="divide-y">

          {/* Push Notifications */}
          <SettingRow
            icon="🔔"
            title="Push Notifications"
            subtitle="Receive app notifications"
            enabled={pushEnabled}
            onToggle={() => setPushEnabled(!pushEnabled)}
          />

          {/* SMS Notifications */}
          <SettingRow
            icon="📱"
            title="SMS Notifications"
            subtitle="Receive text messages"
            enabled={smsEnabled}
            onToggle={() => setSmsEnabled(!smsEnabled)}
          />

          {/* Email Notifications */}
          <SettingRow
            icon="✉️"
            title="Email Notifications"
            subtitle="Receive email updates"
            enabled={emailEnabled}
            onToggle={() => setEmailEnabled(!emailEnabled)}
          />

        </div>
      </section>

      {/* ACCOUNT SECURITY */}
      <section className="border rounded-xl bg-gray-50">
        <p className="font-semibold p-4 border-b">Account Security</p>

        <div className="divide-y">

          {/* Change Password */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔐</span>
              <div>
                <p className="font-semibold">Change Password</p>
                <p className="text-gray-600 text-sm">Update your account password</p>
              </div>
            </div>
            <button className="text-orange-500 text-sm hover:underline flex items-center gap-1">
              Update →
            </button>
          </div>

          {/* Biometric */}
          <SettingRow
            icon="🧿"
            title="Face ID / Biometric"
            subtitle="Use biometric authentication"
            enabled={biometric}
            onToggle={() => setBiometric(!biometric)}
          />

          {/* Two-Factor Authentication */}
          <SettingRow
            icon="🛡️"
            title="Two-Factor Authentication"
            subtitle="Add an extra layer of security"
            enabled={twoFactor}
            onToggle={() => setTwoFactor(!twoFactor)}
          />

        </div>
      </section>

      {/* PRIVACY */}
      <section className="border rounded-xl bg-gray-50">
        <p className="font-semibold p-4 border-b">Privacy</p>

        <div className="divide-y">

          {/* Privacy Settings */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">👁️</span>
              <div>
                <p className="font-semibold">Privacy Settings</p>
              </div>
            </div>
            <button className="text-orange-500 text-sm hover:underline flex items-center gap-1">
              Manage →
            </button>
          </div>

          {/* Delete Account */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <span className="text-xl text-red-500">🗑️</span>
              <div>
                <p className="font-semibold text-red-500">Delete Account</p>
              </div>
            </div>
            <button className="text-red-500 text-sm hover:underline flex items-center gap-1">
              Delete →
            </button>
          </div>

        </div>
      </section>

      {/* SECURITY INFO BOX */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
        <p className="font-semibold">🔒 Your data is secure</p>
        <p className="text-gray-600 text-sm mt-1">
          DriveMech uses industry-standard encryption to protect your personal information and payment details.
        </p>
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-center">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-lg text-lg">
          Save Changes
        </button>
      </div>

    </div>
  );
}

/* REUSABLE ROW WITH PURE TAILWIND TOGGLE */
function SettingRow({
  icon,
  title,
  subtitle,
  enabled,
  onToggle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <span className="text-xl">{icon}</span>

        <div>
          <p className="font-semibold">{title}</p>
          {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
        </div>
      </div>

      {/* PURE TAILWIND TOGGLE SWITCH */}
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 rounded-full transition ${
          enabled ? "bg-orange-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            enabled ? "right-1" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
