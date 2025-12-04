"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";

export default function TowComplaint({
  onClose,
  towDetails = {
    type: "Emergency Towing",
    provider: "QuickTow Services",
  },
}: {
  onClose: () => void;
  towDetails?: {
    type: string;
    provider: string;
  };
}) {
  const reasons = [
    "Late Arrival",
    "Rude Driver",
    "Overcharged",
    "Incorrect Vehicle Handling",
    "Damage During Towing",
    "Other",
  ];

  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSubmit = () => {
    console.log("Tow Complaint Submitted:", {
      reason: selectedReason,
      description,
      files,
    });

    onClose();
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-6 pb-10 rounded-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Raise a Complaint</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <X size={20} />
        </button>
      </div>

      {/* TOW DETAILS */}
      <div className="border rounded-xl p-4 bg-orange-50 mb-4">
        <p className="font-semibold text-gray-800">{towDetails.type}</p>
        <p className="text-sm text-gray-600">{towDetails.provider}</p>
      </div>

      {/* REASONS (RADIO OPTIONS) */}
      <div className="space-y-3 mb-4">
        <p className="font-medium">Reason for Complaint *</p>

        {reasons.map((reason) => (
          <label
            key={reason}
            className="flex items-center gap-3 px-3 py-2 border rounded-xl cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              name="complaintReason"
              value={reason}
              checked={selectedReason === reason}
              onChange={() => setSelectedReason(reason)}
              className="w-4 h-4"
            />
            {reason}
          </label>
        ))}
      </div>

      {/* DESCRIPTION */}
      <div className="mb-4">
        <label className="text-sm font-medium">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your issue..."
          className="w-full p-3 border rounded-xl mt-2 h-28 resize-none"
        />
      </div>

      {/* FILE UPLOAD */}
      <div className="border rounded-xl p-6 bg-gray-50 text-center mb-4">
        <Upload className="mx-auto text-gray-500 mb-2" />

        <label className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer text-sm hover:bg-gray-300">
          Upload Evidence
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>

        {files.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            {files.length} file(s) selected
          </p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        disabled={!selectedReason}
        onClick={handleSubmit}
        className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold disabled:bg-gray-300"
      >
        Submit Complaint
      </button>
    </div>
  );
}
