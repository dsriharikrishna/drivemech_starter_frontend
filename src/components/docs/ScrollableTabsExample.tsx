import React, { useState } from "react";
import ScrollableTabs from "@/components/ui/ScrollableTabs";

const ScrollableTabsExample = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Services", icon: <span>🔧</span> },
    { id: "engine", label: "Engine", icon: <span>⚙️</span> },
    { id: "brakes", label: "Brakes", icon: <span>🛑</span> },
    { id: "suspension", label: "Suspension", icon: <span>🔩</span> },
    { id: "electrical", label: "Electrical", icon: <span>⚡</span> },
    { id: "ac", label: "AC Service", icon: <span>❄️</span> },
    { id: "battery", label: "Battery", icon: <span>🔋</span> },
    { id: "tires", label: "Tires", icon: <span>🛞</span> },
  ];

  return (
    <div className="space-y-6">
      <ScrollableTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-700">
          Active tab: <span className="font-semibold">{activeTab}</span>
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
                <code className="bg-gray-200 px-2 py-1 rounded">tabs</code> -
                Array of tab objects
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">activeTab</code>{" "}
                - Active tab id
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  onTabChange
                </code>{" "}
                - Tab change handler
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Horizontal scrolling for many tabs</li>
              <li>Arrow navigation controls</li>
              <li>Touch/swipe support</li>
              <li>Responsive design</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import ScrollableTabs from "@/components/ui/ScrollableTabs";

<ScrollableTabs
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollableTabsExample;
