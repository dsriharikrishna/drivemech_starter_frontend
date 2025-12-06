"use client";

import React from "react";

interface DialogBodyProps {
  children: React.ReactNode;
  className?: string;
}

const DialogBody: React.FC<DialogBodyProps> = ({ children, className }) => {
  return (
    <div
      className={`w-auto h-[90vh] bg-white overflow-auto rounded-xl ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default DialogBody;
