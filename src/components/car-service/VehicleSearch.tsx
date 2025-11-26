"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import PhoneInput from "../forms/PhoneInput";
import { makes, models, states } from "../../data/vehicle";

type VehicleSearchProps = {
    selectedMake: string;
    setSelectedMake: (make: string) => void;
    selectedModel: string;
    setSelectedModel: (model: string) => void;
};

export default function VehicleSearch({
    selectedMake,
    setSelectedMake,
    selectedModel,
    setSelectedModel,
}: VehicleSearchProps) {

    const { register, watch, setValue, formState: { errors } } = useFormContext();

    const [state, setState] = useState("AP");
    const postcodeValue = watch("postcode");
    const makeValue = watch("make");
    const modelValue = watch("model");

    useEffect(() => {
        if (makeValue) {
            setSelectedMake(makeValue);
        }
    }, [makeValue]);

    useEffect(() => {
        if (modelValue) {
            setSelectedModel(modelValue);
        }
    }, [modelValue]);

    const handleStateChange = (value: string) => {
        setState(value);
        setValue("state", value);
    };


    useEffect(() => {
        (window as any).addToast(errors.postcode?.message as string, "error");
    }, [errors]);


    return (
        <div className="relative w-full mx-auto max-w-7xl px-4 py-6 sm:px-5 lg:px-6 bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col gap-4">

            {/* FLEX CONTAINER FOR INPUT FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full items-end">

                {/* STATE REGO */}
                <div className="flex flex-col gap-2">
                    <label className="block text-[14px] font-semibold text-gray-800">State Rego</label>
                    <div className="flex gap-2 w-full">
                        <PhoneInput
                            name="state"
                            label=""
                            countryOptions={states.map(state => ({
                                code: state.id,
                                label: state.name,
                                iso: `IN-${state.id}`
                            }))}
                            value={state}
                            onChange={handleStateChange}
                        />
                    </div>
                    {errors.rego && (
                        <p className="text-red-500 text-xs mt-1">{errors.rego.message as string}</p>
                    )}
                </div>

                {/* MAKE */}
                <div className="flex flex-col gap-2">
                    <label className="block text-[14px] font-semibold text-gray-800">Make</label>
                    <select
                        className="h-[40px] rounded-lg border-2 border-gray-200 text-gray-700 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:border-orange-500 transition-all duration-200 w-full hover:border-gray-300"
                        {...register("make", {
                            required: "Make is required",
                        })}
                        value={selectedMake}
                    >
                        <option value="">Toyota, BMW</option>
                        {makes.map((make) => (
                            <option key={make.id} value={make.id} className="text-gray-700 border-0 focus:ring-0">
                                {make.name}
                            </option>
                        ))}
                    </select>
                    {errors.make && (
                        <p className="text-red-500 text-xs mt-1">{errors.make.message as string}</p>
                    )}
                </div>

                {/* MODEL */}
                <div className="flex flex-col gap-2">
                    <label className="block text-[14px] font-semibold text-gray-800">Model</label>
                    <select
                        className="h-[40px] rounded-lg border-2 border-gray-200 text-gray-700 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-0 focus:border-orange-500 transition-all duration-200 w-full hover:border-gray-300"
                        {...register("model", {
                            required: "Model is required",
                        })}
                        value={selectedModel}
                    >
                        <option value="">Select Model</option>
                        {models.map((model) => (
                            <option key={model.id} value={model.id}>
                                {model.name}
                            </option>
                        ))}
                    </select>
                    {errors.model && (
                        <p className="text-red-500 text-xs mt-1">{errors.model.message as string}</p>
                    )}
                </div>

                {/* POSTCODE & BUTTON CONTAINER */}
                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="block text-[14px] font-semibold text-gray-800">Postcode or Suburb</label>
                    <div className="flex gap-2 w-full">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Enter postcode or suburb"
                                className="h-[40px] rounded-lg border-2 border-gray-200 text-gray-700 bg-white px-10 py-2 text-sm focus:outline-none focus:ring-0 focus:border-orange-500 transition-all duration-200 w-full hover:border-gray-300"
                                {...register("postcode", {
                                    required: "Postcode or suburb is required",
                                    pattern: {
                                        value: /^[0-9a-zA-Z\s]+$/,
                                        message: "Please enter a valid postcode or suburb"
                                    }
                                })}
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <Image
                                    src="/images/MapPin.png"
                                    alt="Map Pin"
                                    width={18}
                                    height={18}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white text-[15px] font-medium rounded-[10px] px-4 h-[40px] flex items-center justify-center transition whitespace-nowrap min-w-[140px] flex-shrink-0"
                        >
                            Find My Vehicle
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-start items-center gap-2 text-gray-500 mt-2">
                <span className="bg-blue-100 text-blue-600 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    xyz 000
                </span>
                <p className="text-[13px]">Enter your registration number to quickly identify your car</p>
            </div>
        </div>
    );
}