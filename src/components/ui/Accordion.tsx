"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

interface AccordionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  icon,
  isExpanded,
  onToggle,
  children,
  actionButton,
  className,
  headerClassName,
}) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow-sm overflow-visible p-2",
        className
      )}
    >
      <div
        className={clsx(
          "w-full rounded-xl flex items-center justify-between px-6 py-4 transition-colors",
          headerClassName || "bg-gray-800 text-white hover:bg-gray-700"
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-3 flex-1 cursor-pointer"
        >
          {icon}
          <span className="font-semibold">{title}</span>
        </button>

        <div className="flex items-center gap-3">
          {actionButton && (
            <div onClick={(e) => e.stopPropagation()}>{actionButton}</div>
          )}
          <button type="button" onClick={onToggle} className="cursor-pointer">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {isExpanded && <div className="p-6">{children}</div>}
    </div>
  );
};

export default Accordion;
