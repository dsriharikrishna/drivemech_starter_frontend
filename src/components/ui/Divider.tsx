interface DividerProps {
  variant?: "solid" | "dashed" | "dotted";
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function Divider({
  variant = "solid",
  orientation = "horizontal",
  className = "",
}: DividerProps) {
  let baseClass = "";
  let variantClass = "";
  let sizeClass = "";

  // ========= VARIANT STYLE =========
  if (orientation === "horizontal") {
    // Horizontal border uses TOP BORDER
    if (variant === "solid") variantClass = "border-t border-gray-200";
    if (variant === "dashed") variantClass = "border-t border-dashed border-gray-300";
    if (variant === "dotted") variantClass = "border-t border-dotted border-gray-300";

    sizeClass = "w-full my-2";
  }

  if (orientation === "vertical") {
    // Vertical border uses LEFT BORDER
    if (variant === "solid") variantClass = "border-l border-gray-200";
    if (variant === "dashed") variantClass = "border-l border-dashed border-gray-300";
    if (variant === "dotted") variantClass = "border-l border-dotted border-gray-300";

    sizeClass = "h-auto min-h-full mx-2"; 
  }

  return <div className={`${variantClass} ${sizeClass} ${className}`} />;
}
