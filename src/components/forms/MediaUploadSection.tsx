"use client";

import React from "react";
import { CloudUpload } from "lucide-react";
import Button from "@/components/ui/Button";

interface MediaUploadSectionProps {
    onSave?: () => void;
    onCancel?: () => void;
    maxFiles?: number;
    maxSizeMB?: number;
}

export default function MediaUploadSection({
    onSave,
    onCancel,
    maxFiles = 5,
    maxSizeMB = 10,
}: MediaUploadSectionProps) {
    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900">Media Upload</h3>
                <p className="text-sm text-gray-400 mt-1">
                    Add your documents here, and you can upload up to {maxFiles} files max
                </p>
            </div>

            <div className="border-2 border-dashed border-blue-200 rounded-xl p-12 bg-white text-center hover:bg-blue-50/30 transition-colors cursor-pointer group">
                <div className="flex flex-col items-center gap-3">
                    <CloudUpload className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-gray-600">
                        Drag your file(s) or <span className="text-blue-500 hover:underline">browse</span>
                    </p>
                    <p className="text-xs text-gray-400">
                        Max {maxSizeMB} MB files are allowed
                    </p>
                </div>
            </div>

            <p className="text-[10px] text-gray-400 mt-4">
                Only support .jpg, .png and .svg and .zip files
            </p>

            <div className="mt-8 flex justify-center gap-4">
                <Button
                    variant="outline"
                    size="md"
                    onClick={onCancel}
                    className="min-w-[140px] border-orange-400 text-orange-500 hover:bg-orange-50"
                >
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    size="md"
                    onClick={onSave}
                    className="min-w-[140px] shadow-lg shadow-orange-200"
                >
                    Save
                </Button>
            </div>
        </div>
    );
}
