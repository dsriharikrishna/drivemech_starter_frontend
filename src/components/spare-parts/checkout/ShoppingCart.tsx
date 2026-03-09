"use client";

import React, { useState } from "react";
import CartItemCard from "./CartItemCard";
import Button from "@/components/ui/Button";

interface CartItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
}

interface ShoppingCartProps {
  initialItems?: CartItem[];
  onCheckout?: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  initialItems = [],
  onCheckout,
}) => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Shopping Cart ({totalItems} items)
        </h1>
        <p className="text-sm text-gray-600">
          Review your selected items and proceed to checkout
        </p>
      </div>

      {/* Cart Items */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          items.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))
        )}
      </div>

      {/* Checkout Button */}
      {items.length > 0 && (
        <Button
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          onClick={onCheckout}
          className="bg-orange-500 hover:bg-orange-600"
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
};

export default ShoppingCart;
