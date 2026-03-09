"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogFooter from "@/components/modals/DialogFooter";
import CommonTextInput from "@/components/forms/CommonTextInput";
import RichTextEditor from "@/components/forms/RichTextEditor";
import { FormProvider, useForm } from "react-hook-form";
import type { Template, TemplateCategoryId } from "@/types/templates.types";
import { DeleteIcon, EditIcon } from "@/components/icons/ManageWorkshopIcons";
import { DocumentTextIcon } from "@/components/icons/ManagementModuleIcons";

// Form data interface for dialog forms
interface TemplateFormData {
  name: string;
  description: string;
  content: string;
}

// API Payload Types
interface CreateTemplatePayload {
  name: string;
  description?: string;
  content?: string;
  type: TemplateCategoryId; // "documents" | "emails" | "sms" | "invoice-notes" | etc.
  categoryId?: string; // Optional: for subcategories
}

interface UpdateTemplatePayload {
  id: string;
  name: string;
  description?: string;
  content?: string;
  type: TemplateCategoryId; // "documents" | "emails" | "sms" | "invoice-notes" | etc.
  categoryId?: string; // Optional: for subcategories
}

interface DeleteTemplatePayload {
  id: string;
  type: TemplateCategoryId; // "documents" | "emails" | "sms" | "invoice-notes" | etc.
}

// API Response Types
interface TemplateResponse {
  success: boolean;
  message?: string;
  data: Template;
}

interface TemplatesResponse {
  success: boolean;
  message?: string;
  data: Record<TemplateCategoryId, Template[]>;
}

interface DeleteResponse {
  success: boolean;
  message?: string;
}

const TemplatesTab = () => {
  const [expandedCategory, setExpandedCategory] =
    useState<TemplateCategoryId | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    categoryId: TemplateCategoryId;
    template: Template;
  } | null>(null);
  const [currentCategoryId, setCurrentCategoryId] =
    useState<TemplateCategoryId | null>(null);

  const [categories, setCategories] = useState<
    Record<TemplateCategoryId, Template[]>
  >({
    "invoice-notes": [
      {
        id: "1",
        name: "Minor Service - Sample Template",
        description: "",
        content: "",
      },
      {
        id: "2",
        name: "Major Service - Sample Template",
        description: "",
        content: "",
      },
    ],
    "job-card-notes": [
      {
        id: "1",
        name: "Minor Service - Sample Template",
        description: "",
        content: "",
      },
      {
        id: "2",
        name: "Major Service - Sample Template",
        description: "",
        content: "",
      },
    ],
    documents: [
      {
        id: "1",
        name: "Service - Sample Template",
        description: "",
        content: "",
      },
    ],
    emails: [
      {
        id: "1",
        name: "Booking Reminder - Sample Template",
        description: "",
        content: "",
      },
      {
        id: "2",
        name: "Invoice - Sample Template",
        description: "",
        content: "",
      },
      {
        id: "3",
        name: "No Contact Service - Sample Template",
        description: "",
        content: "",
      },
      {
        id: "4",
        name: "Service Reminder - Sample Template",
        description: "",
        content: "",
      },
      {
        id: "5",
        name: "Statement - Sample Template",
        description: "",
        content: "",
      },
    ],
    "unit-for-sale": [
      { id: "1", name: "Test - Sample Template", description: "", content: "" },
      {
        id: "2",
        name: "Used Vehicle - Sample Template",
        description: "",
        content: "",
      },
    ],
    sms: [
      {
        id: "1",
        name: "Booking Reminder - Sample Template",
        description: "",
        content: "",
      },
      {
        id: "2",
        name: "No Contact Service - Sample Template",
        description: "",
        content: "",
      },
      {
        id: "3",
        name: "Service Reminder - Sample Template",
        description: "",
        content: "",
      },
      {
        id: "4",
        name: "Vehicle Collection - Sample Template",
        description: "",
        content: "",
      },
    ],
    "customer-source": [
      {
        id: "1",
        name: "Social Media",
        description: "Social Media",
        content: "",
      },
      {
        id: "2",
        name: "Google Search",
        description: "Google Search",
        content: "",
      },
      {
        id: "3",
        name: "Radio/TV Advertising",
        description: "Radio/TV Advertising",
        content: "",
      },
      { id: "4", name: "Print Media", description: "Print Media", content: "" },
      {
        id: "5",
        name: "Immediate Campaign",
        description: "Immediate Campaign",
        content: "",
      },
    ],
    "payment-methods": [],
    "product-categories": [],
    "product-groups": [],
  });

  const addFormMethods = useForm<TemplateFormData>({
    defaultValues: {
      name: "",
      description: "",
      content: "",
    },
  });

  const editFormMethods = useForm<TemplateFormData>();

  const categoryList: Array<{ id: TemplateCategoryId; title: string }> = [
    { id: "invoice-notes", title: "Invoice Note Templates" },
    { id: "job-card-notes", title: "Job Card Note Templates" },
    { id: "documents", title: "Document Templates" },
    { id: "emails", title: "Email Templates" },
    { id: "unit-for-sale", title: "Unit For Sale Templates" },
    { id: "sms", title: "SMS Templates" },
    { id: "customer-source", title: "Customer Source" },
    { id: "payment-methods", title: "Payment Methods" },
    { id: "product-categories", title: "Product Categories" },
    { id: "product-groups", title: "Product Groups" },
  ];

  const handleToggle = (categoryId: TemplateCategoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleOpenAddDialog = (categoryId: TemplateCategoryId) => {
    setCurrentCategoryId(categoryId);
    addFormMethods.reset({
      name: "",
      description: "",
      content: "",
    });
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (
    categoryId: TemplateCategoryId,
    template: Template
  ) => {
    setSelectedTemplate({ categoryId, template });
    editFormMethods.reset({
      name: template.name,
      description: template.description || "",
      content: template.content || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (
    categoryId: TemplateCategoryId,
    template: Template
  ) => {
    setSelectedTemplate({ categoryId, template });
    setIsDeleteDialogOpen(true);
  };

  const handleAddTemplate = (data: TemplateFormData) => {
    if (!currentCategoryId) return;

    // Construct API payload
    const payload: CreateTemplatePayload = {
      name: data.name,
      description: data.description,
      content: data.content,
      type: currentCategoryId,
    };

    // Print payload to console
    console.log("📤 CREATE TEMPLATE PAYLOAD:", payload);
    console.log("📋 Payload Details:", {
      name: payload.name,
      type: payload.type,
      description: payload.description,
      contentLength: payload.content?.length || 0,
    });

    // TODO: Make API call here
    // Example: await apiService.post(API_CONFIG.ENDPOINTS.CREATE_TEMPLATE, payload);

    // For now, update local state
    const newTemplate: Template = {
      id: Date.now().toString(),
      ...data,
    };

    setCategories((prev) => ({
      ...prev,
      [currentCategoryId]: [...prev[currentCategoryId], newTemplate],
    }));

    setIsAddDialogOpen(false);
    setCurrentCategoryId(null);
    addFormMethods.reset();
  };

  const handleEditTemplate = (data: TemplateFormData) => {
    if (!selectedTemplate) return;

    // Construct API payload
    const payload: UpdateTemplatePayload = {
      id: selectedTemplate.template.id,
      name: data.name,
      description: data.description,
      content: data.content,
      type: selectedTemplate.categoryId,
    };

    // Print payload to console
    console.log("📤 UPDATE TEMPLATE PAYLOAD:", payload);
    console.log("📋 Payload Details:", {
      id: payload.id,
      name: payload.name,
      type: payload.type,
      description: payload.description,
      contentLength: payload.content?.length || 0,
    });

    // TODO: Make API call here
    // Example: await apiService.put(API_CONFIG.ENDPOINTS.UPDATE_TEMPLATE.replace(':id', payload.id), payload);

    // For now, update local state
    setCategories((prev) => ({
      ...prev,
      [selectedTemplate.categoryId]: prev[selectedTemplate.categoryId].map(
        (t) => (t.id === selectedTemplate.template.id ? { ...t, ...data } : t)
      ),
    }));

    setIsEditDialogOpen(false);
    setSelectedTemplate(null);
  };

  const handleDeleteTemplate = () => {
    if (!selectedTemplate) return;

    // Construct API payload
    const payload: DeleteTemplatePayload = {
      id: selectedTemplate.template.id,
      type: selectedTemplate.categoryId,
    };

    // Print payload to console
    console.log("📤 DELETE TEMPLATE PAYLOAD:", payload);
    console.log("📋 Payload Details:", {
      id: payload.id,
      type: payload.type,
      templateName: selectedTemplate.template.name,
    });

    // TODO: Make API call here
    // Example: await apiService.delete(API_CONFIG.ENDPOINTS.DELETE_TEMPLATE.replace(':id', payload.id), payload);

    // For now, update local state
    setCategories((prev) => ({
      ...prev,
      [selectedTemplate.categoryId]: prev[selectedTemplate.categoryId].filter(
        (t) => t.id !== selectedTemplate.template.id
      ),
    }));

    setIsDeleteDialogOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="space-y-4">
      {categoryList.map((category) => (
        <div
          key={category.id}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          {/* Category Header */}
          <button
            onClick={() => handleToggle(category.id)}
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <DocumentTextIcon size={20} className="text-gray-700" />
              <span className="text-sm font-semibold text-gray-900">
                {category.title}
              </span>
              <span className="text-xs text-gray-500">
                ({categories[category.id].length})
              </span>
            </div>
            {expandedCategory === category.id ? (
              <ChevronUp size={20} className="text-gray-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </button>

          {/* Category Content */}
          {expandedCategory === category.id && (
            <div className="border-t border-gray-200 bg-gray-50 p-4">
              <div className="space-y-2">
                {categories[category.id].map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {template.name}
                      </p>
                      {template.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {template.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        onClick={() =>
                          handleOpenEditDialog(category.id, template)
                        }
                        startIcon={<EditIcon size={16} />}
                        variant="custom"
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      ></Button>
                      <Button
                        onClick={() =>
                          handleOpenDeleteDialog(category.id, template)
                        }
                        startIcon={<DeleteIcon size={16} />}
                        variant="custom"
                        className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      ></Button>
                    </div>
                  </div>
                ))}

                {categories[category.id].length === 0 && (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    No templates added yet
                  </div>
                )}

                {/* Add New Button */}
                <Button
                  type="button"
                  onClick={() => handleOpenAddDialog(category.id)}
                  variant="primary"
                  size="sm"
                  startIcon={<Plus size={16} />}
                  className="w-full mt-4"
                >
                  Add New
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 pt-6">
        <Button type="button" variant="outline" size="md">
          Cancel
        </Button>
        <Button type="button" variant="primary" size="md">
          Save
        </Button>
      </div>

      {/* Add Template Dialog */}
      <Dialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      >
        <DialogBody className="w-md lg:w-3xl h-auto p-6">
          <DialogHeader
            title="Add New Template"
            subtitle="Enter the template details"
            onClose={() => setIsAddDialogOpen(false)}
          />

          <FormProvider {...addFormMethods}>
            <form
              onSubmit={addFormMethods.handleSubmit(handleAddTemplate)}
              className="space-y-4 py-4"
            >
              <CommonTextInput
                name="name"
                label="Description"
                placeholder="Enter template name"
                required
              />

              <RichTextEditor
                name="content"
                label="Template"
                placeholder="Please go to [Settings][Company Lists] and choose or create the appropriate template"
              />

              <DialogFooter
                leftTitle="Cancel"
                rightTitle="Add Template"
                onCancel={() => setIsAddDialogOpen(false)}
                onConfirm={addFormMethods.handleSubmit(handleAddTemplate)}
              />
            </form>
          </FormProvider>
        </DialogBody>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogBody className="w-md lg:w-3xl h-auto p-6">
          <DialogHeader
            title="Edit Template"
            subtitle="Update the template details"
            onClose={() => setIsEditDialogOpen(false)}
          />

          <FormProvider {...editFormMethods}>
            <form
              onSubmit={editFormMethods.handleSubmit(handleEditTemplate)}
              className="space-y-4 py-4"
            >
              <CommonTextInput
                name="name"
                label="Description"
                placeholder="Enter template name"
                required
              />

              <RichTextEditor
                name="content"
                label="Template"
                placeholder="Please go to [Settings][Company Lists] and choose or create the appropriate template"
              />

              <DialogFooter
                leftTitle="Cancel"
                rightTitle="Update Template"
                onCancel={() => setIsEditDialogOpen(false)}
                onConfirm={editFormMethods.handleSubmit(handleEditTemplate)}
              />
            </form>
          </FormProvider>
        </DialogBody>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogBody className="w-md h-auto p-6">
          <DialogHeader
            title="Delete Template"
            subtitle="Are you sure you want to delete this template?"
            onClose={() => setIsDeleteDialogOpen(false)}
          />

          <div className="py-4">
            <p className="text-gray-700 mb-4">
              You are about to delete the following template:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Template Name:</span>{" "}
                {selectedTemplate?.template.name}
              </p>
              {selectedTemplate?.template.description && (
                <p className="text-sm">
                  <span className="font-semibold">Description:</span>{" "}
                  {selectedTemplate.template.description}
                </p>
              )}
            </div>
            <p className="text-red-600 text-sm mt-4 font-medium">
              This action cannot be undone.
            </p>
          </div>

          <DialogFooter
            leftTitle="Cancel"
            rightTitle="Delete"
            onCancel={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDeleteTemplate}
          />
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default TemplatesTab;
