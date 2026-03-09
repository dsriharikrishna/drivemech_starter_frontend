"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Divider from "@/components/ui/Divider";
import cookieService from "@/services/cookieService";
import Button from "@/components/ui/Button";
import { DownloadIcon } from "@/components/icons/TransactionIcons";
import DialogHeader from "@/components/modals/DialogHeader";

/* ------------------------------------------
   MAIN POLICY DETAILS PAGE
------------------------------------------- */
interface PolicyDetailsPageProps {
  id: string;
}

export default function PolicyDetailsPage({ id }: PolicyDetailsPageProps) {
  const router = useRouter();

  // Dummy backend data
  const [policy] = useState({
    insurer: "GEICO",
    type: "Comprehensive",
    policyNumber: id,
    idv: 8000,
    premium: 249,
    vehicle: "Toyota Hilux 2021 (ABC-1234)",
    active: true,
    validFrom: "Aug 1, 2024",
    validTill: "July 30, 2025",
    breakdown: { base: 210, addons: 25, tax: 14, total: 249 },
  });

  // Helper function to navigate to different policy-related pages
  const navigateTo = (path: string) => {
    // ✅ Try to get policy ID from props, then from cookies as fallback
    const policyId = id || cookieService.get("policyId");

    if (!policyId) {
      console.error("Policy ID is missing");
      return;
    }
    router.push(`/customer/profile/my-orders/insurance/${path}/${policyId}`);
  };

  // Dialog states
  const [openRenew, setOpenRenew] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={22} />
        </button>

        <div>
          <h1 className="text-xl font-semibold">Policy Details</h1>
          <p className="text-sm text-gray-500">{policy.policyNumber}</p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          <PolicyInfoCard policy={policy} />
          <CoverageBox />
          <SupportBox insurer={policy.insurer} />
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">
          <StatusCard policy={policy} />

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {/* FILE CLAIM */}
            <button
              onClick={() => navigateTo("file-claim")}
              className="border border-border p-1 rounded-xl flex flex-col items-center hover:bg-gray-50"
            >
              <img
                src="/svgs/policy-shield-icon.svg"
                alt="File Claim"
                className="w-[18px] h-[18px]"
              />
              <span className="text-xs mt-1">File Claim</span>
            </button>

            {/* ADD NOMINEE */}
            <button
              onClick={() => navigateTo("add-nominee")}
              className="border border-border p-1 rounded-xl flex flex-col items-center hover:bg-gray-50"
            >
              <img
                src="/svgs/user-icon.svg"
                alt="Add Nominee"
                className="w-[18px] h-[18px]"
              />
              <span className="text-xs mt-1">Add Nominee</span>
            </button>

            {/* MODIFY POLICY */}
            <button
              onClick={() => navigateTo("modify-policy")}
              className="border border-border p-1 rounded-xl flex flex-col items-center hover:bg-gray-50"
            >
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span className="text-xs mt-1">Modify Policy</span>
            </button>
          </div>

          {/* RENEW BUTTON */}
          <button
            className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white py-3 rounded-xl mt-5"
            onClick={() => setOpenRenew(true)}
          >
            <svg
              className="w-[18px] h-[18px] fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 3.99933 18.5493 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.021 19.412 19.413C19.02 19.805 18.5493 20.0007 18 20H6Z" />
            </svg>
            Renew Policy / Download PDF
          </button>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <button className="border border-border p-1 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2">
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              Reminder
            </button>
            <button className="border border-border p-1 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2">
              <img
                src="/svgs/claim-Icon.svg"
                alt="Claim"
                className="w-[18px] h-[18px]"
              />
              Claims
            </button>
          </div>

          <button className="w-full bg-green-100 text-green-700 mt-4 p-3 rounded-xl text-sm font-semibold">
            Renew Policy Early (Get 10% Discount)
          </button>
        </div>
      </div>

      {/* RENEW POLICY MODAL */}
      {openRenew && (
        <RenewPolicyModal policy={policy} onClose={() => setOpenRenew(false)} />
      )}
    </div>
  );
}

/* ------------------------------------------
   REUSABLE COMPONENTS
------------------------------------------- */

function PolicyInfoCard({ policy }: any) {
  return (
    <div className="border border-border rounded-xl p-5 bg-white space-y-4">
      <div className="flex items-center gap-3">
        <Image
          src="/svgs/policy-shield-icon.svg"
          width={32}
          height={32}
          alt="insurer"
        />

        <div>
          <h2 className="font-semibold">{policy.insurer}</h2>
          <p className="text-sm text-gray-500">{policy.type}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm pt-2">
        <DetailItem label="Policy Number" value={policy.policyNumber} />
        <DetailItem
          label="Insured Declared Value"
          value={`$${policy.idv.toLocaleString()}`}
        />
        <DetailItem label="Vehicle" value={policy.vehicle} />
        <DetailItem
          label="Premium"
          value={`$${policy.premium.toFixed(2)} / year`}
          className="text-orange-500"
        />
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className={`font-semibold ${className}`}>{value}</p>
    </div>
  );
}

function CoverageBox() {
  const coverages = [
    "Third-Party Damage",
    "Own Vehicle Damage",
    "Theft & Natural Disaster",
    "Zero Depreciation",
    "Roadside Assistance",
    "Personal Accident Cover",
  ];

  return (
    <div className="border border-border rounded-xl p-5 bg-white">
      <h2 className="font-semibold mb-3">Coverage Included</h2>

      <ul className="space-y-2">
        {coverages.map((c) => (
          <li key={c} className="flex items-center gap-2 text-gray-700">
            <img
              src="/svgs/check-Icon.svg"
              alt="Coverage"
              className="w-[18px] h-[18px]"
            />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SupportBox({ insurer }: { insurer: string }) {
  return (
    <div className="border  border-border rounded-xl p-5 bg-blue-50">
      <p className="font-semibold">📞 Need Help?</p>
      <p className="text-sm text-gray-600 mt-1">
        For claims or queries, contact {insurer} support or use the DriveMech
        helpline 24/7.
      </p>

      <button className="text-orange-600 text-sm mt-2 underline">
        Contact Support →
      </button>
    </div>
  );
}

function StatusCard({ policy }: any) {
  return (
    <div className="rounded-xl border border-border p-5 bg-white">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50">
        <img src="/svgs/check-Icon.svg" alt="Shield" className="w-6 h-6" />

        <div>
          <p className="font-semibold text-green-700">Policy Active</p>
          <p className="text-sm text-gray-600">Valid till {policy.validTill}</p>
        </div>
      </div>

      <div className="mt-5 text-sm">
        <p className="font-semibold mb-2">Validity Period</p>

        <div className="flex justify-between">
          <DetailItem label="Start Date" value={policy.validFrom} />
          <DetailItem label="End Date" value={policy.validTill} />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border text-sm space-y-2">
        <p className="font-semibold">Premium Breakdown</p>
        <BreakdownRow label="Base Premium" value={policy.breakdown.base} />
        <BreakdownRow label="Add-ons" value={policy.breakdown.addons} />
        <BreakdownRow label="Taxes" value={policy.breakdown.tax} />

        <Divider />

        <div className="flex justify-between font-semibold text-orange-500 text-lg">
          <span>Total Premium</span>
          <span>${policy.breakdown.total}</span>
        </div>
      </div>
    </div>
  );
}

function BreakdownRow({ label, value }: any) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>$ {value}</span>
    </div>
  );
}

/* ------------------------------------------
   MODAL: RENEW POLICY
------------------------------------------- */
function RenewPolicyModal({ policy, onClose }: any) {
  return (
    <ModalShell title="Renew Policy" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-gray-700">
          Renew your policy now to avoid expiration and enjoy continued
          protection.
        </p>

        <div className="border  border-border rounded-xl p-4">
          <p className="font-semibold">Renewal Offer</p>
          <p className="text-sm mt-1 text-gray-600">
            Annual Premium: <strong>${policy.premium}</strong>
          </p>
        </div>

        <Button size="sm" startIcon={<DownloadIcon />} onClick={onClose}>
          Download Policy PDF
        </Button>
      </div>
    </ModalShell>
  );
}

/* ------------------------------------------
   MODAL WRAPPER COMPONENT
------------------------------------------- */
function ModalShell({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow p-6 z-50 animate-fadeIn">
        <DialogHeader title={title} onClose={onClose} />

        {children}
      </div>
    </div>
  );
}
