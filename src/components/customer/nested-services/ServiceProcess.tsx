"use client";

import React from 'react';
import { ClipboardCheck, Gauge, Search, Droplets, Sparkles } from 'lucide-react';

interface ProcessStep {
    id: string;
    stepNumber: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    bgColor: string;
}

const defaultSteps: ProcessStep[] = [
    {
        id: '1',
        stepNumber: 1,
        title: 'Initial Inspection',
        description: 'Comprehensive AC system check and diagnostic assessment',
        icon: <ClipboardCheck className="w-6 h-6" />,
        bgColor: 'bg-orange-100 text-orange-600'
    },
    {
        id: '2',
        stepNumber: 2,
        title: 'Gas Level Test',
        description: 'Measure refrigerant levels and pressure readings',
        icon: <Gauge className="w-6 h-6" />,
        bgColor: 'bg-blue-100 text-blue-600'
    },
    {
        id: '3',
        stepNumber: 3,
        title: 'Leak Check',
        description: 'Thorough inspection for any refrigerant leaks',
        icon: <Search className="w-6 h-6" />,
        bgColor: 'bg-purple-100 text-purple-600'
    },
    {
        id: '4',
        stepNumber: 4,
        title: 'Refilling & Recharge',
        description: 'Top-up refrigerant gas to optimal levels',
        icon: <Droplets className="w-6 h-6" />,
        bgColor: 'bg-cyan-100 text-cyan-600'
    },
    {
        id: '5',
        stepNumber: 5,
        title: 'Cleaning & Final Testing',
        description: 'Clean components and verify cooling performance',
        icon: <Sparkles className="w-6 h-6" />,
        bgColor: 'bg-green-100 text-green-600'
    }
];

interface ServiceProcessProps {
    steps?: ProcessStep[];
}

export default function ServiceProcess({ steps = defaultSteps }: ServiceProcessProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
                Our Service Process
            </h3>
            <p className="text-sm text-gray-600 mb-6">
                Step-by-step approach ensuring quality service delivery
            </p>

            {/* Process Steps */}
            <div className="space-y-4">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-orange-200 transition-colors"
                    >
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${step.bgColor} flex flex-col items-center justify-center`}>
                            {step.icon}
                            <span className="text-xs font-semibold mt-0.5">Step {step.stepNumber}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h4 className="text-base font-bold text-gray-900 mb-1">
                                {step.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
