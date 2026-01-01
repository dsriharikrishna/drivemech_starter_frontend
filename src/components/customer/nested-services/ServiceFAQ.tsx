'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface ServiceFAQProps {
    faqs?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
    {
        question: "What does AC servicing include?",
        answer: "Our AC servicing includes a comprehensive inspection, gas level check, refrigerant refilling up to standard capacity, condenser and filter cleaning, evaporator inspection, leak detection, and a final cooling performance test."
    },
    {
        question: "How long does the AC service take?",
        answer: "Typically, our AC service takes between 45 minutes to 1 hour, depending on the condition of your vehicle's AC system and any additional repairs that may be needed."
    },
    {
        question: "Is gas refilling covered under warranty?",
        answer: "Yes, gas refilling is covered under our standard warranty. If you experience any issues with the gas level within the warranty period, we'll top it up at no additional cost."
    },
    {
        question: "What if cooling is still weak after service?",
        answer: "If cooling remains weak after our service, our technicians will perform a detailed diagnostic to identify any underlying issues such as compressor problems, leaks, or electrical faults. We'll provide you with a detailed report and repair options."
    },
    {
        question: "Do I need to bring my car to a service center?",
        answer: "No, you don't have to! We offer doorstep service where our certified technicians come to your location with all necessary equipment. Alternatively, you can visit any of our service centers if you prefer."
    },
    {
        question: "What type of refrigerant gas do you use?",
        answer: "We use high-quality R134a refrigerant gas, which is the standard for most modern vehicles. For older vehicles or specific models, we use the appropriate refrigerant type as recommended by the manufacturer."
    }
];

export default function ServiceFAQ({ faqs = defaultFAQs }: ServiceFAQProps) {
    const [openIndex, setOpenIndex] = useState<number>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="bg-white rounded-lg p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-600 text-sm">
                    Find answers to common questions about our AC service
                </p>
            </div>

            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-gray-900 text-sm pr-4">
                                {faq.question}
                            </span>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180 text-orange-500' : ''
                                    }`}
                            />
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-200 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                }`}
                        >
                            <div className="px-4 pb-4 pt-0">
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
