"use client";
import { ChevronDown, Menu, User } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import RightDrawer from "../ui/RightDrawer";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import UserDropdown from "../modals/UserDropdown";
import Dialog from "../modals/Dialog";
import AvatarMenu from "../profile/AvatarMenu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleNavigation = useCallback((path: string) => {
    console.log(path)
    if (path === "customer") {
      router.push("auth/login");
    } else {
      router.push("/workshop/auth/login")
    }
  }, [router])

  const handleLogout = useCallback(() => {
    setShowLogoutDialog(true);
    setUserDropdownOpen(false);
  }, []);

  const confirmLogout = useCallback(() => {
    // Handle logout logic here
    console.log("User logged out");
    setShowLogoutDialog(false);
    setIsLoggedIn(false);
    router.push("/auth/login");
  }, [router]);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-shadow duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white"
        }`}
    >
      <nav
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-3 sm:px-5 lg:px-8"
        aria-label="Global"
      >
        {/* --- Left: Logo and Tagline --- */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/DriveMechLogo.png"
              alt="DriveMech Logo"
              width={160}
              height={45}
              priority
            />
          </Link>
          {/* --- Center: Location --- */}
          <div className="hidden md:flex items-center text-sm text-gray-700">
            <Image
              src="/images/MapPin.png"
              alt="Map Icon"
              width={22}
              height={22}
              className="mr-2"
            />
            <span className="text-[15px] font-medium text-[#333]">Hyderabad</span>
          </div>
        </div>

        {/* --- Right: Language + Buttons --- */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Language Selector */}
          <button className="flex items-center border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition">
            <Image
              src="/images/UK.png"
              alt="English"
              width={20}
              height={20}
              className="mr-2"
            />
            Eng
          </button>

          {/* Buttons */}
          {!isLoggedIn ? (
            // <div className="relative">
            //   <button
            //     onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            //     className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FF5C00] hover:bg-[#E55200] transition-colors duration-200"
            //   >
            //     <User className="w-5 h-5 text-white" />
            //     <ChevronDown className="w-5 h-5 text-white"/>
            //   </button>
            //   <UserDropdown
            //     isOpen={userDropdownOpen}
            //     onClose={() => setUserDropdownOpen(false)}
            //     onLogout={handleLogout}
            //   />
            // </div>
            <AvatarMenu onLogout={handleLogout} />

          ) : (
            <>
              <Button
                onClick={() => { handleNavigation("workshop") }}
                variant="primary"
                className="border border-[#FF5C00] text-[#FF5C00] hover:bg-[#FF5C00] hover:text-white transition-all duration-200 px-5 py-2 rounded-md text-sm font-medium whitespace-nowrap"
              >
                Login as Workshop
              </Button>

              <Button
                onClick={() => { handleNavigation("customer") }}
                variant="primary"
                className="bg-[#FF5C00] hover:bg-[#E55200] text-white transition-all duration-200 px-5 py-2 rounded-md text-sm font-medium whitespace-nowrap"
              >
                Login as Customer
              </Button>
            </>
          )}
        </div>

        {/* --- Mobile Menu Button --- */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <RightDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Menu"
        className="w-80"
      >
        <div className="flex flex-col h-full">
          {/* Location & Language */}
          <div className="p-2 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-evenly">

              {/* Location */}
              <div className="flex items-center justify-evenly text-sm text-gray-700">
                <Image
                  src="/images/MapPin.png"
                  alt="Map Icon"
                  width={18}
                  height={18}
                  className="mr-2 opacity-80"
                />
                <span className="font-medium">Hyderabad</span>
              </div>

              {/* Language Button */}
              <button
                className="flex items-center gap-2 text-sm text-gray-600 
                 px-3 py-1.5 rounded-md border border-gray-200 
                 hover:bg-gray-50 transition-all"
              >
                <Image
                  src="/images/UK.png"
                  alt="English"
                  width={18}
                  height={18}
                  className="opacity-90"
                />
                English
              </button>
              {/* Avatar */}
              <div className="flex justify-center pt-2 pb-1">
                <AvatarMenu onLogout={handleLogout} />
              </div>
            </div>

          </div>


          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <button
              onClick={() => {
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-md font-medium"
            >
              Home
            </button>
            <button
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-md font-medium"
            >
              Our Services
            </button>
            <button
              onClick={() => {
                document.getElementById('garages')?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-md font-medium"
            >
              Find Garages
            </button>
            <button
              onClick={() => {
                document.getElementById('insurance')?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-md font-medium"
            >
              Insurance Partners
            </button>
          </nav>

          {/* Auth Section */}
          <div className="p-4 border-t border-gray-100">
            <div className="space-y-3">
              <Button
                variant="gradient"
                onClick={() => { handleNavigation("workshop") }}
                className="block w-full text-center border border-[#FF5C00] text-[#FF5C00] hover:bg-[#FF5C00]/5 px-4 py-2.5 rounded-md font-medium text-sm"
              >
                Login as Workshop
              </Button>
              <Button
                variant="gradient"
                onClick={() => { handleNavigation("customer") }}
                className="block w-full text-center bg-[#FF5C00] hover:bg-[#E55200] text-white px-4 py-2.5 rounded-md font-medium text-sm"
              >
                Login as Customer
              </Button>
            </div>
          </div>
        </div>
      </RightDrawer>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <Dialog>
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout from your account?</p>

            <div className="flex gap-3 justify-end">
              <Button
                onClick={() => setShowLogoutDialog(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmLogout}
                variant="primary"
                className="flex-1"
              >
                Logout
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </header>
  );
}
