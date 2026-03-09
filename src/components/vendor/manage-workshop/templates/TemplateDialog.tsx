"use client";

import React, { useState, useEffect } from "react";
import Dialog from "@/components/modals/Dialog";
import type { Template } from "@/types/templates.types";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";

interface TemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Omit<Template, "id">) => void;
  editingTemplate?: Template | null;
}

const TemplateDialog: React.FC<TemplateDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTemplate,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    content: "",
  });

  useEffect(() => {
    if (editingTemplate) {
      setFormData({
        name: editingTemplate.name,
        description: editingTemplate.description || "",
        content: editingTemplate.content || "",
      });
    } else {
      setFormData({ name: "", description: "", content: "" });
    }
  }, [editingTemplate, isOpen]);

  const handleSave = () => {
    onSave(formData);
    setFormData({ name: "", description: "", content: "" });
  };

  const handleClose = () => {
    onClose();
    setFormData({ name: "", description: "", content: "" });
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      <DialogBody className="h-auto w-full md:w-2xl ">
        <div className="p-6 bg-white rounded-lg">
          <DialogHeader
            title={editingTemplate ? "Edit Template" : "Add New Template"}
            onClose={handleClose}
          />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter contact person name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Please go to [Settings][Company Lists] and choose or create the appropriate template"
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {/* Toolbar Icons */}
              <div className="flex items-center gap-2 mt-2 text-gray-500">
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <span className="text-lg">A</span>
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  📎
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  🔗
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  😊
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  ⚠️
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  🖼️
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  ⏰
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  ✏️
                </button>
                <div className="flex-1"></div>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  ⋮
                </button>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 rounded text-red-500"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!formData.name || !formData.content}
              className="px-8 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default TemplateDialog;
