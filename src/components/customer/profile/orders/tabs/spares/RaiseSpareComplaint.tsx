"use client";

import { useState, useCallback, useMemo } from "react";
import { Upload } from "lucide-react";
import {
  useForm,
  Controller,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";

import ModalDropdown from "@/components/ui/DropDown";
import CommonTextArea from "@/components/forms/CommonTextArea";
import ComplaintSubmitted from "./ComplaintSubmitted";

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

export default function RaiseSpareComplaint({
  orderId = "SPR-001",
  onClose,
}: {
  orderId?: string;
  onClose?: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const complaintTypes = useMemo(
    () => [
      { id: "service_quality", name: "Service Quality Issue" },
      { id: "overcharging", name: "Overcharging" },
      { id: "rude_staff", name: "Rude Staff" },
      { id: "incomplete", name: "Incomplete Service" },
      { id: "delay", name: "Delay" },
    ],
    []
  );

  const actions = useMemo(
    () => [
      { id: "redo", name: "Redo the service" },
      { id: "partial_refund", name: "Partial refund" },
      { id: "full_refund", name: "Full refund" },
      { id: "speak_manager", name: "Speak with manager" },
      { id: "filing", name: "Just filing for record" },
    ],
    []
  );

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

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      setFiles(Array.from(e.target.files));
      setValue("files", e.target.files, { shouldValidate: true });
    },
    [setValue]
  );

  const onSubmit: SubmitHandler<FormData> = useCallback((data) => {
    setSubmitted(true);
  }, []);

  if (submitted) return <ComplaintSubmitted onDone={onClose} />;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full sm:w-2xl md-w-3xl mx-auto bg-white rounded-2xl space-y-6"
      >
        {/* ORDER DETAILS */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl space-y-0.5">
          <p className="text-gray-900 font-semibold text-base">Order Details</p>
          <p className="text-gray-700 text-xs">Spare Parts Purchase</p>
          <p className="text-gray-700 text-xs">DriveMech Vendor</p>
          <p className="text-gray-800 text-xs font-medium mt-0.5">
            Order ID: {orderId}
          </p>
        </div>

        {/* COMPLAINT TYPE */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-700">
            Complaint Type <span className="text-red-500">*</span>
          </label>

          <Controller
            name="complaintType"
            control={control}
            rules={{ required: "Complaint type is required" }}
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
            <p className="text-xs text-red-600">
              {errors.complaintType.message}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-1.5">
          <CommonTextArea
            label="Description"
            name="description"
            placeholder="Describe your issue"
            rules={{ required: "Description is required" }}
          />
          <p className="text-[11px] text-gray-400 text-right">
            {description.length}/500
          </p>
        </div>

        {/* FILE UPLOAD */}
        <div className="border border-gray-200 rounded-xl bg-gray-50 p-4 text-center space-y-2.5">
          <Upload className="w-7 h-7 text-gray-500 mx-auto" />

          <p className="font-semibold text-gray-800 text-xs">Upload Evidence</p>
          <p className="text-xs text-gray-500">
            Photos or documents (optional)
          </p>

          <label className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg cursor-pointer text-xs font-medium hover:bg-gray-100 transition">
            Choose Files
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {files.length > 0 && (
            <p className="text-xs text-gray-600">
              {files.length} file(s) selected
            </p>
          )}
        </div>

        {/* ACTION */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-700">
            What would you like us to do?{" "}
            <span className="text-red-500">*</span>
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
            <p className="text-xs text-red-600">{errors.action.message}</p>
          )}
        </div>

        {/* WHAT HAPPENS NEXT */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs space-y-1.5">
          <p className="font-semibold text-gray-700">What happens next?</p>

          <div className="text-gray-700 divide-y divide-gray-200">
            {[
              "Your complaint will be reviewed within 24 hours",
              "We'll contact you for updates if required",
              "Expected resolution time: 3–5 business days",
            ].map((text) => (
              <div key={text} className="flex gap-1.5 py-1.5">
                <span>•</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition text-xs"
        >
          Submit Complaint
        </button>
      </form>
    </FormProvider>
  );
}
