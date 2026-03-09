"use client";

import React from "react";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  itemCount: number;
  total?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  itemCount,
  total: propTotal,
}) => {
  const total = propTotal ?? subtotal + shipping + tax;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Your Order</h2>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-gray-600 mb-6">
        Review your selected items and proceed to checkout
      </p>

      {/* Order Details */}
      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">
            Subtotal ({itemCount} items)
          </span>
          <span className="text-sm font-semibold text-gray-900">
            $ {subtotal.toFixed(2)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Shipping and Handling</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-green-600">Free</span>
            <span className="text-sm font-semibold text-gray-900">
              $ {shipping.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Tax (18%)</span>
          <span className="text-sm font-semibold text-gray-900">
            $ {tax.toFixed(2)}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">
            $ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
