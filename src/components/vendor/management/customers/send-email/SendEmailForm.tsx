"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import CommonTextInput from "@/components/forms/CommonTextInput";
import {
  emailMessageSchema,
  type EmailMessageFormValues,
} from "@/schemas/vendor/messaging.schema";
import RichTextEditor from "@/components/forms/RichTextEditor";

const SendEmailForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get customer info from URL params
  const customerName = searchParams.get("name") || "Customer";
  const customerEmail = searchParams.get("email") || "";

  const methods = useForm<EmailMessageFormValues>({
    resolver: zodResolver(emailMessageSchema),
    defaultValues: {
      emailAddress: customerEmail,
      subject: "",
      message: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: EmailMessageFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Sanitize inputs
      const sanitizedData = {
        emailAddress: data.emailAddress.trim().toLowerCase(),
        subject: data.subject.trim(),
        message: data.message.trim(),
      };

      // TODO: Replace with actual API call
      // await sendEmail(sanitizedData)

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
          : "Failed to send email. Please try again."
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

        {/* Email Address Field */}
        <div>
          <CommonTextInput
            name="emailAddress"
            label="Email Address"
            placeholder="Enter email address"
            type="email"
            required
          />
        </div>

        {/* Subject Field */}
        <div>
          <CommonTextInput
            name="subject"
            label="Subject"
            placeholder="Write Message"
            required
          />
        </div>

        {/* Message Field with Rich Text Editor */}
        <div>
          <RichTextEditor
            name="message"
            label="Message"
            placeholder="Body Text"
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

export default SendEmailForm;
