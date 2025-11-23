import React, { ReactNode } from "react";
import clsx from "clsx";

type Variant = 'primary' | 'secondary' | 'gradient' | 'outline' | 'ghost';

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
};

// Base styles without padding/margin/width/height
const baseSizeStyles = {
  sm: 'text-xs font-medium',
  md: 'text-sm font-medium',
  lg: 'text-base font-medium',
};

// Padding and height styles
const sizeStyles = {
  sm: 'h-8 px-4',
  md: 'h-10 px-6',
  lg: 'h-12 px-8',
};

const roundedStyles = {
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-1 focus:ring-blue-500 focus:ring-offset-1',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-1 focus:ring-gray-500 focus:ring-offset-1',
  gradient: 'bg-gradient-to-r from-orange-500 to-orange-200 text-white hover:opacity-90 focus:ring-1 focus:ring-orange-500 focus:ring-offset-1 shadow-lg shadow-orange-500/30',
  outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:ring-offset-1',
  ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-1 focus:ring-blue-500 focus:ring-offset-1',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  startIcon,
  endIcon,
  className,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center gap-2 transition-colors focus:outline-none',
        'disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
        baseSizeStyles[size],
        sizeStyles[size],
        roundedStyles[rounded],
        variantStyles[variant],
        fullWidth && 'w-full',

        // Disabled state
        disabled && "opacity-50 cursor-not-allowed",

        className
      )}
    >
      {startIcon && <span className="me-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ms-2">{endIcon}</span>}
    </button>
  );
};

export default Button;