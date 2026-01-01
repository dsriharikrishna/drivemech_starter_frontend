"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import CommonTextInput from "@/components/forms/CommonTextInput";
import ModalDropdown from "@/components/ui/DropDown";
import { makes, models } from "../../../../data/vehicle";
import FloatingLabelInput from "@/components/forms/FloatingLabelInput";
import Image from "next/image";
import { addVehicleSchema, type AddVehicleFormData } from "@/schemas/customer/addVehicle.schema";
import { useAppDispatch } from "@/store/store";
import { setCurrentVehicle, addSavedVehicle } from "@/store/slices/cart/cartSlice";

type DropdownItem = { id: string; name: string; makeId?: string };

export default function AddVehicleLayout() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ✅ React Hook Form with Zod validation
    const methods = useForm<AddVehicleFormData>({
        resolver: zodResolver(addVehicleSchema),
        defaultValues: {
            registrationNumber: "",
            make: "",
            model: "",
            cubicCapacity: "",
            manufacturingYear: "",
        },
        mode: "all",
        reValidateMode: "onChange",
    });

    const { handleSubmit, setValue, formState: { errors } } = methods;

    const [selectedMake, setSelectedMake] = useState<DropdownItem | null>(null);
    const [selectedModel, setSelectedModel] = useState<DropdownItem | null>(null);

    const handleMakeSelect = (item: DropdownItem) => {
        setSelectedMake(item);
        setValue("make", item.id, { shouldValidate: true });
        setSelectedModel(null);
        setValue("model", "", { shouldValidate: true });
    };

    const handleModelSelect = (item: DropdownItem) => {
        setSelectedModel(item);
        setValue("model", item.id, { shouldValidate: true });
    };

    // ✅ Form submission with Redux integration
    const onSubmit = (data: AddVehicleFormData) => {
        setIsSubmitting(true);

        try {
            // Create vehicle object for Redux
            const vehicleData = {
                registration: data.registrationNumber,
                make: selectedMake?.name || data.make,
                model: selectedModel?.name || data.model,
                year: parseInt(data.manufacturingYear),
                fuelType: 'Petrol', // TODO: Add to form
                transmission: 'Automatic', // TODO: Add to form
                engine: `${data.cubicCapacity}cc`,
                drive: 'FWD', // TODO: Add to form
            };

            // ✅ Dispatch to Redux cart slice
            dispatch(setCurrentVehicle(vehicleData));
            dispatch(addSavedVehicle(vehicleData));

            // Show success message
            (window as any).addToast?.("Vehicle added successfully!", "success");

            // Navigate to services
            router.push("/customer/services");
        } catch (error) {
            console.error("Error adding vehicle:", error);
            (window as any).addToast?.("Failed to add vehicle. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="relative max-h-full bg-cover bg-center  bg-no-repeat bg-hero overflow-hidden">

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content Wrapper */}
                <div className="relative w-full min-h-screen flex justify-center md:justify-end items-center px-4 sm:px-6 md:px-12 lg:px-20 py-10 shadow-md">
                    {/* Card */}
                    <div className="backdrop-blur-xl bg-white/30 border border-white/20 shadow-2xl rounded-2xl p-3">
                        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-8 border border-gray-200">

                            {/* Logo + Title */}
                            <div className="text-center mb-8">
                                <Image
                                    src="/images/DriveMechLogo.png"
                                    alt="DriveMech Logo"
                                    width={140}
                                    height={140}
                                    className="mx-auto mb-4 object-contain"
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
