"use client";

import React, { ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

interface CollapsibleSectionProps {
  title: string;
  icon: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  actionButton?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  isExpanded,
  onToggle,
  actionButton,
  children,
  className,
  headerClassName,
}) => {
  return (
    <div
      className={clsx(
        "bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm",
        className
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          "flex items-center justify-between px-4 py-3 border-b border-gray-200",
          headerClassName
        )}
      >
        <button
          onClick={onToggle}
          className="flex cursor-pointer items-center gap-3 flex-1 text-left"
        >
          <div className="text-gray-700">{icon}</div>
          <span className="text-sm font-semibold text-gray-900">{title}</span>
        </button>

        <div className="flex items-center gap-3">
          {actionButton && (
            <div onClick={(e) => e.stopPropagation()}>{actionButton}</div>
          )}
          <button onClick={onToggle} className="text-gray-600 cursor-pointer">
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && <div className="bg-white p-4">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
