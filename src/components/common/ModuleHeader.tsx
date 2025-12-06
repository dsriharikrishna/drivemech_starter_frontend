"use client";

import { ArrowLeft } from "lucide-react";

interface ModuleHeaderProps {
  title: string;
  onBack?: () => void;
  rightSlot?: React.ReactNode; 
}

export default function ModuleHeader({ title, onBack, rightSlot }: ModuleHeaderProps) {
  return (
    <div className="bg-white border-b border-border px-4 py-2 rounded-2xl mb-2">
      <div className="flex items-center justify-between">
        
        {/* LEFT SECTION — Back + Title */}
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          <h1 className="text-xl font-semibold">{title}</h1>
        </div>

        {/* RIGHT SLOT — optional actions */}
        {rightSlot && <div>{rightSlot}</div>}
      </div>
    </div>
  );
}
