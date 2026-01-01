"use client";

import Image from "next/image";

interface Service {
    id: string;
    name: string;
    icon: string;
    popular?: boolean;
}

const services: Service[] = [
    {
        id: "logbook",
        name: "Logbook Service",
        icon: "/images/ourservices/Battery.png",
        popular: true,
    },
    {
        id: "basic",
        name: "Basic Service",
        icon: "/images/ourservices/SparkPlug.png",
    },
    {
        id: "breakdown",
        name: "Breakdown",
        icon: "/images/ourservices/Battery.png",
    },
    {
        id: "air-conditioning",
        name: "Air Conditioning",
        icon: "/images/ourservices/AirConditioning.png",
    },
    {
        id: "roadworthy",
        name: "Roadworthy Inspection",
        icon: "/images/ourservices/Roadworthyinspection.png",
    },
    {
        id: "auto-glass",
        name: "Auto Glass",
        icon: "/images/ourservices/AutoGlass.png",
    },
    {
        id: "spark-plug",
        name: "Spark Plug",
        icon: "/images/ourservices/SparkPlug.png",
    },
    {
        id: "battery",
        name: "Battery",
        icon: "/images/ourservices/Battery.png",
    },
    {
        id: "suspension",
        name: "Suspension and Steering",
        icon: "/images/ourservices/SuspensionSteering.png",
    },
    {
        id: "brakes",
        name: "Brakes",
        icon: "/images/ourservices/Clutch.png",
    },
    {
        id: "timing-belt",
        name: "Timing belt/chain",
        icon: "/images/ourservices/Timingbelt.png",
    },
    {
        id: "clutch",
        name: "Clutch",
        icon: "/images/ourservices/Clutch.png",
    },
    {
        id: "transmission",
        name: "Transmission / Differential",
        icon: "/images/ourservices/Transmission.png",
    },
    {
        id: "oil-leak",
        name: "Oil leak inspection",
        icon: "/images/ourservices/Oilleakinspection.png",
    },
    {
        id: "wheels",
        name: "Wheels & Tyres",
        icon: "/images/ourservices/Wheels.png",
    },
    {
        id: "pre-purchase",
        name: "Pre-Purchase Inspection",
        icon: "/images/ourservices/Roadworthyinspection.png",
    },
    {
        id: "window-tinting",
        name: "Window tinting",
        icon: "/images/ourservices/AutoGlass.png",
    },
    {
        id: "radiator",
        name: "Radiator",
        icon: "/images/ourservices/Oilleakinspection.png",
    },
];

export default function ServicesNearBy() {
    return (
        <section className="w-full py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Service nearby</h2>

                {/* Services Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {services.map((service) => (
                        <button
                            key={service.id}
                            className="
                relative flex flex-col items-center justify-center 
                p-6 bg-white border-1 border-gray-200 rounded-xl
                hover:border-orange-500 hover:shadow-lg
                transition-all duration-300
                group"
                        >
                            {/* Popular Badge */}
                            {service.popular && (
                                <span className="absolute top-2 right-2 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                                    Popular
                                </span>
                            )}

                            {/* Service Icon */}
                            <div className="w-16 h-16 mb-3 flex items-center justify-center">
                                <Image
                                    src={service.icon}
                                    alt={service.name}
                                    width={64}
                                    height={64}
                                    className="object-contain group-hover:scale-110 transition-transform duration-200"
                                />
                            </div>

                            {/* Service Name */}
                            <p className="text-sm text-center text-gray-700 font-medium">
                                {service.name}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}