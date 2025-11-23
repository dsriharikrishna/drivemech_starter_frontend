// components/forms/CommonTextArea.tsx
"use client";
import React, { TextareaHTMLAttributes } from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  className?: string;
  rules?: RegisterOptions;
  rows?: number;
  register?: any;
}

export default function CommonTextArea({
  name,
  label,
  placeholder = "",
  className = "",
  required = false,
  disabled = false,
  autoComplete = "off",
  icon,
  leftIcon,
  rules = {},
  rows = 4,
  register,
  ...rest
}: TextAreaProps) {
  // Safely use form context
  const formContext = useFormContext();

  // Use provided register or form context register
  const actualRegister = register || formContext?.register;
  const errors = formContext?.formState.errors;

  const error = errors?.[name]?.message as string;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className="inputLabel mb-1 ">
          {label} {required && <span className="text-red-500 ml-[-2px] ">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-3 text-gray-400">
            {leftIcon}
          </div>
        )}

        <textarea
          id={name}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`border-2 placeHolder text-sm rounded-lg  block w-full px-3 py-2 pr-10 focus:border-primary-500 focus:ring-0
    ${error ? "border-red-500 bg-red-50" : "border-gray-200"} 
    ${leftIcon ? "pl-10" : "pl-3"}
    ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          {...(actualRegister ? actualRegister(name, rules) : {})}
          {...rest}
        />


        {icon && (
          <div className="absolute top-3 right-3 text-gray-500">
            {icon}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}