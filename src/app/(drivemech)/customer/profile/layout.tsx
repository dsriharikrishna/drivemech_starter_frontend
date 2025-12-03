"use client";

import { useState } from "react";
import ProfileSidebar from "@/components/customer/profile/ProfileSidebar";
import { ReactNode } from "react";
import { Menu, X } from "lucide-react";

export default function ProfileRootLayout({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">

      {/* Wrapper */}
      <div className="flex w-full max-w-7xl gap-4 p-4 relative">

        {/* ---------- DESKTOP SIDEBAR ---------- */}
        <aside
          className="
            hidden          /* hide on mobile */
            lg:block        /* show on desktop */
            w-64 
            sticky top-4 
            h-[calc(100vh-2rem)]
          "
        >
          <ProfileSidebar />
        </aside>

        {/* ---------- MOBILE MENU BUTTON ---------- */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="
            lg:hidden 
            absolute left-4 top-4 
            p-2 bg-white rounded-lg shadow z-30
          "
        >
          <Menu size={22} />
        </button>

        {/* ---------- MOBILE DRAWER SIDEBAR ---------- */}
        <div
          className={`
            fixed inset-0 z-40 lg:hidden
            transition-all duration-300
            ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer panel */}
          <div className="relative w-64 h-full bg-white shadow-xl p-4">
            {/* Close button */}
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute right-4 top-4 p-2 bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>

            <ProfileSidebar />
          </div>
        </div>

        {/* ---------- MAIN CONTENT ---------- */}
        <main
          className="
            flex-1 
            p-3 
            bg-white 
            rounded-xl 
            shadow-sm 
            w-full
          "
        >
          {children}
        </main>

      </div>
    </div>
  );
}
