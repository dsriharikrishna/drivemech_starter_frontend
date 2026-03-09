import React from "react";
import Divider from "@/components/ui/Divider";

const DividerExample = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal Dividers</h3>
        <div className="space-y-4">
          <p>Content above</p>
          <Divider />
          <p>Content below</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Text</h3>
        <div className="space-y-4">
          <p>Section 1</p>
          <Divider text="OR" />
          <p>Section 2</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Divider</h3>
        <div className="flex items-center gap-4">
          <span>Item 1</span>
          <Divider orientation="vertical" className="h-8" />
          <span>Item 2</span>
          <Divider orientation="vertical" className="h-8" />
          <span>Item 3</span>
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
                <code className="bg-gray-200 px-2 py-1 rounded">
                  orientation
                </code>{" "}
                - "horizontal" | "vertical"
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">text</code> -
                Optional text label
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">className</code>{" "}
                - Additional CSS classes
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Horizontal and vertical orientations</li>
              <li>Optional text label</li>
              <li>Customizable styling</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import Divider from "@/components/ui/Divider";

<Divider />
<Divider text="OR" />
<Divider orientation="vertical" className="h-8" />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DividerExample;
