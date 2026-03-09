import React from "react";

interface Props {
  children: React.ReactNode;
}

const RightLayout: React.FC<Props> = ({ children }) => {
  return <div className="w-full md:flex-1 min-w-0">{children}</div>;
};

export default RightLayout;
