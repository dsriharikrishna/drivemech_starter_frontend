"use client";

import { FormProvider, useForm } from "react-hook-form";

import ModeOfService from "@/components/customer/select-service/ModeOfService";
import PreferredDateTime from "@/components/customer/select-service/PreferredDateTime";
import PersonalDetails from "@/components/customer/select-service/PersonalDetails";
import AddOns from "@/components/customer/select-service/AddOns";
import AdditionalNotes from "@/components/customer/select-service/AdditionalNotes";
import GuestToggle from "@/components/customer/select-service/GuestToggle";
import AppTiptap from "@/components/editor/AppTiptap";

export default function SelectServiceLayout() {
    const form = useForm({
        defaultValues: {
            mode: "walkin",
            addOns: [],
            notes: "",
            guest: false,
        },
    });

    const addOns = [
        { id: "ac", name: "Air Conditioning", price: 25, icon: "/icons/ac.svg" },
        { id: "roadworthy", name: "Roadworthy Inspection", price: 25, icon: "/icons/road.svg" },
        { id: "glass", name: "Auto Glass", price: 25, icon: "/icons/glass.svg" },
        { id: "spark", name: "Spark Plug", price: 25, icon: "/icons/spark.svg" },
        { id: "battery", name: "Battery", price: 25, icon: "/icons/battery.svg" },
        { id: "suspension", name: "Suspension and Steering", price: 25, icon: "/icons/suspension.svg" },
    ];

    const submit = (data: any) => {
        console.log("Booking Data:", data);
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="p-6 max-w-6xl mx-auto">

                <ModeOfService form={form} />

                <div className="h-3" />

                <PreferredDateTime form={form} />

                <div className="h-3" />

                <PersonalDetails form={form} />

                <div className="h-3" />

                <AddOns form={form} addOns={addOns} />

                <div className="h-3" />

                <AppTiptap
                    form={form}
                    name="notes"
                    placeholder="e.g., Please check the unusual noise from the engine."
                />

                <div className="h-3" />

                <GuestToggle form={form} />

                <button
                    type="submit"
                    className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg w-full md:w-auto"
                >
                    Proceed Booking →
                </button>
            </form>
        </FormProvider>
    );
}
