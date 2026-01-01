"use client";
import Image from "next/image";
import { BankOption } from "@/types/payment";

interface Props {
  banks: BankOption[];
  selected: string;
  setSelected: (name: string) => void;
  handleNext: () => void

}

export default function OnlineBankingPanel({ banks, selected, setSelected ,handleNext}: Props) {
  return (
    <div className="border border-gray-200 rounded-3xl p-4 flex flex-col gap-1 bg-white">

      {banks.map((bank) => (
        <div key={bank.name}>
          <div
            className="flex flex-col cursor-pointer py-2"
            onClick={() => setSelected(bank.name)}
          >
            {/* Row */}
            <div className="flex items-center justify-between">
              {/* Left */}
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="onlineBank"
                  checked={selected === bank.name}
                  onChange={() => setSelected(bank.name)}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-[15px] text-[#1A1A1A]">
                  {bank.name}
                </span>
              </div>

              {/* Logo */}
              <Image
                src={bank.logo}
                alt={bank.name.slice(0, 1)}
                width={26}
                height={26}
                className="object-contain"
              />
            </div>

            {/* CTA button (compact spacing) */}
            {selected === bank.name && (
              <div className="mt-2">
                <button onClick={handleNext} className="w-full py-3 rounded-xl text-white font-semibold text-[15px] bg-gradient-to-r from-[#FF7B34] to-[#FF8F3C] shadow hover:opacity-95 transition">
                  Proceed to Pay $579
                </button>
              </div>
            )}
          </div>

          {/* Divider (tight) */}
          {banks[banks.length - 1].name !== bank.name && (
            <div className="border-b border-gray-200 my-0.5 ml-6" />
          )}
        </div>
      ))}

    </div>
  );
}
