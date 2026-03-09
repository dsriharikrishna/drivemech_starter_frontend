"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import { Upload, X } from "lucide-react";

const mediaUploadSchema = z.object({
  files: z.array(z.instanceof(File)).max(5, "Maximum 5 files allowed"),
});

type MediaUploadFormValues = z.infer<typeof mediaUploadSchema>;

interface MediaUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (files: File[]) => void;
}

interface UploadedFile {
  file: File;
  preview: string;
}

export default function MediaUploadDialog({
  isOpen,
  onClose,
  onSubmit,
}: MediaUploadDialogProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<MediaUploadFormValues>({
    resolver: zodResolver(mediaUploadSchema),
    defaultValues: {
      files: [],
    },
  });

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
    "application/zip",
  ];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return "Only .jpg, .png, .svg and .zip files are allowed";
    }
    if (file.size > maxFileSize) {
      return "File size must be less than 10MB";
    }
    return null;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    const fileArray = Array.from(files);

    // Check if adding these files would exceed the limit
    if (uploadedFiles.length + fileArray.length > 5) {
      alert("Maximum 5 files allowed");
      return;
    }

    fileArray.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        alert(error);
        return;
      }

      const preview = URL.createObjectURL(file);
      newFiles.push({ file, preview });
    });

    const updatedFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updatedFiles);
    setValue(
      "files",
      updatedFiles.map((f) => f.file)
    );
  };

  const removeFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    setValue(
      "files",
      updatedFiles.map((f) => f.file)
    );
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFormSubmit = (data: MediaUploadFormValues) => {
    onSubmit(data.files);
    handleCancel();
  };

  const handleCancel = () => {
    setUploadedFiles([]);
    reset();
    onClose();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + "b";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + "Kb";
    return (bytes / (1024 * 1024)).toFixed(1) + "Mb";
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleCancel}>
      <DialogBody className="h-auto w-full md:w-2xl">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="p-6">
            <DialogHeader title="Media Upload" onClose={handleCancel} />

            <div className="mt-6 space-y-4">
              <p className="text-sm text-gray-500">
                Add your documents here, and you can upload up to 5 files max
              </p>

              {/* Drag and Drop Area */}
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Upload className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <span className="text-gray-700">Drag your file(s) or </span>
                    <button
                      type="button"
                      onClick={handleBrowseClick}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      browse
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Max 10 MB files are allowed
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.svg,.zip"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />

              <p className="text-xs text-gray-400">
                Only support .jpg, .png and .svg and zip files
              </p>

              {errors.files && (
                <p className="text-sm text-red-500">{errors.files.message}</p>
              )}

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadedFiles.map((uploadedFile, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <img
                        src={uploadedFile.preview}
                        alt={uploadedFile.file.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {uploadedFile.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(uploadedFile.file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <X size={18} className="text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="px-6 pb-6">
            <DialogFooter
              leftTitle="Cancel"
              rightTitle="Upload"
              onCancel={handleCancel}
              onConfirm={handleSubmit(handleFormSubmit)}
            />
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
