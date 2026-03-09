import React, { useState } from "react";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

const ToggleSwitchExample = () => {
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const [isEnabled3, setIsEnabled3] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Toggle</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between max-w-md">
            <span>Enable notifications</span>
            <ToggleSwitch checked={isEnabled1} onChange={setIsEnabled1} />
          </div>
          <div className="flex items-center justify-between max-w-md">
            <span>Dark mode</span>
            <ToggleSwitch checked={isEnabled2} onChange={setIsEnabled2} />
          </div>
          <div className="flex items-center justify-between max-w-md">
            <span>Auto-save</span>
            <ToggleSwitch checked={isEnabled3} onChange={setIsEnabled3} />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg max-w-md">
        <p className="text-sm text-gray-700">
          Notifications:{" "}
          <span className="font-semibold">{isEnabled1 ? "ON" : "OFF"}</span>
          <br />
          Dark mode:{" "}
          <span className="font-semibold">{isEnabled2 ? "ON" : "OFF"}</span>
          <br />
          Auto-save:{" "}
          <span className="font-semibold">{isEnabled3 ? "ON" : "OFF"}</span>
        </p>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">checked</code> -
                Toggle state (boolean)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">onChange</code>{" "}
                - Change handler function
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">disabled</code>{" "}
                - Disable toggle (optional)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Smooth slide animation</li>
              <li>Clear on/off states</li>
              <li>Accessible keyboard support</li>
              <li>Disabled state support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import ToggleSwitch from "@/components/ui/ToggleSwitch";
import { useState } from "react";

const [enabled, setEnabled] = useState(false);

<ToggleSwitch 
  checked={enabled} 
  onChange={setEnabled} 
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitchExample;
