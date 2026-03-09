"use client";

import React from "react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { SmoothLandingBox } from "@/components/animations/SmoothLandingBox";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SmoothLandingBox variant="fade" duration={0.3} distance={20} delay={0.1}>
        <Navbar />
      </SmoothLandingBox>
      <main className="flex-1 flex flex-col">{children}</main>
      <SmoothLandingBox
        variant="slide-up"
        duration={0.6}
        distance={20}
        delay={0.1}
      >
        <Footer />
      </SmoothLandingBox>
    </div>
  );
}
