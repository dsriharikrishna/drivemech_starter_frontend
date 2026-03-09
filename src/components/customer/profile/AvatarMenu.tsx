"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
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

  const userPhoto = "/images/default-avatar.png";

  return (
    <div className="relative inline-block">
      {/* BUTTON */}
      <button
        onClick={() => setUserDropdownOpen((s) => !s)}
        className="flex items-center border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition"
      >
        <Avatar
          src={userPhoto}
          name="User"
          size="xs"
          alt="User Avatar"
          className="mr-2"
        />

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
