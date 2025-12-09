"use client";

import { useState } from "react";
import { CaretDown, Phone } from "phosphor-react";

export default function TowingHeader({ onMenuChange, activePage }: { onMenuChange: (page: string) => void; activePage: string }) {
  const [open, setOpen] = useState(false);

  const getButtonClass = (page: string) => {
    return activePage === page
      ? "text-orange-500 font-medium"
      : "text-gray-600 hover:text-orange-500";
  };

  return (
    <header className="w-full bg-white border-b border-border">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-3 sm:px-5 lg:px-6"
      >

        {/* LEFT — Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="bg-[#1E2A39] text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            Towing Services
            <CaretDown size={16} />
          </button>

          {open && (
            <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <button
                    onClick={() => onMenuChange("local")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Local Towing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onMenuChange("long-distance")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Long-Distance Towing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onMenuChange("bike")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Bike Towing
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* CENTER — Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <button onClick={() => onMenuChange("home")} className={getButtonClass("home")}>
            Home
          </button>

          <button onClick={() => onMenuChange("services")} className={getButtonClass("services")}>
            Services
          </button>

          <button onClick={() => onMenuChange("track")} className={getButtonClass("track")}>
            Track Services
          </button>

          <button onClick={() => onMenuChange("bookings")} className={getButtonClass("bookings")}>
            My Bookings
          </button>

          <button onClick={() => onMenuChange("app")} className={getButtonClass("app")}>
            Mobile App
          </button>

          <button onClick={() => onMenuChange("partners")} className={getButtonClass("partners")}>
            Partners
          </button>

          <button onClick={() => onMenuChange("contact")} className={getButtonClass("contact")}>
            Contact Us
          </button>
        </nav>

        {/* RIGHT — Emergency */}
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm shadow">
          <Phone size={16} weight="bold" />
          Emergency Call
        </button>
      </div>
    </header>
  );
}
