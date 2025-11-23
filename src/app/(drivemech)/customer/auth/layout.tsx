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
      {/* LEFT SIDE - 60% */}
      <div className="hidden md:flex md:w-[60%] relative overflow-hidden">
        <Image
          src="/mnt/data/7b0c02c8-4e10-410b-8f70-47d9054bd119.png"
          alt="Garage Illustration"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute top-20 left-14 text-white max-w-md">
          <h1 className="text-4xl font-bold leading-tight">
            Optimize Your Workshop,<br /> Maximize Your Profit
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE - 40% */}
      <div className="w-full md:w-[40%] flex items-center justify-center px-6 py-10">
        {children}
      </div>
    </div>
  );
}

