"use client";

import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import type { Template } from "@/types/templates.types";

interface TemplateItemProps {
  template: Template;
  onEdit: () => void;
  onDelete: () => void;
}

const TemplateItem: React.FC<TemplateItemProps> = ({
  template,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{template.name}</p>
        {template.description && (
          <p className="text-xs text-gray-500 mt-1">{template.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TemplateItem;
