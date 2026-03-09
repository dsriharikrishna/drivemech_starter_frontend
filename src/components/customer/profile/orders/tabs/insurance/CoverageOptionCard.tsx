"use client";

import Typography from "@/components/ui/Typography";
import CustomCard from "@/components/ui/CustomCard";
import { useCallback } from "react";

export default function CoverageOptionCard({
  option,
  selected,
  onSelect,
}: any) {
  const handleSelect = useCallback(() => {
    onSelect?.();
  }, [onSelect]);

  return (
    <button onClick={handleSelect} className="w-full p-0">
      <CustomCard
        className={`p-1.5 rounded-xl border transition flex flex-col gap-0.5
        ${selected ? "border-purple-500 bg-white shadow-md" : "border-gray-200 bg-white hover:bg-gray-50"}`}
      >
        <Typography weight="semibold" className="text-xs">
          ${option.amount.toLocaleString()}
        </Typography>
        <Typography variant="small" color="muted" className="text-xs">
          ${option.premium}/year
        </Typography>
      </CustomCard>
    </button>
  );
}
