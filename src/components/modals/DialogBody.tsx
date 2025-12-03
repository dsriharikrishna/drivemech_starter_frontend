"use client";

import React from "react";

interface DialogBodyProps {
  children: React.ReactNode;
}

const DialogBody: React.FC<DialogBodyProps> = ({ children }) => {
    return (
        <div className="w-auto h-[90vh] bg-white overflow-auto rounded-xl">
            {children}
        </div>
    );
};

export default DialogBody;
