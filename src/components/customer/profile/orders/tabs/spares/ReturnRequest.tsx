"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Upload, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ConfirmReturn from "@/components/customer/profile/orders/tabs/spares/ConfirmReturn";
import ReturnSubmitted from "./ReturnSubmitted";

export function ReturnRequest({ id }: { id: string }) {
  const router = useRouter();

  const [selectedProduct, setSelectedProduct] = useState("");
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [stage, setStage] = useState<"form" | "confirm" | "success">("form");

  const products = [
    { label: "Bosch Brake Pad Set", value: "p1", amount: 118 },
    { label: "Bosch Air Filter", value: "p2", amount: 28 },
    { label: "Wiper Blades Set", value: "p3", amount: 22 },
  ];

  const reasons = [
    "Wrong Item Delivered",
    "Damaged Product",
    "Not as Described",
    "Missing Items",
    "Other",
  ];

  const selectedItem = products.find((p) => p.value === selectedProduct);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  // ✅ FIXED CONFIRM STAGE
  if (stage === "confirm" && selectedItem) {
    return (
      <ConfirmReturn
        payload={{
          productName: selectedItem.label,
          amount: selectedItem.amount,
          reason,
          comments,
          files,
          refundMethod: "original",
          address: "123 Main Street, Apartment 4B",
        }}
        onBack={() => setStage("form")}
        onSubmit={() => setStage("success")}
      />
    );
  }

  // SUCCESS STAGE (unchanged)
  if (stage === "success") {
    return (
      <ReturnSubmitted
        returnId={id}
        onClose={() => router.push("/customer/profile/my-orders/spares")}
      />

    );
  }

  // FORM STAGE (unchanged)
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold">Return or Replace</h1>
      </div>

      {/* Product List */}
      <div className="border rounded-xl p-5 bg-white space-y-4">
        <p className="font-semibold text-gray-700">Product Details</p>
        <p className="text-xs text-gray-500">Order ID: {id}</p>

        {products.map((item) => (
          <div key={item.value} className="flex justify-between border-b last:border-none py-3">
            <div className="flex items-center gap-3">
              <Image src="/images/spares/brakepad.png" width={40} height={40} alt="product" />
              <p>{item.label}</p>
            </div>
            <p className="text-orange-500 font-semibold">${item.amount}</p>
          </div>
        ))}
      </div>

      {/* Select Product */}
      <div className="border rounded-xl p-4 bg-white">
        <label className="text-sm font-medium">Select Product to Return *</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full mt-2 p-3 border rounded-xl"
        >
          <option value="">Select a product</option>
          {products.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reason */}
      <div className="border rounded-xl p-4 bg-white">
        <label className="text-sm font-medium">Reason for Return *</label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full mt-2 p-3 border rounded-xl"
        >
          <option value="">Select a reason</option>
          {reasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Additional Comments */}
      <div className="border rounded-xl p-4 bg-white">
        <label className="text-sm font-medium">Additional Comments</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full p-3 rounded-xl border mt-2 h-28"
          placeholder="Describe the issue..."
        />
      </div>

      {/* Upload Photos */}
      <div className="border rounded-xl p-6 bg-gray-50 text-center">
        <Upload className="mx-auto text-gray-500 mb-2" />

        <label className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer text-sm">
          Choose Files
          <input type="file" multiple className="hidden" onChange={handleFileUpload} />
        </label>

        {files.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">{files.length} file(s) selected</p>
        )}
      </div>

      {/* Submit */}
      <button
        disabled={!selectedProduct || !reason}
        onClick={() => setStage("confirm")}
        className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold disabled:bg-gray-300"
      >
        Submit Return Request
      </button>
    </div>
  );
}
