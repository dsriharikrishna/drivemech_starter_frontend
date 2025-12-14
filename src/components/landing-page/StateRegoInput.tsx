"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface StateRegoInputProps {
    stateValue: string;
    regoValue: string;
    onStateChange: (value: string) => void;
    onRegoChange: (value: string) => void;
    states: Array<{ id: string; name: string }>;
    register?: any;
}

export default function StateRegoInput({
    stateValue,
    regoValue,
    onStateChange,
    onRegoChange,
    states,
    register,
}: StateRegoInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { formState: { errors } } = useFormContext();

    const stateError = errors.state?.message as string | undefined;
    const regoError = errors.rego?.message as string | undefined;
    const hasError = stateError || regoError;

    return (
        <div className="flex flex-col gap-1.5">
            <label className="block text-sm font-semibold text-gray-900">
                State & Rego
            </label>

            <div className={`relative flex items-center h-10 bg-white border rounded-xl px-4 transition-all
                ${hasError ? "border-red-500 bg-red-50" : "border-gray-300"}
                focus-within:ring-2 ${hasError ? "focus-within:ring-red-500 focus-within:border-red-500" : "focus-within:ring-blue-500 focus-within:border-blue-500"}
            `}>
                {/* State Dropdown */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-900 focus:outline-none pr-4 hover:text-gray-700 transition-colors"
                    >
                        {stateValue || "AP"}
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsOpen(false)}
                            />
                            <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
                                {states.map((state) => (
                                    <button
                                        key={state.id}
                                        type="button"
                                        onClick={() => {
                                            onStateChange(state.id);
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                    >
                                        <span className="font-medium">{state.id}</span>
                                        <span className="text-gray-500 ml-1">- {state.name}</span>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-gray-300 mx-2" />

                {/* Rego Input */}
                <input
                    type="text"
                    placeholder="Enter Rego"
                    value={regoValue}
                    onChange={(e) => onRegoChange(e.target.value)}
                    className="flex-1 h-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none min-w-0 truncate"
                />
            </div>

            {/* Error Messages */}
            {/* {stateError && <p className="text-sm text-red-500 mt-1">{stateError}</p>} */}
            {/* {regoError && <p className="text-sm text-red-500 mt-1">{regoError}</p>} */}
        </div>
    );
}
