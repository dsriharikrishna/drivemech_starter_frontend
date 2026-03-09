"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Package,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import type {
  SparePartOrder,
  OrderItem,
  TimelineEvent,
  StockAlert,
} from "@/schemas/vendor/spareParts.schema";

interface SparePartsOrderDetailsProps {
  order: SparePartOrder;
  onBack: () => void;
}

const SparePartsOrderDetails: React.FC<SparePartsOrderDetailsProps> = ({
  order,
  onBack,
}) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(order.items);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total: newQuantity * item.unitPrice,
            }
          : item
      )
    );
  };

  const getStockStatusBadge = (status: string) => {
    const config = {
      in_stock: { label: "In Stock", className: "bg-green-100 text-green-700" },
      low_stock: {
        label: "Low Stock",
        className: "bg-yellow-100 text-yellow-700",
      },
      out_of_stock: {
        label: "Out of Stock",
        className: "bg-red-100 text-red-700",
      },
    };
    const statusConfig =
      config[status as keyof typeof config] || config.in_stock;
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded ${statusConfig.className}`}
      >
        {statusConfig.label}
      </span>
    );
  };

  const getActionButton = () => {
    const buttonConfig = {
      new: {
        label: "Start Packing",
        className: "bg-orange-500 hover:bg-orange-600",
        icon: "📦",
        disabled: false,
      },
      confirmed: {
        label: "Mark as Ready",
        className: "bg-teal-500 hover:bg-teal-600",
        icon: "✓",
        disabled: false,
      },
      packed: {
        label: "Assign to Delivery",
        className: "bg-purple-500 hover:bg-purple-600",
        icon: "🚚",
        disabled: false,
      },
      ready: {
        label: "Order Completed",
        className: "bg-orange-500 hover:bg-orange-600",
        icon: "✓",
        disabled: false,
      },
      completed: {
        label: "Completed",
        className: "bg-gray-400 cursor-not-allowed",
        icon: "✓",
        disabled: true,
      },
    };
    const config =
      buttonConfig[order.status as keyof typeof buttonConfig] ||
      buttonConfig.new;
    return (
      <button
        disabled={config.disabled}
        className={`px-4 py-2 text-sm text-white rounded-lg font-medium flex items-center gap-2 transition-colors ${config.className}`}
      >
        <span>{config.icon}</span>
        {config.label}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="bg-gray-800 text-white px-4 py-3 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 className="text-base font-semibold">
                Order Details - {order.orderId}
              </h2>
              <p className="text-xs text-gray-300">
                Created on {order.createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <User size={16} className="text-gray-700" />
          <h3 className="text-sm font-semibold text-gray-900">
            Customer Information
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-gray-600">Name</label>
            <p className="text-sm font-medium text-gray-900">
              {order.customer.name}
            </p>
          </div>
          <div>
            <label className="text-xs text-gray-600 flex items-center gap-1">
              <Phone size={12} /> Phone
            </label>
            <p className="text-sm font-medium text-gray-900">
              {order.customer.phone}
            </p>
          </div>
          <div>
            <label className="text-xs text-gray-600 flex items-center gap-1">
              <Mail size={12} /> Email
            </label>
            <p className="text-sm font-medium text-gray-900">
              {order.customer.email}
            </p>
          </div>
          <div>
            <label className="text-xs text-gray-600 flex items-center gap-1">
              <MapPin size={12} /> Address
            </label>
            <p className="text-sm font-medium text-gray-900">
              {order.customer.address}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column - Customer & Order Items */}
        <div className="flex-2 flex flex-col gap-4">
          {/* Order Items */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Package size={16} className="text-gray-700" />
              <h3 className="text-sm font-semibold text-gray-900">
                Order Items
              </h3>
            </div>
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package size={20} className="text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1.5">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900">
                            {item.productName}
                          </h4>
                          <p className="text-xs text-gray-600">
                            SKU: {item.sku}
                          </p>
                        </div>
                        {getStockStatusBadge(item.stockStatus)}
                      </div>
                      <div className="grid grid-cols-3 gap-3 items-center">
                        <div>
                          <label className="text-xs text-gray-600 block mb-1">
                            Quantity
                          </label>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="w-10 sm:w-10 text-sm text-center border border-gray-300 rounded px-1.5 py-1"
                            />
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-gray-600 block mb-1">
                            Unit Price
                          </label>
                          <p className="text-sm font-medium text-gray-900">
                            ${item.unitPrice}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-600 block mb-1">
                            Total
                          </label>
                          <p className="text-sm font-semibold text-gray-900">
                            ${item.total}
                          </p>
                        </div>
                      </div>
                      {item.stockStatus === "out_of_stock" && (
                        <button className="mt-1.5 text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
                          🔄 Replace
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-900">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ${order.totalAmount}
                </span>
              </div>
            </div>
            <div className="mt-3 flex justify-center">{getActionButton()}</div>
          </div>
        </div>

        {/* Right Column - Timeline & Stock Alerts */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Order Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} className="text-gray-700" />
              <h3 className="text-sm font-semibold text-gray-900">
                Order Timeline
              </h3>
            </div>
            <div className="flex flex-col gap-0">
              {order.timeline.map((event, index) => (
                <div key={event.id} className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        event.status === "completed"
                          ? "bg-green-100"
                          : event.status === "active"
                            ? "bg-orange-100"
                            : "bg-gray-100"
                      }`}
                    >
                      {event.status === "completed" && (
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {event.status === "active" && (
                        <div className="w-2.5 h-2.5 bg-orange-600 rounded-full"></div>
                      )}
                      {event.status === "pending" && (
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                    {index < order.timeline.length - 1 && (
                      <div className="w-0.5 h-10 bg-gray-200"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-3">
                    <p
                      className={`text-sm font-medium ${event.status === "completed" ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {event.title}
                    </p>
                    {event.timestamp && (
                      <p className="text-xs text-gray-500">{event.timestamp}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Alerts */}
          {order.stockAlerts && order.stockAlerts.length > 0 && (
            <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-yellow-600" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Stock Alerts
                </h3>
              </div>
              <ul className="space-y-1.5">
                {order.stockAlerts.map((alert) => (
                  <li
                    key={alert.id}
                    className="text-xs text-gray-700 flex items-start gap-1.5"
                  >
                    <span
                      className={
                        alert.severity === "error"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }
                    >
                      •
                    </span>
                    <span>
                      <strong>{alert.productName}:</strong> {alert.message}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SparePartsOrderDetails;
