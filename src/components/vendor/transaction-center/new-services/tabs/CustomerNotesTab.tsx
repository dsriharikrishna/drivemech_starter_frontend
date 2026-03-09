"use client";

import React from "react";

const CustomerNotesTab: React.FC = () => {
  const notes = [
    'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
    'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes',
    'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes',
    'A "lorem ipsum" text generator is a tool that creates filler text for design and layout purposes.',
  ];

  return (
    <div className="mt-6">
      {/* Customer Notes List */}
      <div className="space-y-3">
        {notes.map((note, index) => (
          <div key={index} className="flex gap-3 text-sm text-gray-700">
            <span className="font-medium">{index + 1}</span>
            <span>{note}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerNotesTab;
