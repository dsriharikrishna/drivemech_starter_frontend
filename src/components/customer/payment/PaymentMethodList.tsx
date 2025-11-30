import {
  CreditCard,
  QrCode,
  Banknote,
  Building,
} from "lucide-react";

import PaymentOptionButton from "./PaymentOptionButton";
import { PaymentMethod } from "@/types/payment";

interface Props {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export default function PaymentMethodList({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Payment Options</h1>

      {/* Saved Cards */}
      <PaymentOptionButton
        method="saved"
        label="Saved Payment Options"
        icon={<CreditCard className="w-5 h-5" />}
        selected={selected === "saved"}
        onClick={onSelect}
      />

      {/* UPI */}
      <PaymentOptionButton
        method="upi"
        label="UPI"
        icon={<QrCode className="w-5 h-5" />}
        selected={selected === "upi"}
        onClick={onSelect}
      />

      {/* Credit / Debit Card */}
      <PaymentOptionButton
        method="card"
        label="Credit / Debit Card"
        icon={<CreditCard className="w-5 h-5" />}
        selected={selected === "card"}
        onClick={onSelect}
      />

      {/* Online Banking */}
      <PaymentOptionButton
        method="online"
        label="Online Banking"
        icon={<Banknote className="w-5 h-5" />}
        selected={selected === "online"}
        onClick={onSelect}
      />

      {/* OR Separator */}
      <div className="flex items-center gap-3 mt-2">
        <div className="flex-grow border-t border-border" />
        <span className="text-gray-400 text-sm">or</span>
        <div className="flex-grow border-t border-border" />
      </div>

      {/* Pay at Workshop */}
      <PaymentOptionButton
        method="workshop"
        label="Pay at Workshop"
        icon={<Building className="w-5 h-5" />}
        selected={selected === "workshop"}
        onClick={onSelect}
      />
    </div>
  );
}
