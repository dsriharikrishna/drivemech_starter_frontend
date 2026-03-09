"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";
import RichTextEditor from "@/components/forms/RichTextEditor";
import CommonTextArea from "@/components/forms/CommonTextArea";
import Dialog from "@/components/modals/Dialog";
import { remindersSchema } from "@/schemas/reminders.schema";
import type { RemindersFormValues } from "@/types/reminders.types";
import DialogBody from "@/components/modals/DialogBody";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

const RemindersTab = () => {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showSmsDialog, setShowSmsDialog] = useState(false);

  const methods = useForm<RemindersFormValues>({
    resolver: zodResolver(remindersSchema),
    defaultValues: {
      autoSendReminders: true,
      defaultServiceMessage: true,
      emailMessage:
        "Your vehicle with rego %regnumbr% is due for servicing. Contact us to schedule an appointment.",
      smsMessage:
        "Your vehicle with rego %regnumbr% is due for servicing. Contact us to schedule an appointment.",
    },
  });

  const smsMessage = methods.watch("smsMessage");
  const smsCharCount = smsMessage?.length || 0;

  const onSubmit = (data: RemindersFormValues) => {
    console.log("Reminders Settings:", data);
  };

  const handleCancel = () => {
    methods.reset();
  };

  const handleAddEmailTemplate = () => {
    setShowEmailDialog(true);
  };

  const handleAddSmsTemplate = () => {
    setShowSmsDialog(true);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white rounded-xl border border-gray-200 p-8"
      >
        <div className="space-y-6">
          {/* Toggle Settings */}
          <div className="space-y-4">
            {/* Auto Send Reminders */}
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  Automatically send reminders
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  ( Sends text or email depending customers's preferred method
                  of contact )
                </p>
              </div>
              <ControlledToggleSwitch name="autoSendReminders" size="md" />
            </div>

            {/* Default Service Message */}
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  Default Service Message
                </label>
              </div>
              <ControlledToggleSwitch name="defaultServiceMessage" size="md" />
            </div>
          </div>

          {/* Message Templates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            {/* Email Message */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Email Message
              </h3>
              <RichTextEditor
                name="emailMessage"
                placeholder="Your vehicle with rego %regnumbr% is due for servicing. Contact us to schedule an appointment."
              />

              {/* Placeholder Info */}
              <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-3 rounded-lg">
                <p>
                  To insert the customer's Rego into the message, use the
                  placeholder{" "}
                  <code className="bg-gray-200 px-1 py-0.5 rounded">
                    %regnumbr%
                  </code>
                  . To insert the date that the next service is due, use the
                  placeholder{" "}
                  <code className="bg-gray-200 px-1 py-0.5 rounded">
                    %nextsrv%
                  </code>
                  . Any References to these will be replaced with the vehicle's
                  Rego and next service date respectively. To insert the full
                  name of the customer, use the placeholder{" "}
                  <code className="bg-gray-200 px-1 py-0.5 rounded">
                    %custfullname%
                  </code>
                  .
                </p>
              </div>

              <Button
                variant="primary"
                onClick={handleAddEmailTemplate}
                startIcon={<Plus size={18} />}
                className="rounded-lg"
                size="sm"
              >
                Add Template
              </Button>
            </div>

            {/* SMS Message */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">
                SMS Message
              </h3>
              <div className="relative">
                <CommonTextArea
                  name="smsMessage"
                  placeholder="Your vehicle with rego %regnumbr% is due for servicing. Contact us to schedule an appointment."
                  rows={8}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {smsCharCount}/150
                </div>
              </div>

              {/* Placeholder Info */}
              <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-3 rounded-lg">
                <p>
                  To insert the customer's Rego into the message, use the
                  placeholder{" "}
                  <code className="bg-gray-200 px-1 py-0.5 rounded">
                    %regnumbr%
                  </code>
                  . To insert the date that the next service is due, use the
                  placeholder{" "}
                  <code className="bg-gray-200 px-1 py-0.5 rounded">
                    %nextsrv%
                  </code>
                  . Any References to these will be replaced with the vehicle's
                  Rego and next service date respectively. To insert the full
                  name of the customer, use the placeholder{" "}
                  <code className="bg-gray-200 px-1 py-0.5 rounded">
                    %custfullname%
                  </code>
                  .
                </p>
              </div>

              <Button
                variant="primary"
                onClick={handleAddSmsTemplate}
                startIcon={<Plus size={18} />}
                className="rounded-lg"
                size="sm"
              >
                Add Template
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleCancel}
              
              className="px-6 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="px-6 rounded-lg"
            >
              Save
            </Button>
          </div>
        </div>
      </form>

      {/* Email Template Dialog */}
      <Dialog
        isOpen={showEmailDialog}
        onClose={() => setShowEmailDialog(false)}
      >
        <DialogBody className="h-auto">
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Create a new email template for service reminders.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Template Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                placeholder="Template Content"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowEmailDialog(false)}
                className="rounded-lg"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  // Handle template save
                  setShowEmailDialog(false);
                }}
                className="rounded-lg"
              >
                Save Template
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>

      {/* SMS Template Dialog */}
      <Dialog isOpen={showSmsDialog} onClose={() => setShowSmsDialog(false)}>
        <DialogBody className="h-auto">
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              Create a new SMS template for service reminders (max 150
              characters).
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Template Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="relative">
                <textarea
                  placeholder="Template Content"
                  rows={4}
                  maxLength={150}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  0/150
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowSmsDialog(false)}
                className="rounded-lg"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  // Handle template save
                  setShowSmsDialog(false);
                }}
                className="rounded-lg"
              >
                Save Template
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </FormProvider>
  );
};

export default RemindersTab;
