"use client";

import { ReactNode } from "react";

export default function Dialog({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <div className="fixed z-50 inset-0 w-full h-full bg-opacity-500 backdrop-brightness-75 flex items-center justify-center">
      {children}
    </div>
  );
}
