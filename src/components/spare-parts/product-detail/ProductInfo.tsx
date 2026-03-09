"use client";

import React from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  AlertCircle,
} from "lucide-react";

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    brand: string;
    rating: number;
    reviews: number;
    price: number;
    originalPrice: number;
    discount: number;
  };
  vehicle: {
    make: string;
    model: string;
    year: string;
  } | null;
  isInWishlist: boolean;
  isInCompare: boolean;
  quantity: number;
  selectedSize: string;
  sizes: string[];
  onSelectVehicle: () => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onToggleCompare: () => void;
  onQuantityChange: (quantity: number) => void;
  onSizeChange: (size: string) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  vehicle,
  isInWishlist,
  isInCompare,
  quantity,
  selectedSize,
  sizes,
  onSelectVehicle,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  onQuantityChange,
  onSizeChange,
}) => {
  const incrementQuantity = () => onQuantityChange(quantity + 1);
  const decrementQuantity = () =>
    onQuantityChange(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Product Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {product.rating} ({product.reviews} reviews)
        </span>
      </div>

      {/* Vehicle Compatibility Banner */}
      {vehicle ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-green-800">
                This item fits
              </p>
              <p className="text-xs text-green-700">
                Compatible with your {vehicle.make} {vehicle.model} (
                {vehicle.year}).{" "}
                <button
                  onClick={onSelectVehicle}
                  className="text-green-600 hover:underline font-medium"
                >
                  Change vehicle
                </button>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-800">
                Check compatibility
              </p>
              <p className="text-xs text-blue-700">
                Please select your vehicle to check if this part fits.{" "}
                <button
                  onClick={onSelectVehicle}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Select vehicle
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Product Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-600">Product SKU:</span>
          <span className="ml-2 font-medium text-gray-900">{product.id}</span>
        </div>
        <div>
          <span className="text-gray-600">Availability:</span>
          <span className="ml-2 font-medium text-green-600">In Stock</span>
        </div>
      </div>

      {/* Check Availability */}
      <div className="mb-4">
        <p className="text-xs text-gray-600 mb-2">Check availability</p>
        <input
          type="text"
          placeholder="Check"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Select Quantity */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-900 mb-2">
          Select quantity
        </p>
        <div className="flex gap-2 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                selectedSize === size
                  ? "border-orange-500 bg-orange-50 text-orange-600"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-gray-900">
            ${product.price}
          </span>
          <span className="text-lg text-gray-500 line-through">
            ${product.originalPrice}
          </span>
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">
            {product.discount}%
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Price includes shipping and handling
        </p>
      </div>

      {/* Quantity Selector and Add to Cart */}
      <div className="flex gap-3 mb-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={decrementQuantity}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          <span className="px-4 py-2 font-medium text-gray-900">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>

      {/* Wishlist and Compare */}
      <div className="flex gap-4 text-sm">
        <button
          onClick={onToggleWishlist}
          className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
          />
          {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        </button>
        <button
          onClick={onToggleCompare}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <svg
            className={`w-4 h-4 ${isInCompare ? "fill-blue-500 text-blue-500" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          {isInCompare ? "Remove from compare" : "Add to Compare"}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
