"use client";
import React, { InputHTMLAttributes } from "react";
import { useFormContext, RegisterOptions, UseFormReturn } from "react-hook-form";

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form'> {
  name: string;
  label: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  className?: string;
  rules?: RegisterOptions;
  form?: UseFormReturn<any>;
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
  ...rest
}: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = form || useFormContext();

  // FIXED: Safe type handling
  const fieldError = errors[name];
  const error = fieldError?.message as string | undefined;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className="inputLabel mb-1 ">
          {label} {required && <span className="text-red-500 ml-[-2]">*</span>}
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
          className={`border text-sm rounded-xl block w-full h-[40px] px-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400
            ${error ? "border-red-500 bg-red-50" : "border-gray-300"}
            ${leftIcon ? "pl-12" : "pl-3"}
          `}
          {...register(name, rules)}
          {...rest}
        />

        {icon && (
          <div className="absolute flex items-center top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
