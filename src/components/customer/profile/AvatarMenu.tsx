"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import UserDropdown from "@/components/modals/UserDropdown";

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

  const userPhoto = "/avatar.jpg"; // replace with real user image OR remove

  return (
    <div className="relative inline-block">
      {/* BUTTON */}
      <button
        onClick={() => setUserDropdownOpen((s) => !s)}
        className="flex items-center gap-3 pr-2 pl-1 h-10 rounded-lg bg-white border border-gray-200 shadow-sm"
      >
        {/* Avatar */}
        {userPhoto ? (
          <Image
            src={userPhoto}
            alt="User"
            width={40}
            height={40}
            className="w-9 h-9 rounded-md object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center">
            AB
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
    </div>
  );
}
