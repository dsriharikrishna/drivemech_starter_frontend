"use client";

import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  audienceSchema,
  AudienceFormValues,
} from "@/schemas/vendor/campaigns.schema";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { X } from "lucide-react";
import DialogFooter from "@/components/modals/DialogFooter";

interface CreateAudienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAudienceModal: React.FC<CreateAudienceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const methods = useForm<AudienceFormValues>({
    resolver: zodResolver(audienceSchema),
    defaultValues: {
      audienceName: "",
      criteria: {
        serviceDue: false,
        serviceCompleted: false,
        totalSpent: false,
        noVisit: false,
        firstVisit: false,
        byLocation: false,
      },
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (data: AudienceFormValues) => {
    console.log("Audience Data:", data);
    // TODO: Handle audience creation
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const criteriaOptions = [
    { name: "serviceDue", label: "Service due in next 30 days" },
    { name: "serviceCompleted", label: "Service completed in last 30 days" },
    { name: "totalSpent", label: "Total spent over $3000" },
    { name: "noVisit", label: "No visit in last 6 months" },
    { name: "firstVisit", label: "First visit in last year" },
    { name: "byLocation", label: "By Location" },
  ];

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      <DialogBody className="sm:w-2xl md-w-3xl mx-auto p-4 h-auto">
        <DialogHeader title="Create New Audience" onClose={handleClose} />

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <CommonTextInput
              name="audienceName"
              label="Audience Name*"
              placeholder="e.g. Premium Customers"
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Criteria*
              </label>
              <div className="space-y-2">
                {criteriaOptions.map((option) => (
                  <Controller
                    key={option.name}
                    name={`criteria.${option.name}` as any}
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          checked={field.value || false}
                          onChange={field.onChange}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {option.label}
                        </span>
                      </label>
                    )}
                  />
                ))}
              </div>
              {errors.criteria && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.criteria.message as string}
                </p>
              )}
            </div>

            <DialogFooter
              leftTitle="Cancel"
              onCancel={handleClose}
              rightTitle="Create Audience"
              onConfirm={handleSubmit(onSubmit)}
            />
          </form>
        </FormProvider>
      </DialogBody>
    </Dialog>
  );
};

export default CreateAudienceModal;
