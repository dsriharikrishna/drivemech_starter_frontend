"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function BookingFooter() {
  const router = useRouter();

  const handleNavigate = useCallback((path: string) => {
    if (path === "cancel-booking") {
      router.push("/customer/cancel-booking");
    } else if (path === "invoice") {
      router.push("/customer/download-invoice");
    } else if (path === "contact") {
      router.push("/customer/contact-workshop");
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <footer className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
        
        <button
          onClick={() => handleNavigate("cancel-booking")}
          className="bg-red-500 text-white py-1.5 px-3 cursor-pointer rounded-lg w-full md:w-1/3"
        >
          Cancel Booking
        </button>

        <button
          onClick={() => handleNavigate("invoice")}
          className="bg-green-600 text-white py-1.5 px-3 cursor-pointer rounded-lg w-full md:w-1/3"
        >
          Download Invoice
        </button>

        <button
          onClick={() => handleNavigate("contact")}
          className="bg-orange-500 text-white py-1.5 px-3 cursor-pointer rounded-lg w-full md:w-1/3"
        >
          Contact Workshop
        </button>

      </footer>

      <div className="text-center mt-6 text-gray-600 text-md">
        Need assistance?{" "}
        <a href="/support/chat" className="text-blue-600 ">
          Chat with Us
        </a>{" "}
        or{" "}
        <a href="tel:1234567890" className="text-blue-600 ">
          Call 123-456-7890
        </a>
      </div>
    </>
  );
}
