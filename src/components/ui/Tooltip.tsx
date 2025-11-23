import React from "react";

interface TooltipProps {
  label: string;
  placement?: "right" | "top" | "bottom" | "left";
  children: React.ReactNode;
}

export default function Tooltip({ label, placement = "right", children }: TooltipProps) {
  // Define position classes based on placement
  const positionClasses = {
    right: "left-full ml-5",
    left: "right-full mr-2",
    top: "bottom-full mb-2",
    bottom: "top-full mt-7 mr-10",
  };

  const arrowPosition = {
  top: "bottom-[-4px] left-1/2 -translate-x-1/2",
  bottom: "top-[-4px] right-3",
  left: "right-[-4px] top-1/2 -translate-y-1/2",
  right: "left-[-4px] top-1/2 -translate-y-1/2",
};

  return (
    <div className="relative group flex items-center justify-center">
      {children}

      {/* Tooltip Container */}
      <div
        className={`absolute z-100 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 tooltip px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-xs dark:bg-gray-700 ${positionClasses[placement]}`}
        role="tooltip"
      >
        {label}
        {/* Tooltip Arrow */}
        {/* <div className="tooltip-arrow" data-popper-arrow></div> */}
        <div className={`absolute w-2 h-2 rotate-45 bg-gray-900 dark:bg-gray-700 ${arrowPosition[placement]}`}></div>

      </div>
    </div>
  );
}
