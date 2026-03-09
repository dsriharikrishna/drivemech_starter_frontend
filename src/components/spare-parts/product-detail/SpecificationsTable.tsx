import React from "react";

interface Specification {
  label: string;
  value: string;
}

interface SpecificationsTableProps {
  specifications: Specification[];
}

const SpecificationsTable: React.FC<SpecificationsTableProps> = ({
  specifications,
}) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        {specifications.map((spec, index) => (
          <div key={index} className="flex py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600 w-1/2">{spec.label}</span>
            <span className="text-sm text-gray-900 w-1/2 font-medium">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificationsTable;
