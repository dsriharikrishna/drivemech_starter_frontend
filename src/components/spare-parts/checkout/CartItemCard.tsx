"use client";

import React from "react";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  return (
    <div className="flex items-start gap-4 p-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">by {item.brand}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center text-sm font-medium text-gray-900">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Price and Delete */}
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-600 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <p className="text-lg font-semibold text-gray-900">
          $ {item.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
