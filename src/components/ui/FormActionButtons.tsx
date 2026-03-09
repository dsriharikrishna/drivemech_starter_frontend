import React from "react";
import Button from "@/components/ui/Button";

interface FormActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
  cancelLabel?: string;
  saveLabel?: string;
  saveButtonColor?: "orange" | "green" | "blue";
  className?: string;
  disabled?: boolean;
  cancelDisabled?: boolean;
  saveDisabled?: boolean;
}

const FormActionButtons: React.FC<FormActionButtonsProps> = ({
  onCancel,
  onSave,
  cancelLabel = "Cancel",
  saveLabel = "Save",
  saveButtonColor = "orange",
  className = "",
  disabled = false,
  cancelDisabled = false,
  saveDisabled = false,
}) => {
  const isCancelDisabled = disabled || cancelDisabled;
  const isSaveDisabled = disabled || saveDisabled;

  return (
    <div className={`flex justify-center gap-4 pt-6 ${className}`}>
      <Button
        variant="danger"
        size="md"
        onClick={onCancel}
        disabled={isCancelDisabled}
        className="min-w-[140px]"
      >
        {cancelLabel}
      </Button>
      <Button
        variant={saveButtonColor === "orange" ? "primary" : saveButtonColor === "blue" ? "primary-blue" : "success"}
        size="md"
        onClick={onSave}
        disabled={isSaveDisabled}
        className="min-w-[140px]"
      >
        {saveLabel}
      </Button>
    </div>
  );
};

export default FormActionButtons;
