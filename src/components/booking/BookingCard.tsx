import { ReactNode } from "react";

export default function BookingCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 w-full">
      {children}
    </div>
  );
}
