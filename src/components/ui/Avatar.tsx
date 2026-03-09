import React from "react";

type AvatarProps = {
  src?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  alt?: string;
};

const sizeClasses = {
  xs: "w-5 h-5 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-lg",
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  name = "",
  size = "xs",
  className = "",
  alt = "",
}) => {
  const initials = name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`relative flex items-center justify-center rounded-full overflow-hidden 
        bg-gray-300 text-white font-semibold shadow-sm border border-gray-200
        ${sizeClasses[size]} ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="select-none">{initials || "?"}</span>
      )}
    </div>
  );
};

export default Avatar;
