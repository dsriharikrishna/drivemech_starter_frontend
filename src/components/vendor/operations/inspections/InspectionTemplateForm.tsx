"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronUp } from "lucide-react";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import FormActionButtons from "@/components/ui/FormActionButtons";
import {
  inspectionTemplateSchema,
  type InspectionTemplateFormValues,
} from "@/schemas/vendor/inspection.schema";

const InspectionTemplateForm = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "exterior",
  ]);

  const methods = useForm<InspectionTemplateFormValues>({
    resolver: zodResolver(inspectionTemplateSchema),
    defaultValues: {
      name: "",
      commentLabel1: "",
      commentLabel2: "",
      description: "",
      exterior: [],
      standard: [],
      interior: [],
      tyres: [],
      underBody: [],
      underBonnet: [],
    },
  });

  const { handleSubmit } = methods;

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const onSubmit = (data: InspectionTemplateFormValues) => {
    console.log("Template Data:", data);
  };

  const handleCancel = () => {
    methods.reset();
  };

  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  const sections = [
    { id: "exterior", label: "EXTERIOR" },
    { id: "standard", label: "STANDARD" },
    { id: "interior", label: "INTERIOR" },
    { id: "tyres", label: "TYRES" },
    { id: "underBody", label: "UNDER BODY" },
    { id: "underBonnet", label: "UNDER BONNET" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Header Fields */}
        <div className="grid grid-cols-3 gap-4">
          <CommonTextInput name="name" label="Name" placeholder="" required />
          <CommonTextInput
            name="commentLabel1"
            label="Comment Label 1"
            placeholder=""
          />
          <CommonTextInput
            name="commentLabel2"
            label="Comment Label 2"
            placeholder=""
          />
        </div>

        <div>
          <CommonTextArea
            name="description"
            label="Description"
            placeholder=""
            rows={3}
          />
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-3">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Section Header */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="w-full bg-blue-50 px-4 py-3 flex items-center justify-between hover:bg-blue-100 transition-colors"
              >
                <span className="text-sm font-semibold text-blue-600">
                  {section.label}
                </span>
                <div className="flex items-center gap-2">
                  <div className="p-1 text-blue-600">
                    {expandedSections.includes(section.id) ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                </div>
              </button>

              {/* Section Content */}
              {expandedSections.includes(section.id) && (
                <div className="p-4 bg-white space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <CommonTextInput
                      name={`${section.id}.status`}
                      label="Status"
                      placeholder=""
                    />
                    <CommonTextInput
                      name={`${section.id}.description`}
                      label="Description"
                      placeholder=""
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <CommonTextInput
                      name={`${section.id}.productCode`}
                      label="Product Code"
                      placeholder=""
                    />
                    <CommonTextInput
                      name={`${section.id}.comment`}
                      label="Comment"
                      placeholder=""
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <FormActionButtons
          onCancel={handleCancel}
          onSave={handleSave}
          saveButtonColor="green"
        />
      </form>
    </FormProvider>
  );
};

export default InspectionTemplateForm;
