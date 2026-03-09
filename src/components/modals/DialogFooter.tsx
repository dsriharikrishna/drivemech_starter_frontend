"use client";

import Button from "../ui/Button";

interface DialogFooterProps {
  leftTitle?: string;
  rightTitle?: string;
  leftVariant?: "primary" | "secondary" | "gradient" | "outline" | "ghost" | "danger" | "success" | "primary-blue" | "icon-edit" | "icon-delete" | "icon-ghost" | "outline-blue" | "custom";
  rightVariant?: "primary" | "secondary" | "gradient" | "outline" | "ghost" | "danger" | "success" | "primary-blue" | "icon-edit" | "icon-delete" | "icon-ghost" | "outline-blue" | "custom";
  onCancel?: () => void;
  onConfirm?: () => void;
  className?: string;
  onDelete?: () => void;
  isDeleteButtonVisible?: boolean;
  disabled?: boolean;
}

export default function DialogFooter({
  leftTitle = "Cancel",
  rightTitle = "Save",
  leftVariant = "outline",
  rightVariant = "primary",
  onCancel,
  onConfirm,
  className = "",
  onDelete,
  isDeleteButtonVisible = false,
  disabled = false,
}: DialogFooterProps) {
  return (
    <div
      className={`w-full flex ${isDeleteButtonVisible ? "justify-between" : "justify-center"} items-center gap-2 mt-4 ${className}`}
    >
      {isDeleteButtonVisible && (
        <Button
          variant="danger"
          size="md"
          onClick={onDelete}
          className="flex-1"
          disabled={disabled}
        >
          Delete
        </Button>
      )}
      <Button
        variant={leftVariant}
        onClick={onCancel}
        className="flex-1"
        disabled={disabled}
      >
        {leftTitle}
      </Button>

      <Button
        variant={rightVariant}
        onClick={onConfirm}
        className="flex-1"
        disabled={disabled}
      >
        {rightTitle}
      </Button>
    </div>
  );
}
