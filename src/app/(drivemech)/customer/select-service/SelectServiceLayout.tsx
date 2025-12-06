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
import LeftLayout from "@/components/Layout/LeftLayout";
import RightLayout from "@/components/Layout/RightLayout";
import Section from "@/components/customer/select-service/Section";
import InfoBlock from "@/components/customer/select-service/InfoBlock";
import { Star } from "phosphor-react";
import Image from "next/image";
import DetailRow from "@/components/customer/select-service/DetailRow";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import ModuleHeader from "@/components/common/ModuleHeader";

type SelectServiceForm = {
    mode: "walkin" | "pickup";
    date: string;
    time: string;
    fullName: string;
    phone: string;
    email: string;
    addOns: string[];
    notes: string;
    guest: boolean;
    location: {
        address: string;
        lat: number;
        lng: number;
    }
};


export default function SelectServiceLayout() {
    const form = useForm<SelectServiceForm>({
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
            location: {
                address: "",
                lat: 0,
                lng: 0,
            }
        },
    });

    const router = useRouter();

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
            totalAmount: addOnsTotal,
            timestamp: new Date().toISOString(),
        };

        // Save to localStorage
        localStorage.setItem('selectServiceData', JSON.stringify(bookingData));

        // Navigate to next page or call API
        console.log("Proceeding with booking:", bookingData);

        router.push("/customer/payment-process")
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
            <div className="p-4 max-w-7xl mx-auto flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <LeftLayout>
                        {/* Main Content */}
                        <div className="mx-auto p-2">
                            <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-2">
                                {/* Header */}
                                <ModuleHeader
                                    title="Select Service"
                                    onBack={handleBack}
                                />

                                {/* Selected Services Summary */}
                                {selectedServices.length > 0 && (
                                    <div className="bg-white rounded-2xl shadow-lg px-6 py-2">
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

                                    <PreferredDateTime form={form} mode={form.getValues("mode")} />

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
                                    <div className="flex flex-col justify-center items-center ">
                                        <Button
                                            type="submit"
                                            disabled={!isFormValid()}
                                            variant="primary"
                                            className="rounded-lg"
                                        >
                                            Proceed Booking
                                            <ArrowLeft className="w-5 h-5 rotate-180" />
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </LeftLayout>

                    <RightLayout>
                        <div className="flex flex-col gap-0 p-2 bg-white rounded-2xl">

                            <h2 className="text-md font-semibold">Your Booking Summery</h2>

                            {/* Vehicle Details */}
                            <Section title="Vehicle Details">
                                <InfoBlock>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-medium">ABC 1234 D</span>
                                        <button className="text-blue-500 text-xs">Change</button>
                                    </div>

                                    <div className="flex justify-center">
                                        <Image src="/images/car-blue.png" width={130} height={80} alt="" />
                                    </div>

                                    <p className="text-sm text-center font-medium mt-2">Toyota Hilux</p>
                                    <p className="text-xs text-center text-gray-500">
                                        2021 Petrol Automatic 2.5 Liters Hybrid AWD-i
                                    </p>
                                </InfoBlock>
                            </Section>

                            {/* Selected Workshop */}
                            <Section title="Selected Workshop">
                                <InfoBlock>
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/images/workshop.jpg"
                                            width={60}
                                            height={60}
                                            className="rounded-lg"
                                            alt=""
                                        />

                                        <div className="flex-1">
                                            <p className="text-sm font-semibold">A to Z Services</p>

                                            <div className="flex items-center gap-2 text-xs mt-1">
                                                <span className="flex items-center gap-1">
                                                    4.5
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" stroke="none" />
                                                </span>
                                                <span>(120)</span>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                                                🚴‍♂️ 2Kms <span>⏱ 5 Mins Drive</span>
                                            </div>
                                        </div>
                                    </div>
                                </InfoBlock>
                            </Section>

                            {/* Service Details */}
                            <Section title="Service Details">
                                <div className="space-y-3">
                                    <DetailRow label="Mode" value="Pickup" />
                                    <DetailRow label="Date" value="July 30, 2025" />
                                    <DetailRow label="Time" value="2:00 PM - 3:00 PM" />
                                    <DetailRow
                                        label="Address"
                                        value="Your entered address will appear here"
                                    />
                                </div>
                            </Section>

                            {/* Bill Details */}
                            <Section title="Bill Details">
                                <div className="space-y-3">
                                    <DetailRow label="Items total" value="$230" />
                                    <DetailRow label="Add-on Services" value="$25" />
                                    <DetailRow label="Tax" value="$150" />
                                    <DetailRow label="Safety & Warranty" value="$99" />

                                    <div className="border-t border-border pt-3">
                                        <DetailRow label="Grand Total" value={<span className="font-semibold">$579</span>} />
                                    </div>
                                </div>
                            </Section>

                        </div>
                    </RightLayout>
                </div>
            </div>
        </FormProvider>
    );
}
