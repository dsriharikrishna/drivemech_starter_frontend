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
    { label: "Profile", icon: <User />, path: "/customer/profile" },
    { label: "My Orders", icon: <ShoppingBag />, path: "/customer/profile/my-orders" },
    { label: "My Vehicles", icon: <Car />, path: "/customer/profile/my-vehicles" },
    { label: "Payments", icon: <CreditCard />, path: "/customer/profile/my-payments" },
    { label: "My Addresses", icon: <MapPin />, path: "/customer/profile/my-address" },
    { label: "Settings", icon: <Settings />, path: "/customer/profile/my-settings" },
  ];

  return (
    <div className="w-64 bg-white rounded-xl shadow p-3">
      <ul className="space-y-1">
        {menu.map((item) => (
          <li
            key={item.label}
            onClick={() => router.push(item.path)}
            className={`flex items-center gap-4 px-2.5 py-1.5 text-sm font-medium rounded-lg cursor-pointer
              ${
                pathname === item.path
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }
            `}
          >
            {item.icon}
            {item.label}
          </li>
        ))}
      </ul>

      {/* FIXED — this opens the modal */}
      <button
        onClick={() => setIsLogOutModalOpen(true)}
        className="w-full flex items-center justify-center gap-3 px-2.5 py-1.5 mt-4 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
      >
        <LogOut size={16} /> Logout
      </button>

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
