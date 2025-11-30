"use client";
import { useFormContext } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { SavedCard } from "@/types/payment";
import { CreditCard, HelpCircle } from "lucide-react";

interface Props {
  cards: SavedCard[];
  selected: string;
  setSelected: (id: string) => void;
}

export default function SavedCardsPanel({ cards, selected, setSelected }: Props) {
  const form = useFormContext();

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
      {cards.map((card, idx) => (
        <div key={card.id}>
          {/* Card Row */}
          <div
            onClick={() => setSelected(card.id)}
            className={`flex flex-col gap-3 py-4 cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              {/* Left: Radio + Details */}
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="savedCard"
                  checked={selected === card.id}
                  onChange={() => setSelected(card.id)}
                  className="w-5 h-5 text-blue-500 focus:ring-blue-500"
                />
                <div>
                  <p className="font-semibold text-[#1A2B4C]">
                    {card.bankName} {card.masked}
                  </p>
                  <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                </div>
              </div>

              {/* Right icon bubble */}
              <div className="w-10 h-10 rounded-full bg-[#EEF3FA] flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[#9BA6B8]" />
              </div>
            </div>

            {/* CVV + Pay (only for selected card) */}
            {selected === card.id && (
              <div className="flex items-end gap-4 mt-2 ml-8">
                <div className="relative w-[160px]">
                  <CommonTextInput
                    name="savedCardCvv"
                    label=""
                    placeholder="CVV"
                    form={form}
                    className="pr-10"
                  />
                  <HelpCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                <button className="bg-gradient-to-r from-[#FF7B34] to-[#FF8F3C] text-white py-3 px-10 rounded-xl font-semibold shadow hover:opacity-90 transition">
                  Pay $579
                </button>
              </div>
            )}
          </div>

          {/* Divider (only between cards) */}
          {idx !== cards.length - 1 && (
            <div className="border-b border-gray-200 my-2 ml-8" />
          )}
        </div>
      ))}
    </div>
  );
}
