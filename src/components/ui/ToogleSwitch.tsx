
"use client";

import { InputHTMLAttributes } from "react";

interface ToggleSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;  
}

export default function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
  ...props
}: ToggleSwitchProps) {
  return (
    <label className="inline-flex items-center cursor-pointer w-full">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <div
        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none 
        rounded-full peer dark:bg-gray-700 
        peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
        peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
        after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
        after:transition-all dark:border-gray-600 peer-checked:bg-second-primary dark:peer-checked:bg-blue-600"
      ></div>

      {(label || description) && (
        <div className="flex flex-col ml-3">
          {label && <span className="text-sm text-gray-heading">{label}</span>}
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>
      )}
    </label>
  );
}
