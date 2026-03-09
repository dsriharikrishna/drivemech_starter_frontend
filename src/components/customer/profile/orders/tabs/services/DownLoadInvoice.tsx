import React, { useCallback } from "react";
import Image from "next/image";

interface DownLoadInvoiceProps {
  orderId?: string;
  invoiceNumber?: string;
  date?: string;
  amount?: number;
}

const DownLoadInvoice: React.FC<DownLoadInvoiceProps> = ({
  orderId = "ORD-2024-001",
  invoiceNumber = "INV-2024-001",
  date = "2024-12-16",
  amount = 579,
}) => {
  const handleDownload = useCallback(() => {
    console.log("Downloading invoice:", invoiceNumber);
  }, [invoiceNumber]);

  return (
    <div className="w-full md:w-3xl mx-auto bg-white rounded-2xl space-y-6 flex flex-col items-center justify-center p-4">
      <div className="mb-3">
        <Image
          src="/svgs/Download-icon.svg"
          alt="Download"
          width={44}
          height={44}
          className="opacity-70"
        />
      </div>

      <h3 className="text-base font-semibold text-gray-900 mb-1.5">
        Invoice #{invoiceNumber}
      </h3>

      <div className="text-xs text-gray-500 mb-3 text-center">
        <p>Order ID: {orderId}</p>
        <p>Date: {new Date(date).toLocaleDateString()}</p>
        <p className="font-semibold text-gray-900 mt-1.5">Amount: ${amount}</p>
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs"
      >
        <Image
          src="/svgs/Download-icon.svg"
          alt="Download"
          width={18}
          height={18}
          className="brightness-0 invert"
        />
        Download Invoice
      </button>
    </div>
  );
};

export default DownLoadInvoice;
