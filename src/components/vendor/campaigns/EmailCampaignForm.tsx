"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import ModalDropdown from "@/components/ui/DropDown";
import RichTextEditor from "@/components/forms/RichTextEditor";
import { Calendar, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";

const EmailCampaignForm: React.FC = () => {
  const { control } = useFormContext();
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

      <CommonTextInput
        name="subjectLine"
        label="Subject Line*"
        placeholder="Enter subject line"
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

      <RichTextEditor
        name="emailContent"
        label="Email Content"
        placeholder="Type your email here..."
      />

      <Controller
        name="schedule"
        control={control}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            label="Schedule (Optional)"
            placeholder="Select schedule"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <div className="flex justify-center gap-2 pt-3">
        <Button
          type="button"
          variant="outline"
          startIcon={<Calendar size={16} />}
          className="rounded-xl text-xs"
        >
          Schedule
        </Button>
        <Button
          type="submit"
          variant="primary"
          endIcon={<Send size={16} />}
          className="rounded-xl text-xs"
        >
          Send Now
        </Button>
      </div>
    </div>
  );
};

export default EmailCampaignForm;
