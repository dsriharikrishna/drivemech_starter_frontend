"use client";

import { useRef, useEffect } from "react";
import {
  User,
  ShoppingBag,
  Car,
  CreditCard,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
  active?: string; // e.g. "My Orders"
}

export default function UserDropdown({
  isOpen,
  onClose,
  onLogout,
  active,
}: UserDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const menuItems = [
    { icon: User, label: "Profile", href: "/customer/profile" },
    { icon: ShoppingBag, label: "My Orders", href: "/customer/orders" },
    { icon: Car, label: "My Vehicles", href: "/customer/vehicles" },
    { icon: CreditCard, label: "Payments", href: "/customer/payments" },
    { icon: MapPin, label: "My Addresses", href: "/customer/addresses" },
    { icon: Settings, label: "Settings", href: "/customer/settings" },
  ];

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-3 w-50 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 p-2"
    >
      {/* MENU ITEMS */}
      <div className="flex flex-col">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = active === item.label;

          return (
            <a
              key={index}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 font-medium
                ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}
              `}
            >
              <Icon className="w-5 h-5 text-gray-600" />
              {item.label}
            </a>
          );
        })}

        {/* DIVIDER */}
        <div className="my-3 border-t border-gray-200" />

        {/* LOGOUT BUTTON (SPECIAL) */}
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-red-300 text-red-600 font-semibold hover:bg-red-50 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
