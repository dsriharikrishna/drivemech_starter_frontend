"use client";

import React, { useCallback } from "react";
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

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div className="bg-white w-full sm:w-2xl md:w-3xl rounded-2xl shadow-xl overflow-hidden animate-slideUp">
      {/* HEADER */}
      <div className="bg-gradient-to-b from-green-400 to-green-600 text-white text-center py-8">
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <span className="text-3xl">👍</span>
          </div>
        </div>

        <h1 className="text-xl font-semibold">Nominee Added!</h1>
        <p className="text-white/90 mt-0.5 text-xs">
          Your loved one is now protected
        </p>
      </div>

      {/* DETAILS SECTION */}
      <div className="px-4 py-4 space-y-4">
        {/* NOMINEE DETAILS CARD */}
        <div className="border border-border rounded-xl p-4 bg-orange-50">
          <h2 className="font-semibold mb-3 text-xs">Nominee Details</h2>

          <div className="grid grid-cols-3 text-xs font-medium text-gray-700 gap-3">
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
          <div className="border border-border rounded-xl p-3 bg-yellow-50 text-xs">
            <p className="font-semibold text-yellow-700">Minor Nominee</p>
            <p className="text-gray-700 mt-0.5">
              Guardian details have been recorded. Claims will be processed
              through the guardian until the nominee turns 18.
            </p>
          </div>
        )}

        {/* WHAT'S NEXT */}
        <div className="border border-border rounded-xl p-4 bg-green-50 text-gray-700 text-xs">
          <p className="font-semibold mb-1.5">📄 What's Next</p>

          <ul className="space-y-0.5">
            <li>• Nominee details added to your policy document</li>
            <li>• You can add more nominees or modify existing ones anytime</li>
            <li>• Updated policy document will be sent to your email</li>
            <li>
              • Ensure total share percentage equals 100% across all nominees
            </li>
          </ul>

          <p className="text-center text-gray-500 text-xs mt-3">
            For any changes, you can modify nominee details from your policy
            dashboard
          </p>
        </div>
      </div>

      {/* FOOTER BUTTON */}
      <div className="p-4 pt-2">
        <button
          onClick={handleClose}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-base font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
}
