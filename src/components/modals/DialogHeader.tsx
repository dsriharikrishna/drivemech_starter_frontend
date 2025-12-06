"use client";

import { X } from "lucide-react";

interface DialogHeaderProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
}

export default function DialogHeader({
  title,
  subtitle,
  onClose,
}: DialogHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-100 transition cursor-pointer"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  );
}