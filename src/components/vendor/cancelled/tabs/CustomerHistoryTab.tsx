import React from "react";

const CustomerHistoryTab: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Service History
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-blue-600">12</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">10</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Cancelled</p>
            <p className="text-2xl font-bold text-red-600">2</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Order #123456788
              </p>
              <p className="text-xs text-gray-500">Sep 20, 2024</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Completed
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Service</p>
              <p className="text-gray-900 font-medium">Oil Change</p>
            </div>
            <div>
              <p className="text-gray-500">Amount</p>
              <p className="text-gray-900 font-medium">$85.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Order #123456787
              </p>
              <p className="text-xs text-gray-500">Aug 15, 2024</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Completed
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Service</p>
              <p className="text-gray-900 font-medium">Brake Inspection</p>
            </div>
            <div>
              <p className="text-gray-500">Amount</p>
              <p className="text-gray-900 font-medium">$120.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Order #123456786
              </p>
              <p className="text-xs text-gray-500">Jul 10, 2024</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Completed
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Service</p>
              <p className="text-gray-900 font-medium">AC Service</p>
            </div>
            <div>
              <p className="text-gray-500">Amount</p>
              <p className="text-gray-900 font-medium">$250.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHistoryTab;
