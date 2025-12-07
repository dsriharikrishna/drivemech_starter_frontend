"use client";

import { ChevronRight } from "lucide-react";
import CustomCard from "@/components/ui/CustomCard";
import Typography from "@/components/ui/Typography";

export default function ModificationOptionItem({
  emoji,
  title,
  description,
  expanded,
  onClick,
}:any) {
  return (
    <button onClick={onClick} className="w-full text-left">
      <CustomCard
        className={`p-2 rounded-xl flex justify-between items-center transition border 
        ${expanded ? "border-purple-300 bg-purple-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-lg">{emoji}</span>
          </div>

          <div>
            <Typography weight="semibold">{title}</Typography>
            <Typography variant="small" color="muted">{description}</Typography>
          </div>
        </div>

        <ChevronRight
          size={20}
          className={`text-gray-400 transition-transform ${expanded ? "rotate-90" : ""}`}
        />
      </CustomCard>
    </button>
  );
}
