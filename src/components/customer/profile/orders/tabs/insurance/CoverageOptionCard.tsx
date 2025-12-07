"use client";

import Typography from "@/components/ui/Typography";
import CustomCard from "@/components/ui/CustomCard";

export default function CoverageOptionCard({ option, selected, onSelect }:any) {
  return (
    <button onClick={onSelect} className="w-full p-0">
      <CustomCard
        className={`p-2 rounded-xl border transition flex flex-col gap-1
        ${selected ? "border-purple-500 bg-white shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}
      >
        <Typography weight="semibold">${option.amount.toLocaleString()}</Typography>
        <Typography variant="small" color="muted">
          ${option.premium}/year
        </Typography>
      </CustomCard>
    </button>
  );
}
