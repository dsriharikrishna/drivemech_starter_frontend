"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import RightDrawer from "../ui/RightDrawer";

export default function LocationNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    "Home", 
    "Services", 
    "Track Services", 
    "My Bookings", 
    "Mobile App", 
    "Partners", 
    "Contact Us"
  ];

  const handleNavClick = (item: string) => {
        setMobileMenuOpen(false);
    // Add navigation logic here
  };

  return (
    <nav className="w-full py-2 bg-white shadow-sm border-t-2 border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-5 lg:px-8">
        
        {/* Left nav items - Hidden on mobile */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10 text-gray-600 text-sm">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => handleNavClick(item)}
              className="hover:text-gray-900 transition cursor-pointer whitespace-nowrap"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Emergency Button - Hidden on small mobile */}
        <div className="hidden sm:flex items-center gap-2 bg-orange-500 text-white px-4 lg:px-5 py-2 rounded-xl text-sm font-medium hover:bg-orange-600 transition cursor-pointer">
          <Phone className="w-4 h-4" />
          <span className="hidden lg:inline">Emergency Call</span>
          <span className="lg:hidden">Call</span>
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <RightDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Menu"
        className="w-80"
      >
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="w-full text-left flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-md font-medium"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Emergency Call Button */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => {
                                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full bg-orange-500 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-orange-600 transition"
            >
              <Phone className="w-5 h-5" />
              Emergency Call
            </button>
          </div>
        </div>
      </RightDrawer>
    </nav>
  );
}
