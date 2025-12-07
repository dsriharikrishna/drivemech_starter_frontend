"use client";

import { WarningCircle } from "phosphor-react";
import Button from "@/components/ui/Button";

export default function DeleteDialogBody({
  title = "Delete Item?",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  cancelLabel = "Cancel",
  confirmLabel = "Yes, Delete",
  onCancel,
  onConfirm,
}: {
  title?: string;
  message?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="space-y-5">

      {/* TOP CONTENT */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
          <WarningCircle size={26} className="text-red-600" />
        </div>

        <div className="flex-1">
          <p className="text-base font-semibold text-red-700">{title}</p>
          <p className="text-sm text-gray-700 mt-1 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          className="px-5"
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>

        <Button
          variant="primary"
          className="px-5"
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}
