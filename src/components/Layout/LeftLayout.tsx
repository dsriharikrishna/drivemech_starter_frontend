"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

const LeftLayout: React.FC<Props> = ({ children }) => {
  return <div className="w-full md:flex-3 min-w-0 space-y-4">{children}</div>;
};

export default LeftLayout;
