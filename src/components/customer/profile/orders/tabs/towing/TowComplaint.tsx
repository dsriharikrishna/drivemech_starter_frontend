"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import ModalDropdown from "@/components/ui/DropDown";
import CommonTextArea from "@/components/forms/CommonTextArea";

export default function TowComplaint({
  onClose,
  onSubmitted,
  towDetails = { type: "Emergency Towing", provider: "QuickTow Services" },
}: {
  onClose: () => void;
  onSubmitted: () => void;
  towDetails?: { type: string; provider: string };
}) {
  const complaintTypes = [
    { id: "late", name: "Late Arrival" },
    { id: "rude", name: "Rude Driver" },
    { id: "overcharge", name: "Overcharged" },
    { id: "handling", name: "Incorrect Vehicle Handling" },
    { id: "damage", name: "Vehicle Damaged During Tow" },
    { id: "other", name: "Other" },
  ];

  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const submitComplaint = () => {
    console.log("Tow Complaint Submitted:", { reason, description, files });

    onClose();        // close complaint form
    onSubmitted();    // open success dialog
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  return (
    <div className="w-full sm:w-2xl md:w-3xl mx-auto space-y-6">

      {/* TOW DETAILS */}
      <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
        <p className="font-semibold text-gray-800">{towDetails.type}</p>
        <p className="text-sm text-gray-600">{towDetails.provider}</p>
      </div>

      {/* COMPLAINT TYPE */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Reason for Complaint *</label>

        <ModalDropdown
          items={complaintTypes}
          selectedItem={complaintTypes.find((c) => c.id === reason) || null}
          onSelect={(c) => setReason(c.id)}
          placeholder="Select complaint reason"
        />
      </div>

      {/* DESCRIPTION */}
      <CommonTextArea
        label="Description (optional)"
        name="towComplaintDescription"
        placeholder="Describe your issue..."
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* FILE UPLOAD */}
      <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 text-center space-y-3">
        <Upload className="mx-auto text-gray-600" />

        <label className="px-4 py-2 bg-white border border-gray-200 rounded-lg cursor-pointer text-sm">
          Upload Evidence
          <input type="file" multiple className="hidden" onChange={handleFileUpload} />
        </label>

        {files.length > 0 && (
          <p className="text-sm text-gray-600">{files.length} file(s) selected</p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        disabled={!reason}
        onClick={submitComplaint}
        className={`w-full py-3 rounded-xl text-white font-semibold ${
          !reason
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        Submit Complaint
      </button>
    </div>
  );
}
