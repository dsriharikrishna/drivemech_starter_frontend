// components/profile/Sidebar.tsx

import {
  User,
  ShoppingBag,
  Car,
  CreditCard,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileSidebar({ activeTab, setActiveTab }: Props) {
  const menu = [
    { label: "Profile", icon: <User /> },
    { label: "My Orders", icon: <ShoppingBag /> },
    { label: "My Vehicles", icon: <Car /> },
    { label: "Payments", icon: <CreditCard /> },
    { label: "My Addresses", icon: <MapPin /> },
    { label: "Settings", icon: <Settings /> },
  ];

  return (
    <div className="w-64 bg-white rounded-xl shadow p-5">
      <ul className="space-y-1">
        {menu.map((item) => (
          <li
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg cursor-pointer
              ${
                activeTab === item.label
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

      <button className="flex items-center gap-3 px-4 py-3 mt-6 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
        🔐 Logout
      </button>
    </div>
  );
}
