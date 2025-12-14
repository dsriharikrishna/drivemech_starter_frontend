"use client";

import { useFormContext } from "react-hook-form";

interface PostcodeInputProps {
    value: string;
    onChange: (value: string) => void;
    register?: any;
}

export default function PostcodeInput({ value, onChange, register }: PostcodeInputProps) {
    const { formState: { errors } } = useFormContext();

    const fieldError = errors.postcode;
    const error = fieldError?.message as string | undefined;

    return (
        <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="postcode" className="block text-sm font-semibold text-gray-900">
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FF6B35" />
                    </svg>
                </div>
            </div>

            {/* {error && <p className="text-sm text-red-500 mt-1">{error}</p>} */}
        </div>
    );
}
