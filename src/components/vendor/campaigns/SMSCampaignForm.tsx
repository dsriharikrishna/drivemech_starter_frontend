"use client";

import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import ModalDropdown from "@/components/ui/DropDown";
import CommonTextArea from "@/components/forms/CommonTextArea";
import { Calendar, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";

const SMSCampaignForm: React.FC = () => {
  const { watch, control } = useFormContext();
  const message = watch("message") || "";
  const characterCount = message.length;

  const audienceOptions = [
    { value: "all-customers", label: "All Customers" },
    { value: "service-due", label: "Service Due This Month" },
    { value: "vip-customers", label: "VIP Customers" },
    { value: "inactive-customers", label: "Inactive Customers" },
  ];

  return (
    <div className="space-y-3">
      <CommonTextInput
        name="campaignName"
        label="Campaign Name*"
        placeholder="e.g. Spring Service Reminder"
      />

      <Controller
        name="audience"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const items = audienceOptions.map((opt) => ({
            id: opt.value,
            name: opt.label,
          }));
          const selectedItem = items.find((item) => item.id === value) || null;

          return (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Select Audience*
              </label>
              <ModalDropdown
                items={items}
                selectedItem={selectedItem}
                onSelect={(item) => onChange(item.id)}
                placeholder="Select audience"
                error={error?.message}
              />
            </div>
          );
        }}
      />

      <div>
        <CommonTextArea
          name="message"
          label="Message"
          placeholder="Type your message here"
          rows={4}
        />
        <div className="text-right text-[11px] text-gray-500 mt-1">
          Characters: {characterCount}/160
        </div>
      </div>

      <div>
        <Controller
          name="schedule"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DatePicker
              label="Schedule (Optional)"
              value={value}
              onChange={onChange}
              placeholder="Select schedule"
            />
          )}
        />
      </div>

      <div className="flex justify-center gap-2 pt-3">
        <Button
          type="button"
          startIcon={<Calendar size={16} />}
          variant="outline"
          className="rounded-xl text-xs"
        >
          Schedule
        </Button>
        <Button
          type="submit"
          endIcon={<Send size={16} />}
          variant="success"
          className="rounded-xl text-xs"
        >
          Send Now
        </Button>
      </div>
    </div>
  );
};

export default SMSCampaignForm;
