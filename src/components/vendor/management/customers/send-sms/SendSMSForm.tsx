"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import { z } from "zod";

// SMS Message Schema
const smsMessageSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(160, "SMS message cannot exceed 160 characters"),
});

type SMSMessageFormValues = z.infer<typeof smsMessageSchema>;

const SendSMSForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get customer info from URL params
  const customerName = searchParams.get("name") || "Customer";
  const customerMobile = searchParams.get("mobile") || "";

  const methods = useForm<SMSMessageFormValues>({
    resolver: zodResolver(smsMessageSchema),
    defaultValues: {
      phoneNumber: customerMobile,
      message: "",
    },
  });

  const { handleSubmit, watch, reset } = methods;
  const messageLength = watch("message")?.length || 0;

  const onSubmit = async (data: SMSMessageFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Sanitize inputs
      const sanitizedData = {
        phoneNumber: data.phoneNumber.trim(),
        message: data.message.trim(),
      };

      // TODO: Replace with actual API call
      // await sendSMS(sanitizedData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form on success
      reset();

      // Navigate back or show success message
      router.back();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send SMS. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Customer Name */}
        <div className="bg-blue-50 rounded-lg px-4 py-3">
          <h2 className="text-base font-medium text-gray-900">
            {customerName}
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Mobile Field */}
        <div>
          <CommonTextInput
            name="phoneNumber"
            label="Mobile"
            placeholder="Enter phone number"
            type="tel"
            required
          />
        </div>

        {/* Message Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-700">
              Message <span className="text-red-500">*</span>
            </label>
            <span
              className={`text-xs ${messageLength > 160 ? "text-red-500" : "text-gray-500"}`}
            >
              {messageLength}/160
            </span>
          </div>
          <CommonTextArea
            name="message"
            placeholder="Write Message"
            rows={4}
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-8 py-3 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors min-w-[150px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors min-w-[150px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SendSMSForm;
