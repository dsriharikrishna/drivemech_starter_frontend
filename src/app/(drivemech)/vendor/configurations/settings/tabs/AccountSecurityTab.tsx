"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import Button from "@/components/ui/Button";
import { Eye, EyeOff, Monitor, Smartphone } from "lucide-react";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  timestamp: string;
  isCurrent: boolean;
}

const AccountSecurityTab = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const methods = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: PasswordFormValues) => {
    console.log("Password change:", data);
    reset();
    // TODO: Handle password change
  };

  const sessions: Session[] = [
    {
      id: "1",
      device: "Chrome on Windows",
      browser: "Chrome",
      location: "Hyderabad, IN",
      timestamp: "2024-10-07 14:30",
      isCurrent: true,
    },
    {
      id: "2",
      device: "Safari on macOS",
      browser: "Safari",
      location: "Hyderabad, IN",
      timestamp: "2024-10-07 14:30",
      isCurrent: false,
    },
  ];

  const handleEndSession = (sessionId: string) => {
    console.log("End session:", sessionId);
    // TODO: Handle end session
  };

  return (
    <div className="space-y-6">
      {/* Change Password Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Change Password
        </h3>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <CommonTextInput
                name="currentPassword"
                label="Current Password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <CommonTextInput
                name="newPassword"
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <CommonTextInput
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                type="submit"
                className="w-full md:w-auto"
              >
                Update Password
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Active Sessions Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Active Sessions
        </h3>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {session.device.includes("Windows") ||
                    session.device.includes("macOS") ? (
                    <Monitor className="w-6 h-6 text-gray-600" />
                  ) : (
                    <Smartphone className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{session.device}</p>
                  <p className="text-sm text-gray-600">
                    {session.location} • {session.timestamp}
                  </p>
                </div>
              </div>

              {session.isCurrent ? (
                <span className="px-3 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full">
                  Current
                </span>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEndSession(session.id)}
                >
                  End Session
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountSecurityTab;
