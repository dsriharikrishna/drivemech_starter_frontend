"use client";

import React, { useRef, useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import {
  Car,
  Truck,
  FileArrowUp,
  FileText,
  Trash,
} from "phosphor-react";

import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import CustomCard from "@/components/ui/CustomCard";
import CommonTextInput from "@/components/forms/CommonTextInput";
import ToggleSwitch from "@/components/ui/ToogleSwitch";
import { Motorbike } from "lucide-react";

type VehicleFormValues = {
  vehicleType: "car" | "bike" | "truck";
  state: string;
  regNo: string;
  make: string;
  model: string;
  cc: string;
  mfgYear: string;
  chassisNo: string;
  insuranceExpiry: string;
  purchaseDate: string;
  insuranceProvider: string;
  engineNo: string;
  lastServiceDate: string;
  odometer: string;
  isDefault: boolean;
  regDocs?: File[]; // mirrors registration uploads
  insDocs?: File[]; // mirrors insurance uploads
};

export default function AddVehicleForm({ onClose }: { onClose?: () => void }) {
  // RHF
  const methods = useForm<VehicleFormValues>({
    defaultValues: {
      vehicleType: "car",
      state: "",
      regNo: "",
      make: "",
      model: "",
      cc: "",
      mfgYear: "",
      chassisNo: "",
      insuranceExpiry: "",
      purchaseDate: "",
      insuranceProvider: "",
      engineNo: "",
      lastServiceDate: "",
      odometer: "",
      isDefault: false,
      regDocs: [],
      insDocs: [],
    },
  });

  const { handleSubmit, control, setValue, watch, register } = methods;

  // File upload local state (mirrors into RHF via setValue)
  const [regFiles, setRegFiles] = useState<File[]>([]);
  const [insFiles, setInsFiles] = useState<File[]>([]);

  // hidden file inputs refs
  const regInputRef = useRef<HTMLInputElement | null>(null);
  const insInputRef = useRef<HTMLInputElement | null>(null);

  // limits
  const MAX_FILES = 5;
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  // helpers
  const selectedType = watch("vehicleType");
  const isDefault = watch("isDefault");

  function addFiles(current: File[], files: File[]) {
    const filtered = files.filter((f) => f.size <= MAX_SIZE);
    const combined = [...current, ...filtered].slice(0, MAX_FILES);
    return combined;
  }

  function handleRegUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fl = e.target.files;
    if (!fl) return;
    const arr = Array.from(fl);
    const next = addFiles(regFiles, arr);
    setRegFiles(next);
    setValue("regDocs", next, { shouldDirty: true });
    if (regInputRef.current) regInputRef.current.value = "";
  }

  function handleInsUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fl = e.target.files;
    if (!fl) return;
    const arr = Array.from(fl);
    const next = addFiles(insFiles, arr);
    setInsFiles(next);
    setValue("insDocs", next, { shouldDirty: true });
    if (insInputRef.current) insInputRef.current.value = "";
  }

  function removeRegFile(index: number) {
    setRegFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      setValue("regDocs", next, { shouldDirty: true });
      return next;
    });
  }

  function removeInsFile(index: number) {
    setInsFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      setValue("insDocs", next, { shouldDirty: true });
      return next;
    });
  }

  const onSubmit = (data: VehicleFormValues) => {
    // files are in regFiles & insFiles local state and mirrored to data.regDocs / data.insDocs by setValue
    const final = {
      ...data,
      regDocs: regFiles,
      insDocs: insFiles,
    };

    // Replace with API call when ready (FormData + fetch/upload)
    console.log("Vehicle submit payload:", final);

    // close dialog if provided
    onClose?.();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Vehicle type */}
        <CustomCard className="p-5">
          <div className="pb-2 border-b border-border">
            <Typography weight="semibold" variant="h5">
              Vehicle Type *
            </Typography>
          </div>


          <div className="flex items-center gap-3 mt-4">
            <Controller
              name="vehicleType"
              control={control}
              render={({ field }) => (
                <>
                  <button
                    type="button"
                    onClick={() => field.onChange("car")}
                    className={`px-4 py-2 rounded-xl border flex items-center gap-3 transition text-sm ${field.value === "car"
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    <Car size={20} weight="duotone" />
                    Car
                  </button>

                  <button
                    type="button"
                    onClick={() => field.onChange("bike")}
                    className={`px-4 py-2 rounded-xl border flex items-center gap-3 transition text-sm ${field.value === "bike"
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    <Motorbike size={20} />
                    Bike
                  </button>

                  <button
                    type="button"
                    onClick={() => field.onChange("truck")}
                    className={`px-4 py-2 rounded-xl border flex items-center gap-3 transition text-sm ${field.value === "truck"
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    <Truck size={20} weight="duotone" />
                    Truck
                  </button>
                </>
              )}
            />
          </div>
        </CustomCard>

        {/* Vehicle details */}
        <CustomCard className="p-5 space-y-4">
          <Typography weight="semibold">Add Vehicle Details</Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="state"
              control={control}
              rules={{ required: "State required" }}
              render={({ field }) => (
                <CommonTextInput {...field} label="State *" placeholder="State" />
              )}
            />

            <Controller
              name="regNo"
              control={control}
              rules={{ required: "Registration required" }}
              render={({ field }) => (
                <CommonTextInput {...field} label="Vehicle Reg No. *" placeholder="ABC 1234 D" />
              )}
            />

            <Controller
              name="make"
              control={control}
              rules={{ required: "Make required" }}
              render={({ field }) => <CommonTextInput {...field} label="Make *" placeholder="Toyota" />}
            />

            <Controller
              name="model"
              control={control}
              rules={{ required: "Model required" }}
              render={({ field }) => <CommonTextInput {...field} label="Model *" placeholder="Hilux, Camry..." />}
            />

            <Controller
              name="cc"
              control={control}
              render={({ field }) => <CommonTextInput {...field} label="Cubic Capacity" placeholder="1000cc" />}
            />

            <Controller
              name="mfgYear"
              control={control}
              render={({ field }) => <CommonTextInput {...field} label="Mfg. Year" type="number" placeholder="2018" />}
            />
          </div>
        </CustomCard>

        {/* Technical details */}
        <CustomCard className="p-5 space-y-4">
          <Typography weight="semibold">Technical Details</Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CommonTextInput label="Chassis Number" placeholder="JT3HN86R9Y0123456"  name="chassisNo" />
            <CommonTextInput label="Insurance Expiry Date" placeholder="DD-MM-YY" type="date" name="insuranceExpiry" />
            <CommonTextInput label="Purchase Date" placeholder="DD-MM-YY" type="date" name="purchaseDate" />
          </div>
        </CustomCard>

        {/* Insurance info */}
        <CustomCard className="p-5 space-y-4">
          <Typography weight="semibold">Insurance Information</Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CommonTextInput label="Insurance Provider" placeholder="GEICO" name="insuranceProvider" />
            <CommonTextInput label="Engine Number" placeholder="2GD-FTV123456" name="engineNo" />
          </div>
        </CustomCard>

        {/* Service history */}
        <CustomCard className="p-5 space-y-4">
          <Typography weight="semibold">Service History</Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CommonTextInput label="Last Service Date" placeholder="DD-MM-YY" type="date" name="lastServiceDate" />
            <CommonTextInput label="Odometer (km)" type="number" placeholder="45000" name="odometer" />
          </div>
        </CustomCard>

        {/* Default toggle */}
        <CustomCard className="p-5 bg-orange-50 flex items-center justify-between">
          <div>
            <p className="font-semibold">Set as Default Vehicle</p>
            <Typography variant="small" color="muted">
              This vehicle will be auto-selected for bookings
            </Typography>
          </div>

          <Controller
            name="isDefault"
            control={control}
            render={({ field }) => (
              // ToogleSwitch expects native event; forward event -> boolean
              <ToggleSwitch checked={field.value} onChange={(checked) => field.onChange(checked)} />
            )}
          />
        </CustomCard>

        {/* Documents (file uploads) */}
        <CustomCard className="p-5 space-y-4">
          <Typography weight="semibold">Documents (Optional)</Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Registration Certificate */}
            <div>
              <input
                ref={regInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleRegUpload}
              />

              <div className="flex items-center gap-3">
                <Button variant="outline" type="button" className="flex items-center gap-2" onClick={() => regInputRef.current?.click()}>
                  <FileArrowUp size={16} /> Upload Registration Certificate
                </Button>

                <span className="text-xs text-gray-500">
                  {regFiles.length}/{MAX_FILES}
                </span>
              </div>

              {regFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {regFiles.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
                      <div className="flex items-center gap-3">
                        <FileText size={20} weight="duotone" className="text-gray-600" />
                        <div>
                          <p className="font-medium text-sm">{f.name}</p>
                          <p className="text-xs text-gray-500">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeRegFile(i)}
                        className="text-red-600 hover:bg-red-50 border rounded-md px-3 py-1 flex items-center gap-1"
                      >
                        <Trash size={14} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Insurance Policy */}
            <div>
              <input
                ref={insInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleInsUpload}
              />

              <div className="flex items-center gap-3">
                <Button variant="outline" type="button" className="flex items-center gap-2" onClick={() => insInputRef.current?.click()}>
                  <FileArrowUp size={16} /> Upload Insurance Policy
                </Button>

                <span className="text-xs text-gray-500">
                  {insFiles.length}/{MAX_FILES}
                </span>
              </div>

              {insFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {insFiles.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
                      <div className="flex items-center gap-3">
                        <FileText size={20} weight="duotone" className="text-gray-600" />
                        <div>
                          <p className="font-medium text-sm">{f.name}</p>
                          <p className="text-xs text-gray-500">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeInsFile(i)}
                        className="text-red-600 hover:bg-red-50 border rounded-md px-3 py-1 flex items-center gap-1"
                      >
                        <Trash size={14} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CustomCard>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" variant="gradient" className="px-8 py-2">
            Save Vehicle Details
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
