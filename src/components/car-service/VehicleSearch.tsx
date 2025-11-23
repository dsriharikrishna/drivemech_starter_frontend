"use client";

import { useState } from "react";
import Image from "next/image";
import ModalDropdown from "../ui/DropDown";
import CommonTextInput from "../forms/CommonTextInput";
import { FormProvider, useForm } from "react-hook-form";

type VehicleSearchProps = {
    selectedMake: string;
    setSelectedMake: (make: string) => void;
    selectedModel: string;
    setSelectedModel: (model: string) => void;
};

const states = [
    { id: "AP", name: "AP" },
    { id: "TS", name: "TS" },
    { id: "KA", name: "KA" },
    { id: "TN", name: "TN" },
];

const makes = [
    { id: "toyota", name: "Toyota" },
    { id: "bmw", name: "BMW" },
    { id: "honda", name: "Honda" },
    { id: "ford", name: "Ford" },
    { id: "mercedes", name: "Mercedes" },
    { id: "audi", name: "Audi" },
];

const models = [
    { id: "camry", name: "Camry" },
    { id: "corolla", name: "Corolla" },
    { id: "x5", name: "X5" },
    { id: "civic", name: "Civic" },
    { id: "accord", name: "Accord" },
];

export default function VehicleSearch({
    selectedMake,
    setSelectedMake,
    selectedModel,
    setSelectedModel,
}: VehicleSearchProps) {

    const [state, setState] = useState("AP");

    // RHF with defaultValues
    const methods = useForm({
        defaultValues: {
            rego: "",
            postcode: "",
        },
    });

    const selectedStateObj = states.find(s => s.id === state) || null;
    const selectedMakeObj = makes.find(m => m.id === selectedMake) || null;
    const selectedModelObj = models.find(m => m.id === selectedModel) || null;

    return (
        <FormProvider {...methods}>
            <form className="relative w-full mx-auto max-w-[1215px] justify-between px-4 py-6 sm:px-5 lg:px-6 bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col gap-1">

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">

                    {/* STATE + REGO */}
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-0 h-5 items-center">
                            <div className="w-[70px]">
                                <label className="block text-[14px] font-semibold text-gray-800">State</label>
                            </div>
                            <div className="flex-1">
                                <label className="block text-[14px] font-semibold text-gray-800 pl-4">Rego</label>
                            </div>
                        </div>

                        <div className="flex flex-row border border-gray-200 rounded-[10px] overflow-hidden h-[40px]">
                            <div className="w-[70px] border-r border-gray-200">
                                <ModalDropdown
                                    items={states}
                                    selectedItem={selectedStateObj}
                                    onSelect={(item) => setState(item.id)}
                                    placeholder="AP"
                                    className="h-full"
                                    buttonClassName="!rounded-none !border-0 !text-gray-700 !bg-white !shadow-none"
                                />
                            </div>

                            {/* Rego input (UNCONTROLLED RHF INPUT) */}
                            <div className="flex-1">
                                <CommonTextInput
                                    label=""
                                    name="rego"
                                    placeholder="Reg no.."
                                    className="!rounded-none !border-0 !shadow-none text-gray-700 h-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* MAKE */}
                    <div className="flex flex-col gap-2">
                        <label className="block text-[14px] font-semibold text-gray-800 h-5">Make</label>
                        <ModalDropdown
                            items={makes}
                            selectedItem={selectedMakeObj}
                            onSelect={(item) => setSelectedMake(item.id)}
                            placeholder="Toyota, BMW"
                            className="h-[40px]"
                            buttonClassName="!rounded-[10px] !border !border-gray-200 !text-gray-700 !bg-white"
                        />
                    </div>

                    {/* MODEL */}
                    <div className="flex flex-col gap-2">
                        <label className="block text-[14px] font-semibold text-gray-800 h-5">Model</label>
                        <ModalDropdown
                            items={models}
                            selectedItem={selectedModelObj}
                            onSelect={(item) => setSelectedModel(item.id)}
                            placeholder="Select Model"
                            className="h-[40px]"
                            buttonClassName="!rounded-[10px] !border !border-gray-200 !text-gray-700 !bg-white"
                        />
                    </div>

                    {/* POSTCODE */}
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="block text-[14px] font-semibold text-gray-800 h-5">
                            Postcode or Suburb
                        </label>
                        <div className="flex gap-2 h-[40px]">
                            <div className="relative flex-2">
                                <CommonTextInput
                                    label=""
                                    name="postcode"
                                    placeholder="Enter postcode or suburb"
                                    className="!rounded-[10px] !border !border-gray-200 text-gray-700 pr-10 h-full"
                                />
                                <Image
                                    src="/images/MapPin.png"
                                    alt="Map Pin"
                                    width={18}
                                    height={18}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                />
                            </div>

                            <div className="flex-1">
                                <button className="bg-green-500 hover:bg-green-600 text-white text-[15px] font-medium rounded-[10px] px-6 transition whitespace-nowrap h-full">
                                    Find My Vehicle
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start items-start gap-2 text-gray-500 mt-1">
                    <span className="bg-blue-100 text-blue-600 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                        xyz 000
                    </span>
                    <p className="text-[13px]">Enter your registration number to quickly identify your car</p>
                </div>
            </form>
        </FormProvider>
    );
}
