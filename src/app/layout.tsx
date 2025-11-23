import type { Metadata } from "next";
import "../styles/global.css";
import React from "react";

export const metadata: Metadata = {
  title: "Drive Mech",
  description: "Drive Mech - Your automotive service solution",
  icons: {
    icon: "/favicon_io/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-gray-50"
      >
        {children}
      </body>
    </html>
  );
}
