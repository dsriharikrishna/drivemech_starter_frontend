"use client";

import React, { useEffect, useState } from "react";
import CustomCard from "@/components/ui/CustomCard";
import { Star } from "lucide-react";
import { useEmbla } from "@/hooks/useEmbla";
import Divider from "@/components/ui/Divider";

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: "Olivia Green",
            city: "Hyderabad",
            text: `"Best roadside assistance app! Super easy and live tracking is amazing."`,
            img: "/users/1.jpg",
        },
        {
            name: "Olivia Green",
            city: "Hyderabad",
            text: `"Saved me when stranded at 3 AM. Driver came in 15 minutes!"`,
            img: "/users/1.jpg",
        },
        {
            name: "Olivia Green",
            city: "Hyderabad",
            text: `"Simple, fast, reliable. Love the digital payments!"`,
            img: "/users/1.jpg",
        },
        {
            name: "Olivia Green",
            city: "Hyderabad",
            text: `"Amazing response time, great support!"`,
            img: "/users/1.jpg",
        },
        {
            name: "Olivia Green",
            city: "Hyderabad",
            text: `"Simple, fast, reliable. Love the digital payments!"`,
            img: "/users/1.jpg",
        },
        {
            name: "Olivia Green",
            city: "Hyderabad",
            text: `"Amazing response time, great support!"`,
            img: "/users/1.jpg",
        },
    ];

    const { emblaRef, emblaApi } = useEmbla();
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi]);

    return (
        <section className="w-full py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">

                {/* Heading */}
                <h2 className="text-3xl font-semibold text-gray-heading">
                    Loved by Users Everywhere
                </h2>
                <p className="text-gray-600 text-sm mt-2 max-w-2xl mx-auto">
                    Real feedback from customers across the country.
                </p>

                {/* SLIDER */}
                <div className="overflow-hidden mt-10" ref={emblaRef}>
                    <div className="flex gap-6">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className="min-w-[80%] sm:min-w-[40%] lg:min-w-[20%]"
                            >
                                <CustomCard className="rounded-xl p-5 border bg-white flex flex-col gap-4 h-full">

                                    {/* Profile */}
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={t.img}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-heading">{t.name}</p>
                                            <p className="text-xs text-gray-500">{t.city}</p>
                                        </div>
                                    </div>

                                    <Divider />

                                    <p className="text-xs text-gray-600 leading-relaxed">{t.text}</p>

                                    <div className="flex gap-1 mt-auto">
                                        {[...Array(5)].map((_, idx) => (
                                            <Star
                                                key={idx}
                                                className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                            />
                                        ))}
                                    </div>
                                </CustomCard>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SLIDER DOTS */}
                <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full transition-all ${selectedIndex === index
                                    ? "w-8 bg-orange-500"
                                    : "w-2 bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
