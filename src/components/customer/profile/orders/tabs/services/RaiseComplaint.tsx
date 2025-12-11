"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";

import ModalDropdown from "@/components/ui/DropDown";
import CommonTextArea from "@/components/forms/CommonTextArea";

type FormData = {
  complaintType: string;
  description: string;
  action: string;
  files: FileList | null;
};

const complaintTypes = [
  { id: "service_quality", name: "Service Quality Issue" },
  { id: "overcharging", name: "Overcharging" },
  { id: "rude_staff", name: "Rude Staff" },
  { id: "incomplete", name: "Incomplete Service" },
  { id: "delay", name: "Delay" },
];

const actions = [
  { id: "redo", name: "Redo the service" },
  { id: "partial_refund", name: "Partial refund" },
  { id: "full_refund", name: "Full refund" },
  { id: "speak_manager", name: "Speak with manager" },
  { id: "filing", name: "Just filing for record" },
];

export default function RaiseComplaint({
  setIsComplaintSend,
  setIsSendComplaint,
}: {
  setIsComplaintSend: (v: boolean) => void;
  setIsSendComplaint: (v: boolean) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  const methods = useForm<FormData>({
    defaultValues: {
      complaintType: "",
      description: "",
      action: "",
      files: null,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const description = watch("description", "");

  // ---------------------------
  // FILE UPLOAD HANDLER
  // ---------------------------
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    setFiles(filesArray);

    setValue("files", e.target.files, { shouldValidate: true });
  };

  // ---------------------------
  // SUBMIT HANDLER
  // ---------------------------
  const onSubmit: SubmitHandler<FormData> = (data) => {
    
    // Trigger success modal in parent
    setIsComplaintSend(true);
    setIsSendComplaint(false)
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-3xl mx-auto bg-white rounded-2xl space-y-8"
      >
        {/* ORDER DETAILS */}
        <div className="p-5 bg-orange-50 border border-orange-200 rounded-xl space-y-1">
          <p className="text-gray-900 font-semibold text-lg">Order Details</p>
          <p className="text-gray-700 text-sm">Periodic Maintenance</p>
          <p className="text-gray-700 text-sm">A to Z Garage</p>
          <p className="text-gray-800 text-sm font-medium mt-1">
            Order ID: SRV-001
          </p>
        </div>

        {/* COMPLAINT TYPE */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Complaint Type <span className="text-red-500">*</span>
          </label>

          <Controller
            name="complaintType"
            control={control}
            rules={{ required: "Please select a complaint type" }}
            render={({ field }) => (
              <ModalDropdown
                items={complaintTypes}
                selectedItem={
                  complaintTypes.find((item) => item.id === field.value) || null
                }
                onSelect={(item) => field.onChange(item.id)}
                placeholder="Select a complaint type"
              />
            )}
          />

          {errors.complaintType && (
            <p className="text-sm text-red-600">{errors.complaintType.message}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <CommonTextArea
            label="Description"
            name="description"
            placeholder="Enter description"
            rules={{ required: "Description is required" }}
          />

          <p className="text-xs text-gray-400 text-right">
            {description.length}/500
          </p>
        </div>

        {/* FILE UPLOAD */}
        <div className="border border-gray-200 rounded-xl bg-gray-50 p-6 text-center space-y-3">
          <Upload className="w-8 h-8 text-gray-500 mx-auto" />

          <div>
            <p className="font-semibold text-gray-800">Upload Evidence</p>
            <p className="text-sm text-gray-500">
              Photos or documents (optional)
            </p>
          </div>

          <label className="px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer text-sm font-medium hover:bg-gray-100 transition">
            Choose Files
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {files.length > 0 && (
            <p className="text-sm text-gray-600">{files.length} file(s) selected</p>
          )}
        </div>

        {/* ACTION */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            What would you like us to do? <span className="text-red-500">*</span>
          </label>

          <Controller
            name="action"
            control={control}
            rules={{ required: "Please choose an action" }}
            render={({ field }) => (
              <ModalDropdown
                items={actions}
                selectedItem={
                  actions.find((item) => item.id === field.value) || null
                }
                onSelect={(item) => field.onChange(item.id)}
                placeholder="Select an action"
              />
            )}
          />

          {errors.action && (
            <p className="text-sm text-red-600">{errors.action.message}</p>
          )}
        </div>

        {/* WHAT HAPPENS NEXT */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm space-y-2">
          <p className="font-semibold text-gray-700">What happens next?</p>

          <div className="text-gray-700 divide-y divide-gray-200">
            {[
              "Your complaint will be reviewed within 24 hours",
              "We’ll contact you for updates",
              "Resolution: 3–5 business days",
              "Track your complaint in your profile",
            ].map((text) => (
              <div key={text} className="flex gap-2 py-2">
                <span>•</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition"
        >
          Submit Complaint
        </button>
      </form>
    </FormProvider>
  );
}
