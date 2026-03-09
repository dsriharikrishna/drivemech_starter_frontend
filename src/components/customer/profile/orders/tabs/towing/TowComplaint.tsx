"use client";

import React, { useState, useCallback, useMemo } from "react";
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
  const complaintTypes = useMemo(
    () => [
      { id: "late", name: "Late Arrival" },
      { id: "rude", name: "Rude Driver" },
      { id: "overcharge", name: "Overcharged" },
      { id: "handling", name: "Incorrect Vehicle Handling" },
      { id: "damage", name: "Vehicle Damaged During Tow" },
      { id: "other", name: "Other" },
    ],
    []
  );

  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const submitComplaint = useCallback(() => {
    onClose();
    onSubmitted();
  }, [onClose, onSubmitted]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      setFiles(Array.from(e.target.files));
    },
    []
  );

  return (
    <div className="w-full sm:w-2xl md:w-3xl mx-auto space-y-4">
      {/* TOW DETAILS */}
      <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl">
        <p className="font-semibold text-gray-800 text-xs">{towDetails.type}</p>
        <p className="text-xs text-gray-600">{towDetails.provider}</p>
      </div>

      {/* COMPLAINT TYPE */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium">Reason for Complaint *</label>

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
      <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 text-center space-y-2.5">
        <Upload className="mx-auto text-gray-600" size={20} />

        <label className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg cursor-pointer text-xs">
          Upload Evidence
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>

        {files.length > 0 && (
          <p className="text-xs text-gray-600">
            {files.length} file(s) selected
          </p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        disabled={!reason}
        onClick={submitComplaint}
        className={`w-full py-2.5 rounded-xl text-white font-semibold text-xs ${
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
