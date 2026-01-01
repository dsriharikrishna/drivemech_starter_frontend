"use client";
import { useFormContext } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { CreditCard, HelpCircle } from "lucide-react";
import { Calendar } from "phosphor-react";

interface CardPanelProps {
  handleNext: () => void

}

export default function CardPanel({ handleNext }: CardPanelProps) {
  const form = useFormContext();

  return (
    <div className="bg-white rounded-2xl p-6 border border-border flex flex-col gap-6">

      <div className="space-y-4">
        <CommonTextInput
          name="cardNumber"
          label="Card Number"
          placeholder="Card Number"
          form={form}
          icon={<CreditCard className="w-5 h-5 text-gray-400" />}
        />

        <div className="grid grid-cols-2 gap-4">
          <CommonTextInput
            name="expiry"
            label="Valid Thru"
            placeholder="MM/YY"
            form={form}
            icon={<Calendar className="w-5 h-5 text-gray-400" />}
          />
          <CommonTextInput
            name="cvv"
            label="CVV"
            placeholder="CVV"
            form={form}
            icon={<HelpCircle className="w-4 h-4 text-gray-400" />}
          />
        </div>

        <CommonTextInput
          name="nameOnCard"
          label="Name on the card"
          placeholder="Name on the Card"
          form={form}
        />
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
        />
        <span>Save card for further use</span>
      </div>

      <button onClick={handleNext} className="w-full bg-orange-500 text-white py-2 rounded-xl font-semibold text-base shadow-sm hover:bg-orange-600 transition-colors">
        Proceed to Pay $579
      </button>
    </div>
  );
}
