import React from "react";
import HorizontalStepper from "@/components/ui/HorizontalStepper";

const HorizontalStepperExample = () => {
  const steps = [
    { label: "Basic Info" },
    { label: "Workshop Details" },
    { label: "Documents" },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Step 1 - Basic Info */}
      <HorizontalStepper
        steps={steps}
        currentStep={1}
        title="Workshop Details"
        icon="🏪"
      />

      {/* Step 2 - Workshop Details */}
      <HorizontalStepper
        steps={steps}
        currentStep={2}
        title="Workshop Details"
        icon="🏪"
      />

      {/* Step 3 - Documents (All completed) */}
      <HorizontalStepper
        steps={steps}
        currentStep={3}
        title="Workshop Details"
        icon="🏪"
      />

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">steps</code> -
                Array of step objects with label
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  currentStep
                </code>{" "}
                - Current active step number
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">title</code> -
                Stepper title
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">icon</code> -
                Optional icon
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Horizontal step indicator</li>
              <li>Progress line between steps</li>
              <li>Completed/active/pending states</li>
              <li>Responsive design</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import HorizontalStepper from "@/components/ui/HorizontalStepper";

const steps = [
  { label: "Basic Info" },
  { label: "Details" },
  { label: "Review" }
];

<HorizontalStepper
  steps={steps}
  currentStep={2}
  title="Setup"
  icon="🚀"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalStepperExample;
