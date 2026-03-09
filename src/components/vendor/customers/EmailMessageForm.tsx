"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Bold,
  Italic,
  Underline,
  Link2,
  Smile,
  Image,
  Paperclip,
  MoreVertical,
  Trash2,
} from "lucide-react";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import {
  emailMessageSchema,
  type EmailMessageFormValues,
} from "@/schemas/vendor/messaging.schema";

interface EmailMessageFormProps {
  customerName?: string;
  onBack?: () => void;
}

const EmailMessageForm: React.FC<EmailMessageFormProps> = ({
  customerName = "John Doe",
  onBack,
}) => {
  const methods = useForm<EmailMessageFormValues>({
    resolver: zodResolver(emailMessageSchema),
    defaultValues: {
      emailAddress: "",
      subject: "",
      message: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: EmailMessageFormValues) => {
    console.log("Email Data:", data);
    // Handle email sending
  };

  const handleCancel = () => {
    methods.reset();
    onBack?.();
  };

  const handleSend = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h1 className="text-base font-semibold">Customers</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Customers</span>
            <span className="text-gray-400">›</span>
            <span className="text-sm font-medium">Message</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Customer Name */}
            <div className="bg-blue-50 rounded-lg px-4 py-3">
              <h2 className="text-base font-medium text-gray-900">
                {customerName}
              </h2>
            </div>

            {/* Email Address Field */}
            <div>
              <CommonTextInput
                name="emailAddress"
                label="Email Address"
                placeholder=""
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

            {/* Message Field with Rich Text Toolbar */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Message <span className="text-red-500">*</span>
              </label>

              {/* Rich Text Toolbar */}
              <div className="bg-white border border-gray-200 rounded-t-lg px-3 py-2 flex items-center gap-1 flex-wrap">
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  title="Bold"
                >
                  <Bold size={16} className="text-gray-600" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  title="Italic"
                >
                  <Italic size={16} className="text-gray-600" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  title="Underline"
                >
                  <Underline size={16} className="text-gray-600" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  title="Link"
                >
                  <Link2 size={16} className="text-gray-600" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  title="Emoji"
                >
                  <Smile size={16} className="text-gray-600" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  title="Image"
                >
                  <Image size={16} className="text-gray-600" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  title="Attach"
                >
                  <Paperclip size={16} className="text-gray-600" />
                </button>

                <div className="flex-1" />

                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  title="More"
                >
                  <MoreVertical size={16} className="text-gray-600" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} className="text-gray-600" />
                </button>
              </div>

              {/* Message Textarea */}
              <div className="border border-t-0 border-gray-200 rounded-b-lg">
                <CommonTextArea
                  name="message"
                  label=""
                  placeholder="Body Text"
                  rows={8}
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSend}
                className="px-8 py-2.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Send
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EmailMessageForm;
