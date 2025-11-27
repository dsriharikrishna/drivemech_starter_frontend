import { UseFormReturn } from "react-hook-form";
import { Calendar, Clock } from "lucide-react";
import CommonTextInput from "../forms/CommonTextInput";

interface Props {
  form: UseFormReturn<any>;
}

export default function PreferredDateTime({ form }: Props) {
  return (
    <div className="p-4 border rounded-xl bg-white">
      <p className="font-medium mb-3">Preferred Date & Time *</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <CommonTextInput
          name="date"
          label="Date"
          form={form}
          placeholder="Select Date"
          icon={<Calendar className="w-4 h-4 text-gray-400" />}
        />

        <CommonTextInput
          name="time"
          label="Time"
          form={form}
          placeholder="Select Time"
          icon={<Clock className="w-4 h-4 text-gray-400" />}
        />

      </div>
    </div>
  );
}
