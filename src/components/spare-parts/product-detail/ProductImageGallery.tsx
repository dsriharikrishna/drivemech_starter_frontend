"use client";

import React, { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex gap-4">
        {/* Thumbnail List */}
        <div className="flex flex-col gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-16 h-16 border-2 rounded-lg overflow-hidden transition-all ${
                selectedImage === index
                  ? "border-orange-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-300 rounded"></div>
              </div>
            </button>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 border border-gray-200 rounded-lg p-8 bg-gray-50">
          <div className="w-full h-96 flex items-center justify-center">
            <div className="w-64 h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
