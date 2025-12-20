"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, ShoppingCart, ChevronUp } from 'lucide-react';
import ServiceHero from './ServiceHero';
import ServiceIncludedTabs from './ServiceIncludedTabs';
import ServiceProcess from './ServiceProcess';
import WhyChooseUs from './WhyChooseUs';
import CustomerReviews from './CustomerReviews';
import ServiceFAQ from './ServiceFAQ';

/* ---------------- TYPES ---------------- */

export interface ServiceFeature {
    id: string;
    name: string;
    included: boolean;
}

export interface ServiceBadge {
    icon: string | React.ReactNode;
    label: string;
    value: string;
}

export interface ServiceDetailCardProps {
    id: string;
    title: string;
    image: string;
    badges: ServiceBadge[];
    features: ServiceFeature[];
    price?: number;
    totalFeatures?: number;
    includedServices?: string[];
    notIncludedServices?: string[];
    onAddToCart?: (serviceId: string) => void;
    className?: string;
}

/* ---------------- COMPONENT ---------------- */

export default function ServiceDetailCard({
    id,
    title,
    image,
    badges,
    features,
    price,
    totalFeatures,
    includedServices = [],
    notIncludedServices = [],
    onAddToCart,
    className = '',
}: ServiceDetailCardProps) {
    const [showAllFeatures, setShowAllFeatures] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const displayedFeatures = showAllFeatures ? features : features.slice(0, 4);
    const remainingCount = totalFeatures ? totalFeatures - features.length : 0;

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(id);
        }
    };

    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
            {/* Show compact card when NOT expanded */}
            {!showDetails && (
                <div className="flex flex-col lg:flex-row gap-6 p-6">
                    {/* LEFT SECTION - Image */}
                    <div className="flex-shrink-0 w-full lg:w-[180px]">
                        <div className="relative w-full h-[180px] rounded-2xl overflow-hidden bg-gray-100">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* RIGHT SECTION - Details */}
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            {title}
                        </h3>

                        {/* Badges - Single Row */}
                        <div className="flex flex-wrap gap-6 mb-5">
                            {badges.map((badge, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center">
                                        {typeof badge.icon === 'string' ? (
                                            // Check if it's a valid image path (starts with / or http)
                                            badge.icon.startsWith('/') || badge.icon.startsWith('http') ? (
                                                <Image
                                                    src={badge.icon}
                                                    alt={badge.label}
                                                    width={36}
                                                    height={36}
                                                    className="object-contain"
                                                />
                                            ) : (
                                                <span className="text-2xl">{badge.icon}</span>
                                            )
                                        ) : (
                                            badge.icon
                                        )}
                                    </div>
                                    {/* Text */}
                                    <div className="flex flex-col">
                                        <p className="text-xs font-semibold text-gray-900 leading-tight whitespace-nowrap">
                                            {badge.value}
                                        </p>
                                        <p className="text-[10px] text-gray-600 leading-tight whitespace-nowrap">
                                            {badge.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* What's Included Section */}
                        <div className="mb-5">
                            <h4 className="text-sm font-bold text-gray-900 mb-3">
                                What's included:
                            </h4>

                            {/* Features Grid - 4 Columns */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
                                {displayedFeatures.map((feature) => (
                                    <div
                                        key={feature.id}
                                        className="flex items-center gap-2"
                                    >
                                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                        <span className="text-xs text-gray-700 leading-tight">
                                            {feature.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* View All Link */}
                            {!showDetails && remainingCount > 0 && (
                                <button
                                    onClick={() => setShowDetails(true)}
                                    className="mt-3 text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
                                >
                                    View All {remainingCount}+ More
                                </button>
                            )}
                        </div>

                        {/* Price & Add to Cart Button */}
                        <div className="flex items-center justify-between mt-auto pt-4">
                            {/* Price */}
                            {price && (
                                <div className="text-xl font-bold text-gray-900">
                                    ${price.toFixed(2)}
                                </div>
                            )}

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="flex items-center gap-2 px-6 py-2.5 
                                     bg-white border-2 border-orange-500 text-orange-500 
                                     rounded-xl font-medium text-base
                                     hover:bg-orange-50 transition-all duration-200
                                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                                     ml-auto"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Show expanded view when details are visible */}
            {showDetails && (
                <div className="space-y-4">
                    {/* View Less Button - Top */}
                    <div className="px-6 pt-6 flex justify-end">
                        <button
                            onClick={() => setShowDetails(false)}
                            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
                        >
                            <ChevronUp className="w-5 h-5 font-bold" size={20} />
                            <span className="text-sm font-bold">View Less</span>
                        </button>
                    </div>

                    <ServiceHero
                        title={title}
                        image={image}
                        badges={badges}
                        features={features}
                        price={price || 0}
                        onAddToCart={handleAddToCart}
                    />
                    <div className="px-6 pb-6 space-y-4">
                        <ServiceIncludedTabs
                            includedServices={includedServices}
                            notIncludedServices={notIncludedServices}
                        />
                        <ServiceProcess />
                        <WhyChooseUs />
                        <CustomerReviews />
                        <ServiceFAQ />
                    </div>

                    {/* View Less Button - Bottom */}
                    <div className="px-6 pb-6 flex justify-end">
                        <button
                            onClick={() => setShowDetails(false)}
                            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
                        >
                            <ChevronUp className="w-5 h-5 font-bold" size={20} />
                            <span className="text-sm font-bold">View Less</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
