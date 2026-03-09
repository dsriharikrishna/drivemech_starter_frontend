"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import TemplateList from "./TemplateList";
import TemplateDialog from "./TemplateDialog";
import type { Template, TemplateCategoryId } from "@/types/templates.types";

interface TemplateCategoryProps {
  title: string;
  categoryId: TemplateCategoryId;
  templates: Template[];
  isExpanded: boolean;
  onToggle: () => void;
  onAdd: (template: Omit<Template, "id">) => void;
  onEdit: (id: string, template: Omit<Template, "id">) => void;
  onDelete: (id: string) => void;
}

const TemplateCategory: React.FC<TemplateCategoryProps> = ({
  title,
  templates,
  isExpanded,
  onToggle,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  const handleOpenDialog = (template?: Template) => {
    setEditingTemplate(template || null);
    setShowDialog(true);
  };

  const handleSave = (template: Omit<Template, "id">) => {
    if (editingTemplate) {
      onEdit(editingTemplate.id, template);
    } else {
      onAdd(template);
    }
    setShowDialog(false);
    setEditingTemplate(null);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <FileText size={20} className="text-gray-700" />
          <span className="text-sm font-semibold text-gray-900">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <TemplateList
            templates={templates}
            onEdit={handleOpenDialog}
            onDelete={onDelete}
            onAdd={() => handleOpenDialog()}
          />
        </div>
      )}

      {/* Add/Edit Template Dialog */}
      <TemplateDialog
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(false);
          setEditingTemplate(null);
        }}
        onSave={handleSave}
        editingTemplate={editingTemplate}
      />
    </div>
  );
};

export default TemplateCategory;
