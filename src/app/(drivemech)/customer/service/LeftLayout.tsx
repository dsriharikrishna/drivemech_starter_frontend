'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
}

const LeftLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full lg:flex-3 space-y-8">
      {children}
    </div>
  );
};

export default LeftLayout;