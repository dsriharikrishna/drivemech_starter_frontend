// components/Form/MultiSelectDropdown.tsx
"use client";

import React from "react";
import { ChevronDown, X, Search } from "lucide-react";

export interface Option {
  id: string;
  name: string;
}

interface MultiSelectDropdownProps {
  label: string;
  options: Option[];
  selectedValues: Option[];
  onChange: (values: Option[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  error?: string;
  required?: boolean;
  variant?: "primary" | "secondary";
  onSearch?: (searchTerm: string) => void;
  isLoading?: boolean;
  showSearch?: boolean;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Select options",
  searchPlaceholder = "Search options...",
  error,
  required = false,
  variant = "primary",
  showSearch = true,
  onSearch,
}) => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  /* ---------------------- Close on Click Outside ---------------------- */
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
    if (!open) setSearchTerm("");
  };

  /* ---------------------- Multi-Select Logic ---------------------- */
  const handleOptionToggle = (option: Option) => {
    const exists = selectedValues.some((s) => s.id === option.id);
    const updated = exists
      ? selectedValues.filter((s) => s.id !== option.id)
      : [...selectedValues, option];

    onChange(updated);
  };

  const removeOption = (option: Option, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedValues.filter((s) => s.id !== option.id));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const filteredOptions = onSearch
    ? options
    : options.filter((o) =>
        o.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const colorVariants = {
    primary: "border-primary focus:ring-primary focus:border-primary",
    secondary: "border-secondary focus:ring-secondary focus:border-secondary",
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-secondary-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`flex justify-between items-center w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white 
        focus:outline-none focus:ring-2 focus:ring-offset-1 
        ${colorVariants[variant]}  
        ${error ? "border-red-500 focus:ring-red-500" : ""}`}
      >
        <div className="flex flex-wrap gap-1 flex-1 text-left">
          {selectedValues.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            selectedValues.map((value) => (
              <span
                key={value.id}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {value.name}
                <X
                  className="w-3 h-3 cursor-pointer hover:bg-blue-200 rounded-full"
                  onClick={(e) => removeOption(value, e)}
                />
              </span>
            ))
          )}
        </div>

        <div className="flex items-center gap-1 ml-2">
          {selectedValues.length > 0 && (
            <X
              className="w-4 h-4 text-gray-400 hover:text-gray-600"
              onClick={clearAll}
            />
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Error */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {/* Dropdown */}
      <div
        className={`absolute left-0 w-full z-20 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 
        transition-all duration-150 
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        {/* Search */}
        {showSearch && (
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {searchTerm && (
                <X
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer"
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>
          </div>
        )}

        {/* Options */}
        <div className="max-h-60 overflow-y-auto p-2">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">
              {searchTerm ? "No options found" : "No options available"}
            </div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionToggle(option)}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.some((s) => s.id === option.id)}
                  readOnly
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                />
                <label className="ml-2 text-sm text-gray-700 cursor-pointer w-full">
                  {option.name}
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
