"use client";

import { useState, useRef, useEffect } from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { ChevronDown } from "lucide-react";

export type StateOption = {
    id: string;
    name: string;
    code: string;
};

interface RegoInputProps {
    name: string;
    stateName: string;
    label?: string;
    regoLabel?: string;
    rules?: RegisterOptions;
    placeholder?: string;
    stateOptions: StateOption[];
    required?: boolean;
    className?: string;
    disabled?: boolean;
    error?: string;
}

export default function RegoInput({
    name,
    stateName,
    label = "State",
    regoLabel = "Rego",
    rules = {},
    placeholder = "Enter your Reg. Number",
    stateOptions = [],
    required = false,
    className = "",
    disabled = false,
    error: propError = "",
}: RegoInputProps) {
    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const selectedStateValue = watch(stateName);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedState = stateOptions.find(s => s.code === selectedStateValue) || stateOptions[0] || { code: "AP", name: "Andhra Pradesh" };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!dropdownRef.current?.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleStateSelect = (option: StateOption) => {
        setValue(stateName, option.code, { shouldValidate: true });
        setDropdownOpen(false);
    };

    const error = propError || (errors[name]?.message as string | undefined);

    return (
        <div className="flex flex-col w-full relative" ref={dropdownRef}>
            {/* LABELS */}
            <div className="flex w-full mb-1">
                <label className="inputLabel w-[60px]">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <label className="inputLabel ml-4">
                    {regoLabel} {required && <span className="text-red-500">*</span>}
                </label>
            </div>

            {/* INPUT WRAPPER */}
            <div
                className={`
          flex items-center w-full border rounded-xl bg-white relative h-[42px]
          ${error ? "border-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          ${className}
        `}
            >
                {/* STATE SELECT */}
                <button
                    type="button"
                    onClick={() => !disabled && setDropdownOpen(!dropdownOpen)}
                    disabled={disabled}
                    className={`flex items-center justify-between w-[60px] px-3 border-r border-gray-200 h-[28px] ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                >
                    <span className="text-gray-800 font-medium text-sm">
                        {selectedState.code}
                    </span>
                    <ChevronDown size={14} className="text-gray-400" />
                </button>

                {/* REGO INPUT */}
                <input
                    {...register(name, rules)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full px-4 text-sm text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none h-full ${disabled ? "cursor-not-allowed" : ""}`}
                />
            </div>

            {/* DROPDOWN LIST */}
            {dropdownOpen && (
                <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 shadow-xl rounded-xl w-48 z-50">
                    <ul className="max-h-60 overflow-y-auto py-2">
                        {stateOptions.map((option) => (
                            <li key={option.code}>
                                <button
                                    type="button"
                                    onClick={() => handleStateSelect(option)}
                                    className="w-full flex items-center justify-between px-4 py-2 hover:bg-blue-50 text-left transition-colors"
                                >
                                    <span className="font-medium text-sm text-gray-800">{option.code}</span>
                                    <span className="text-xs text-gray-500">{option.name}</span>
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
