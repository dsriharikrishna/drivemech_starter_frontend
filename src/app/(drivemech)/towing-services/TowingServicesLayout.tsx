"use client";

import { useState } from "react";
import Navbar from "@/components/Layout/Navbar";
import TowingHeader from "@/components/towing-services/TowingHeader";

import ServicesPage from "@/components/towing-services/services/ServicesPage";
import TrackPage from "@/components/towing-services/track-services/TrackPage";
import BookingsPage from "@/components/towing-services/my-bookings/BookingsPage";
import MobileAppPage from "@/components/towing-services/mobile-app/MobileAppPage";
import PartnersPage from "@/components/towing-services/partners/PartnersPage";
import ContactPage from "@/components/towing-services/contact-us/ContactPage";
import TowingHomePage from "@/components/towing-services/home/TowingHomePage";

export default function TowingServicesLayout() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "services": return <ServicesPage />;
      case "track": return <TrackPage />;
      case "bookings": return <BookingsPage />;
      case "app": return <MobileAppPage />;
      case "partners": return <PartnersPage />;
      case "contact": return <ContactPage />;
      default: return <TowingHomePage />;
    }
  };

  return (
    <div className="min-h-screen w-full">

      {/* ✅ BOTH HEADERS FIXED PROPERLY */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white">

        {/* ✅ MAIN NAVBAR (LOGO, LOGIN, LOCATION, ETC) */}
        <div className="border-b">
          <Navbar />
        </div>

        {/* ✅ TOWING MENU BAR */}
        <div className="bg-white mt-15">
          <TowingHeader onMenuChange={setPage} activePage={page} />
        </div>
      </div>

      {/* ✅ OFFSET MUST MATCH BOTH HEADER HEIGHTS */}
      <main className="px-0 pt-16 mt-14 mx-auto min-h-full">
        {renderPage()}
      </main>
    </div>
  );
}
