"use client";

import React, { useCallback, useState } from "react";
import { Upload } from "lucide-react";

interface InventoryUploadProps {
  onFileUpload: (file: File) => void;
}

const InventoryUpload: React.FC<InventoryUploadProps> = ({ onFileUpload }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      const validTypes = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid CSV or Excel file");
        return;
      }

      // Validate file size (10GB = 10 * 1024 * 1024 * 1024 bytes)
      const maxSize = 10 * 1024 * 1024 * 1024;
      if (file.size > maxSize) {
        setError("File size must be less than 10GB");
        return;
      }

      setError("");
      setUploadedFile(file);
      onFileUpload(file);
    },
    [onFileUpload]
  );

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Upload Inventory List (CSV/Excel)
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-orange-400 transition-colors">
        <input
          type="file"
          accept=".csv,.xls,.xlsx"
          onChange={handleFileChange}
          className="hidden"
          id="inventory-upload"
        />
        <label htmlFor="inventory-upload" className="cursor-pointer">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
              <Upload className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-orange-500 font-medium">
                Upload inventory list
              </p>
              <p className="text-sm text-gray-500 mt-1">
                CSV, XLS or XLSX (max. 10GB)
              </p>
            </div>
          </div>
        </label>
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      {uploadedFile && !error && (
        <p className="text-sm text-green-600 mt-2">✓ {uploadedFile.name}</p>
      )}
    </div>
  );
};

export default InventoryUpload;
