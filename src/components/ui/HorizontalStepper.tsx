"use client";

import React from "react";
import { Check } from "lucide-react";

interface HorizontalStep {
  label: string;
  isCompleted?: boolean;
}

interface HorizontalStepperProps {
  steps: HorizontalStep[];
  currentStep: number;
  title?: string;
  icon?: React.ReactNode;
  onStepClick?: (stepNumber: number) => void;
  variant?: "default" | "toggle";
}

const HorizontalStepper: React.FC<HorizontalStepperProps> = ({
  steps,
  currentStep,
  title,
  icon,
  onStepClick,
  variant = "default",
}) => {
  return (
    <div>
      {/* Title - Optional */}
      {title && (
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
      )}

      {/* Steps */}
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep || step.isCompleted;

          return (
            <React.Fragment key={index}>
              {/* Step Item */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  onClick={() => onStepClick?.(stepNumber)}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    transition-all duration-300 mb-2 border-2
                    ${onStepClick ? "cursor-pointer" : ""}
                    ${
                      isActive
                        ? "bg-green-500 text-white border-green-500"
                        : isCompleted
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white text-gray-400 border-gray-300"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <span className="text-xs font-semibold">{stepNumber}</span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`
                    text-xs font-medium whitespace-nowrap
                    ${isActive ? "text-gray-900" : "text-gray-500"}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    h-0.5 w-32 mx-4 mb-8
                    transition-all duration-300
                    ${stepNumber < currentStep ? "bg-green-500" : "bg-gray-200"}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalStepper;
