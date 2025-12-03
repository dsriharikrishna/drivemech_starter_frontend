"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Upload } from "lucide-react";

const products = [
  { id: "p1", name: "Bosch Brake Pad Set", brand: "Bosch", qty: 2, price: 118.0, img: "/images/spares/brakepad.png" },
  { id: "p2", name: "Bosch Air Filter", brand: "Bosch", qty: 1, price: 28.0, img: "/images/spares/airfilter.png" },
  { id: "p3", name: "Wiper Blades Set", brand: "Bosch", qty: 1, price: 22.0, img: "/images/spares/wiper.png" },
];

export default function ReturnRequest({ orderId = "SPR-001", onConfirm }: { orderId?: string; onConfirm?: (data: any) => void }) {
  const [productId, setProductId] = useState("");
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [refundMethod, setRefundMethod] = useState("original");

  const reasons = ["Wrong item delivered", "Damaged item", "Missing parts", "Quality issue", "Other"];

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSubmit = () => {
    if (!productId || !reason) {
      alert("Please select product and reason");
      return;
    }
    const selected = products.find(p => p.id === productId);
    const payload = { orderId, productId, reason, comments, files, refundMethod, amount: selected?.price || 0 };
    // pass to confirmation modal
    onConfirm?.(payload);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-lg font-semibold">Return or Replace</h2>

      <div className="border rounded-xl p-4">
        <p className="font-semibold mb-2">Product Details</p>
        {products.map((p, i) => (
          <div key={p.id} className={`flex items-center justify-between py-3 ${i !== products.length - 1 ? "border-b" : ""}`}>
            <div className="flex items-center gap-3">
              <Image src={p.img} width={44} height={44} alt={p.name} className="rounded-lg" />
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500">{p.brand} • Qty: {p.qty}</p>
              </div>
            </div>
            <div className="text-orange-500 font-semibold">${p.price.toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Select Product to Return *</label>
        <select value={productId} onChange={e => setProductId(e.target.value)} className="w-full p-3 border rounded-xl">
          <option value="">Select a product</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <label className="text-sm font-medium">Reason for Return *</label>
        <select value={reason} onChange={e => setReason(e.target.value)} className="w-full p-3 border rounded-xl">
          <option value="">Select a reason</option>
          {reasons.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <label className="text-sm font-medium">Additional Comments (Optional)</label>
        <textarea value={comments} onChange={e => setComments(e.target.value)} className="w-full h-28 p-3 border rounded-xl" placeholder="Describe the issue..." />

        <div className="border rounded-xl bg-gray-50 p-6 text-center">
          <Upload className="mx-auto mb-2" />
          <p className="font-medium mb-1">Upload Photos (Optional)</p>
          <p className="text-sm text-gray-500 mb-3">Upload photos to help us process faster</p>
          <label className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer">
            Choose Files
            <input type="file" onChange={handleFiles} className="hidden" multiple />
          </label>
          {files.length > 0 && <p className="text-sm text-gray-600 mt-2">{files.length} files selected</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 items-center">
        <div className="border rounded-xl p-4">
          <p className="text-sm">Pickup Address</p>
          <p className="font-medium">123 Main Street, Apartment 4B</p>
          <button className="text-sm text-orange-500 mt-2">Change Address</button>
        </div>

        <div className="border rounded-xl p-4">
          <p className="text-sm">Refund Method</p>
          <div className="mt-3 space-y-2">
            <label className={`flex items-center justify-between p-3 border rounded-lg ${refundMethod === "original" ? "border-orange-300 bg-orange-50" : ""}`}>
              <div>
                <p className="font-medium">Original Payment Method</p>
                <p className="text-sm text-gray-500">Refund to card ending in ****1234</p>
              </div>
              <input type="radio" checked={refundMethod === "original"} onChange={() => setRefundMethod("original")} />
            </label>

            <label className={`flex items-center justify-between p-3 border rounded-lg ${refundMethod === "wallet" ? "border-orange-300 bg-orange-50" : ""}`}>
              <div>
                <p className="font-medium">DriveMech Wallet</p>
                <p className="text-sm text-gray-500">Instant credit to your wallet</p>
              </div>
              <input type="radio" checked={refundMethod === "wallet"} onChange={() => setRefundMethod("wallet")} />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border rounded-xl p-4 text-green-800">
        <p className="font-semibold">Refund Amount</p>
        <p className="text-lg font-bold">${products.find(p => p.id === productId)?.price ?? "0.00"}</p>
        <p className="text-xs mt-1">Refund will be processed within 5-7 business days</p>
      </div>

      <div className="flex gap-3">
        <button onClick={() => handleSubmit()} className="flex-1 bg-orange-500 text-white py-3 rounded-xl">Submit Return Request</button>
        <button onClick={() => onConfirm?.({ cancel: true })} className="flex-1 border rounded-xl py-3">Cancel</button>
      </div>
    </div>
  );
}
