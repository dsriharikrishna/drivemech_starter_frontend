import React from "react";
import Tooltip from "@/components/ui/Tooltip";

const TooltipExample = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tooltip Positions</h3>
        <div className="flex flex-wrap gap-8">
          <Tooltip label="Tooltip on top" placement="top">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Top
            </button>
          </Tooltip>
          <Tooltip label="Tooltip on bottom" placement="bottom">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Bottom
            </button>
          </Tooltip>
          <Tooltip label="Tooltip on left" placement="left">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Left
            </button>
          </Tooltip>
          <Tooltip label="Tooltip on right" placement="right">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Right
            </button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Hover to See Tooltip</h3>
        <div className="text-gray-600">
          Hover over the{" "}
          <Tooltip label="This is helpful information!">
            <span className="text-blue-600 underline cursor-help">
              highlighted text
            </span>
          </Tooltip>{" "}
          to see more details.
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
                <code className="bg-gray-200 px-2 py-1 rounded">content</code> -
                Tooltip text content
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">position</code>{" "}
                - Position: "top" | "bottom" | "left" | "right"
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">children</code>{" "}
                - Element to trigger tooltip
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Four position options</li>
              <li>Hover to show/hide</li>
              <li>Smooth fade animations</li>
              <li>Accessible</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import Tooltip from "@/components/ui/Tooltip";

<Tooltip content="Helpful tip" position="top">
  <button>Hover me</button>
</Tooltip>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TooltipExample;
