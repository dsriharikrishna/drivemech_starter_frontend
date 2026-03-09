import React from "react";
import { AlertCircle } from "lucide-react";

const ProductDisclaimer: React.FC = () => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-red-900 mb-1">
            Disclaimer
          </h3>
          <p className="text-xs text-red-800">
            Note that product images are for reference only. Product
            illustrations may not match the actual product. Actual products may
            differ in appearance, packaging, and/or specifications. We reserve
            the right to change product images and specifications at any time
            without notice. Please contact us if you have any questions about
            the product you are ordering. Actual colors may vary from the colors
            shown on your monitor. We are not responsible for any typographical
            errors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisclaimer;
