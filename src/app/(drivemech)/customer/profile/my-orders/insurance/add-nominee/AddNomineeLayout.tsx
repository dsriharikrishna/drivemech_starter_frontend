"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  User,
  Phone,
  Mail,
  Percent,
} from "lucide-react";
import NomineeSuccessModal from "@/components/customer/profile/orders/tabs/insurance/NomineeSuccessModal";

export default function AddNomineeLayout({ policyId }: { policyId: string }) {
  // Form states
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [share, setShare] = useState(100);

  // Guardian states
  const [isMinor, setIsMinor] = useState(false);
  const [guardianName, setGuardianName] = useState("");
  const [guardianRelation, setGuardianRelation] = useState("");

  // Modal state
  const [showSuccess, setShowSuccess] = useState(false);

  // Check minor age
  const handleDOB = (e: any) => {
    const dobValue = e.target.value;
    setDob(dobValue);

    const dobObj = new Date(dobValue);
    const age = new Date().getFullYear() - dobObj.getFullYear();

    setIsMinor(age < 18);
  };

  // Submit Nominee
  const handleSubmit = () => {
    if (!name || !relationship || !dob || !phone) {
      alert("Please fill all required fields.");
      return;
    }

    if (isMinor && (!guardianName || !guardianRelation)) {
      alert("Guardian details are required for a minor.");
      return;
    }

    setShowSuccess(true);
  };

  return (
    <>
      {/* SUCCESS MODAL */}
      {showSuccess && (
        <NomineeSuccessModal
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          nominee={{
            name,
            relationship,
            share,
            isMinor,
          }}
        />
      )}

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-xl font-semibold">Add Nominee</h1>
            <p className="text-gray-500 text-sm">
              Policy: {policyId || "GEICO-PL-2024-0015"}
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border p-6 space-y-6">
          <h2 className="font-semibold">Nominee Details</h2>

          <div className="grid grid-cols-2 gap-5">
            {/* Nominee Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Nominee Name *</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 h-12">
                <User className="text-gray-400" size={18} />
                <input
                  className="w-full outline-none"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Relationship */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Relationship *</label>
              <select
                className="border rounded-xl px-3 h-12 outline-none"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              >
                <option value="">Select relationship</option>
                <option>Father</option>
                <option>Mother</option>
                <option>Spouse</option>
                <option>Son</option>
                <option>Daughter</option>
              </select>
            </div>

            {/* DOB */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Date of Birth *</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 h-12">
                <input
                  type="date"
                  className="w-full outline-none"
                  value={dob}
                  onChange={handleDOB}
                />
                <Calendar className="text-gray-400" size={18} />
              </div>

              {isMinor && (
                <p className="text-red-500 text-xs">
                  Age: Minor – Guardian details required
                </p>
              )}
            </div>

            {/* Share Percentage */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Share Percentage *</label>
              <div className="flex items-center gap-2 border rounded-xl p-3">
                <Percent size={18} className="text-gray-400" />
                <input
                  type="number"
                  className="w-20 outline-none"
                  value={share}
                  onChange={(e) => setShare(Number(e.target.value))}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={share}
                  onChange={(e) => setShare(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Phone Number *</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 h-12">
                <span>+91</span>
                <Phone className="text-gray-400" size={18} />
                <input
                  className="w-full outline-none"
                  placeholder="XXX XX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Email *</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 h-12">
                <Mail className="text-gray-400" size={18} />
                <input
                  className="w-full outline-none"
                  placeholder="nominee@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Address */}
            <div className="col-span-2 space-y-1">
              <label className="text-sm font-medium">Address</label>
              <textarea
                className="w-full border rounded-xl p-3 h-28 outline-none"
                placeholder="Enter complete address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Guardian Section */}
          {isMinor && (
            <div className="bg-orange-50 border border-orange-300 rounded-xl p-4 space-y-4">
              <p className="font-semibold text-orange-700">
                ⚠️ Guardian Required
              </p>

              <div className="grid grid-cols-2 gap-5">
                {/* Guardian Name */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Guardian Name *
                  </label>
                  <input
                    className="w-full border rounded-xl p-3 outline-none"
                    placeholder="Guardian full name"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                  />
                </div>

                {/* Guardian Relationship */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Guardian’s Relationship *
                  </label>
                  <select
                    className="border rounded-xl px-3 h-12 outline-none"
                    value={guardianRelation}
                    onChange={(e) => setGuardianRelation(e.target.value)}
                  >
                    <option value="">Select relationship</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Brother</option>
                    <option>Sister</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Note */}
          <div className="bg-blue-50 border border-blue-200 text-sm p-4 rounded-xl">
            <strong>Note:</strong> Total share percentage must equal 100%.
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button className="px-6 py-3 border rounded-xl w-1/3">
              Cancel
            </button>

            <button
              className="px-6 py-3 rounded-xl w-1/3 bg-orange-500 text-white font-medium"
              onClick={handleSubmit}
            >
              Add Nominee
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
