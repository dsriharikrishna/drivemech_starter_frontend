import React from "react";
import Button from "@/components/ui/Button";
import { Download, Plus } from "lucide-react";

const ButtonExample = () => {
  return (
    <div className="space-y-8">
      {/* Primary Buttons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Primary Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="sm">
            Small Primary
          </Button>
          <Button variant="primary" size="md">
            Medium Primary
          </Button>
          <Button variant="primary" size="lg">
            Large Primary
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </div>

      {/* Secondary Buttons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Secondary Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary" size="sm">
            Small Secondary
          </Button>
          <Button variant="secondary" size="md">
            Medium Secondary
          </Button>
          <Button variant="secondary" size="lg">
            Large Secondary
          </Button>
        </div>
      </div>

      {/* Gradient Buttons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Gradient Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="gradient" size="sm">
            Small Gradient
          </Button>
          <Button variant="gradient" size="md">
            Medium Gradient
          </Button>
          <Button variant="gradient" size="lg">
            Large Gradient
          </Button>
        </div>
      </div>

      {/* Outline Buttons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Outline Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" size="sm">
            Small Outline
          </Button>
          <Button variant="outline" size="md">
            Medium Outline
          </Button>
          <Button variant="outline" size="lg">
            Large Outline
          </Button>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Ghost Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="ghost" size="sm">
            Small Ghost
          </Button>
          <Button variant="ghost" size="md">
            Medium Ghost
          </Button>
          <Button variant="ghost" size="lg">
            Large Ghost
          </Button>
        </div>
      </div>

      {/* Danger Buttons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Danger Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="danger" size="sm">
            Small Danger
          </Button>
          <Button variant="danger" size="md">
            Medium Danger
          </Button>
          <Button variant="danger" size="lg">
            Large Danger
          </Button>
        </div>
      </div>

      {/* With Icons */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Buttons with Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" startIcon={<Plus size={16} />}>
            Add Item
          </Button>
          <Button variant="outline" endIcon={<Download size={16} />}>
            Download
          </Button>
          <Button
            variant="gradient"
            startIcon={<Plus size={16} />}
            endIcon={<Download size={16} />}
          >
            Both Icons
          </Button>
        </div>
      </div>

      {/* Full Width */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Full Width Button</h3>
        <Button variant="primary" fullWidth>
          Full Width Button
        </Button>
      </div>

      {/* Different Rounded Styles */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Border Radius Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" rounded="sm">
            Small Radius
          </Button>
          <Button variant="primary" rounded="md">
            Medium Radius
          </Button>
          <Button variant="primary" rounded="lg">
            Large Radius
          </Button>
          <Button variant="primary" rounded="full">
            Full Radius
          </Button>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">variant</code> -
                Button style: "primary" | "secondary" | "gradient" | "outline" |
                "ghost" | "danger" | "primary-blue"
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">size</code> -
                Button size: "sm" | "md" | "lg"
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">rounded</code> -
                Border radius: "sm" | "md" | "lg" | "full"
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">startIcon</code>{" "}
                - Icon element to display before text
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">endIcon</code> -
                Icon element to display after text
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">fullWidth</code>{" "}
                - Make button full width
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">disabled</code>{" "}
                - Disable button interaction
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">type</code> -
                HTML button type: "button" | "submit" | "reset"
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">onClick</code> -
                Click handler function
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                Multiple style variants (primary, secondary, gradient, outline,
                ghost, danger)
              </li>
              <li>Three size options (small, medium, large)</li>
              <li>Icon support (start and end positions)</li>
              <li>Customizable border radius</li>
              <li>Full width option</li>
              <li>Disabled state with visual feedback</li>
              <li>Hover and active states</li>
              <li>Accessible with proper ARIA attributes</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
              {`import Button from "@/components/ui/Button";
import { Plus, Download } from "lucide-react";

// Basic button
<Button variant="primary" size="md">
  Click Me
</Button>

// With icon
<Button 
  variant="primary" 
  startIcon={<Plus size={16} />}
  onClick={() => console.log("Clicked")}
>
  Add Item
</Button>

// Full width
<Button variant="gradient" fullWidth>
  Submit Form
</Button>

// Disabled
<Button variant="danger" disabled>
  Delete
</Button>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonExample;
