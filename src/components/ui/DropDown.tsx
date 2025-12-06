"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  id: string;
  name: string;
  description?: string;
}

interface ModalDropdownProps {
  items: DropdownItem[];
  selectedItem: DropdownItem | null;
  onSelect: (item: DropdownItem) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
}

export default function ModalDropdown({
  items,
  selectedItem,
  onSelect,
  placeholder = "Select",
  disabled = false,
  className = "",
  buttonClassName = "",
}: ModalDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: DropdownItem) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center justify-between w-full px-4 h-[40px] text-sm text-left bg-white border border-gray-300  rounded-xl ${buttonClassName} ${
          disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
        }`}
      >
        <span
          className={`text-[14px] truncate ${
            !selectedItem ? "text-gray-500" : "text-gray-900"
          }`}
        >
          {selectedItem ? selectedItem.name : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-900 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          } ${disabled ? "opacity-50" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-100 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          <div className="py-1">
            {items.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options available
              </div>
            ) : (
              items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`
                    w-full px-4 py-3 text-left transition-colors duration-150
                    hover:bg-gray-50 border-b border-gray-100 last:border-b-0
                    ${selectedItem?.id === item.id ? "bg-orange-50 text-orange-700" : "text-gray-700"}
                  `}
                >
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium">{item.name}</span>
                    {item.description && (
                      <span className="text-[12px] text-gray-500 mt-1">{item.description}</span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}