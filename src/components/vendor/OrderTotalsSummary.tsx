"use client";

import React from "react";

interface OrderTotalsSummaryProps {
    subTotal: number;
    freight: number;
    salesTax: number;
    total: number;
    /** Tax label, e.g. "Sales Tax (10%)" or "Sales Tax". Defaults to "Sales Tax (10%)" */
    taxLabel?: string;
    /** Currency symbol. Defaults to "$" */
    currency?: string;
    /** Extra CSS classes for the outer wrapper */
    className?: string;
}

const OrderTotalsSummary: React.FC<OrderTotalsSummaryProps> = ({
    subTotal,
    freight,
    salesTax,
    total,
    taxLabel = "Sales Tax (10%)",
    currency = "$",
    className = "",
}) => {
    return (
        <div className={`flex justify-end ${className}`}>
            <div className="w-full max-w-sm bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="space-y-2">
                    {/* Sub Total */}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sub Total</span>
                        <span className="font-medium text-gray-900">
                            {currency}{subTotal.toFixed(2)}
                        </span>
                    </div>

                    {/* Freight */}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Freight</span>
                        <span className="font-medium text-gray-900">
                            {currency}{freight.toFixed(2)}
                        </span>
                    </div>

                    {/* Sales Tax */}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{taxLabel}</span>
                        <span className="font-medium text-gray-900">
                            {currency}{salesTax.toFixed(2)}
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-300 my-2" />

                    {/* Total */}
                    <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-orange-600">
                            {currency}{total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTotalsSummary;
