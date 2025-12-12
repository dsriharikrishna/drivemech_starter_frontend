"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0A1929] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* ABOUT US */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">ABOUT US</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/partners" className="hover:text-white transition-colors">Drive Mech Partners</Link></li>
              <li><Link href="/workshop-locator" className="hover:text-white transition-colors">Workshop Locator</Link></li>
              <li><Link href="/offers" className="hover:text-white transition-colors">Offers</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/directory" className="hover:text-white transition-colors">Directory</Link></li>
            </ul>
          </div>

          {/* SERVICES WE PROVIDE */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Services We Provide</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/services/air-conditioning" className="hover:text-white transition-colors">Air Conditioning</Link></li>
              <li><Link href="/services/service-inspection" className="hover:text-white transition-colors">Service/PV Inspection</Link></li>
              <li><Link href="/services/auto-glass" className="hover:text-white transition-colors">Auto Glass</Link></li>
              <li><Link href="/services/spark-plug" className="hover:text-white transition-colors">Spark Plug</Link></li>
              <li><Link href="/services/battery" className="hover:text-white transition-colors">Battery</Link></li>
              <li><Link href="/services/suspension-steering" className="hover:text-white transition-colors">Suspension and Steering</Link></li>
              <li><Link href="/services/brakes" className="hover:text-white transition-colors">Brakes</Link></li>
              <li><Link href="/services/timing-belt" className="hover:text-white transition-colors">Timing belt/chain</Link></li>
            </ul>
          </div>

          {/* FOR GARAGES */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">For Garages</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/garage/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/garage/inventory" className="hover:text-white transition-colors">Inventory Management</Link></li>
              <li><Link href="/garage/customers" className="hover:text-white transition-colors">Manage Customers</Link></li>
              <li><Link href="/garage/workshop" className="hover:text-white transition-colors">Workshop Management</Link></li>
              <li><Link href="/garage/vehicle" className="hover:text-white transition-colors">Vehicle Management</Link></li>
              <li><Link href="/garage/reports" className="hover:text-white transition-colors">Reports</Link></li>
            </ul>
          </div>

          {/* POPULAR BRANDS */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Popular Brands</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/brands/mercedes" className="hover:text-white transition-colors">Mercedes</Link></li>
              <li><Link href="/brands/bmw" className="hover:text-white transition-colors">BMW</Link></li>
              <li><Link href="/brands/audi" className="hover:text-white transition-colors">Audi</Link></li>
              <li><Link href="/brands/volvo" className="hover:text-white transition-colors">Volvo</Link></li>
              <li><Link href="/brands/mitsubishi" className="hover:text-white transition-colors">Mitsubishi</Link></li>
              <li><Link href="/brands/jaguar" className="hover:text-white transition-colors">Jaguar</Link></li>
              <li><Link href="/brands/porsche" className="hover:text-white transition-colors">Porsche</Link></li>
              <li><Link href="/brands/rolls-royce" className="hover:text-white transition-colors">Rolls Royce</Link></li>
              <li><Link href="/brands/ferrari" className="hover:text-white transition-colors">Ferrari</Link></li>
            </ul>
          </div>

          {/* WHERE WE ARE */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase">Where we are</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/location/hyderabad" className="hover:text-white transition-colors">Hyderabad</Link></li>
              <li><Link href="/location/bengaluru" className="hover:text-white transition-colors">Bengaluru</Link></li>
              <li><Link href="/location/chennai" className="hover:text-white transition-colors">Chennai</Link></li>
              <li><Link href="/location/kochi" className="hover:text-white transition-colors">Kochi</Link></li>
              <li><Link href="/location/vijayawada" className="hover:text-white transition-colors">Vijayawada</Link></li>
              <li><Link href="/location/pune" className="hover:text-white transition-colors">Pune</Link></li>
              <li><Link href="/location/kolkata" className="hover:text-white transition-colors">Kolkata</Link></li>
              <li><Link href="/location/delhi" className="hover:text-white transition-colors">Delhi</Link></li>
              <li><Link href="/location/mumbai" className="hover:text-white transition-colors">Mumbai</Link></li>
            </ul>
          </div>
        </div>

        {/* Middle Section - Logo, Contact, Social */}
        <div className="border-t border-gray-700 pt-8 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Logo and Tagline */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src="/images/logo.png"
                  alt="DriveMech Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted partner for all vehicle servicing needs. Fast, reliable, and transparent.
              </p>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase">Contact Us</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 98786 43216</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>drivemech@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Follow Us and App Downloads */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase">Follow Us on</h3>
              <div className="flex gap-3 mb-4">
                <a href="https://instagram.com/drivemech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://facebook.com/drivemech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://twitter.com/drivemech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
              <div className="flex gap-2">
                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/play-store.png" alt="Get it on Google Play" width={120} height={36} className="h-9 w-auto" />
                </a>
                <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/app-store.png" alt="Download on App Store" width={120} height={36} className="h-9 w-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2025 DriveMech. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Made with <span className="text-red-500">❤️</span> for vehicle owners and garages</p>
          </div>
        </div>
      </div>
    </footer>
  );
}