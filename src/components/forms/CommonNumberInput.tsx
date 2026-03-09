"use client";
import React, { InputHTMLAttributes, useState } from "react";
import {
  useFormContext,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

interface NumberInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "form" | "type"
> {
  name: string;
  label?: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  className?: string;
  rules?: RegisterOptions;
  form?: UseFormReturn<any>;
  compact?: boolean;
  min?: number;
  max?: number;
  step?: number;
  allowFloat?: boolean; // Allow decimal values
  decimalPlaces?: number; // Number of decimal places to allow
}

export default function CommonNumberInput({
  name,
  label,
  placeholder = "0",
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
  step = 1,
  allowFloat = false,
  decimalPlaces = 2,
  compact = false,
  ...rest
}: NumberInputProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form || useFormContext();

  const fieldError = errors[name];
  const error = fieldError?.message as string | undefined;
  const currentValue = watch(name);

  // Handle value change with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Allow empty string
    if (value === "") {
      setValue(name, "");
      return;
    }

    // Parse the value
    let numValue = allowFloat ? parseFloat(value) : parseInt(value, 10);

    // Validate number
    if (isNaN(numValue)) {
      return; // Don't update if invalid
    }

    // Apply min/max constraints
    if (min !== undefined && numValue < min) {
      numValue = min;
    }
    if (max !== undefined && numValue > max) {
      numValue = max;
    }

    // Format float values
    if (allowFloat && decimalPlaces !== undefined) {
      // Don't round while typing, only on blur
      setValue(name, numValue);
    } else {
      setValue(name, numValue);
    }
  };

  // Handle blur to format the value
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value === "" || value === null || value === undefined) {
      return;
    }

    let numValue = allowFloat ? parseFloat(value) : parseInt(value, 10);

    if (isNaN(numValue)) {
      setValue(name, "");
      return;
    }

    // Apply min/max constraints
    if (min !== undefined && numValue < min) {
      numValue = min;
    }
    if (max !== undefined && numValue > max) {
      numValue = max;
    }

    // Format the value
    if (allowFloat) {
      setValue(name, parseFloat(numValue.toFixed(decimalPlaces)));
    } else {
      setValue(name, Math.floor(numValue));
    }
  };

  // Increment/Decrement handlers
  const handleIncrement = () => {
    const current = parseFloat(currentValue) || 0;
    let newValue = current + step;

    if (max !== undefined && newValue > max) {
      newValue = max;
    }

    setValue(
      name,
      allowFloat
        ? parseFloat(newValue.toFixed(decimalPlaces))
        : Math.floor(newValue)
    );
  };

  const handleDecrement = () => {
    const current = parseFloat(currentValue) || 0;
    let newValue = current - step;

    if (min !== undefined && newValue < min) {
      newValue = min;
    }

    setValue(
      name,
      allowFloat
        ? parseFloat(newValue.toFixed(decimalPlaces))
        : Math.floor(newValue)
    );
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && !compact && (
        <label
          htmlFor={name}
          className="inputLabel mb-2"
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
          type="number"
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          min={min}
          max={max}
          step={allowFloat ? step : 1}
          className={`border text-sm block w-full 
            placeholder-gray-400
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500

            ${compact ? "rounded-md px-2 py-1 h-auto" : "rounded-xl h-[40px] px-3"}
            ${leftIcon ? "pl-12" : compact ? "px-2" : "pl-3"}
            ${icon ? "pr-10" : compact ? "px-2" : "pr-3"}

            ${error ? "border-red-500 bg-red-50" : "border-gray-300"}
          `}
          {...register(name, {
            required: rules.required,
            min: rules.min,
            max: rules.max,
            maxLength: rules.maxLength,
            minLength: rules.minLength,
            disabled: rules.disabled,
            onChange: rules.onChange,
            onBlur: rules.onBlur,
            deps: rules.deps,
            setValueAs: rules.setValueAs,
            shouldUnregister: rules.shouldUnregister,
            valueAsNumber: true,
            validate: {
              ...(rules.validate || {}),
              ...(min !== undefined && {
                min: (v) => v >= min || `Minimum value is ${min}`,
              }),
              ...(max !== undefined && {
                max: (v) => v <= max || `Maximum value is ${max}`,
              }),
            },
          } as RegisterOptions)}
          onChange={handleChange}
          onBlur={handleBlur}
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
