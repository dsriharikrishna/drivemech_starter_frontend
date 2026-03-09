"use client";

import React from "react";
import { useController, useFormContext } from "react-hook-form";
import ModalDropdown from "@/components/ui/DropDown";

interface DropdownOption {
  value: string;
  label: string;
}

interface ControlledDropdownProps {
  name: string;
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function ControlledDropdown({
  name,
  label,
  options,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className = "",
}: ControlledDropdownProps) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  // Convert options to DropdownItem format
  const dropdownItems = options.map((option) => ({
    id: option.value,
    name: option.label,
  }));

  // Find selected item based on field value
  const selectedItem =
    dropdownItems.find((item) => item.id === field.value) || null;

  const handleSelect = (item: { id: string; name: string }) => {
    field.onChange(item.id);
  };

  return (
    <ModalDropdown
      items={dropdownItems}
      selectedItem={selectedItem}
      onSelect={handleSelect}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      label={label}
      required={required}
      error={error?.message}
    />
  );
}
