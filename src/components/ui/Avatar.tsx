import React from "react";

type AvatarProps = {
  src?: React.ReactNode;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: "full" | "md" | "lg" | "none";
  className?: string;
};

const sizeClasses: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-14 h-14 text-lg",
  xl: "w-20 h-20 text-xl",
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  name = "NA",
  size = "md",
  rounded = "full",
  className = "",
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`relative flex items-center justify-center bg-gray-200 text-gray-700 font-semibold ${sizeClasses[size]} rounded-${rounded} overflow-hidden ${className}`}
    >
      {src ? (
        typeof src === "string" ? (
          <img
            src={src}
            alt={alt}
            className="object-cover"
            sizes="(max-width: 768px) 100vw"
          />
        ) : (
          <>{src}</>
        )
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
