import { ReactNode } from "react";
import { PaymentMethod } from "@/types/payment";

interface Props {
  method: PaymentMethod;
  label: string;
  icon: ReactNode;
  selected: boolean;
  onClick: (method: PaymentMethod) => void;
}

export default function PaymentOptionButton({
  method,
  label,
  icon,
  selected,
  onClick,
}: Props) {
  return (
    <button
      onClick={() => onClick(method)}
      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg border text-sm transition
      ${selected ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>

      <span className="text-gray-400 text-lg">›</span>
    </button>
  );
}
