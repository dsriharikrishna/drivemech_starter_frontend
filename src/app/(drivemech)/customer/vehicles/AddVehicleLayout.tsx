"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@/components/ui/Button";
import CommonTextInput from "@/components/forms/CommonTextInput";
import ModalDropdown from "@/components/ui/DropDown";
import { makes, models } from "@/components/data/vehicle";
import FloatingLabelInput from "@/components/forms/FloatingLabelInput";

type DropdownItem = { id: string; name: string; makeId?: string };

type FormData = {
    registrationNumber: string;
    make: string;
    model: string;
    cubicCapacity: string;
    manufacturingYear: string;
};

export default function AddVehicleLayout() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm<FormData>({
        defaultValues: {
            registrationNumber: "",
            make: "",
            model: "",
            cubicCapacity: "",
            manufacturingYear: "",
        },
    });

    const { handleSubmit, setValue } = methods;

    const [selectedMake, setSelectedMake] = useState<DropdownItem | null>(null);
    const [selectedModel, setSelectedModel] = useState<DropdownItem | null>(null);

    const handleMakeSelect = (item: DropdownItem) => {
        setSelectedMake(item);
        setValue("make", item.id);
        setSelectedModel(null);
        setValue("model", "");
    };

    const handleModelSelect = (item: DropdownItem) => {
        setSelectedModel(item);
        setValue("model", item.id);
    };

    const onSubmit = (data: FormData) => {
        setIsSubmitting(true);

        console.log(data);

        // setTimeout(() => {
        //   (window as any).addToast("Vehicle added successfully!", "success");
        //   router.push("/vehicles");
        // }, 1000);
    };

    return (
        <FormProvider {...methods}>
            <div className="relative min-h-screen bg-cover bg-center  bg-no-repeat bg-hero">

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content Wrapper */}
                <div className="relative w-full min-h-screen flex justify-center md:justify-end items-center px-4 sm:px-6 md:px-12 lg:px-20 py-10 shadow-md">
                    {/* Card */}
                    <div className="backdrop-blur-xl bg-white/30 border border-white/20 shadow-2xl rounded-2xl p-3">
                        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-8 border border-gray-200">

                            {/* Logo + Title */}
                            <div className="text-center mb-8">
                                <img
                                    src="/images/drivemech-logo.png"
                                    alt="DriveMech"
                                    className="w-32 sm:w-40 mx-auto mb-4"
                                />
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                                    Add Your Vehicle
                                </h2>
                            </div>

                            {/* FORM */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                {/* Registration Number */}
                                {/* <CommonTextInput
                name="registrationNumber"
                label="Vehicle Registration Number"
                placeholder="Enter your vehicle number (KA01AB1234)"
                className="w-full"
              /> */}

                                <div className="relative">
                                    <FloatingLabelInput
                                        name="registrationNumber"
                                        label="Vehicle Registration Number"
                                        variant="outlined"
                                        required
                                    />
                                </div>
                                {/* Make + Model */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    {/* Make */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">Make</label>
                                        <ModalDropdown
                                            items={makes}
                                            selectedItem={selectedMake}
                                            onSelect={handleMakeSelect}
                                            placeholder="Select Make"
                                            className="h-[44px]"
                                            buttonClassName="!rounded-xl !border !border-gray-300 !bg-white !text-gray-700"
                                        />
                                    </div>

                                    {/* Model */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-semibold text-gray-700">Model</label>
                                        <ModalDropdown
                                            items={models.filter((m) =>
                                                !selectedMake ? false : m.makeId === selectedMake.id
                                            )}
                                            selectedItem={selectedModel}
                                            onSelect={handleModelSelect}
                                            placeholder="Select Model"
                                            disabled={!selectedMake}
                                            className="h-[44px]"
                                            buttonClassName="!rounded-xl !border !border-gray-300 !bg-white !text-gray-700"
                                        />
                                    </div>

                                </div>

                                {/* CC + Year */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <CommonTextInput
                                        name="cubicCapacity"
                                        label="Cubic Capacity"
                                        placeholder="Ex: 1500"
                                        type="number"
                                        className="w-full"
                                    />

                                    <CommonTextInput
                                        name="manufacturingYear"
                                        label="Manufacturing Year"
                                        placeholder="Ex: 2020"
                                        type="number"
                                        className="w-full"
                                    />
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="w-full rounded-xl"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Adding..." : "Next"}
                                </Button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
}
