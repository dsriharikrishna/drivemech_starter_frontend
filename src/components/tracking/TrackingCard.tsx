"use client";

import TrackingTimeline from "./TrackingTimeline";

interface SummaryProps {
  status: string;
  stage: string;
  estimate: string;
}

interface CardProps {
  summary: SummaryProps;
  steps: any[];
}

export default function TrackingCard({ summary, steps }: CardProps) {
  return (
    <div className="bg-white border border-border rounded-xl shadow-sm p-6">

      {/* SUMMARY — TRUE 4-COLUMN LAYOUT */}
      <div
        className="
          flex flex-col md:flex-row 
          items-start md:items-center 
          gap-6 
          border-border p-5 rounded-2xl bg-[#F0F6FF]
        "
      >
        {/* COLUMN 1 */}
        <div className="flex-1 min-w-[180px]">
          <p className="text-sm text-gray-500">Current Status</p>
          <p className="text-green-600 font-medium">{summary.status}</p>
        </div>

        {/* COLUMN 2 */}
        <div className="flex-1 min-w-[180px]">
          <p className="text-sm text-gray-500">Current Stage</p>
          <p className="text-orange-500 font-medium">{summary.stage}</p>
        </div>

        {/* COLUMN 3 */}
        <div className="flex-1 min-w-[180px]">
          <p className="text-sm text-gray-500">Estimated Completion</p>
          <p className="text-blue-600 font-medium">{summary.estimate}</p>
        </div>

        {/* COLUMN 4 — BUTTON */}
        <div className="flex-1 min-w-[180px] flex md:justify-end">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap">
            Contact Support
          </button>
        </div>
      </div>

      {/* TIMELINE */}
      <TrackingTimeline steps={steps} />
    </div>
  );
}
