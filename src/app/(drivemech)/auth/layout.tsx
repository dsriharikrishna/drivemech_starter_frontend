"use client";

import React from 'react';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* LEFT SIDE - 60% - Dark Background with Illustration */}
      <div className="hidden lg:flex lg:w-[60%] rounded-r-xl h-[calc(100vh-4rem)] relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        {/* Background Illustration */}
        <Image
          src="/images/workshop-illustration.png" 
          alt="Workshop Illustration"
          fill
          className="object-cover opacity-90 rounded-xl"
          priority
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-transparent" />

        {/* Text Content */}
        <div className="absolute top-16 left-12 text-white z-10">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Optimize Your Workshop, Maximize Your Profit
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE - 40% - White Form Area */}
      <div className="w-full lg:w-[40%] flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}

