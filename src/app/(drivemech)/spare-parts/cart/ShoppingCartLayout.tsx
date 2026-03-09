"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import { SmoothLandingBox } from "@/components/animations/SmoothLandingBox";
import { useAppSelector, useAppDispatch } from "@/store/store";
import {
  updateProductQuantity,
  removeProductFromCart,
  recalculatePricing,
} from "@/store/slices/customer/spare-parts/sparePartsCartSlice";

const ShoppingCartLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart, pricing } = useAppSelector((state) => state.spareParts);
  const cartItems = cart.products;

  React.useEffect(() => {
    dispatch(recalculatePricing());
  }, [dispatch]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateProductQuantity({ productId: id, quantity: newQuantity }));
  };

  const removeItem = (id: string) => {
    dispatch(removeProductFromCart(id));
  };

  const { subtotal, shippingCost, taxAmount, totalAmount } = pricing;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column - Cart Items */}
          <SmoothLandingBox variant="slide-right" delay={0.1} distance={30}>
            <div className="flex-1 lg:flex-[3]">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Header */}
                <div className="flex flex-col gap-1 mb-6">
                  <h1 className="text-xl font-bold text-gray-900">
                    Shopping Cart ({cartItems.length} items)
                  </h1>
                  <p className="text-sm text-gray-600">
                    Review your selected items and proceed to checkout
                  </p>
                </div>

                {/* Cart Items */}
                {cartItems.length > 0 ? (
                  <div className="flex flex-col gap-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <div className="w-16 h-16 bg-gray-300 rounded"></div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            by {item.brand}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center bg-white border border-gray-300 rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-gray-50 transition-colors rounded-l-md"
                          >
                            <Minus className="w-4 h-4 text-gray-700" />
                          </button>
                          <span className="px-4 text-sm font-medium text-gray-900 min-w-[40px] text-center border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-gray-50 transition-colors rounded-r-md"
                          >
                            <Plus className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-[100px]">
                          <p className="text-lg font-bold text-gray-900">
                            $ {item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty Cart Message */
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Add some products to get started
                    </p>
                    <button
                      onClick={() => router.push("/spare-parts/products")}
                      className="inline-block px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </SmoothLandingBox>

          {/* Right Column - Order Summary */}
          <SmoothLandingBox variant="slide-left" delay={0.15} distance={30}>
            <div className="flex-1 lg:flex-1 w-full">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
                {/* Header */}
                <div className="flex flex-col gap-1 mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Your Order
                  </h2>
                  <p className="text-sm text-gray-600">
                    Review your selected items and proceed to checkout
                  </p>
                </div>

                {/* Order Details */}
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className="font-bold text-gray-900">
                      $ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Shipping and Handling</span>
                    <span className="font-bold text-green-600">
                      Free ${shippingCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Tax (18%)</span>
                    <span className="font-bold text-gray-900">
                      $ {taxAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      $ {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => router.push("/spare-parts/checkout")}
                  disabled={cartItems.length === 0}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>

                {/* Continue Shopping Link */}
                <button
                  onClick={() => router.push("/spare-parts/products")}
                  className="block text-center text-sm text-blue-600 hover:underline mt-4 w-full"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </SmoothLandingBox>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartLayout;
