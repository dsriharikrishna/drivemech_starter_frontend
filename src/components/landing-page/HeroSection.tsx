"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import VehicleSearch from "./VehicleSearch";
import { useAppSelector } from "@/store/store";
import {
    selectSelectedMake,
    selectSelectedModel,
    selectSelectedState,
    selectSelectedRego,
    selectSelectedPostcode
} from "@/store/slices/helpers/helperSlice";
import { vehicleSearchSchema, VehicleSearchFormData } from "@/schemas/vehicleSearchSchema";

export default function HeroSection() {
    const selectedMake = useAppSelector(selectSelectedMake);
    const selectedModel = useAppSelector(selectSelectedModel);
    const selectedState = useAppSelector(selectSelectedState);
    const selectedRego = useAppSelector(selectSelectedRego);
    const selectedPostcode = useAppSelector(selectSelectedPostcode);

    const methods = useForm<VehicleSearchFormData>({
        resolver: zodResolver(vehicleSearchSchema),
        defaultValues: {
            state: selectedState,
            rego: selectedRego,
            make: selectedMake,
            model: selectedModel,
            postcode: selectedPostcode,
        },
        mode: "onChange",
    });

    const onSubmit = (data: VehicleSearchFormData) => {
        console.log("Form submitted:", data);
        // Handle form submission here
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <section
                    id="home"
                    className="relative bg-cover bg-hero bg-center bg-no-repeat text-white flex flex-col justify-center items-center p-4"
                    style={{ minHeight: "720px" }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className="relative flex flex-col justify-center items-center h-full text-center w-full max-w-7xl mx-auto px-4">
                        <h1 className="font-manrope font-extrabold text-3xl md:text-[44px] leading-tight md:leading-[44px] text-center mb-4">
                            Your Vehicle's{" "}
                            <span className="text-orange-500">Personal Mechanic</span>, <br />
                            Anytime, Anywhere
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                            Your one-stop solution for all your vehicle service needs.
                        </p>

                        {/* Vehicle Search Box */}
                        <div className="w-full">
                            <VehicleSearch />
                        </div>
                    </div>
                </section>
            </form>
        </FormProvider>
    );
}