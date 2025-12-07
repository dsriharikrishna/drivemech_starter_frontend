"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { useForm, FormProvider, Controller } from "react-hook-form";

import Typography from "@/components/ui/Typography";
import CustomCard from "@/components/ui/CustomCard";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import CommonTextInput from "@/components/forms/CommonTextInput";

import ModificationOptionItem from "@/components/customer/profile/orders/tabs/insurance/ModificationOptionItem";
import CoverageOptionCard from "@/components/customer/profile/orders/tabs/insurance/CoverageOptionCard";
import PremiumImpactCard from "@/components/customer/profile/orders/tabs/insurance/PremiumImpactCard";
import PolicySummaryCard from "@/components/customer/profile/orders/tabs/insurance/PolicySummaryCard";

import { ClaimSubmitted } from "@/components/customer/profile/orders/tabs/insurance/ClaimSubmitted";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";

const COVERAGE_OPTIONS = [
  { id: "50k", amount: 50000, premium: 800 },
  { id: "75k", amount: 75000, premium: 1100 },
  { id: "100k", amount: 100000, premium: 1400 },
  { id: "150k", amount: 150000, premium: 2000 },
  { id: "200k", amount: 200000, premium: 2500 },
];

function generateRequestId() {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `MOD-${n}`;
}

export default function ModifyPolicyLayout({ policyId }: { policyId: string }) {
  const router = useRouter();

  const policy = {
    id: policyId,
    type: "Comprehensive",
    premium: 249,
    coverage: 8000,
    addons: 0,
  };

  // RHF
  const methods = useForm({
    defaultValues: {
      newCoverage: "",
      effectiveDate: "",
    },
  });

  const { watch, setValue, control } = methods;

  // Accordion: which section is open
  const [openSection, setOpenSection] = useState<string | null>("coverage");

  // modal success state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // submitted request id (for modal and inline card)
  const [requestId, setRequestId] = useState<string | null>(null);

  // form derived values
  const selectedCoverage = watch("newCoverage");
  const selectedOption = COVERAGE_OPTIONS.find((o) => o.id === selectedCoverage);
  const newPremium = selectedOption?.premium ?? policy.premium;
  const difference = newPremium - policy.premium;
  const effectiveDate = watch("effectiveDate");

  // called when user confirms (footer button) — we open modal + show inline submitted view
  const handleConfirm = () => {
    // require effective date when coverage selected
    if (selectedCoverage && !effectiveDate) {
      // simple alert; you can replace with toasts or RHF errors
      alert("Please select an effective date.");
      return;
    }

    // create id and show both modal and inline submitted state
    const id = generateRequestId();
    setRequestId(id);

    // open inline submitted block
    setOpenSection("submitted");

    // open modal
    setShowSuccessModal(true);
  };

  // handler used by modal Done button (passed into ClaimSubmitted)
  const handleModalDone = () => {
    setShowSuccessModal(false);
    // navigate to orders page
    router.push("/customer/profile/my-orders");
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center gap-3 pb-2 border-b border-border">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={22} />
          </button>
          <div>
            <Typography variant="h5" weight="semibold">
              Modify Policy
            </Typography>
            <Typography color="muted">Policy: {policy.id}</Typography>
          </div>
        </div>

        {/* Summary */}
        <PolicySummaryCard policy={policy} />

        {/* Accordion list */}
        <div className="space-y-3">
          {/* Coverage */}
          <ModificationOptionItem
            emoji="💰"
            title="Coverage Amount"
            description="Increase or decrease sum assured"
            expanded={openSection === "coverage"}
            onClick={() => setOpenSection(openSection === "coverage" ? null : "coverage")}
          />

          {openSection === "coverage" && (
            <CustomCard className="p-4 border-purple-300 bg-purple-50">
              <Typography weight="semibold">New Coverage Amount *</Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {COVERAGE_OPTIONS.map((opt) => (
                  <CoverageOptionCard
                    key={opt.id}
                    option={opt}
                    selected={selectedCoverage === opt.id}
                    onSelect={() => setValue("newCoverage", opt.id)}
                  />
                ))}
              </div>

              {/* Effective Date with RHF Controller */}
              <div className="mt-4">
                <label className="inputLabel mb-1">Effective Date *</label>
                <div className="">
                  <Controller
                    name="effectiveDate"
                    control={control}
                    rules={{ required: "Effective date required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        placeholder=""
                        className="w-full"
                      />
                    )}
                  />
                </div>
                {!effectiveDate && (
                  <p className="text-xs text-red-500 mt-2">Changes will take effect from this date</p>
                )}
              </div>

              <Divider className="my-5" />

              <PremiumImpactCard currentPremium={policy.premium} newPremium={newPremium} difference={difference} />
            </CustomCard>
          )}

          {/* Add-ons */}
          <ModificationOptionItem
            emoji="🧩"
            title="Add-ons & Riders"
            description="Modify additional coverage"
            expanded={openSection === "addons"}
            onClick={() => setOpenSection(openSection === "addons" ? null : "addons")}
          />
          {openSection === "addons" && (
            <CustomCard className="p-4">
              <Typography weight="semibold">Add-ons & Riders</Typography>
              <Typography variant="small" color="muted">
                Coming soon — integrate addon toggles here.
              </Typography>
            </CustomCard>
          )}

          {/* Deductible */}
          <ModificationOptionItem
            emoji="🛡️"
            title="Deductible Amount"
            description="Change your deductible"
            expanded={openSection === "deductible"}
            onClick={() => setOpenSection(openSection === "deductible" ? null : "deductible")}
          />
          {openSection === "deductible" && (
            <CustomCard className="p-4">
              <Typography weight="semibold">Deductible</Typography>
              <Typography variant="small" color="muted">Deductible controls placeholder.</Typography>
            </CustomCard>
          )}

          {/* Beneficiary */}
          <ModificationOptionItem
            emoji="👤"
            title="Update Beneficiary"
            description="Change nominee details"
            expanded={openSection === "beneficiary"}
            onClick={() => setOpenSection(openSection === "beneficiary" ? null : "beneficiary")}
          />
          {openSection === "beneficiary" && (
            <CustomCard className="p-4">
              <Typography weight="semibold">Update Beneficiary</Typography>
              <Typography variant="small" color="muted">Beneficiary UI placeholder.</Typography>
            </CustomCard>
          )}
        </div>

        {/* Note */}
        <CustomCard className="p-4 bg-orange-50 border-orange-200 text-sm mt-5">
          <Typography weight="semibold" className="text-orange-700">Please note</Typography>
          <ul className="mt-2 space-y-1 text-gray-700">
            <li>• Changes are subject to underwriting approval</li>
            <li>• Premium adjustment will be processed within 48 hours</li>
            <li>• Updated policy document will be sent to your email</li>
          </ul>
        </CustomCard>

        {/* Footer */}
        <div className="flex gap-4">
          <Button fullWidth variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button fullWidth variant="gradient" onClick={() => {
            // If user has selected coverage and date, submit; otherwise, expand coverage section
            if (selectedCoverage && effectiveDate) {
              // open both inline submitted and modal
              const id = generateRequestId();
              setRequestId(id);
              setOpenSection("submitted");
              setShowSuccessModal(true);
            } else {
              // open coverage to prompt user to fill required fields
              setOpenSection("coverage");
            }
          }}>
            Confirm Changes
          </Button>
        </div>

        {/* Inline submitted screen (visible when openSection === 'submitted') */}
        {openSection === "submitted" && requestId && (
          <div className="text-center py-10 space-y-4">
            <div className="text-6xl text-blue-600">✔</div>
            <Typography variant="h4" weight="semibold">Request Submitted!</Typography>
            <Typography color="muted">Your policy modification is under review</Typography>

            <CustomCard className="p-5 text-left space-y-3">
              <Typography weight="semibold">Modification Request ID</Typography>
              <Typography variant="h4" className="text-blue-600">
                {requestId}
              </Typography>

              <Divider />

              <p><strong>Modification Type:</strong> Coverage Amount</p>
              <p><strong>New Premium:</strong> ${newPremium}/year</p>
              <p><strong>Effective Date:</strong> {effectiveDate || "N/A"}</p>
            </CustomCard>

            <Button fullWidth variant="gradient" onClick={() => router.push("/customer/profile/my-orders")}>
              Done
            </Button>
          </div>
        )}

        {/* Success modal (ClaimSubmitted) - Option C: show modal too */}
        <Dialog isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
          <DialogBody className="p-4">
            <DialogHeader title="Request Submitted" onClose={() => setShowSuccessModal(false)} />
            {requestId ? (
              <ClaimSubmitted
                claimId={requestId}
                claimType="Coverage Modification"
                amount={newPremium}
                date={effectiveDate || null}
                onDone={handleModalDone}
              />
            ) : (
              <div className="p-4">Processing...</div>
            )}
          </DialogBody>
        </Dialog>
      </div>
    </FormProvider>
  );
}
