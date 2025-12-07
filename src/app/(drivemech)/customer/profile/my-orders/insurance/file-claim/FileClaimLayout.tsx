"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Upload as UploadIcon,
  Clock,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ClaimSubmitted } from "@/components/customer/profile/orders/tabs/insurance/ClaimSubmitted";

// UI System Components
import { useForm, FormProvider } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import CheckboxInput from "@/components/forms/CheckboxInput";
import Button from "@/components/ui/Button";
import CustomCard from "@/components/ui/CustomCard";
import Typography from "@/components/ui/Typography";

const CLAIM_TYPES = [
  { key: "accident", label: "Accident Damage", icon: "🚗", policeRequired: false },
  { key: "theft", label: "Vehicle Theft", icon: "🔒", policeRequired: true },
  { key: "natural", label: "Natural Disaster", icon: "🌪️", policeRequired: false },
  { key: "fire", label: "Fire Damage", icon: "🔥", policeRequired: false },
  { key: "vandalism", label: "Vandalism", icon: "🔨", policeRequired: false },
  { key: "mechanical", label: "Mechanical Breakdown", icon: "⚙️", policeRequired: false },
  { key: "other", label: "Other", icon: "📋", policeRequired: false },
];

function generateClaimId() {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `CLM-${new Date().getFullYear()}-${n}`;
}

export default function FileClaimLayout({ policyId }: { policyId: string }) {
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      claimType: "",
      fir: false,
      incidentDate: "",
      claimAmount: "",
      incidentDesc: "",
      witnessPhone: "",
      email: "",
      witnessName: "",
      witnessPhone2: "",
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  const claimType = watch("claimType");
  const firChecked = watch("fir");
  const email = watch("email");
  const incidentDesc = watch("incidentDesc");
  const incidentDate = watch("incidentDate");

  const selectedTypeMeta = CLAIM_TYPES.find((c) => c.key === claimType) || null;
  const policeRequired = selectedTypeMeta?.policeRequired ?? false;

  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [submittedMeta, setSubmittedMeta] = useState<any>(null);

  // Upload
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const arr = Array.from(e.target.files ?? []);
    const valid = arr.filter((f) => f.size <= 10 * 1024 * 1024);
    const total = [...files, ...valid].slice(0, 10);
    setFiles(total);
  }
  const removeFile = (i: number) => setFiles((p) => p.filter((_, x) => x !== i));

  // Validation
  const isValid =
    claimType &&
    incidentDate &&
    incidentDesc.length >= 5 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    (!policeRequired || firChecked) &&
    files.length > 0;

  // Submit Handler
  const onSubmit = async (data: any) => {
    if (!isValid) return;
    setSubmitting(true);

    await new Promise((r) => setTimeout(r, 1200));

    const newId = generateClaimId();
    setSubmittedId(newId);
    setSubmittedMeta({
      claimType: selectedTypeMeta?.label,
      amount: data.claimAmount || null,
      date: data.incidentDate,
    });

    setSubmitting(false);
  };

  // AFTER SUBMIT SCREEN
  if (submittedId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <ClaimSubmitted
          claimId={submittedId}
          claimType={submittedMeta?.claimType}
          amount={submittedMeta?.amount}
          date={submittedMeta?.date}
          onDone={() => router.push("/customer/profile/my-orders/insurance")}
        />
      </div>
    );
  }

  /* ------------------------- UI Short Components ------------------------- */

  const Card = ({ children, className = "" }: any) => (
    <CustomCard className={`p-4 ${className}`}>{children}</CustomCard>
  );

  const ClaimTypeCard = ({ t }: any) => {
    const selected = t.key === claimType;
    return (
      <button
        type="button"
        onClick={() => setValue("claimType", t.key)}
        className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition
         ${selected ? "bg-orange-50 border-orange-300" : "bg-gray-50 border-gray-200"}`}
      >
        <div className="text-2xl">{t.icon}</div>
        <div className="text-xs text-gray-700">{t.label}</div>
      </button>
    );
  };

  const UploadBox = () => (
    <label className="block">
      <div className="w-full border border-gray-200 rounded-xl py-10 px-6 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
        <UploadIcon className="mx-auto text-gray-500" />
        <div className="mt-2 text-sm text-gray-500">Upload Documents</div>
        <div className="mt-1 text-xs text-gray-400">Max 10 files, 10MB each</div>
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </label>
  );

  /* ----------------------------- Main JSX ----------------------------- */

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={20} />
            </button>

            <div>
              <Typography variant="h5" weight="semibold">
                File Insurance Claim
              </Typography>
              <Typography color="muted" variant="body">
                We're here to help you
              </Typography>
            </div>
          </div>

          {/* Illustration */}
          <Image
            src={"/mnt/data/9653d23f-c123-4c99-9b26-855de53a7b9d.png"}
            alt="header"
            width={1200}
            height={160}
            className="rounded-xl object-cover w-full h-40 mb-6"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Policy Info */}
            <Card>
              <Typography weight="semibold">Policy Information</Typography>

              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Policy ID</p>
                  <p className="font-medium">{policyId ?? "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Policy Type</p>
                  <p className="font-medium">N/A</p>
                </div>
              </div>
            </Card>

            {/* Guidelines */}
            <Card className="bg-orange-50 border border-orange-200">
              <div className="flex gap-3">
                <AlertTriangle className="text-orange-500" />
                <div>
                  <Typography weight="semibold">Claim Guidelines</Typography>
                  <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
                    <li>File claim within 24 hours</li>
                    <li>Provide accurate information</li>
                    <li>Upload required documents</li>
                    <li>Police report required for accident/theft</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Claim Type */}
            <Card>
              <Typography weight="semibold" className="mb-3">
                Claim Type *
              </Typography>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {CLAIM_TYPES.map((t) => (
                  <ClaimTypeCard key={t.key} t={t} />
                ))}
              </div>
            </Card>

            {/* FIR Required */}
            {policeRequired && (
              <Card className="bg-red-50 border border-red-200">
                <div className="flex gap-3">
                  <FileText className="text-red-600" />
                  <div>
                    <Typography weight="semibold">Police Report Required</Typography>
                    <Typography variant="body" className="mt-1">
                      This claim type requires a police report (FIR).
                    </Typography>

                    <CheckboxInput name="fir" label="I have filed a police report" />
                  </div>
                </div>
              </Card>
            )}

            {/* Incident Details */}
            <Card>
              <Typography weight="semibold">Incident Details</Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                <CommonTextInput
                  name="incidentDate"
                  label="Date of Incident"
                  type="date"
                  required
                />

                <CommonTextInput
                  name="claimAmount"
                  label="Claim Amount"
                  type="number"
                  placeholder="0.00"
                  leftIcon={<span className="text-gray-400">$</span>}
                />
              </div>

              <CommonTextArea
                name="incidentDesc"
                label="Incident Description"
                placeholder="Provide detailed description..."
                rows={5}
                required
                className="mt-4"
              />
              <div className="text-xs text-gray-400 text-right">
                {incidentDesc.length}/500 characters
              </div>
            </Card>

            {/* Contact Info */}
            <Card>
              <Typography weight="semibold" className="mb-3">
                Your Contact Information
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CommonTextInput
                  name="witnessPhone"
                  label="Witness Phone"
                  placeholder="+91 XXXXX XXXXX"
                />

                <CommonTextInput
                  name="email"
                  label="Email Address"
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <CommonTextInput name="witnessName" label="Witness Name" />
                <CommonTextInput
                  name="witnessPhone2"
                  label="Witness Phone"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </Card>

            {/* Upload */}
            <Card>
              <Typography weight="semibold" className="mb-3">
                Upload Supporting Documents *
              </Typography>
              <UploadBox />

              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-gray-50 border p-2 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white border rounded flex items-center justify-center text-sm">
                          {f.name.split(".").pop()?.toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{f.name}</div>
                          <div className="text-xs text-gray-400">
                            {(f.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFile(i)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Claim Notice */}
            <Card className="bg-green-50 border border-green-200">
              <div className="flex gap-3">
                <Clock className="text-green-600" />
                <div>
                  <Typography weight="semibold">Claim Processing</Typography>
                  <Typography variant="body">
                    Claims are processed within 7–10 business days. You’ll get regular updates.
                  </Typography>
                </div>
              </div>
            </Card>

            {/* Submit */}
            <div className="flex justify-center">
              <Button
                type="submit"
                fullWidth
                size="lg"
                variant={isValid ? "gradient" : "secondary"}
                disabled={!isValid || submitting}
                className="max-w-md"
              >
                {submitting ? "Submitting..." : "Submit Claim"}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </FormProvider>
  );
}
