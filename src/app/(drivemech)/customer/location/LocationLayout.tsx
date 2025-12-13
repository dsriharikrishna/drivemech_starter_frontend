"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { COUNTRIES, City } from "@/constants/location.constants";
import CityCard from "@/components/customer/location/CityCard";
// import ModuleHeader from "@/components/common/ModuleHeader";

export default function LocationLayout() {
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0].id);
    const [showAll, setShowAll] = useState(false);

    const currentCountry = COUNTRIES.find((c) => c.id === selectedCountry);
    const displayedCities = showAll
        ? currentCountry?.cities || []
        : currentCountry?.cities.slice(0, 6) || [];

    const handleCitySelect = (city: City) => {
        // Store selected city in localStorage or Redux
        localStorage.setItem("selectedCity", JSON.stringify(city));
        // Navigate back to home or previous page
        router.back();
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header */}
                {/* <ModuleHeader title="Select Your Location" onBack={handleBack} /> */}

                {/* Country Tabs */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mt-4">
                    <div className="flex gap-2 border-b border-gray-200 mb-6">
                        {COUNTRIES.map((country) => (
                            <button
                                key={country.id}
                                onClick={() => {
                                    setSelectedCountry(country.id);
                                    setShowAll(false);
                                }}
                                className={`
                  flex items-center gap-2 px-4 py-3 font-medium text-sm
                  border-b-2 transition-colors
                  ${selectedCountry === country.id
                                        ? "border-primary text-primary"
                                        : "border-transparent text-gray-600 hover:text-gray-900"
                                    }
                `}
                            >
                                <span className="text-lg">{country.flag}</span>
                                {country.name}
                            </button>
                        ))}
                    </div>

                    {/* Cities Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayedCities.map((city) => (
                            <CityCard key={city.id} city={city} onSelect={handleCitySelect} />
                        ))}
                    </div>

                    {/* View More Button */}
                    {currentCountry && currentCountry.cities.length > 6 && !showAll && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setShowAll(true)}
                                className="
                  px-8 py-3 
                  bg-primary text-white 
                  rounded-xl font-semibold
                  hover:bg-primary/90 
                  transition-colors
                "
                            >
                                View More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
