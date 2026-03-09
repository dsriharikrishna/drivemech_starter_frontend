import React from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const LoadingSpinnerExample = () => {
  return (
    <div className="space-y-8">
      {/* Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Spinner Sizes</h3>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <LoadingSpinner size="sm" />
            <p className="text-sm text-gray-600 mt-2">Small</p>
          </div>
          <div className="text-center">
            <LoadingSpinner size="md" />
            <p className="text-sm text-gray-600 mt-2">Medium</p>
          </div>
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-sm text-gray-600 mt-2">Large</p>
          </div>
        </div>
      </div>

      {/* In Context */}
      <div>
        <h3 className="text-lg font-semibold mb-4">In Button Context</h3>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
            <LoadingSpinner size="sm" className="border-white" />
            <span>Loading...</span>
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center gap-2">
            <LoadingSpinner size="md" className="border-white" />
            <span>Processing</span>
          </button>
        </div>
      </div>

      {/* Centered in Card */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Centered in Card</h3>
        <div className="border rounded-lg p-12 bg-gray-50">
          <LoadingSpinner size="lg" />
        </div>
      </div>

      {/* Full Page Loading */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Full Page Loading Simulation
        </h3>
        <div className="relative border rounded-lg h-64 bg-white">
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">Loading content...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">size</code> -
                Spinner size: "sm" | "md" | "lg" (default: "md")
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">className</code>{" "}
                - Additional CSS classes for customization
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Three size options (small, medium, large)</li>
              <li>Smooth spinning animation</li>
              <li>Lightweight and simple</li>
              <li>Accessible with screen reader text</li>
              <li>Customizable with className</li>
              <li>Works in buttons, cards, overlays</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Basic usage
<LoadingSpinner size="md" />

// In a button
<button className="flex items-center gap-2">
  <LoadingSpinner size="sm" className="border-white" />
  <span>Loading...</span>
</button>

// Centered in container
<div className="flex items-center justify-center h-64">
  <LoadingSpinner size="lg" />
</div>

// Full page overlay
<div className="fixed inset-0 bg-white/80 flex items-center justify-center">
  <LoadingSpinner size="lg" />
</div>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinnerExample;
