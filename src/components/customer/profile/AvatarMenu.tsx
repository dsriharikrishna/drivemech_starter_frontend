"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import UserDropdown from "@/components/modals/UserDropdown";
import { User } from "phosphor-react";

interface AvatarMenuProps {
  onLogout?: () => void;
}

export default function AvatarMenu({ onLogout }: AvatarMenuProps) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
    }
    setUserDropdownOpen(false);
  };

  const userPhoto = "/images/default-avatar.png";

  return (
    <div className="relative inline-block">
      {/* BUTTON */}
      <button
        onClick={() => setUserDropdownOpen((s) => !s)}
        className="flex items-center border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition">
        {userPhoto ? (
          <Image
            src={userPhoto}
            alt="English"
            width={24}
            height={24} 
            className="mr-2"
          />
        ) : (
          <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
            <User size={20} weight="fill" className="text-gray-600" />
          </div>
        )}

        {/* Chevron */}
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {/* DROPDOWN */}
      <UserDropdown
        isOpen={userDropdownOpen}
        onClose={() => setUserDropdownOpen(false)}
        onLogout={handleLogout}
      />
    </div >
  );
}
