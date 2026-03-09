"use client";
import React, { InputHTMLAttributes } from "react";
import {
  useFormContext,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "form"
> {
  name: string;
  label?: string; // Made optional
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  className?: string;
  rules?: RegisterOptions;
  form?: UseFormReturn<any>;
  compact?: boolean; // Added for table cell usage
}

export default function CommonTextInput({
  name,
  label,
  placeholder = "",
  type = "text",
  className = "",
  required = false,
  disabled = false,
  autoComplete = "off",
  icon,
  leftIcon,
  rules = {},
  form,
  min,
  max,
  compact = false, // Added compact mode
  ...rest
}: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = form || useFormContext();

  // Handle nested field errors (e.g., "branches.0.branchName")
  const getNestedError = (errors: any, path: string): any => {
    const keys = path.split(/[.[\]]/).filter(Boolean);
    let current = errors;
    for (const key of keys) {
      if (current?.[key] === undefined) return undefined;
      current = current[key];
    }
    return current;
  };

  const fieldError = getNestedError(errors, name);
  const error = fieldError?.message as string | undefined;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && !compact && (
        <label
          htmlFor={name}
          className="inputLabel mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          min={min}
          max={max}
          className={`border text-sm block w-full 
            placeholder-gray-400
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500

            ${compact ? "rounded-md px-2 py-1 h-auto" : "rounded-xl h-[40px] px-3"}
            ${leftIcon ? "pl-12" : compact ? "px-2" : "pl-3"}
            ${icon ? "pr-10" : compact ? "px-2" : "pr-3"}

            ${error ? "border-red-500 bg-red-50" : "border-gray-300"}
          `}
          {...register(name, {
            ...rules,
            min,
            max,
          })}
          {...rest}
        />

        {icon && (
          <div className="absolute flex items-center top-1/2 right-3 transform -translate-y-1/2 pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
      </div>

      {error && !compact && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
