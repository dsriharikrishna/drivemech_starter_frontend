"use client";

import { ArrowLeft, Upload, MapPin, CreditCard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ReturnRequestLayout = (id:any) => {
  const router = useRouter();

  const products = [
    { id: "p1", name: "Bosch Brake Pad Set", brand: "Bosch", qty: 2, price: 118, img: "/images/spares/brakepad.png" },
    { id: "p2", name: "Bosch Air Filter", brand: "Bosch", qty: 1, price: 28, img: "/images/spares/airfilter.png" },
    { id: "p3", name: "Wiper Blades Set", brand: "Bosch", qty: 1, price: 22, img: "/images/spares/wiper.png" },
  ];

  const reasons = [
    "Wrong Item Delivered",
    "Item Damaged",
    "Missing Parts",
    "Poor Quality",
    "Not As Described",
  ];

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [comments, setComments] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (e: any) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-xl font-semibold">Return or Replace</h1>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="border rounded-xl p-4">
        <h2 className="font-semibold text-gray-800 mb-1">Product Details</h2>
        <p className="text-sm text-gray-500 mb-3">Order ID: SPR-001</p>

        {products.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b last:border-none py-3"
          >
            <div className="flex items-center gap-3">
              <Image src={item.img} width={50} height={50} alt="product" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.brand} • Qty: {item.qty}
                </p>
              </div>
            </div>

            <p className="font-semibold text-orange-500">
              ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT FORM SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* SELECT PRODUCT */}
          <div className="border rounded-xl p-4">
            <label className="text-sm font-medium">Select Product to Return *</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-3 mt-1 border rounded-xl focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select a product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* SELECT REASON */}
          <div className="border rounded-xl p-4">
            <label className="text-sm font-medium">Reason for Return *</label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="w-full p-3 mt-1 border rounded-xl focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select a reason</option>
              {reasons.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* COMMENTS */}
          <div className="border rounded-xl p-4">
            <label className="text-sm font-medium">Additional Comments (Optional)</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Describe the issue in detail..."
              className="w-full h-32 p-3 mt-1 border rounded-xl resize-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* FILE UPLOAD */}
          <div className="border rounded-xl p-6 flex flex-col items-center text-center bg-gray-50">
            <Upload size={32} className="text-gray-500 mb-2" />
            <p className="font-medium">Upload Photos (Optional)</p>
            <p className="text-sm text-gray-500 mb-4">
              Upload product images to speed up your request
            </p>

            <label className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 text-sm">
              Choose Files
              <input type="file" multiple className="hidden" onChange={handleFileUpload} />
            </label>

            {files.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {files.length} file(s) selected
              </p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5">

          {/* ADDRESS */}
          <div className="border rounded-xl p-4">
            <h2 className="font-semibold mb-3">Pickup Address</h2>

            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-orange-600 mt-1" />
              <div>
                <p className="text-gray-800 font-medium">
                  123 Main Street, Apartment 4B
                </p>
                <p className="text-sm text-gray-500">
                  Downtown, City, State 12345
                </p>
                <button className="text-orange-600 text-sm mt-1">
                  Change Address
                </button>
              </div>
            </div>
          </div>

          {/* REFUND METHOD */}
          <div className="border rounded-xl p-4 space-y-3">
            <h2 className="font-semibold">Refund Method</h2>

            <div className="p-3 border rounded-xl flex items-center justify-between bg-orange-50 border-orange-300">
              <div>
                <p className="font-medium">Original Payment Method</p>
                <p className="text-xs text-gray-600">Refund to card ending in ••••1234</p>
              </div>
              <CreditCard size={20} className="text-orange-600" />
            </div>

            <div className="p-3 border rounded-xl bg-gray-50">
              <p className="font-medium text-gray-700">DriveMech Wallet</p>
              <p className="text-xs text-gray-500">Instant credit to your wallet</p>
            </div>
          </div>

          {/* REFUND AMOUNT */}
          <div className="border rounded-xl p-4 bg-green-50 border-green-300">
            <p className="font-medium text-gray-700">Refund Amount</p>
            <p className="text-green-600 font-bold text-xl">$118.00</p>
            <p className="text-xs text-gray-500">
              Refund will be processed within 5–7 business days
            </p>
          </div>

          {/* IMPORTANT NOTES */}
          <div className="border rounded-xl p-4 bg-blue-50">
            <h2 className="font-semibold text-gray-800 mb-2">Important Notes</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Pickup scheduled within 2–3 business days</li>
              <li>• Item must be in original packaging</li>
              <li>• Free return shipping for damaged/wrong items</li>
              <li>• Quality check takes 2–3 days after pickup</li>
            </ul>
          </div>

          <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-orange-600">
            ✓ Submit Return Request
          </button>
        </div>
      </div>
    </div>
  );
}
