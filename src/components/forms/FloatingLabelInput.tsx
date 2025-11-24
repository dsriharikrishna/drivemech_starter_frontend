"use client";

import { useFormContext, RegisterOptions } from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface FloatingLabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  rules?: RegisterOptions;
  required?: boolean;
  icon?: React.ReactNode;
  variant?: "filled" | "outlined" | "standard";
  readOnly?: boolean;
}

export default function FloatingLabelInput({
  name,
  label,
  rules = {},
  required = false,
  icon,
  variant = "filled",
  ...rest
}: FloatingLabelInputProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const error = errors[name]?.message as string | undefined;

  // Base styles for different variants
  const variantStyles = {
    filled: `
      block w-full px-3 py-3 text-sm text-gray-900 
      bg-orange-50 border-0 border-b-2 appearance-none 
      focus:outline-none focus:ring-0 focus:border-orange-500 peer
      rounded-lg transition-all duration-200
      ${error ? 'border-red-500' : 'border-gray-300'}
      ${rest.readOnly ? 'bg-gray-100' : ''}
    `,
    outlined: `
      block w-full px-3 py-2.5 text-sm text-gray-900 
      bg-transparent rounded-lg border appearance-none 
      focus:outline-none focus:ring-0 focus:border-orange-500 peer
      transition-all duration-200
      ${error ? 'border-red-500' : 'border-gray-300'}
      ${rest.readOnly ? 'bg-gray-100' : ''}
    `,
    standard: `
      block w-full py-2 px-0 text-sm text-gray-900 
      bg-transparent border-0 border-b-2 appearance-none 
      focus:outline-none focus:ring-0 focus:border-orange-500 peer
      transition-all duration-200
      ${error ? 'border-red-500' : 'border-gray-300'}
      ${rest.readOnly ? 'bg-gray-100' : ''}
    `
  };

  const labelStyles = {
    filled: `
      absolute text-sm text-gray-500 duration-300 transform
      -translate-y-4 scale-75 top-4 z-10 origin-[0]
      left-3 peer-focus:left-3 peer-focus:text-gray-500
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
      peer-focus:scale-75 peer-focus:-translate-y-4
      ${value ? 'scale-75 -translate-y-4' : ''}
      ${error ? 'text-red-500 peer-focus:text-red-500' : 'peer-focus:text-gray-500'}
      ${rest.readOnly ? 'text-gray-400' : ''}
    `,
    outlined: `
      absolute text-sm text-gray-500 duration-300 transform
      -translate-y-4 scale-75 top-2 z-10 origin-[0]
      bg-white px-1 left-3 peer-focus:px-1
      peer-focus:text-gray-500 peer-placeholder-shown:scale-100
      peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
      peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4
      ${value ? 'scale-75 -translate-y-4 top-2' : ''}
      ${error ? 'text-red-500 peer-focus:text-red-500' : 'peer-focus:text-gray-500'}
      ${rest.readOnly ? 'text-gray-400' : ''}
    `,
    standard: `
      absolute text-sm text-gray-500 duration-300 transform
      -translate-y-6 scale-75 top-3 -z-10 origin-[0]
      left-0 peer-focus:left-0 peer-focus:text-gray-500
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
      peer-focus:scale-75 peer-focus:-translate-y-6
      ${value ? 'scale-75 -translate-y-6' : ''}
      ${error ? 'text-red-500 peer-focus:text-red-500' : 'peer-focus:text-gray-500'}
      ${error ? 'text-red-500 peer-focus:text-red-500' : 'peer-focus:text-orange-600'}
      ${rest.readOnly ? 'text-gray-400' : ''}
    `
  };

  const containerStyles = {
    filled: 'relative pt-4',
    outlined: 'relative pt-4',
    standard: 'relative pt-6'
  };

  return (
    <div className={`${containerStyles[variant]} ${rest.className || ''}`}>
      <div className="relative">
        <input
          {...register(name, { required, ...rules })}
          {...rest}
          id={rest.id || name}
          className={`${variantStyles[variant]} ${rest.className || ''}`}
          placeholder=" "
        />
        
        <label
          htmlFor={rest.id || name}
          className={labelStyles[variant]}
        >
          {icon && <span className="inline-flex mr-1.5">{icon}</span>}
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}




// // Filled variant (default)
// <FloatingLabelInput
//   name="email"
//   label="Email address"
//   variant="filled"
//   icon={<EmailIcon />}
//   required
// />

// // Outlined variant  
// <FloatingLabelInput
//   name="username"
//   label="Username"
//   variant="outlined"
//   icon={<UserIcon />}
// />

// // Standard variant
// <FloatingLabelInput
//   name="password" 
//   label="Password"
//   type="password"
//   variant="standard"
//   icon={<LockIcon />}
//   required
// />