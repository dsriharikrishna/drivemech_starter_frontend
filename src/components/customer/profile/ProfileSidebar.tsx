"use client";

import Dialog from "@/components/modals/Dialog";
import {
  User,
  ShoppingBag,
  Car,
  CreditCard,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLogOutModalOpen, setIsLogOutModalOpen] = React.useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    setIsLogOutModalOpen(false);
  };

  const menu = [
    { label: "Profile", icon: User, path: "/customer/profile" },
    { label: "My Orders", icon: ShoppingBag, path: "/customer/profile/my-orders" },
    { label: "My Vehicles", icon: Car, path: "/customer/profile/my-vehicles" },
    { label: "Payments", icon: CreditCard, path: "/customer/profile/my-payments" },
    { label: "My Addresses", icon: MapPin, path: "/customer/profile/my-address" },
    { label: "Settings", icon: Settings, path: "/customer/profile/my-settings" },
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">

      {/* --- Section Title (optional) ---
      <p className="text-xs font-semibold text-gray-400 uppercase mb-3 pl-2 tracking-wide">
        Menu
      </p> */}

      {/* --- Menu Items --- */}
      <ul className="space-y-1.5">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <li
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`
                flex items-center gap-3 
                px-3 py-2.5 
                rounded-lg cursor-pointer text-sm font-medium transition
                ${pathname === item.path
                  ? "bg-orange-500 text-white shadow-sm"
                  : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>

      {/* Divider */}
      <div className="border-t my-4" />

      {/* Logout button */}
      <button
        onClick={() => setIsLogOutModalOpen(true)}
        className="
          w-full flex items-center justify-center gap-3 
          px-3 py-2.5 text-sm
          text-red-600 
          border border-red-300 
          rounded-lg 
          hover:bg-red-50
          transition
        "
      >
        <LogOut size={16} /> Logout
      </button>

      {/* Logout Confirmation Modal */}
      <Dialog
        isOpen={isLogOutModalOpen}
        onClose={() => setIsLogOutModalOpen(false)}
      >
        <div className="bg-white rounded-xl w-80 shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
          <p className="mb-6">Are you sure you want to logout?</p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsLogOutModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
