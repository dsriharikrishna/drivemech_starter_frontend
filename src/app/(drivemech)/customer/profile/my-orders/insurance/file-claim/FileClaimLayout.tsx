"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Upload as UploadIcon,
  Clock,
  AlertTriangle,
  FileText,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ClaimSubmitted } from "@/components/customer/profile/orders/tabs/insurance/ClaimSubmitted";

/**
 * Pixel-oriented File Insurance Claim page (pure Tailwind).
 * - Replace any asset paths as needed.
 * - Uses a local uploaded image path from conversation history for header illustration.
 */

// Small helper to format date for "Claim Submitted" screen
function formatDateShort(d: Date) {
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

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

/* ========================= FileClaimLayout main component ========================= */
export default function FileClaimLayout({ policyId }: { policyId: string }) {
  const router = useRouter();

  // Form state
  const [claimType, setClaimType] = useState<string | null>(null);
  const [firChecked, setFirChecked] = useState(false);
  const [incidentDate, setIncidentDate] = useState<string>("");
  const [claimAmount, setClaimAmount] = useState<number | "">("");
  const [incidentDesc, setIncidentDesc] = useState("");
  const [witnessPhone, setWitnessPhone] = useState("");
  const [email, setEmail] = useState("");
  const [witnessName, setWitnessName] = useState("");
  const [witnessPhone2, setWitnessPhone2] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [submittedMeta, setSubmittedMeta] = useState<any>(null);

  // Derived
  const selectedTypeMeta = useMemo(() => CLAIM_TYPES.find((c) => c.key === claimType) ?? null, [claimType]);
  const policeRequired = selectedTypeMeta?.policeRequired ?? false;

  // Validation (simple - matches screenshot: claim type, date, desc, email required; police FIR if required; files required)
  const isFormValid = useMemo(() => {
    if (!claimType) return false;
    if (!incidentDate) return false;
    if (!incidentDesc || incidentDesc.trim().length < 5) return false;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return false;
    if (policeRequired && !firChecked) return false;
    // upload is required in screenshot
    if (files.length === 0) return false;
    return true;
  }, [claimType, incidentDate, incidentDesc, email, firChecked, policeRequired, files]);

  // File upload
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fl = e.target.files;
    if (!fl) return;
    const arr = Array.from(fl);
    // limit to 10 files, each <= 10MB
    const filtered = arr.filter((f) => f.size <= 10 * 1024 * 1024);
    const combined = [...files, ...filtered].slice(0, 10);
    setFiles(combined);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);

    // Simulate upload / API call
    await new Promise((r) => setTimeout(r, 1200));

    const newId = generateClaimId();
    setSubmittedId(newId);
    setSubmittedMeta({
      claimType: selectedTypeMeta?.label ?? "N/A",
      amount: typeof claimAmount === "number" ? claimAmount : null,
      date: incidentDate,
    });

    setSubmitting(false);
    // In a real app you'd navigate or show a modal. Here we show the submitted screen in-place.
  }

  // If submitted, render ClaimSubmitted
  if (submittedId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <ClaimSubmitted
          claimId={submittedId}
          claimType={submittedMeta?.claimType}
          amount={submittedMeta?.amount}
          date={submittedMeta?.date ? formatDateShort(new Date(submittedMeta?.date)) : null}
          onDone={() => router.push("/customer/profile/my-orders/insurance")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-semibold">File Insurance Claim</h1>
            <p className="text-sm text-gray-500">We're here to help you</p>
          </div>
        </div>

        {/* top illustration (using local uploaded image path) */}
        <div className="rounded-xl overflow-hidden mb-6">
          <Image
            src={"/mnt/data/9653d23f-c123-4c99-9b26-855de53a7b9d.png"}
            alt="header"
            width={1200}
            height={160}
            className="object-cover w-full h-40 rounded-xl"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Policy Info */}
          <div className="bg-white border rounded-xl p-4">
            <p className="font-semibold text-gray-700 mb-2">Policy Information</p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="text-xs text-gray-500">Policy ID:</p>
                <p className="font-medium">GEICO-PL-2024-0015</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Policy Type:</p>
                <p className="font-medium">N/A</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Sum Assured:</p>
                <p className="font-medium text-orange-600">$0</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Policy Holder:</p>
                <p className="font-medium">N/A</p>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-sm text-gray-700">
            <div className="flex gap-3">
              <AlertTriangle className="text-orange-500" />
              <div>
                <p className="font-semibold">Claim Guidelines</p>
                <ul className="list-disc ml-5 text-sm mt-2 space-y-1">
                  <li>File claim within 24 hours of incident</li>
                  <li>Provide accurate information to avoid delays</li>
                  <li>Upload all required documents</li>
                  <li>Police report mandatory for accident/theft claims</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Claim Type */}
          <div className="bg-white border rounded-xl p-4">
            <p className="font-semibold text-gray-700 mb-3">Claim Type *</p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {CLAIM_TYPES.map((t) => {
                const selected = t.key === claimType;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => {
                      setClaimType(t.key);
                      // reset FIR when switching type
                      setFirChecked(false);
                    }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${
                      selected ? "bg-orange-50 border-orange-200" : "bg-gray-50 border-gray-100"
                    } hover:shadow-sm transition`}
                  >
                    <div className="text-2xl">{t.icon}</div>
                    <div className="text-xs text-gray-700 text-center">{t.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Police required warning */}
          {policeRequired && (
            <div className="border rounded-xl p-4 bg-red-50 border-red-100 text-sm text-red-800">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <FileText size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Police Report Required</p>
                  <p className="text-sm">This claim type requires a police report. Please confirm you have filed one.</p>

                  <label className="mt-3 inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={firChecked}
                      onChange={(e) => setFirChecked(e.target.checked)}
                      className="h-4 w-4 rounded border"
                    />
                    <span className="text-sm">I have filed a police report (FIR)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Incident details */}
          <div className="bg-white border rounded-xl p-4 space-y-4">
            <p className="font-semibold text-gray-700">Incident Details</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Date of Incident *</label>
                <div className="mt-2">
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full p-3 border rounded-xl bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Claim Amount</label>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-2 bg-gray-50 rounded-l-md border border-r-0 text-gray-500">$</span>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={claimAmount as any}
                      onChange={(e) => setClaimAmount(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full p-3 border rounded-r-xl"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Maximum claimable: $0</p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Incident Description *</label>
              <textarea
                value={incidentDesc}
                onChange={(e) => setIncidentDesc(e.target.value)}
                placeholder="Provide detailed description of the incident..."
                maxLength={500}
                className="w-full p-3 mt-2 border rounded-xl h-32 resize-none"
              />
              <div className="text-xs text-gray-400 text-right">{incidentDesc.length}/500 characters</div>
            </div>
          </div>

          {/* Contact info */}
          <div className="bg-white border rounded-xl p-4">
            <p className="font-semibold text-gray-700 mb-3">Your Contact Information</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Witness Phone</label>
                <input
                  value={witnessPhone}
                  onChange={(e) => setWitnessPhone(e.target.value)}
                  className="w-full p-3 border rounded-xl"
                  placeholder="+91 X XX XX XX XX"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Email Address *</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-xl"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Witness Name</label>
                <input
                  value={witnessName}
                  onChange={(e) => setWitnessName(e.target.value)}
                  className="w-full p-3 border rounded-xl"
                  placeholder="Full name of witness"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Witness Phone</label>
                <input
                  value={witnessPhone2}
                  onChange={(e) => setWitnessPhone2(e.target.value)}
                  className="w-full p-3 border rounded-xl"
                  placeholder="+91 X XX XX XX XX"
                />
              </div>
            </div>
          </div>

          {/* Upload documents */}
          <div className="bg-white border rounded-xl p-4">
            <p className="font-semibold text-gray-700 mb-3">Upload Supporting Documents *</p>
            <p className="text-sm text-gray-500 mb-3">Photos of damage, police report, bills, estimates, etc.</p>

            <label className="w-full block">
              <div className="w-full border border-gray-200 rounded-xl py-10 px-6 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <UploadIcon className="mx-auto text-gray-500" />
                <div className="mt-2 text-sm text-gray-500">Upload Documents</div>
                <div className="mt-2 text-xs text-gray-400">Max 10 files, 10MB each (JPG, PNG, PDF)</div>
                <input type="file" multiple accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileUpload} className="hidden" />
              </div>
            </label>

            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 border rounded-lg p-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border rounded-sm flex items-center justify-center text-sm text-gray-600">
                        {f.name.split(".").pop()?.toUpperCase() || "F"}
                      </div>
                      <div>
                        <div className="font-medium">{f.name}</div>
                        <div className="text-xs text-gray-400">{(f.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="text-sm text-red-600 px-3 py-1 rounded-md border hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Claim processing notice */}
          <div className="bg-green-50 border rounded-xl p-3 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <Clock className="text-green-600" />
              <div>
                <p className="font-medium">Claim Processing</p>
                <p className="text-sm text-gray-600">Standard claims are processed within 7-10 business days. You'll receive regular updates on your claim status.</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={!isFormValid || submitting}
              className={`w-full max-w-md py-3 rounded-xl font-semibold ${
                !isFormValid || submitting ? "bg-gray-300 text-gray-700" : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              {submitting ? "Submitting..." : "Submit Claim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
