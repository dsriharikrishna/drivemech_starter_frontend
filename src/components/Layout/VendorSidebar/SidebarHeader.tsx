"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SidebarHeader: React.FC = () => {
  const router = useRouter();
  return (
    <div
      className="pb-2 px-4 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <img
        src="/images/DriveMechLogo.png"
        alt="DriveMech Logo"
        className="object-contain w-full h-auto"
      />
    </div>
  );
};

export default SidebarHeader;
