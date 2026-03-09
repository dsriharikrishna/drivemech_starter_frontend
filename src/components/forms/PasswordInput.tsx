"use client";
import { useFormContext } from "react-hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
}

export default function PasswordInput({
  name,
  label,
  placeholder = "Enter your password",
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [show, setShow] = useState(false);
  const error = errors[name]?.message as string;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="inputLabel mb-1 block">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className={`border placeHolder${error ? "border-red-500 bg-red-50" : "border-gray-300"
            } text-sm rounded-xl h-[40px] px-3 focus:ring-blue-500 focus:border-blue-500 block w-full pr-10`}
          {...register(name)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-2 text-sm text-gray-500"
          onClick={() => setShow((s) => !s)}
          aria-label="Toggle password visibility"
        >
          {show ? <EyeSlash /> : <Eye />}
        </button>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
