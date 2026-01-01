"use client";

import React, { useState } from 'react';
import SelectServiceCard from '@/components/vendor/onboard/SelectServiceCard';
import Button from '@/components/ui/Button';

// Service data
const SERVICES = [
    {
        id: 'workshop',
        title: 'Workshop',
        icon: '/svgs/workshop.svg',
        description: 'Manage vehicle repairs, bookings, and service jobs',
        features: [
            'Job Management',
            'Customer Bookings',
            'Service Tracking',
            'Pricing Engine'
        ]
    },
    {
        id: 'spare-parts',
        title: 'Spare Parts',
        icon: '/svgs/spare-parts.svg',
        description: 'Handle inventory, orders, and parts distribution',
        features: [
            'Inventory Management',
            'Order Processing',
            'Stock Alerts',
            'Supplier Management'
        ]
    },
    {
        id: 'towing',
        title: 'Towing',
        icon: '/svgs/towing.svg',
        description: 'Coordinate towing operations and fleet management',
        features: [
            'Fleet Management',
            'Route Optimization',
            'Driver Assignment',
            'Real-time Tracking'
        ]
    }
];

export default function SelectService() {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const toggleService = (serviceId: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const handleNext = () => {
        if (selectedServices.length === 0) {
            alert('Please select at least one service to continue');
            return;
        }
        console.log('Selected services:', selectedServices);
        // TODO: Navigate to next step
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Select the Services You Provide
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Choose one or multiple services to set up your account
                    </p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {SERVICES.map((service) => (
                        <SelectServiceCard
                            key={service.id}
                            service={service}
                            isSelected={selectedServices.includes(service.id)}
                            onToggle={toggleService}
                        />
                    ))}
                </div>

                {/* Footer */}
                <div className="pt-6 border-t border-gray-200">
                    {/* Selected Services Display */}
                    {selectedServices.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                {selectedServices.length} {selectedServices.length === 1 ? 'Service' : 'Services'} Selected
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {selectedServices.map((serviceId) => {
                                    const service = SERVICES.find(s => s.id === serviceId);
                                    if (!service) return null;

                                    return (
                                        <div
                                            key={serviceId}
                                            className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-4 py-2"
                                        >
                                            <img className="w-5 h-5" src={service.icon} alt={service.title} />
                                            <span className="text-sm font-medium text-gray-900">{service.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            {selectedServices.length === 0
                                ? 'Please select at least one service to continue'
                                : 'You can add more services later from settings'
                            }
                        </p>

                        {selectedServices.length === 0 ? (
                            <Button
                                onClick={handleNext}
                                className="px-4 py-2"
                                variant='gradient'
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                className="px-4 py-2"
                                variant='gradient'
                            >
                                Continue
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}