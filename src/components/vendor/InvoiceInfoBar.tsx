"use client";

import React from "react";
import { InvoiceIcon, ReceiptItemIcon, SendIcon, ShareIcon } from "../icons/TransactionIcons";

interface InvoiceInfoBarProps {
    invoiceNumber: string;
    invoiceDate: string;
    onViewInvoice?: () => void;
    onShareInvoice?: () => void;
    className?: string;
}

export default function InvoiceInfoBar({
    invoiceNumber,
    invoiceDate,
    onViewInvoice,
    onShareInvoice,
    className = "",
}: InvoiceInfoBarProps) {
    return (
        <div className={`bg-white w-full rounded-xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border border-gray-100 shadow-sm ${className}`}>
            <div className="flex-1 w-full flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 w-full">
                    <div className="bg-blue-50/50 p-2 rounded-xl border border-blue-50">
                        <ReceiptItemIcon size={24} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-tight">Invoice No:</p>
                        <p className="text-sm font-bold text-gray-900 leading-tight p-1">
                            #{invoiceNumber}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-1 w-full">
                    <div>
                        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-tight">Invoice Generated On:</p>
                        <p className="text-sm font-bold text-gray-900 leading-tight">
                            {invoiceDate}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                <button
                    className="cursor-pointer flex-1 w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-[#F0F7FF] text-blue-600 rounded-md border border-dashed border-blue-300 hover:bg-blue-100 transition-all font-semibold text-sm shadow-sm"
                    onClick={onViewInvoice}
                >
                    <ReceiptItemIcon size={18} className="text-blue-600" />
                    View Invoice
                </button>
                <button
                    className="cursor-pointer flex-1 w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-[#F0FFF4] text-green-600 rounded-md border border-dashed border-green-300 hover:bg-green-100 transition-all font-semibold text-sm shadow-sm"
                    onClick={onShareInvoice}
                >
                    <SendIcon size={18} className="text-green-600" />
                    Share Invoice
                </button>
            </div>
        </div>
    );
}
