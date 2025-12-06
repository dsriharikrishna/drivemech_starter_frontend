"use client";

import Image from "next/image";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Mail, Calendar } from "lucide-react";

import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import PhoneInput from "@/components/forms/PhoneInput";
import Button from "@/components/ui/Button";
import ModalDropdown from "@/components/ui/DropDown";
import { Download } from "phosphor-react";

interface DropdownItem {
    id: string;
    name: string;
}

export default function ProfileLayout() {
    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            addressNotes: "",
        },
    });

    const genderOptions: DropdownItem[] = [
        { id: "male", name: "Male" },
        { id: "female", name: "Female" },
        { id: "other", name: "Other" },
    ];

    const countryOptions = [
        { code: "+91", label: "India", iso: "IN" },
        { code: "+1", label: "United States", iso: "US" },
        { code: "+44", label: "United Kingdom", iso: "GB" },
        { code: "+61", label: "Australia", iso: "AU" },
        { code: "+971", label: "UAE", iso: "AE" },
        { code: "+966", label: "Saudi Arabia", iso: "SA" },
    ];

    const onSubmit = (data: any) => {
        console.log("Profile: ", data);
    };

    return (
        <div className="flex-1 p-4 bg-white rounded-xl">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Profile Photo */}
                    <div className="border border-gray-200 p-4 mb-4 rounded-2xl">
                        <h2 className="text-lg font-semibold">Profile Photo</h2>

                        <div className="flex items-center gap-6 mt-4">
                            <div className="relative">
                                <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                    AK
                                </div>

                                <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow cursor-pointer">
                                    <Image src="/icons/camera.svg" alt="camera" width={18} height={18} />
                                </div>
                            </div>

                            <div className="text-sm text-gray-500">
                                <p>Upload your photo</p>
                                <p className="text-xs mt-1">JPG, PNG, or GIF. Max size 5MB</p>

                                <Button type="button" variant="outline" size="sm" className="mt-2"
                                    startIcon={<Download size={14} weight="duotone"/>}
                                >
                                    Choose File
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 p-4 rounded-2xl">
                        {/* Personal Information */}
                        <h2 className="text-lg font-semibold">Personal Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <CommonTextInput
                                name="firstName"
                                label="First Name"
                                placeholder="John"
                                rules={{ required: "First name is required" }}
                            />

                            <CommonTextInput
                                name="lastName"
                                label="Last Name"
                                placeholder="Doe"
                                rules={{ required: "Last name is required" }}
                            />

                            <Controller
                                name="dateOfBirth"
                                control={form.control}
                                render={({ field }) => (
                                    <CommonTextInput
                                        {...field}
                                        type="date"
                                        label="Date of Birth"
                                        placeholder="Select date"
                                        leftIcon={<Calendar size={20} className="text-gray-400" />}
                                    />
                                )}
                            />

                            <div className="flex flex-col">
                                <label className="inputLabel mb-1">Gender</label>
                                <Controller
                                    name="gender"
                                    control={form.control}
                                    render={({ field }) => (
                                        <ModalDropdown
                                            items={genderOptions}
                                            selectedItem={genderOptions.find(i => i.id === field.value) || null}
                                            onSelect={(item) => field.onChange(item.id)}
                                            placeholder="Select Gender"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <hr className="my-8 border border-gray-200" />

                        {/* Contact Information */}
                        <h2 className="text-lg font-semibold">Contact Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <CommonTextInput
                                name="email"
                                label="Email Address"
                                type="email"
                                placeholder="john.doe@example.com"
                                leftIcon={<Mail size={20} className="text-gray-400" />}
                            />

                            <Controller
                                name="phone"
                                control={form.control}
                                render={({ field }) => (
                                    <PhoneInput
                                        {...field}
                                        label="Phone Number"
                                        placeholder="9876543210"
                                        countryOptions={countryOptions}
                                        required={true}
                                    />
                                )}
                            />
                        </div>

                        {/* Address Information */}
                        <h2 className="text-lg font-semibold mt-10">Address Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <CommonTextInput
                                name="address"
                                label="Street Address"
                                placeholder="123 Park Avenue"
                            />

                            <CommonTextInput
                                name="city"
                                label="City"
                                placeholder="Mumbai"
                            />

                            <CommonTextInput
                                name="state"
                                label="State"
                                placeholder="Maharashtra"
                            />

                            <CommonTextInput
                                name="pincode"
                                label="Pincode"
                                placeholder="400001"
                            />
                        </div>

                        <div className="mt-6">
                            <CommonTextArea
                                name="addressNotes"
                                label="Address Notes (Optional)"
                                placeholder="Landmark, delivery instructions, etc."
                                rows={3}
                            />
                        </div>

                        {/* Note */}
                        <div className="mt-6 bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-sm">
                            <strong>Note:</strong> Your email & phone are used for verification & notifications.
                        </div>

                        {/* Save Button */}
                        <div className="mt-8 flex justify-center">
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                className="text-lg font-medium"
                            >
                                Save Profile
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
