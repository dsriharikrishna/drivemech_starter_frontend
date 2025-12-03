"use client";

import { useState } from "react";
import { ChevronDown, Upload } from "lucide-react";
import ComplaintSubmitted from "./ComplaintSubmitted";

export default function RaiseComplaint() {
  // UI STATE: switch between form and submitted screen
  const [submitted, setSubmitted] = useState(false);

  // FORM STATE
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    if (!complaintType || !description || !selectedAction) {
      alert("Please fill all required fields.");
      return;
    }

    console.log("Complaint Submitted:", {
      complaintType,
      description,
      selectedAction,
      files,
    });

    // 👉 Show Complaint Submitted screen
    setSubmitted(true);
  };

  // 👉 Render Submitted screen
  if (submitted) return <ComplaintSubmitted />;

  // 👉 Render Complaint form
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 space-y-6">

      {/* TITLE */}
      <h1 className="text-lg font-semibold">Raise a Complaint</h1>

      {/* ORDER DETAILS CARD */}
      <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
        <p className="font-semibold text-gray-800 mb-1">Order Details</p>
        <p className="text-sm text-gray-600">Periodic Maintenance</p>
        <p className="text-sm text-gray-600">A to Z Garage</p>
        <p className="text-sm font-medium text-gray-700 mt-1">
          Order ID: SRV-001
        </p>
      </div>

      {/* COMPLAINT TYPE */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Complaint Type *</label>

        <div className="relative">
          <select
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
            className="w-full p-3 border rounded-xl appearance-none text-gray-700 focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select a complaint type</option>
            {complaintTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-4 text-gray-500 w-4 h-4" />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm font-medium">Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Share details of your experience..."
          maxLength={500}
          className="w-full h-32 p-3 border rounded-xl mt-1 resize-none focus:ring-2 focus:ring-orange-400 outline-none"
        />
        <p className="text-xs text-gray-400 text-right">
          {description.length}/500 characters
        </p>
      </div>

      {/* FILE UPLOAD */}
      <div className="border rounded-xl bg-gray-50 p-6 flex flex-col items-center text-center">
        <Upload className="w-7 h-7 text-gray-500 mb-2" />
        <p className="font-medium text-gray-700">Upload Evidence (Optional)</p>
        <p className="text-sm text-gray-500 mb-4">
          Upload photos or documents to support your complaint
        </p>

        <label className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer text-sm hover:bg-gray-300">
          Choose Files
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

      {/* ACTIONS */}
      <div className="space-y-3">
        <p className="text-sm font-medium">What would you like us to do?</p>

        {actions.map((action) => (
          <label
            key={action}
            className="flex items-center gap-3 px-3 py-3 border rounded-xl cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              name="action"
              value={action}
              checked={selectedAction === action}
              onChange={() => setSelectedAction(action)}
              className="w-5 h-5"
            />
            {action}
          </label>
        ))}
      </div>

      {/* WHAT HAPPENS NEXT */}
      <div className="bg-blue-50 border rounded-xl p-4 text-sm">
        <p className="font-semibold mb-2">What happens next?</p>
        <ul className="space-y-1 text-gray-700">
          <li>• Your complaint will be reviewed within 24 hours</li>
          <li>• We'll contact you via email/phone for updates</li>
          <li>• Resolution time: 3–5 business days</li>
          <li>• You can track complaint status in your profile</li>
        </ul>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleSubmit}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
      >
        Submit Complaint
      </button>
    </div>
  );
}
