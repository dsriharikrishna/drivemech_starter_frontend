"use client"
import { redirect } from "next/navigation";
import HomePage from "./(drivemech)/home/page";

export default function RootPage() {
  const shouldRedirect = false;

  if (shouldRedirect) {
    redirect("/home");
  }

  return <HomePage />;
}
