"use client";

import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse" | "bars";
  color?: "primary" | "secondary" | "white" | "gray";
  className?: string;
}

export default function Loader({
  size = "md",
  variant = "spinner",
  color = "primary",
  className = "",
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colorClasses = {
    primary: "border-orange-500",
    secondary: "border-blue-500",
    white: "border-white",
    gray: "border-gray-500",
  };

  const dotColorClasses = {
    primary: "bg-orange-500",
    secondary: "bg-blue-500",
    white: "bg-white",
    gray: "bg-gray-500",
  };

  const barColorClasses = {
    primary: "bg-orange-500",
    secondary: "bg-blue-500",
    white: "bg-white",
    gray: "bg-gray-500",
  };

  // Spinner variant (rotating circle)
  if (variant === "spinner") {
    return (
      <div
        className={`inline-block ${className}`}
        role="status"
        aria-label="Loading"
      >
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`}
        />
      </div>
    );
  }

  // Dots variant (three bouncing dots)
  if (variant === "dots") {
    const dotSize = {
      sm: "w-1.5 h-1.5",
      md: "w-2.5 h-2.5",
      lg: "w-3.5 h-3.5",
      xl: "w-5 h-5",
    };

    return (
      <div
        className={`inline-flex gap-1.5 ${className}`}
        role="status"
        aria-label="Loading"
      >
        <div
          className={`${dotSize[size]} ${dotColorClasses[color]} rounded-full animate-bounce`}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={`${dotSize[size]} ${dotColorClasses[color]} rounded-full animate-bounce`}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={`${dotSize[size]} ${dotColorClasses[color]} rounded-full animate-bounce`}
          style={{ animationDelay: "300ms" }}
        />
      </div>
    );
  }

  // Pulse variant (pulsing circle)
  if (variant === "pulse") {
    return (
      <div
        className={`inline-block ${className}`}
        role="status"
        aria-label="Loading"
      >
        <div
          className={`${sizeClasses[size]} ${dotColorClasses[color]} rounded-full animate-pulse`}
        />
      </div>
    );
  }

  // Bars variant (three scaling bars)
  if (variant === "bars") {
    const barWidth = {
      sm: "w-1",
      md: "w-1.5",
      lg: "w-2",
      xl: "w-3",
    };

    const barHeight = {
      sm: "h-4",
      md: "h-8",
      lg: "h-12",
      xl: "h-16",
    };

    return (
      <div
        className={`inline-flex gap-1 items-center ${className}`}
        role="status"
        aria-label="Loading"
      >
        <div
          className={`${barWidth[size]} ${barHeight[size]} ${barColorClasses[color]} rounded-sm animate-pulse`}
          style={{ animationDelay: "0ms", animationDuration: "0.8s" }}
        />
        <div
          className={`${barWidth[size]} ${barHeight[size]} ${barColorClasses[color]} rounded-sm animate-pulse`}
          style={{ animationDelay: "150ms", animationDuration: "0.8s" }}
        />
        <div
          className={`${barWidth[size]} ${barHeight[size]} ${barColorClasses[color]} rounded-sm animate-pulse`}
          style={{ animationDelay: "300ms", animationDuration: "0.8s" }}
        />
      </div>
    );
  }

  return null;
}
