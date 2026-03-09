"use client";

import React from "react";
import { Check } from "lucide-react";

export type CheckoutStep = "address" | "review" | "payment";

interface CheckoutTabsProps {
  currentStep: CheckoutStep;
  completedSteps: CheckoutStep[];
  onStepClick?: (step: CheckoutStep) => void;
}

const steps: { id: CheckoutStep; label: string }[] = [
  { id: "address", label: "Address" },
  { id: "review", label: "Review" },
  { id: "payment", label: "Payment" },
];

const CheckoutTabs: React.FC<CheckoutTabsProps> = ({
  currentStep,
  completedSteps,
  onStepClick,
}) => {
  const isStepCompleted = (step: CheckoutStep) => completedSteps.includes(step);
  const isStepActive = (step: CheckoutStep) => step === currentStep;

  return (
    <div className="bg-gray-50 border-b border-gray-200 py-6 mb-6 rounded-lg w-full">
      <div className="flex items-center justify-center gap-8">
        {steps.map((step, index) => {
          const completed = isStepCompleted(step.id);
          const active = isStepActive(step.id);
          const clickable = completed || active;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => clickable && onStepClick?.(step.id)}
                disabled={!clickable}
                className={`flex items-center gap-2 ${
                  clickable ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    completed
                      ? "bg-blue-500"
                      : active
                        ? "border-2 border-blue-500 bg-white"
                        : "border-2 border-gray-300 bg-white"
                  }`}
                >
                  {completed && <Check className="w-3 h-3 text-white" />}
                  {active && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-sm font-medium ${
                    active || completed ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </button>

              {/* Separator Line */}
              {index < steps.length - 1 && (
                <div className="w-24 h-px bg-gray-300"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutTabs;
