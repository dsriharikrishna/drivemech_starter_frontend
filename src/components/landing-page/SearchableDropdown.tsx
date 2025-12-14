"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface SearchableDropdownProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    options: Array<{ id: string; name: string }>;
    register?: any;
    fieldName: string;
    required?: boolean;
}

export default function SearchableDropdown({
    label,
    placeholder,
    value,
    onChange,
    options,
    register,
    fieldName,
    required = true
}: SearchableDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { formState: { errors } } = useFormContext();

    const selectedOption = options.find(opt => opt.id === value);
    const displayValue = selectedOption ? selectedOption.name : placeholder;

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fieldError = errors[fieldName];
    const error = fieldError?.message as string | undefined;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchQuery("");
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="flex-1 flex flex-col gap-1.5" ref={dropdownRef}>
            <label className="block text-sm font-semibold text-gray-900">{label}</label>

            {/* Hidden input for form registration */}
            <input
                type="hidden"
                value={value}
                {...(register ? register(fieldName, required ? { required: `${label} is required` } : {}) : {})}
            />

            {/* Custom Dropdown Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`h-10 rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all duration-200 w-full flex items-center justify-between hover:border-gray-400
                    ${error ? "border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"}
                `}
            >
                <span className={value ? "text-gray-900" : "text-gray-500"}>{displayValue}</span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 mt-[72px] w-full max-w-[calc(25%-0.75rem)] bg-white border border-gray-200 rounded-xl shadow-xl">
                    {/* Search Input */}
                    <div className="p-3 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                                autoFocus
                                className="w-full pl-10 pr-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            />
                        </div>
                    </div>

                    {/* Options List */}
                    <div className="max-h-64 overflow-y-auto py-2">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.id);
                                        setIsOpen(false);
                                        setSearchQuery("");
                                    }}
                                    className="w-full text-left px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-3"
                                >
                                    {/* Placeholder for brand logo */}
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                                        {option.name.charAt(0)}
                                    </div>
                                    <span className="font-medium">{option.name}</span>
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                No results found
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
}
