"use client";

import React, { useRef } from "react";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import Button from "@/components/ui/Button";

interface DocumentUploadProps {
  label: string;
  accept?: string;
  file: File | null;
  preview: string | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}

export default function DocumentUpload({
  label,
  accept = "image/*,application/pdf",
  file,
  preview,
  onFileSelect,
  onFileRemove,
  placeholder = "Upload document",
  required = false,
  disabled = false,
  className = "",
  onDragOver,
  onDrop,
}: DocumentUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const isImage = file?.type.startsWith("image/");
  const isPDF = file?.type === "application/pdf";

  return (
    <div className={className}>
      {/* Label */}
      <label className="inputLabel mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Upload Area */}
      {preview ? (
        // Preview with Remove Button
        <div className="relative border-2 border-gray-300 rounded-lg p-4 bg-white">
          {isImage ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
            />
          ) : isPDF ? (
            <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
              <div className="text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600 mt-2">PDF Document</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
              <div className="text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600 mt-2">Document</p>
              </div>
            </div>
          )}

          {/* Remove Button */}
          <div className="absolute top-2 right-2">
            <Button
              variant="danger"
              size="sm"
              rounded="full"
              onClick={onFileRemove}
              startIcon={<X size={14} />}
              disabled={disabled}
            />
          </div>

          {/* File Name */}
          <p className="text-xs text-gray-600 mt-2 truncate">{file?.name}</p>
        </div>
      ) : (
        // Upload Dropzone
        <div
          onDragOver={onDragOver}
          onDrop={onDrop}
          onClick={handleClick}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center 
            transition-all cursor-pointer
            ${disabled
              ? "border-gray-200 bg-gray-50 cursor-not-allowed"
              : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
            }
          `}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload
              className={`w-8 h-8 ${disabled ? "text-gray-300" : "text-gray-400"}`}
            />
            <div>
              <p
                className={`text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-700"
                  }`}
              >
                {placeholder}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Click to upload or drag & drop
              </p>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
}
