"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import AppTiptap from "@/components/editor/AppTiptap";

interface RichTextEditorProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onImagesChange?: (images: File[]) => void;
  onFilesAttached?: (files: File[]) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  name,
  label,
  placeholder = "Type your email here...",
  className = "",
  onImagesChange,
  onFilesAttached,
}) => {
  const form = useFormContext();
  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="inputLabel mb-2"
        >
          {label}
        </label>
      )}

      <div className={error ? "border border-red-500 rounded-xl" : ""}>
        <AppTiptap
          form={form}
          name={name}
          placeholder={placeholder}
          onImagesChange={onImagesChange}
          onFilesAttached={onFilesAttached}
        />
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default RichTextEditor;
