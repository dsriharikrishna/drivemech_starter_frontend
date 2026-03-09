"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Search, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { COUNTRIES, City } from "@/constants/location.constants";
import CityCard from "@/components/customer/location/CityCard";

export default function LocationLayout() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [showListView, setShowListView] = useState(false);

  const currentCountry = COUNTRIES.find((c) => c.id === selectedCountry);

  // Filter cities based on search query
  const filteredCities =
    currentCountry?.cities.filter((city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleCitySelect = (city: City) => {
    // Store selected city in localStorage or Redux
    localStorage.setItem("selectedCity", JSON.stringify(city));
    // Navigate back to home or previous page
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  const handleContinue = () => {
    router.back();
  };

  const handleCountryClick = (countryId: string) => {
    setSelectedCountry(countryId);
    setSearchQuery("");
    setShowListView(true); // Switch to list view when country is clicked
  };

  const handleBackToCards = () => {
    setShowListView(false);
  };

  // Card View (Initial)
  if (!showListView) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              Choose another country or region to see content specific to your
              location and shop online
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleContinue}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Continue
              </button>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Header with Search */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Select your Country and region
              </h2>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Country Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-6">
              {COUNTRIES.map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleCountryClick(country.id)}
                  className={`
                                        flex items-center gap-2 px-2 py-3 font-medium text-sm
                                        border-b-2 transition-colors relative -mb-px
                                        ${
                                          selectedCountry === country.id
                                            ? "border-orange-500 text-orange-500"
                                            : "border-transparent text-gray-600 hover:text-gray-900"
                                        }
                                    `}
                >
                  {country.flag.startsWith("/") ? (
                    <Image
                      src={country.flag}
                      alt={country.name}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  ) : (
                    <span className="text-lg">{country.flag}</span>
                  )}
                  {country.name}
                </button>
              ))}
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCities.map((city) => (
                <CityCard
                  key={city.id}
                  city={city}
                  onSelect={handleCitySelect}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredCities.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No cities found matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // List View (After clicking country)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToCards}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Select your Country and region
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COUNTRIES.map((country) => {
            const countryFilteredCities = country.cities.filter((city) =>
              searchQuery
                ? city.name.toLowerCase().includes(searchQuery.toLowerCase())
                : true
            );

            if (countryFilteredCities.length === 0 && searchQuery) {
              return null;
            }

            return (
              <div key={country.id} className="bg-white rounded-lg p-6">
                {/* Country Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                  <span className="text-2xl">{country.flag}</span>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {country.name}
                  </h2>
                </div>

                {/* Cities List */}
                <ul className="space-y-2">
                  {countryFilteredCities.map((city) => (
                    <li key={city.id}>
                      <button
                        onClick={() => handleCitySelect(city)}
                        className="text-sm text-gray-700 hover:text-orange-500 hover:underline transition-colors text-left w-full"
                      >
                        {city.name}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* No results message */}
                {countryFilteredCities.length === 0 && searchQuery && (
                  <p className="text-sm text-gray-500 italic">
                    No cities found
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
