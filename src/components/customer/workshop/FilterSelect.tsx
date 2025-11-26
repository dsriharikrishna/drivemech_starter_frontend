'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterSelect({
  label,
  options,
  onSelect,
}: {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 flex items-center gap-2 border rounded-lg bg-white shadow-sm text-sm"
      >
        {label}
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-white border shadow rounded-lg z-20">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
