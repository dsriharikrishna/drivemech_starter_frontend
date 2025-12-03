"use client";

import React from "react";
import Image from "next/image";

const GARAGE_ICON = "/mnt/data/9390e684-2a79-4ab6-af47-66c43268816f.png";

export default function DownLoadSpareInvoice({ orderId = "SPR-001", onClose }: { orderId?: string; onClose?: () => void }) {
  const handleDownload = () => {
    // Stubbed PDF generation — replace with real API call returning blob/url
    const html = `<h1>Invoice - ${orderId}</h1><p>Thanks for your order.</p>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${orderId}-invoice.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
          <Image src={GARAGE_ICON} alt="garage" width={48} height={48} />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Invoice</h2>
          <p className="text-sm text-gray-500">Order ID: {orderId}</p>
        </div>
      </div>

      <div className="border rounded-xl p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">A to Z Garage</p>
            <p className="text-sm text-gray-500">123 Main Street, City</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-orange-500">$168.00</p>
            <p className="text-sm text-gray-500">Paid</p>
          </div>
        </div>
        <div className="border-t my-3" />
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th>Item</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bosch Brake Pad Set</td>
              <td className="text-right">$118.00</td>
            </tr>
            <tr>
              <td>Bosch Air Filter</td>
              <td className="text-right">$28.00</td>
            </tr>
            <tr>
              <td>Wiper Blades Set</td>
              <td className="text-right">$22.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 font-semibold"
        >
          Download Invoice
        </button>
        <button
          onClick={onClose}
          className="flex-1 border rounded-xl py-3 font-semibold hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}
