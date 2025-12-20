"use client";
import { useFormContext } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";

interface Props {
  handleNext: () => Promise<void>;
}

export default function UpiPanel({ handleNext }: Props) {
  const form = useFormContext();

  return (
    <div className="bg-white rounded-2xl p-6 border border-border flex flex-col gap-6">

      <div className="flex items-center gap-3">
        <input
          type="radio"
          className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
          checked
          readOnly
        />
        <span className="font-medium text-gray-900">Add New UPI ID</span>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">UPI ID</label>

        <div className="flex gap-3">
          <CommonTextInput
            name="upiId"
            label=""
            placeholder="Enter UPI ID"
            form={form}
            className="flex-1"
          />

          <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-medium text-sm shadow-sm hover:bg-orange-600 transition-colors">
            Verify
          </button>
        </div>
      </div>

      <button onClick={handleNext} className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-base hover:bg-gray-200 transition-colors">
        Proceed to Pay $579
      </button>
    </div>
  );
}
