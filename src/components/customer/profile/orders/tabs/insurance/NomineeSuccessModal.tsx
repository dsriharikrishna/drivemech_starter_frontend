"use client";

import React from "react";
import { X } from "lucide-react";

export default function NomineeSuccessModal({
  isOpen,
  onClose,
  nominee,
}: {
  isOpen: boolean;
  onClose: () => void;
  nominee: {
    name: string | "";
    relationship: string | "";
    share: number | 0;
    isMinor?: boolean | false;
  };
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      {/* MODAL CONTAINER */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-slideUp">
        
        {/* HEADER */}
        <div className="bg-gradient-to-b from-green-400 to-green-600 text-white text-center py-10">
          <div className="flex justify-end px-4 -mt-4">
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <X size={22} />
            </button>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <span className="text-4xl">👍</span>
            </div>
          </div>

          <h1 className="text-2xl font-semibold">Nominee Added!</h1>
          <p className="text-white/90 mt-1">
            Your loved one is now protected
          </p>
        </div>

        {/* DETAILS SECTION */}
        <div className="px-6 py-6 space-y-6">

          {/* NOMINEE DETAILS CARD */}
          <div className="border rounded-xl p-5 bg-orange-50">
            <h2 className="font-semibold mb-4">Nominee Details</h2>

            <div className="grid grid-cols-3 text-sm font-medium text-gray-700 gap-4">
              <div>
                <p className="text-gray-500 text-xs">Nominee Name</p>
                <p>{nominee.name}</p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Relationship</p>
                <p>{nominee.relationship}</p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">Share Percentage</p>
                <p>{nominee.share}% of sum assured</p>
              </div>
            </div>
          </div>

          {/* MINOR NOTICE */}
          {nominee.isMinor && (
            <div className="border rounded-xl p-4 bg-yellow-50 text-sm">
              <p className="font-semibold text-yellow-700">Minor Nominee</p>
              <p className="text-gray-700 mt-1">
                Guardian details have been recorded. Claims will be processed
                through the guardian until the nominee turns 18.
              </p>
            </div>
          )}

          {/* WHAT'S NEXT */}
          <div className="border rounded-xl p-5 bg-green-50 text-gray-700 text-sm">
            <p className="font-semibold mb-2">📄 What's Next</p>

            <ul className="space-y-1">
              <li>• Nominee details added to your policy document</li>
              <li>• You can add more nominees or modify existing ones anytime</li>
              <li>• Updated policy document will be sent to your email</li>
              <li>• Ensure total share percentage equals 100% across all nominees</li>
            </ul>

            <p className="text-center text-gray-500 text-xs mt-4">
              For any changes, you can modify nominee details from your policy dashboard
            </p>
          </div>

        </div>

        {/* FOOTER BUTTON */}
        <div className="p-6 pt-2">
          <button
            onClick={onClose}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-lg font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
