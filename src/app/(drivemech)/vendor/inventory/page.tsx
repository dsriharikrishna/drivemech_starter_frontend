import React from "react";

const InventoryPage = () => {
  return (
    <div className="w-full h-full ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory</h1>
        <p className="text-gray-600 mb-8">
          Track and manage your parts, tools, and supplies
        </p>

        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Inventory Module
            </h3>
            <p className="text-gray-500">This section is under development</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
