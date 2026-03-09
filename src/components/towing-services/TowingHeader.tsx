"use client";

import { CaretDown, Phone } from "phosphor-react";
import ActionMenu from "@/components/vendor/ActionMenu";
import Button from "../ui/Button";

export default function TowingHeader({
  onMenuChange,
  activePage,
}: {
  onMenuChange: (page: string) => void;
  activePage: string;
}) {
  const getButtonClass = (page: string) => {
    return activePage === page
      ? "text-orange-500 font-medium cursor-pointer"
      : "text-gray-600 hover:text-orange-500 cursor-pointer";
  };

  const towingMenuItems = [
    {
      id: "local",
      label: "Local Towing",
      onClick: () => onMenuChange("local"),
    },
    {
      id: "long-distance",
      label: "Long-Distance Towing",
      onClick: () => onMenuChange("long-distance"),
    },
    {
      id: "bike",
      label: "Bike Towing",
      onClick: () => onMenuChange("bike"),
    },
  ];

  const navItems = [
    {
      id: "home",
      label: "Home",
      onClick: () => onMenuChange("home"),
    },
    {
      id: "services",
      label: "Services",
      onClick: () => onMenuChange("services"),
    },
    {
      id: "track",
      label: "Track Services",
      onClick: () => onMenuChange("track"),
    },
    {
      id: "bookings",
      label: "My Bookings",
      onClick: () => onMenuChange("bookings"),
    },
    {
      id: "app",
      label: "Mobile App",
      onClick: () => onMenuChange("app"),
    },
    {
      id: "partners",
      label: "Partners",
      onClick: () => onMenuChange("partners"),
    },
    {
      id: "contact",
      label: "Contact Us",
      onClick: () => onMenuChange("contact"),
    },
  ];

  return (
    <header className="w-full bg-white border-b border-border pt-1">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-3 sm:px-5 lg:px-6">
        {/* LEFT — Dropdown using ActionMenu */}
        <ActionMenu
          items={towingMenuItems}
          trigger={
            <div className="bg-[#1E2A39] text-white px-5 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
              Towing Services
              <CaretDown size={16} />
            </div>
          }
          align="left"
          width={200}
        />

        {/* CENTER — Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={getButtonClass(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* RIGHT — Emergency */}
        <Button
          startIcon={<Phone size={16} weight="bold" />}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm shadow cursor-pointer"
        >
          Emergency Call
        </Button>
      </div>
    </header>
  );
}
