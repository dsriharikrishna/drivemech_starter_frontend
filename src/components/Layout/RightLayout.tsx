import React from 'react';

interface Props {
  children: React.ReactNode;
}

const RightLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full lg:flex-1">
      {children}
    </div>
  );
};

export default RightLayout;