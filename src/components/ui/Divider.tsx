interface DividerProps {
  variant?: "solid" | "dashed" | "dotted";
  orientation?: "horizontal" | "vertical";
  className?: string;
  text?: string;
}

export default function Divider({
  variant = "solid",
  orientation = "horizontal",
  className = "",
  text,
}: DividerProps) {
  let baseClass = "";
  let variantClass = "";
  let sizeClass = "";

  // ========= VARIANT STYLE for HORIZONTAL =========
  if (orientation === "horizontal") {
    if (variant === "solid") variantClass = "border-t border-gray-200";
    if (variant === "dashed")
      variantClass = "border-t border-dashed border-gray-300";
    if (variant === "dotted")
      variantClass = "border-t border-dotted border-gray-300";

    sizeClass = "w-full my-2";

    // If text is provided for horizontal divider
    if (text) {
      return (
        <div className={`flex items-center w-full my-4 ${className}`}>
          <div className={`flex-grow ${variantClass}`}></div>
          <span className="px-3 text-sm text-gray-500 font-medium whitespace-nowrap">
            {text}
          </span>
          <div className={`flex-grow ${variantClass}`}></div>
        </div>
      );
    }
  }

  // ========= VARIANT STYLE for VERTICAL =========
  if (orientation === "vertical") {
    if (variant === "solid") variantClass = "border-l border-gray-200";
    if (variant === "dashed")
      variantClass = "border-l border-dashed border-gray-300";
    if (variant === "dotted")
      variantClass = "border-l border-dotted border-gray-300";

    sizeClass = "h-auto min-h-full mx-2";
  }

  return <div className={`${variantClass} ${sizeClass} ${className}`} />;
}
