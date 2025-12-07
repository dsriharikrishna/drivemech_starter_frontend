"use client";

import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { Car, Truck, FileArrowUp, FileText, Trash } from "phosphor-react";
import { Motorbike } from "lucide-react";

import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import CustomCard from "@/components/ui/CustomCard";
import CommonTextInput from "@/components/forms/CommonTextInput";
import ToggleSwitch from "@/components/ui/ToogleSwitch";

export type VehicleFormValues = {
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
  regDocs?: File[];
  insDocs?: File[];
};

export default function AddVehicleForm({
  mode = "add",
  initialData,
  vehicleId,
  onClose,
}: {
  mode?: "add" | "edit";
  initialData?: Partial<VehicleFormValues>;
  vehicleId?: string;
  onClose?: () => void;
}) {
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
      ...initialData,
    },
  });

  const { handleSubmit, control, setValue, watch } = methods;

  const selectedType = watch("vehicleType");

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) =>
        setValue(key as keyof VehicleFormValues, value as any)
      );
    }
  }, [initialData]);

  // ---- File Upload Logic (same as before) ----
  const [regFiles, setRegFiles] = useState<File[]>([]);
  const [insFiles, setInsFiles] = useState<File[]>([]);
  const regInputRef = useRef<HTMLInputElement | null>(null);
  const insInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_FILES = 5;
  const MAX_SIZE = 10 * 1024 * 1024;

  function addFiles(current: File[], files: File[]) {
    const valid = files.filter((f) => f.size <= MAX_SIZE);
    return [...current, ...valid].slice(0, MAX_FILES);
  }

  function handleRegUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const next = addFiles(regFiles, Array.from(e.target.files));
    setRegFiles(next);
    setValue("regDocs", next);
  }

  function handleInsUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const next = addFiles(insFiles, Array.from(e.target.files));
    setInsFiles(next);
    setValue("insDocs", next);
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
    const final = { ...data, regDocs: regFiles, insDocs: insFiles };

    if (mode === "edit") {
      console.log("Updating vehicle:", vehicleId, final);
    } else {
      console.log("Adding new vehicle:", final);
    }

    onClose?.();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

        {/* HEADER */}
        <div className="pb-2 border-b border-border ">
          <Typography variant="h4" weight="semibold" className="p-2">
            {mode === "edit" ? "Edit Vehicle" : "Add Vehicle"}
          </Typography>
        </div>


        {/* Vehicle Type */}
        <CustomCard className="p-2">
          <Typography weight="semibold">Vehicle Type *</Typography>

          <div className="flex gap-3 mt-2">
            {["car", "bike", "truck"].map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setValue("vehicleType", t as any)}
                className={`px-4 py-2 rounded-xl border flex items-center gap-2 text-sm transition 
                ${selectedType === t ? "bg-orange-500 text-white" : "border-gray-300 hover:bg-gray-100"}`}
              >
                {t === "car" && <Car size={20} />}
                {t === "bike" && <Motorbike size={20} />}
                {t === "truck" && <Truck size={20} />}
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </CustomCard>

        {/* ---------------- Vehicle Details (unchanged) ---------------- */}
        <CustomCard className="p-3 space-y-3">
          <Typography weight="semibold" className="">Add Vehicle Details</Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        <CustomCard className="p-3 space-y-4">
          <Typography weight="semibold">Technical Details</Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CommonTextInput label="Chassis Number" placeholder="JT3HN86R9Y0123456" name="chassisNo" />
            <CommonTextInput label="Insurance Expiry Date" placeholder="DD-MM-YY" type="date" name="insuranceExpiry" />
            <CommonTextInput label="Purchase Date" placeholder="DD-MM-YY" type="date" name="purchaseDate" />
          </div>
        </CustomCard>

        {/* Insurance info */}
        <CustomCard className="p-3 space-y-4">
          <Typography weight="semibold">Insurance Information</Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CommonTextInput label="Insurance Provider" placeholder="GEICO" name="insuranceProvider" />
            <CommonTextInput label="Engine Number" placeholder="2GD-FTV123456" name="engineNo" />
          </div>
        </CustomCard>

        {/* Service history */}
        <CustomCard className="p-3 space-y-4">
          <Typography weight="semibold">Service History</Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CommonTextInput label="Last Service Date" placeholder="DD-MM-YY" type="date" name="lastServiceDate" />
            <CommonTextInput label="Odometer (km)" type="number" placeholder="45000" name="odometer" />
          </div>
        </CustomCard>

        {/* Default toggle */}
        <CustomCard className="p-3 bg-orange-50 flex items-center justify-between">
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
        <CustomCard className="p-3 space-y-4">
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

        <div className="flex justify-end pt-4">
          <Button type="submit" variant="gradient">
            {mode === "edit" ? "Update Vehicle" : "Save Vehicle"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
