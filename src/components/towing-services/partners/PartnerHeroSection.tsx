"use client";

import Button from "@/components/ui/Button";
import CustomCard from "@/components/ui/CustomCard";

export default function PartnerHeroSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">

        {/* LEFT SIDE TEXT */}
        <div className="flex-1">
          <span className="bg-orange-50 text-orange-600 px-4 py-1 rounded-full text-xs">
            For Professional Operators
          </span>

          <h2 className="text-3xl font-semibold text-gray-heading mt-4">
            Join Our Network of{" "}
            <span className="text-orange-500">Elite Operators</span>
          </h2>

          <p className="text-gray-600 text-sm mt-2 max-w-md">
            Partner with DriveMech to grow your towing business. Access thousands of customers, operational support, and industry-leading earnings.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <Button variant="gradient" className="px-6">
              Become a Partner
            </Button>
            <Button variant="outline" className="px-6">
              Download Partner Guide
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-10 mt-6">
            <div>
              <p className="text-2xl font-bold text-gray-heading">2,500+</p>
              <p className="text-gray-500 text-xs">Active Partners</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-heading">$5M+</p>
              <p className="text-gray-500 text-xs">Monthly Payouts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-heading">4.8 ★</p>
              <p className="text-gray-500 text-xs">Partner Rating</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1">
          <img
            src="/partner-handshake.jpg"
            className="w-full rounded-xl object-cover"
            alt="Partnership"
          />
        </div>

      </div>
    </section>
  );
}
