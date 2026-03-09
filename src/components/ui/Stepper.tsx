"use client";

import React from "react";

interface Step {
  number: number;
  label: string;
  isCompleted?: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  title = "DriveMech Setup",
  subtitle = "Step 1 of 5: Basic Info",
  icon,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-4">
        {icon && (
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>

      {/* Progress Bar with Steps */}
      <div className="relative">
        {/* Background Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200"></div>

        {/* Active Progress Line */}
        <div
          className="absolute top-0 left-0 h-1 bg-orange-500 transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {/* Steps */}
        <div className="relative flex">
          {steps.map((step) => {
            const isActive = step.number === currentStep;
            const isCompleted = step.number < currentStep || step.isCompleted;

            return (
              <div key={step.number} className="flex-1 relative">
                {/* Active Step Indicator */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500"></div>
                )}

                {/* Step Label */}
                <div className="px-4 py-3 text-center">
                  <span
                    className={`
                                            text-sm font-medium
                                            ${isActive ? "text-orange-500" : isCompleted ? "text-gray-700" : "text-gray-500"}
                                        `}
                  >
                    {step.number}. {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
