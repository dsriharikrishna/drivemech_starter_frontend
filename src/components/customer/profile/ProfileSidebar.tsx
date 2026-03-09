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
import React, { useCallback, useMemo } from "react";

// ✅ Import Redux
import { useAppDispatch } from "@/store/store";
import { logout } from "@/store/slices/auth/authSlice";
import { resetUserProfileState } from "@/store/slices/user/userProfileSlice";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isLogOutModalOpen, setIsLogOutModalOpen] = React.useState(false);

  // ✅ Handle logout with Redux
  const handleLogout = useCallback(() => {
    // Dispatch logout action
    dispatch(logout());

    // Clear user profile state
    dispatch(resetUserProfileState());

    // Close modal
    setIsLogOutModalOpen(false);

    // Redirect to login
    router.push("/auth/login");
  }, [dispatch, router]);

  const menu = useMemo(
    () => [
      { label: "Profile", icon: User, path: "/customer/profile" },
      {
        label: "My Orders",
        icon: ShoppingBag,
        path: "/customer/profile/my-orders",
      },
      {
        label: "My Vehicles",
        icon: Car,
        path: "/customer/profile/my-vehicles",
      },
      {
        label: "Payments",
        icon: CreditCard,
        path: "/customer/profile/my-payments",
      },
      {
        label: "My Addresses",
        icon: MapPin,
        path: "/customer/profile/my-address",
      },
      {
        label: "Settings",
        icon: Settings,
        path: "/customer/profile/my-settings",
      },
    ],
    []
  );

  const handleMenuClick = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return (
    <div className="w-full bg-white rounded-xl shadow px-3 py-4 xs:pt-20  overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* --- Section Title (optional) ---
      <p className="text-xs font-semibold text-gray-400 uppercase mb-3 pl-2 tracking-wide">
        Menu
      </p> */}

      {/* --- Menu Items --- */}
      <ul className="space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;

          // ✅ Check if current route is active (including nested routes)
          const isActive =
            item.path === "/customer/profile"
              ? pathname === "/customer/profile" // Exact match for Profile to avoid conflicts
              : pathname.startsWith(item.path); // Nested route support for others

          return (
            <li
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
              className={`
                flex items-center gap-2 
                px-2.5 py-2 
                rounded-lg cursor-pointer text-xs font-medium transition
                ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>

      {/* Divider */}
      <div className="border-t-2 border-gray-200 my-3" />

      {/* Logout button */}
      <button
        onClick={() => setIsLogOutModalOpen(true)}
        className="
          w-full flex items-center justify-center gap-2 
          px-2.5 py-2 text-xs
          text-red-600 
          border border-red-300 
          rounded-lg 
          hover:bg-red-50
          transition
        "
      >
        <LogOut size={14} /> Logout
      </button>

      {/* Logout Confirmation Modal */}
      <Dialog
        isOpen={isLogOutModalOpen}
        onClose={() => setIsLogOutModalOpen(false)}
      >
        <div className="bg-white rounded-xl w-80 shadow p-4">
          <h2 className="text-base font-semibold mb-3">Confirm Logout</h2>
          <p className="text-xs mb-4">Are you sure you want to logout?</p>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsLogOutModalOpen(false)}
              className="px-3 py-1.5 text-xs bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
