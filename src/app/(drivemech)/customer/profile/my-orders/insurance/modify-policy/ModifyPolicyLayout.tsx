"use client";

import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ModifyPolicyLayout({ policyId }: { policyId: string }) {
  const router = useRouter();

  const [stage, setStage] = useState<"select" | "coverage" | "submitted">("select");

  /* Dummy policy data */
  const policy = {
    policyId: policyId,
    type: "Comprehensive",
    premium: 249,
    coverage: 8000,
    addons: 0,
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={22} />
        </button>

        <div>
          <h1 className="text-xl font-semibold">Modify Policy</h1>
          <p className="text-sm text-gray-500">Policy: {policy.policyId}</p>
        </div>
      </div>

      {/* ---- SCREEN 1: SELECT MODIFICATION TYPE ---- */}
      {stage === "select" && (
        <div className="space-y-6">

          {/* Current Policy Card */}
          <div className="p-5 rounded-xl border bg-white">
            <p className="font-semibold flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              Current Policy
            </p>

            <div className="grid grid-cols-2 mt-3 text-sm">
              <div>
                <p className="text-gray-500">Type:</p>
                <p className="font-semibold">{policy.type}</p>
              </div>

              <div>
                <p className="text-gray-500">Premium:</p>
                <p className="font-semibold text-purple-600">${policy.premium}/year</p>
              </div>

              <div>
                <p className="text-gray-500">Coverage:</p>
                <p className="font-semibold">${policy.coverage.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-gray-500">Add-ons:</p>
                <p className="font-semibold">{policy.addons} active</p>
              </div>
            </div>
          </div>

          {/* Modification List */}
          <div className="space-y-3">
            {[
              { label: "Coverage Amount", desc: "Increase or decrease sum assured", value: "coverage" },
              { label: "Add-ons & Riders", desc: "Modify additional coverage" },
              { label: "Deductible Amount", desc: "Change your deductible" },
              { label: "Update Beneficiary", desc: "Change nominee details" },
            ].map((item, i) => (
              <button
                key={i}
                className="w-full bg-white border rounded-xl p-4 text-left flex justify-between items-center hover:bg-gray-50"
                onClick={() => item.value && setStage("coverage")}
              >
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
          </div>

          {/* NOTE */}
          <div className="p-5 rounded-xl bg-orange-50 border text-sm">
            <p className="font-semibold text-orange-700">Please note</p>
            <ul className="mt-2 text-gray-700 space-y-1">
              <li>• Changes are subject to underwriting approval</li>
              <li>• Premium adjustment will be processed within 48 hours</li>
              <li>• Updated policy document will be sent to your email</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button className="px-6 py-3 rounded-xl border w-1/3">Cancel</button>
            <button
              onClick={() => setStage("coverage")}
              className="px-6 py-3 rounded-xl bg-orange-500 text-white w-1/3"
            >
              Confirm Changes
            </button>
          </div>
        </div>
      )}

      {/* ---- SCREEN 2: COVERAGE AMOUNT ---- */}
      {stage === "coverage" && (
        <div className="space-y-6">
          {/* Current Policy */}
          <div className="p-5 rounded-xl border bg-white">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <p className="font-semibold">Current Policy</p>
            </div>

            <div className="grid grid-cols-2 mt-3 text-sm">
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-semibold">{policy.type}</p>
              </div>

              <div>
                <p className="text-gray-500">Premium</p>
                <p className="font-semibold text-purple-600">${policy.premium}/year</p>
              </div>

              <div>
                <p className="text-gray-500">Coverage</p>
                <p className="font-semibold">${policy.coverage.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-gray-500">Add-ons</p>
                <p className="font-semibold">{policy.addons} active</p>
              </div>
            </div>
          </div>

          {/* Coverage Cards */}
          <div className="space-y-3">
            {[
              { amount: 50000, premium: 800 },
              { amount: 75000, premium: 1100 },
              { amount: 100000, premium: 1400 },
              { amount: 150000, premium: 2000 },
              { amount: 200000, premium: 2500 },
            ].map((item, i) => (
              <button
                key={i}
                className="w-full border p-4 bg-white rounded-xl hover:bg-purple-50 text-left"
              >
                <p className="font-semibold">${item.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{item.premium}/year</p>
              </button>
            ))}
          </div>

          {/* Effective Date */}
          <div>
            <label className="text-sm font-medium">Effective Date *</label>
            <input
              type="date"
              className="w-full p-3 border rounded-xl mt-2"
            />
          </div>

          {/* Premium Impact */}
          <div className="p-5 bg-purple-50 rounded-xl border text-sm">
            <p className="font-semibold">💲 Premium Impact</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span>Current Premium:</span>
                <span>${policy.premium}/year</span>
              </div>
              <div className="flex justify-between">
                <span>New Premium:</span>
                <span className="text-purple-700">$800/year</span>
              </div>
              <div className="flex justify-between text-red-600 font-semibold">
                <span>Difference:</span>
                <span>+ $551/year</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button className="px-6 py-3 rounded-xl border w-1/3">Cancel</button>
            <button
              onClick={() => setStage("submitted")}
              className="px-6 py-3 rounded-xl bg-orange-500 text-white w-1/3"
            >
              Confirm Changes
            </button>
          </div>
        </div>
      )}

      {/* ---- SCREEN 3: SUCCESS ---- */}
      {stage === "submitted" && (
        <div className="text-center space-y-6">
          <div className="text-6xl text-blue-600">✔</div>
          <h2 className="text-2xl font-semibold">Request Submitted!</h2>
          <p className="text-gray-600">Your policy modification is under review</p>

          <div className="bg-white p-5 rounded-xl border text-left space-y-3">
            <p className="font-semibold">Modification Request ID</p>
            <p className="text-xl font-bold text-blue-600">MOD-1877</p>

            <div className="border-t pt-3 space-y-2 text-sm">
              <p><strong>Modification Type:</strong> Coverage Amount</p>
              <p><strong>New Premium:</strong> $800/year</p>
              <p><strong>Effective Date:</strong> Nov 30, 2025</p>
            </div>
          </div>

          <button
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold"
            onClick={() => router.push("/customer/profile/my-orders")}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
