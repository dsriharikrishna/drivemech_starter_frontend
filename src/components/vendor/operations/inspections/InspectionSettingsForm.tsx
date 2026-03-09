"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { ControlledToggleSwitch } from "@/components/ui/ToggleSwitch";
import FormActionButtons from "@/components/ui/FormActionButtons";
import {
  inspectionSettingsSchema,
  type InspectionSettingsFormValues,
} from "@/schemas/vendor/inspection.schema";

const InspectionSettingsForm = () => {
  const methods = useForm<InspectionSettingsFormValues>({
    resolver: zodResolver(inspectionSettingsSchema),
    defaultValues: {
      defaultProductId: "",
      defaultServiceAdvisor: "",
      defaultContactName: "",
      defaultContactNumber: "",
      defaultContactEmail: "",
      hideEstimateCost: false,
      hideEstimateHours: false,
      notifyOnApproval: false,
      notifyOnRefusal: false,
      hideEstimateProductCost: false,
      hideEstimateProductPrice: false,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: InspectionSettingsFormValues) => {
    console.log("Settings Data:", data);
  };

  const handleCancel = () => {
    methods.reset();
  };

  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section Header */}
        <div className="bg-blue-50 rounded-lg px-4 py-3">
          <h2 className="text-base font-medium text-gray-900">
            Inspection Settings
          </h2>
        </div>

        <div className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-4">
            <CommonTextInput
              name="defaultProductId"
              label="Default Product ID"
              placeholder=""
            />
            <CommonTextInput
              name="defaultServiceAdvisor"
              label="Default Service Advisor"
              placeholder=""
            />
            <CommonTextInput
              name="defaultContactName"
              label="Default Contact Name"
              placeholder=""
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-4 gap-4">
            <CommonTextInput
              name="defaultContactNumber"
              label="Default Contact Number"
              placeholder=""
            />
            <CommonTextInput
              name="defaultContactEmail"
              label="Default Contact Email"
              placeholder=""
            />
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Hide Estimate Cost
              </label>
              <ControlledToggleSwitch name="hideEstimateCost" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Hide Estimate Hours
              </label>
              <ControlledToggleSwitch name="hideEstimateHours" />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Notify on Approval
              </label>
              <ControlledToggleSwitch name="notifyOnApproval" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Notify on Refusal
              </label>
              <ControlledToggleSwitch name="notifyOnRefusal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Hide Estimate Product Cost
              </label>
              <ControlledToggleSwitch name="hideEstimateProductCost" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Hide Estimate Product Price
              </label>
              <ControlledToggleSwitch name="hideEstimateProductPrice" />
            </div>
          </div>
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

export default InspectionSettingsForm;
