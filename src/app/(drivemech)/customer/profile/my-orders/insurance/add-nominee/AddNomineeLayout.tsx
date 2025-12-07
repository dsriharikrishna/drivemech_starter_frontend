"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, Mail } from "lucide-react";

// UI Components (your library)
import CustomCard from "@/components/ui/CustomCard";              // :contentReference[oaicite:8]{index=8}
import Button from "@/components/ui/Button";                      // :contentReference[oaicite:9]{index=9}
import Typography from "@/components/ui/Typography";              // :contentReference[oaicite:10]{index=10}
import CommonTextInput from "@/components/forms/CommonTextInput"; // :contentReference[oaicite:11]{index=11}
import CommonTextArea from "@/components/forms/CommonTextArea";   // :contentReference[oaicite:12]{index=12}
import CheckboxInput from "@/components/forms/CheckboxInput";    // :contentReference[oaicite:13]{index=13}

import ModalDropdown from "@/components/ui/DropDown";            // :contentReference[oaicite:14]{index=14}
import PhoneInput from "@/components/forms/PhoneInput";          // :contentReference[oaicite:15]{index=15}

import SharePercentageInput from "@/components/forms/SharePercentageInput";

import NomineeSuccessModal from "@/components/customer/profile/orders/tabs/insurance/NomineeSuccessModal";

import { useForm, FormProvider, Controller } from "react-hook-form";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";

const RELATION_OPTIONS = [
  { id: "Father", name: "Father" },
  { id: "Mother", name: "Mother" },
  { id: "Spouse", name: "Spouse" },
  { id: "Son", name: "Son" },
  { id: "Daughter", name: "Daughter" },
];

const GUARDIAN_OPTIONS = [
  { id: "Father", name: "Father" },
  { id: "Mother", name: "Mother" },
  { id: "Brother", name: "Brother" },
  { id: "Sister", name: "Sister" },
];

type FormValues = {
  nomineeName: string;
  relationship: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  share: number;
  guardianName?: string;
  guardianRelation?: string;
  fir?: boolean;
};

export default function AddNomineeLayout({ policyId }: { policyId: string }) {
  const router = useRouter();

  const methods = useForm<FormValues>({
    defaultValues: {
      nomineeName: "",
      relationship: "",
      dob: "",
      phone: "",
      email: "",
      address: "",
      share: 100,
      guardianName: "",
      guardianRelation: "",
      fir: false,
    },
  });

  const { register, watch, setValue, handleSubmit, control, formState: { errors } } = methods;

  const dobValue = watch("dob");
  const shareValue = watch("share");
  const relationshipValue = watch("relationship");
  const [isMinor, setIsMinor] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedNominee, setSubmittedNominee] = useState<any>(null);

  useEffect(() => {
    if (!dobValue) {
      setIsMinor(false);
      return;
    }
    const dobObj = new Date(dobValue);
    if (isNaN(dobObj.getTime())) {
      setIsMinor(false);
      return;
    }
    const today = new Date();
    let age = today.getFullYear() - dobObj.getFullYear();
    const m = today.getMonth() - dobObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobObj.getDate())) {
      age--;
    }
    setIsMinor(age < 18);
  }, [dobValue]);

  const onSubmit = (data: FormValues) => {
    // Basic required checks (RHF also shows errors when rules added)
    if (!data.nomineeName || !data.relationship || !data.dob || !data.phone) {
      return;
    }
    if (isMinor && (!data.guardianName || !data.guardianRelation)) {
      return;
    }

    setSubmittedNominee({
      name: data.nomineeName,
      relationship: data.relationship,
      share: data.share,
      isMinor,
    });
    setShowSuccess(true);
  };

  const handleCancel = () => router.back();

  return (
    <FormProvider {...methods}>

      <div className="max-w-5xl mx-auto px-6 py-3 flex flex-col gap-4">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-border pb-2">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={22} />
          </button>

          <div>
            <Typography variant="h4" weight="semibold">
              Add Nominee
            </Typography>
            <Typography variant="body" color="muted">
              Policy: {policyId || "GEICO-PL-2024-0015"}
            </Typography>
          </div>
        </div>

        <CustomCard className="space-y-6 border border-border">
          <Typography variant="h5" weight="semibold">
            Incident Details
          </Typography>

          <div className="grid grid-cols-2 gap-5">
            {/* Nominee Name */}
            <div>
              <CommonTextInput
                name="nomineeName"
                label="Nominee Name"
                placeholder="Enter full name"
                leftIcon={<User size={18} />}
              // but still surface errors
              />
              {errors.nomineeName && <p className="text-xs text-red-500 mt-1">{(errors.nomineeName as any)?.message}</p>}
            </div>

            {/* Relationship - ModalDropdown (Controller) */}
            <div className="mt-[-6px]">
              <label className="inputLabel">Relationship <span className="text-red-500">*</span></label>
              <Controller
                control={control}
                name="relationship"
                rules={{ required: "Relationship required" }}
                render={({ field }) => (
                  <ModalDropdown
                    items={RELATION_OPTIONS}
                    selectedItem={field.value ? { id: field.value, name: field.value } : null}
                    onSelect={(item) => field.onChange(item.id)}
                    placeholder="Select relationship"
                    buttonClassName="h-[40px]"
                  />
                )}
              />
              {errors.relationship && <p className="text-xs text-red-500 mt-1">{(errors.relationship as any)?.message}</p>}
            </div>

            {/* DOB */}
            <div>
              <label className="inputLabel mb-1">Date of Birth <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 border rounded-xl px-3 h-[40px]">
                <input
                  {...register("dob", { required: "DOB required" })}
                  type="date"
                  className="w-full outline-none text-sm"
                />
              </div>
              {errors.dob && <p className="text-xs text-red-500 mt-1">{(errors.dob as any)?.message}</p>}

              {isMinor && <p className="text-red-500 text-xs mt-1">Minor – Guardian details required</p>}
            </div>

            {/* Share Percentage (custom reusable component) */}
            <div>
              <SharePercentageInput name="share" label="Share Percentage" />
            </div>

            {/* Phone - uses PhoneInput which integrates with useFormContext */}
            <div>
              <PhoneInput
                name="phone"
                label="Phone Number"
                required
                countryOptions={[{ code: "IN", label: "India", iso: "IN" }]}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{(errors.phone as any)?.message}</p>}
            </div>

            {/* Email */}
            <div>
              <CommonTextInput
                name="email"
                label="Email"
                placeholder="nominee@example.com"
                leftIcon={<Mail size={18} />}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{(errors.email as any)?.message}</p>}
            </div>

            {/* Address - full width */}
            <div className="col-span-2">
              <CommonTextArea name="address" label="Address" placeholder="Enter complete address" rows={4} />
            </div>
          </div>

          {/* Guardian section (only when minor) */}
          {isMinor && (
            <div className="bg-orange-50 border border-orange-300 rounded-xl p-4 space-y-4">
              <Typography variant="body" weight="semibold" color="warning">
                ⚠️ Guardian Required
              </Typography>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <CommonTextInput name="guardianName" label="Guardian Name" placeholder="Enter guardian name" />
                  {errors.guardianName && <p className="text-xs text-red-500 mt-1">{(errors.guardianName as any)?.message}</p>}
                </div>

                <div>
                  <label className="inputLabel mb-1">Guardian Relationship <span className="text-red-500">*</span></label>
                  <Controller
                    control={control}
                    name="guardianRelation"
                    rules={{ required: isMinor ? "Guardian relation required" : false }}
                    render={({ field }) => (
                      <ModalDropdown
                        items={GUARDIAN_OPTIONS}
                        selectedItem={field.value ? { id: field.value, name: field.value } : null}
                        onSelect={(item) => field.onChange(item.id)}
                        placeholder="Select guardian relationship"
                        buttonClassName="h-[40px]"
                      />
                    )}
                  />
                  {errors.guardianRelation && <p className="text-xs text-red-500 mt-1">{(errors.guardianRelation as any)?.message}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Note */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm">
            <strong>Note:</strong> Total share percentage for all nominees must equal 100%. You can add multiple nominees and split the coverage amount accordingly.
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 pt-4">
            <Button variant="outline" fullWidth onClick={handleCancel}>
              Cancel
            </Button>

            <Button variant="gradient" fullWidth onClick={handleSubmit(onSubmit)}>
              Add Nominee
            </Button>
          </div>
        </CustomCard>


        {/* success modal */}
        <Dialog isOpen={showSuccess} onClose={() => setShowSuccess(false)}>
          <DialogBody className="p-4">
            <DialogHeader
              title={"Return Submitted"}
              onClose={() => { }}
            />

            <NomineeSuccessModal
              isOpen={showSuccess}
              onClose={() => setShowSuccess(false)}
              nominee={submittedNominee}
            />

          </DialogBody>
        </Dialog>
      </div>
    </FormProvider>
  );
}
