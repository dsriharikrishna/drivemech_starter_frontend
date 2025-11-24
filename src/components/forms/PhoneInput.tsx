"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { getFlagUrl } from "@/utils";

export type CountryOption = {
  code: string;
  label: string;
  iso: string;
};

interface PhoneInputProps {
  name: string;
  label: string;
  rules?: RegisterOptions;
  placeholder?: string;
  countryOptions: CountryOption[];
  required?: boolean;
  className?: string;
  value?: any;  
  onChange?: (value: any) => void;  

  // NEW props
  p?: string;   // padding
  h?: string;   // height
}

export default function PhoneInput({
  name,
  label,
  rules = {},
  placeholder = "1234 567 890",
  countryOptions = [],
  required = false,
  className = "",
  p = "px-3 py-2",
  h = "h-[40px]"
}: PhoneInputProps) {
  const { register, setValue, formState: { errors } } = useFormContext();

  const [selectedCountry, setSelectedCountry] = useState<CountryOption>({
    code: "IN",
    label: "India",
    iso: "IN",
  });

  useEffect(() => {
    if (countryOptions.length > 0) {
      setSelectedCountry(countryOptions[0]);
    }
  }, [countryOptions]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setValue(name, raw, { shouldValidate: true });
  };

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col w-full relative" ref={dropdownRef}>
      {/* LABEL */}
      {label && (
        <label className="inputLabel mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* INPUT WRAPPER */}
      <div
        className={`
          flex items-center w-full border rounded-xl bg-white relative h-[40px]
          ${p}
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      >
        {/* FLAG + COUNTRY CODE */}
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 pr-3 border-r border-gray-200 cursor-pointer"
        >
          <span className="text-gray-700 font-medium">
            {selectedCountry.code}
          </span>

          <Image
            src={getFlagUrl(selectedCountry.iso)}
            width={24}
            height={18}
            alt={selectedCountry.label}
            unoptimized
            className="rounded-sm"
          />
        </button>

        {/* PHONE INPUT */}
        <input
          {...register(name, rules)}
          maxLength={15}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full pl-3 text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none h-full ${className}`}
        />
      </div>

      {/* DROPDOWN LIST */}
      {dropdownOpen && (
        <div className="absolute left-0 mt-16 bg-white border border-gray-100 shadow-lg rounded-xl w-auto z-30">
          <ul className="max-h-60 overflow-y-auto py-2">
            {countryOptions.map((c) => (
              <li key={c.iso}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCountry(c);
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left"
                >
                  <span className="font-medium text-sm">{c.code}</span>

                  <Image
                    src={getFlagUrl(c.iso)}
                    width={24}
                    height={18}
                    alt={c.label}
                    unoptimized
                    className="rounded-sm"
                  />

                  <span className="text-xs text-gray-500">{c.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
