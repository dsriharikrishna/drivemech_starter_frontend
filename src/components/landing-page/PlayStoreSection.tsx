"use client";
import Image from "next/image";

export default function PlayStoreSection() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Side - App Mockups */}
        <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center items-center min-h-[250px]">
          <Image
            src="/images/DriveMech-Mockup1.png" 
            alt="App Mockup"
            width={480}
            height={340}
            priority
            className="object-contain h-full w-auto"
          />
        </div>
        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-snug">
            Ready to Experience Seamless <br />
            <span className="text-orange-500">Vehicle Service?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mb-4">
            Whether you're a driver seeking peace of mind or a garage aiming for growth, DriveCare is your solution.
          </p>
          <div className="flex gap-4 flex-wrap">
            {/* Store badges (replace src with official icons for production) */}
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/play-store.png" 
                alt="Get it on Google Play"
                width={150}
                height={42}
                className="rounded-lg "
              />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/app-store.png" 
                alt="Download on the App Store"
                width={147}
                height={42}
                className="rounded-lg "
              />
            </a>
            <a href="/partner-join" target="_blank" rel="noopener noreferrer">
              <button className="px-5 py-[9px] border border-gray-300 rounded-lg bg-black text-white flex items-center gap-2 shadow hover:bg-gray-100 font-semibold min-w-[120px]">
                <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                </svg>
                Join As Partner
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
