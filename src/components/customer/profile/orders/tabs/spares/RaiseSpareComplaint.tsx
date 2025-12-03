"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";

export default function RaiseSpareComplaint({ orderId = "SPR-001", onClose }: { orderId?: string; onClose?: () => void }) {
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const complaintTypes = [
    "Service Quality Issue",
    "Overcharging",
    "Rude Staff",
    "Incomplete Service",
    "Delay",
  ];

  const actions = [
    "Redo the service",
    "Partial refund",
    "Full refund",
    "Speak with manager",
    "Just filing for record",
  ];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSubmit = () => {
    if (!complaintType || !description || !selectedAction) {
      alert("Please fill in required fields");
      return;
    }
    // stubbed submit
    console.log("Complaint submitted:", { orderId, complaintType, description, selectedAction, files });
    alert("Complaint submitted. We'll contact you soon.");
    onClose?.();
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-lg font-semibold">Raise a Complaint</h2>

      <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
        <p className="font-semibold">Order Details</p>
        <p className="text-sm text-gray-600">Periodic Maintenance • A to Z Garage</p>
        <p className="text-sm font-medium mt-1">Order ID: {orderId}</p>
      </div>

      <div>
        <label className="text-sm font-medium">Complaint Type *</label>
        <select value={complaintType} onChange={e => setComplaintType(e.target.value)} className="w-full p-3 border rounded-xl mt-1">
          <option value="">Select a complaint type</option>
          {complaintTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Description *</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Share details..." className="w-full h-28 p-3 border rounded-xl mt-1" maxLength={500} />
        <p className="text-xs text-gray-400 text-right">{description.length}/500</p>
      </div>

      <div className="border rounded-xl bg-gray-50 p-6 text-center">
        <Upload className="mx-auto mb-2" />
        <p className="font-medium mb-1">Upload Evidence (Optional)</p>
        <p className="text-sm text-gray-500 mb-3">Photos or documents to support your complaint</p>
        <label className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer">
          Choose Files
          <input type="file" className="hidden" onChange={handleFile} multiple />
        </label>
        {files.length > 0 && <p className="text-sm text-gray-600 mt-2">{files.length} file(s) selected</p>}
      </div>

      <div>
        <p className="text-sm font-medium mb-2">What would you like us to do? *</p>
        <div className="space-y-2">
          {actions.map(a => (
            <label key={a} className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer">
              <input type="radio" name="action" checked={selectedAction === a} onChange={() => setSelectedAction(a)} className="w-4 h-4" />
              <span>{a}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border rounded-xl p-4 text-sm">
        <p className="font-semibold mb-2">What happens next?</p>
        <ul className="space-y-1">
          <li>• Your complaint will be reviewed within 24 hours</li>
          <li>• We'll contact you via email/phone for updates</li>
          <li>• Resolution time: 3–5 business days</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <button onClick={handleSubmit} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl">Submit Complaint</button>
        <button onClick={onClose} className="flex-1 border rounded-xl py-3">Cancel</button>
      </div>
    </div>
  );
}
