import React from "react";
import Stepper from "@/components/ui/Stepper";
import { Wrench } from "lucide-react";

const StepperExample = () => {
  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Workshop Setup" },
    { number: 3, label: "Spare Parts" },
    { number: 4, label: "Towing Services" },
    { number: 5, label: "Review" },
  ];

  return (
    <div className="p-8">
      <Stepper
        steps={steps}
        currentStep={1}
        title="DriveMech Setup"
        subtitle="Step 1 of 5: Basic Info"
        icon={<Wrench size={20} />}
      />

      {/* Example with different current step */}
      <div className="mt-8">
        <Stepper
          steps={steps}
          currentStep={3}
          title="DriveMech Setup"
          subtitle="Step 3 of 5: Spare Parts"
          icon={<Wrench size={20} />}
        />
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">steps</code> -
                Array of step objects with number and label
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
                <code className="bg-gray-200 px-2 py-1 rounded">subtitle</code>{" "}
                - Stepper subtitle
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">icon</code> -
                Optional icon element
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Vertical step indicator</li>
              <li>Visual progress tracking</li>
              <li>Completed/active/pending states</li>
              <li>Customizable title and subtitle</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import Stepper from "@/components/ui/Stepper";

const steps = [
  { number: 1, label: "Step 1" },
  { number: 2, label: "Step 2" },
  { number: 3, label: "Step 3" }
];

<Stepper
  steps={steps}
  currentStep={2}
  title="Setup Process"
  subtitle="Step 2 of 3"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperExample;
