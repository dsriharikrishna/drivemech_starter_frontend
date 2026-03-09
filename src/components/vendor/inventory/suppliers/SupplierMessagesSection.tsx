"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import RichTextEditor from "@/components/forms/RichTextEditor";
import Button from "@/components/ui/Button";
import {
  emailMessageSchema,
  type EmailMessageFormValues,
} from "@/schemas/vendor/messaging.schema";

interface SupplierMessagesSectionProps {
  supplierName?: string;
}

const SupplierMessagesSection: React.FC<SupplierMessagesSectionProps> = ({
  supplierName = "John Doe",
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
  };

  const handleSend = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Supplier Name */}
        <div className="bg-blue-50 rounded-lg px-4 py-3">
          <h2 className="text-base font-medium text-gray-900">
            {supplierName}
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

        {/* Message Field with Rich Text Editor */}
        <div>
          <RichTextEditor
            name="message"
            label="Message"
            placeholder="Body Text"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-6">
          <Button
            type="button"
            onClick={handleCancel}
            variant="danger"
            size="md"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSend}
            variant="success"
            size="md"
          >
            Send
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SupplierMessagesSection;
