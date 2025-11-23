"use client";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
}

export default function CheckboxInput({ name, label }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;

  return (
    <div className="flex items-start gap-2 mb-2">
      <input
        type="checkbox"
        id={name}
        {...register(name)}
        className="mt-1"
      />
      <label htmlFor={name} className="text-sm text-gray-700">
        {label}
      </label>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
