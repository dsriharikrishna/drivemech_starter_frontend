"use client";

import { FormProvider, useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";

import ModeOfService from "@/components/customer/select-service/ModeOfService";
import PreferredDateTime from "@/components/customer/select-service/PreferredDateTime";
import PersonalDetails from "@/components/customer/select-service/PersonalDetails";
import AddOns from "@/components/customer/select-service/AddOns";
import GuestToggle from "@/components/customer/select-service/GuestToggle";
import AppTiptap from "@/components/editor/AppTiptap";
import { AddOnService } from "@/types/select-service";
import { Service } from "@/data/services";

export default function SelectServiceLayout() {
    const form = useForm({
        defaultValues: {
            mode: "walkin",
            date: "",
            time: "",
            fullName: "",
            phone: "",
            email: "",
            addOns: [],
            notes: "",
            guest: false,
        },
    });

    // Default add-ons
    const addOns: AddOnService[] = [
        { id: "ac", name: "Air Conditioning", price: 25, icon: "/icons/ac.svg" },
        { id: "roadworthy", name: "Roadworthy Inspection", price: 25, icon: "/icons/road.svg" },
        { id: "glass", name: "Auto Glass", price: 25, icon: "/icons/glass.svg" },
        { id: "spark", name: "Spark Plug", price: 25, icon: "/icons/spark.svg" },
        { id: "battery", name: "Battery", price: 25, icon: "/icons/battery.svg" },
        { id: "suspension", name: "Suspension and Steering", price: 25, icon: "/icons/suspension.svg" },
    ];

    // Default selected services (can be loaded from context or localStorage)
    const selectedServices: Service[] = [];

    const submit = (data: any) => {
        console.log("Booking Data:", data);
        
        // Calculate total price
        const selectedAddOns = addOns.filter(addon => data.addOns.includes(addon.id));
        const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
        
        const bookingData = {
            ...data,
            selectedServices,
            addOnsTotal,
            totalAmount: addOnsTotal, // Can be extended with service prices
            timestamp: new Date().toISOString(),
        };

        // Save to localStorage
        localStorage.setItem('selectServiceData', JSON.stringify(bookingData));

        // Navigate to next page or call API
        console.log("Proceeding with booking:", bookingData);
    };

    // Watch form values for real-time validation
    const watchedValues = form.watch();
    
    // Form validation
    const isFormValid = () => {
        return watchedValues.mode && 
               watchedValues.date && 
               watchedValues.time && 
               watchedValues.fullName && 
               watchedValues.phone && 
               watchedValues.email;
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <FormProvider {...form}>
            <div className="min-h-screen max-w-7xl mx-auto bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-border px-4 py-4">
                    <div className=" mx-auto flex items-center gap-4">
                        <button 
                            onClick={handleBack}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-xl font-semibold">Select Service</h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className=" mx-auto p-4">
                    <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
                        
                        {/* Selected Services Summary */}
                        {selectedServices.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Services</h3>
                                <div className="space-y-2">
                                    {selectedServices.map((service) => (
                                        <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{service.icon}</span>
                                                <span className="font-medium text-gray-900">{service.name}</span>
                                            </div>
                                            <span className="text-orange-500 font-semibold">${service.price || 0}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Main Card Container */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 space-y-8">
                            
                            <ModeOfService form={form} />
                            
                            <PreferredDateTime form={form} />
                            
                            <PersonalDetails form={form} />
                            
                            <AddOns form={form} addOns={addOns} />
                            
                            {/* Additional Notes Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Additional Note for the Mechanic
                                </h3>
                                <AppTiptap
                                    form={form}
                                    name="notes"
                                    placeholder="e.g., Please check the unusual noise from the engine."
                                />
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 gap-2 flex flex-col">
                            <GuestToggle form={form} />
                            
                            <button
                                type="submit"
                                disabled={!isFormValid()}
                                className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-base shadow-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Proceed Booking
                                <ArrowLeft className="w-5 h-5 rotate-180" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </FormProvider>
    );
}
