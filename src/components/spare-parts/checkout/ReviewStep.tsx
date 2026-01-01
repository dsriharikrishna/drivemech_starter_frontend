'use client';

import React from 'react';
import { AddressFormData } from '@/schemas/checkout.schema';
import Button from '@/components/ui/Button';
import ShoppingCart from './ShoppingCart';

interface ReviewStepProps {
    addressData: AddressFormData;
    onEdit: () => void;
    onContinue: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ addressData, onEdit, onContinue }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Delivery Address</h2>

            {/* Address Card */}
            <div className="p-5 rounded-2xl border-2 border-blue-500 bg-blue-50">
                <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">Delivery Address</h3>
                    {addressData.isDefault && (
                        <span className="px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full">
                            Default
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-800 font-medium mb-2">
                    {addressData.fullName}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mb-1">
                    {addressData.addressLine1}
                    {addressData.addressLine2 && `, ${addressData.addressLine2}`}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                    {addressData.city} - {addressData.postcode}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                    {addressData.state}, {addressData.country}
                </p>
                <p className="text-sm text-gray-600">
                    Phone: {addressData.countryCode} {addressData.phoneNumber}
                </p>
            </div>

            <ShoppingCart />

            {/* Action Buttons */}
            <div className="pt-4 flex gap-4">
                <Button
                    type="button"
                    variant="outline"
                    size="md"
                    fullWidth
                    onClick={onEdit}
                    className="border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                    Back to Edit
                </Button>
                <Button
                    type="button"
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={onContinue}
                    className="bg-orange-500 hover:bg-orange-600"
                >
                    Continue to Payment
                </Button>
            </div>
        </div>
    );
};

export default ReviewStep;
