"use client";

import { EditIcon } from "@/components/icons/ManageWorkshopIcons";
import Button from "@/components/ui/Button";

export default function ManageWorkshopHeader({
  title,
  editButtonLabel,
  editButtonAction,
}: {
  title: string;
  editButtonLabel: string;
  editButtonAction: () => void;
}) {
  return (
    <div className="flex items-center justify-between my-3">
      <h1 className="text-lg font-medium text-gray-900">{title}</h1>
      <Button
        size="sm"
        variant="primary"
        startIcon={<EditIcon className="w-4 h-4" />}
        onClick={editButtonAction}
      >
        {editButtonLabel}
      </Button>
    </div>
  );
}
