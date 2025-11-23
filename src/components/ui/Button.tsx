interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline" | "gradient";
}

export default function Button({ children, icon, variant = "primary", className = "", ...props }: ButtonProps) {
  // Variant classes
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100",
    gradient: "bg-gradient-to-r from-primary to-primary text-white hover:from-primary hover:to-primary",
  };

  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 cursor-pointer px-4 py-2 rounded-lg font-medium text-sm leading-[150%]
        ${variantClasses[variant]} 
        ${props.disabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
