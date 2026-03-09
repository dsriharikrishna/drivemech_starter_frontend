"use client";

import { ChevronRight } from "lucide-react";
import CustomCard from "@/components/ui/CustomCard";
import Typography from "@/components/ui/Typography";
import { useCallback } from "react";

export default function ModificationOptionItem({
  emoji,
  title,
  description,
  expanded,
  onClick,
}: any) {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <button onClick={handleClick} className="w-full text-left">
      <CustomCard
        className={`p-1.5 rounded-xl flex justify-between items-center transition border 
        ${expanded ? "border-purple-300 bg-purple-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-base">{emoji}</span>
          </div>

          <div>
            <Typography weight="semibold" className="text-xs">
              {title}
            </Typography>
            <Typography variant="small" color="muted" className="text-xs">
              {description}
            </Typography>
          </div>
        </div>

        <ChevronRight
          size={18}
          className={`text-gray-400 transition-transform ${expanded ? "rotate-90" : ""}`}
        />
      </CustomCard>
    </button>
  );
}
