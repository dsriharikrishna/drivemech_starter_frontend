'use client';

import React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { addressFormSchema, AddressFormData } from '@/schemas/checkout.schema';
import Button from '@/components/ui/Button';
import CommonTextInput from '@/components/forms/CommonTextInput';
import CheckboxInput from '@/components/forms/CheckboxInput';
import ModalDropdown from '@/components/ui/DropDown';
import PhoneInput from '@/components/forms/PhoneInput';

interface AddressFormProps {
    onSubmit: (data: AddressFormData) => void;
    onCancel: () => void;
    initialData?: AddressFormData;
}

const CITIES = [
    { id: 'hyderabad', name: 'Hyderabad' },
    { id: 'bangalore', name: 'Bangalore' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'delhi', name: 'Delhi' }
];

const STATES = [
    { id: 'telangana', name: 'Telangana' },
    { id: 'karnataka', name: 'Karnataka' },
    { id: 'maharashtra', name: 'Maharashtra' },
    { id: 'delhi', name: 'Delhi' }
];

const COUNTRIES = [
    { id: 'india', name: 'India' },
    { id: 'usa', name: 'USA' },
    { id: 'uk', name: 'UK' }
];

const COUNTRY_OPTIONS = [
    { code: '+91', label: 'India', iso: 'IN' },
    { code: '+1', label: 'USA', iso: 'US' },
    { code: '+44', label: 'UK', iso: 'GB' }
];

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const methods = useForm<AddressFormData>({
        resolver: zodResolver(addressFormSchema),
        defaultValues: initialData || {
            fullName: '',
            phoneNumber: '',
            countryCode: '+91',
            addressLine1: '',
            addressLine2: '',
            postcode: '',
            city: '',
            state: '',
            country: '',
            isDefault: false
        }
    });

    const handleSubmit = (data: AddressFormData) => {
        console.log('Address form data:', data);
        onSubmit(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Address</h2>

                {/* Full Name and Phone Number Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CommonTextInput
                        name="fullName"
                        label="Full Name"
                        placeholder="Enter Full Name"
                        required
                        icon={<ChevronDown className="w-5 h-5" />}
                    />

                    <PhoneInput
                        name="phoneNumber"
                        label="Phone Number"
                        placeholder="X XX XX XX XX"
                        countryOptions={COUNTRY_OPTIONS}
                        required
                    />
                </div>

                {/* Address Lines */}
                <CommonTextInput
                    name="addressLine1"
                    label="Address Line 1"
                    placeholder="House Number, Building Name"
                    required
                    icon={<ChevronDown className="w-5 h-5" />}
                />

                <CommonTextInput
                    name="addressLine2"
                    label="Address Line 2"
                    placeholder="Road Name, Area, Colony"
                    icon={<ChevronDown className="w-5 h-5" />}
                />

                {/* Postcode and City Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CommonTextInput
                        name="postcode"
                        label="Postcode"
                        placeholder="Enter Postcode"
                        required
                        icon={<ChevronDown className="w-5 h-5" />}
                    />

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            City<span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="city"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <ModalDropdown
                                    items={CITIES}
                                    selectedItem={CITIES.find(c => c.id === field.value) || null}
                                    onSelect={(item) => field.onChange(item.id)}
                                    placeholder="Select City"
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* State and Country Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            State<span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="state"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <ModalDropdown
                                    items={STATES}
                                    selectedItem={STATES.find(s => s.id === field.value) || null}
                                    onSelect={(item) => field.onChange(item.id)}
                                    placeholder="Select State"
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Country<span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="country"
                            control={methods.control}
                            render={({ field, fieldState }) => (
                                <ModalDropdown
                                    items={COUNTRIES}
                                    selectedItem={COUNTRIES.find(c => c.id === field.value) || null}
                                    onSelect={(item) => field.onChange(item.id)}
                                    placeholder="Select Country"
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Default Address Checkbox */}
                <CheckboxInput
                    name="isDefault"
                    label="Make this my default address"
                />

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        size="md"
                        fullWidth
                        onClick={onCancel}
                        className="border-orange-500 text-orange-500 hover:bg-orange-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        fullWidth
                        className="bg-orange-500 hover:bg-orange-600"
                    >
                        Save Address
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default AddressForm;
