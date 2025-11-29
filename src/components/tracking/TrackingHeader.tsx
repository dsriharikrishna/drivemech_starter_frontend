"use client";

import { ArrowLeft } from "lucide-react";

interface Props {
  onBack?: () => void;
}

export default function TrackingHeader({ onBack }: Props) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <ArrowLeft
        className="w-5 h-5 text-gray-600 cursor-pointer"
        onClick={onBack}
      />
      <h2 className="text-lg font-semibold text-gray-800">Track Booking</h2>
    </div>
  );
}
