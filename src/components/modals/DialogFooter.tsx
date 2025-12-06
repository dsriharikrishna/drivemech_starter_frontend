"use client";

import Button from "../ui/Button";


interface DialogFooterProps {
  leftTitle?: string;
  rightTitle?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  className?: string; 
}

export default function DialogFooter({
  leftTitle = "Cancel",
  rightTitle = "Save",
  onCancel,
  onConfirm,
  className = "",  
}: DialogFooterProps) {
  return (
    <div className={`w-full flex justify-between items-center gap-2 mt-4 ${className}`}>
      <Button variant="outline" onClick={onCancel} className="flex-1">
        {leftTitle}
      </Button>

      <Button variant="primary" onClick={onConfirm}  className="flex-1">
        {rightTitle}
      </Button>
    </div>
  );
}