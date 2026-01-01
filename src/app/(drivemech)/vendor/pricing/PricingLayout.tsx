"use client";

import React from 'react';
import PricingCard from '@/components/vendor/pricing/PricingCard';
import PaymentCard from '@/components/vendor/pricing/PaymentCard';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setBillingCycle, setSelectedPlan } from '@/store/slices/pricing/pricingSlice';

// Pricing plans data
const PRICING_PLANS = [
    {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for small garages just getting started',
        price: {
            monthly: 23,
            yearly: 230,
        },
        features: [
            {
                category: 'Vehicle Management',
                items: ['Up to 50 vehicles', 'Basic service tracking', 'Vehicle history'],
            },
            {
                category: 'Customer Portal',
                items: ['Customer dashboard', 'Email notifications'],
            },
            {
                category: 'Reports & Analytics',
                items: ['Basic reports', 'Monthly summaries'],
            },
            {
                category: 'Support',
                items: ['Email support', 'Knowledge base access'],
            },
        ],
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Best for growing garages with regular clientele',
        price: {
            monthly: 63,
            yearly: 630,
        },
        isPopular: true,
        features: [
            {
                category: 'Vehicle Management',
                items: ['Up to 200 vehicles', 'Advanced service tracking', 'Service reminders', 'Part inventory'],
            },
            {
                category: 'Customer Portal',
                items: ['Custom branding', 'SMS notifications', 'Online booking'],
            },
            {
                category: 'Reports & Analytics',
                items: ['Advanced analytics', 'Custom reports', 'Revenue tracking'],
            },
            {
                category: 'Integrations',
                items: ['Accounting software', 'Payment processing', 'Priority support'],
            },
        ],
    },
    {
        id: 'business',
        name: 'Business',
        description: 'Ideal for established multi-bay operations',
        price: {
            monthly: 119,
            yearly: 1190,
        },
        features: [
            {
                category: 'Vehicle Management',
                items: ['Unlimited vehicles', 'Multi-location support', 'Advanced workflows', 'Quality control checks'],
            },
            {
                category: 'Customer Portal',
                items: ['White-label portal', 'Mobile app access', 'Loyalty programs'],
            },
            {
                category: 'Reports & Analytics',
                items: ['Real-time dashboards', 'Predictive analytics', 'Team performance tracking'],
            },
            {
                category: 'Integrations',
                items: ['API access', 'Custom integrations', 'SSO authentication', 'Dedicated support'],
            },
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'Custom solution for large garage networks',
        price: {
            monthly: 239,
            yearly: 2390,
        },
        features: [
            {
                category: 'Vehicle Management',
                items: ['Unlimited vehicles', 'Multi-franchise support', 'Custom workflows', 'Advanced automation'],
            },
            {
                category: 'Customer Portal',
                items: ['Full customization', 'Multi-brand support', 'Advanced CRM'],
            },
            {
                category: 'Reports & Analytics',
                items: ['Enterprise reporting', 'AI-powered insights', 'Custom dashboards', 'Data exports'],
            },
            {
                category: 'Enterprise Features',
                items: ['Dedicated account manager', 'SLA guarantee', 'Custom development', 'On-premise option'],
            },
        ],
    },
];

const PricingLayout = () => {
    const dispatch = useAppDispatch();
    const { billingCycle, selectedPlanId } = useAppSelector((state) => state.pricing);

    const handleBillingCycleChange = (cycle: 'monthly' | 'yearly') => {
        dispatch(setBillingCycle(cycle));
    };

    const handleSelectPlan = (planId: string) => {
        dispatch(setSelectedPlan(planId));
    };

    const handleProceedToPayment = () => {
        console.log('Proceeding to payment for plan:', selectedPlanId);
        // TODO: Navigate to payment page
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Plan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Streamline your garage operations with our comprehensive management software. Scale as you grow.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => handleBillingCycleChange('monthly')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${billingCycle === 'monthly'
                                ? 'bg-gray-200 text-gray-900'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => handleBillingCycleChange('yearly')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${billingCycle === 'yearly'
                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Yearly
                        </button>
                    </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 gap-4">
                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {PRICING_PLANS.map((plan) => (
                            <PricingCard
                                key={plan.id}
                                plan={plan}
                                billingCycle={billingCycle}
                                isSelected={selectedPlanId === plan.id}
                                onSelect={handleSelectPlan}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="flex items-center justify-center">
                    <PaymentCard onProceed={handleProceedToPayment} />
                </div>

            </div>
        </div>
    );
};

export default PricingLayout;
