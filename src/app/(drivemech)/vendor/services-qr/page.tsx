"use client";

import React from "react";
import { CheckCircle, Star, Download, Share2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const ServicesQr = () => {
  const router = useRouter();

  const handlePrevious = () => {
    router.back();
  };

  const handleCompleteSetup = () => {
    router.push("/vendor/success");
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] flex flex-col px-4 py-3">
      {/* SUCCESS BANNER */}
      <div className="bg-green-50 border border-green-200 rounded-2xl py-5 text-center mb-4">
        <div className="flex justify-center mb-2">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="text-white w-8 h-8" />
          </div>
        </div>
        <h1 className="text-lg font-semibold text-gray-900">
          🎉 Setup Complete!
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Your garage is now configured and ready to accept bookings.
        </p>
      </div>

      {/* ACTIVE SERVICES */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-2">
          Active Services
        </h2>
        <div className="flex gap-2 flex-wrap">
          {["Workshop Services", "Spare Parts", "Towing Services"].map(
            (service) => (
              <span
                key={service}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-600 text-sm font-medium"
              >
                <Star size={14} />
                {service}
              </span>
            )
          )}
        </div>
      </div>

      {/* QR CODE SECTION */}
      <div className="w-full max-w-3xl mx-auto mb-4">
        <h3 className="text-center text-base font-semibold text-gray-900 mb-4">
          Your Service QR Code
        </h3>

        <div className="bg-white rounded-3xl p-6 mb-4 shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="bg-white p-2 rounded-2xl border border-gray-100 mb-4">
            <div className="w-44 h-44 flex items-center justify-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GarageID-06BD12Y4P"
                alt="Garage QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-1 font-medium">Garage ID</p>
          <div className="px-5 py-1.5 bg-gray-100 rounded-full text-sm font-semibold text-gray-700 font-mono">
            GARAGE-06BD12Y4P
          </div>
        </div>

        {/* QR ACTIONS */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 bg-white text-gray-700 font-medium py-3 rounded-2xl border border-gray-100 hover:bg-gray-50">
            <Download size={16} />
            Download
          </button>
          <button className="flex items-center justify-center gap-2 bg-white text-gray-700 font-medium py-3 rounded-2xl border border-gray-100 hover:bg-gray-50">
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>

      {/* HOW TO USE */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">
          How to use this QR code:
        </h4>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Customers can scan to view all your available services</li>
          <li>Download and print to display at your garage entrance</li>
          <li>Share the link on social media or your website</li>
          <li>The QR code updates automatically with your latest services</li>
        </ul>
      </div>

      {/* FOOTER CTA */}
      <div className="mt-auto bg-white rounded-2xl p-3 shadow-sm flex justify-center items-center gap-3">
        <Button
          onClick={handlePrevious}
          variant="outline"
          className="border border-orange-300 text-orange-600 px-6 py-2 rounded-xl"
        >
          Previous
        </Button>
        <Button
          onClick={handleCompleteSetup}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl"
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
};

export default ServicesQr;
