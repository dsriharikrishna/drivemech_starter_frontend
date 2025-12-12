"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Download, ShieldCheck } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Divider from "@/components/ui/Divider";
import cookieService from "@/services/cookieService";

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
      console.error('Policy ID is missing');
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
              onClick={() => navigateTo('file-claim')}
              className="border border-border p-3 rounded-xl flex flex-col items-center hover:bg-gray-50"
            >
              🧾
              <span className="text-sm mt-1">File Claim</span>
            </button>

            {/* ADD NOMINEE */}
            <button
              onClick={() => navigateTo('add-nominee')}
              className="border border-border p-3 rounded-xl flex flex-col items-center hover:bg-gray-50"
            >
              👤+
              <span className="text-sm mt-1">Add Nominee</span>
            </button>

            {/* MODIFY POLICY */}
            <button
              onClick={() => navigateTo('modify-policy')}
              className="border border-border p-3 rounded-xl flex flex-col items-center hover:bg-gray-50"
            >
              ✏️
              <span className="text-sm mt-1">Modify Policy</span>
            </button>
          </div>

          {/* RENEW BUTTON */}
          <button
            className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white py-3 rounded-xl mt-5"
            onClick={() => setOpenRenew(true)}
          >
            <Download size={18} />
            Renew Policy / Download PDF
          </button>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <button className="border border-border p-3 rounded-xl hover:bg-gray-50">Reminder</button>
            <button className="border border-border p-3 rounded-xl hover:bg-gray-50">Claims</button>
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
        <Image src="/icons/shield.png" width={40} height={40} alt="insurer" />

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
            <ShieldCheck className="text-green-600" size={18} />
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
        <ShieldCheck className="text-green-600" />

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

        <button
          className="w-full bg-orange-500 text-white py-3 rounded-xl"
          onClick={onClose}
        >
          Download Policy PDF
        </button>
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
