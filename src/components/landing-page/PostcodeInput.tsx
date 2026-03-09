"use client";

import { useFormContext } from "react-hook-form";

interface PostcodeInputProps {
  value: string;
  onChange: (value: string) => void;
  register?: any;
}

export default function PostcodeInput({
  value,
  onChange,
  register,
}: PostcodeInputProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const fieldError = errors.postcode;
  const error = fieldError?.message as string | undefined;

  return (
    <div className="flex-1 flex flex-col gap-1.5">
      <label
        htmlFor="postcode"
        className="block text-sm font-semibold text-gray-900 text-left"
      >
        Postcode or Suburb
      </label>

      <div className="relative">
        <input
          id="postcode"
          type="text"
          placeholder="Enter postcode or suburb"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-10 rounded-lg border text-gray-900 bg-white pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 transition-all w-full
            ${error ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}
          `}
        />

        <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <img
            src="/svgs/location-icon.svg"
            alt="Location"
            className="w-4 h-4"
          />
        </div>
      </div>

      {/* {error && <p className="text-sm text-red-500 mt-1">{error}</p>} */}
    </div>
  );
}
