import React from 'react';
import Image from 'next/image';

interface DownLoadInvoiceProps {
  orderId?: string;
  invoiceNumber?: string;
  date?: string;
  amount?: number;
}

const DownLoadInvoice: React.FC<DownLoadInvoiceProps> = ({
  orderId = 'ORD-2024-001',
  invoiceNumber = 'INV-2024-001',
  date = '2024-12-16',
  amount = 579
}) => {
  const handleDownload = () => {
    // Sample download functionality
    console.log('Downloading invoice:', invoiceNumber);
    // In a real implementation, this would trigger a PDF download
    // Example: window.open(`/api/invoices/${invoiceNumber}/download`, '_blank');
  };

  return (
    <div className="w-full md:w-3xl mx-auto bg-white rounded-2xl space-y-8 flex flex-col items-center justify-center p-6">
      <div className="mb-4">
        <Image
          src="/svgs/Download-icon.svg"
          alt="Download"
          width={48}
          height={48}
          className="opacity-70"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Invoice #{invoiceNumber}
      </h3>

      <div className="text-sm text-gray-500 mb-4 text-center">
        <p>Order ID: {orderId}</p>
        <p>Date: {new Date(date).toLocaleDateString()}</p>
        <p className="font-semibold text-gray-900 mt-2">Amount: ${amount}</p>
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        <Image
          src="/svgs/Download-icon.svg"
          alt="Download"
          width={20}
          height={20}
          className="brightness-0 invert"
        />
        Download Invoice
      </button>
    </div>
  );
};

export default DownLoadInvoice;