"use client";

import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import CommonTextInput from "@/components/forms/CommonTextInput";
import {
  designationSchema,
  DesignationFormValues,
} from "@/schemas/vendor/management.schema";
import CommonTextArea from "@/components/forms/CommonTextArea";

interface AddDesignationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "add" | "edit";
  initialData?: DesignationFormValues | null;
}

const AddDesignationModal: React.FC<AddDesignationModalProps> = ({
  isOpen,
  onClose,
  mode = "add",
  initialData,
}) => {
  // Mock Permissions
  const permissionsList = [
    "Vehicle Service",
    "Customer Management",
    "Booking Management",
    "Inventory Management",
    "Employee Management",
    "Reports",
    "Basic Repairs",
    "Advanced Repairs",
  ];

  const methods = useForm<DesignationFormValues>({
    resolver: zodResolver(designationSchema),
    defaultValues: {
      designationName: "",
      description: "",
      permissions: [],
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  React.useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        reset(initialData);
      } else {
        reset({
          designationName: "",
          description: "",
          permissions: [],
        });
      }
    }
  }, [isOpen, mode, initialData, reset]);

  const onSubmit = (data: DesignationFormValues) => {
    console.log("Form Data:", data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      <DialogBody className="w-[600px] h-auto p-6 bg-white rounded-lg">
        <DialogHeader
          title={mode === "add" ? "Add New Designation" : "Edit Designation"}
          subtitle={
            mode === "add"
              ? "Create a new designation for employees"
              : "Update designation details"
          }
          onClose={handleClose}
        />

        <FormProvider {...methods}>
          <form className="py-4 space-y-4">
            <CommonTextInput
              name="designationName"
              label="Designation Name*"
              placeholder="Enter designation name"
            />

            <CommonTextArea
              name="description"
              label="Description"
              placeholder="Enter description"
            />

            <Controller
              name="permissions"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Permissions
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {permissionsList.map((perm) => {
                      const currentPermissions = field.value || [];
                      return (
                        <label
                          key={perm}
                          className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={currentPermissions.includes(perm)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              if (checked) {
                                field.onChange([...currentPermissions, perm]);
                              } else {
                                field.onChange(
                                  currentPermissions.filter((p) => p !== perm)
                                );
                              }
                            }}
                          />
                          {perm}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            />
            <DialogFooter
              leftTitle="Cancel"
              rightTitle={mode === "add" ? "Add Designation" : "Save Changes"}
              leftVariant="outline"
              rightVariant="success"
              onCancel={handleClose}
              disabled={isSubmitting}
              onConfirm={handleSubmit(onSubmit)}
            />
          </form>
        </FormProvider>
      </DialogBody>
    </Dialog>
  );
};

export default AddDesignationModal;
