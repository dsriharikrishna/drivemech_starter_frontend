"use client";

import React from "react";
import { Plus } from "lucide-react";
import TemplateItem from "./TemplateItem";
import type { Template } from "@/types/templates.types";

interface TemplateListProps {
  templates: Template[];
  onEdit: (template: Template) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <div className="space-y-2">
      {templates.map((template) => (
        <TemplateItem
          key={template.id}
          template={template}
          onEdit={() => onEdit(template)}
          onDelete={() => onDelete(template.id)}
        />
      ))}

      {templates.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          No templates added yet
        </div>
      )}

      {/* Add New Button */}
      <button
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors mt-4"
      >
        <Plus size={16} />
        Add New
      </button>
    </div>
  );
};

export default TemplateList;
