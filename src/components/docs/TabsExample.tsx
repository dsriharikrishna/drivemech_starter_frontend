import React, { useState } from "react";
import Tabs from "@/components/ui/Tabs";

const TabsExample = () => {
  const [activeTab, setActiveTab] = useState("order-details");

  const orderTabs = [
    { id: "order-details", label: "Order Details" },
    { id: "tracking-status", label: "Tracking Status" },
    { id: "customer-history", label: "Customer History" },
  ];

  const dashboardTabs = [
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics" },
    { id: "reports", label: "Reports" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="p-8 space-y-12">
      {/* Default Variant - Underline */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Tabs (Underline)</h3>
        <Tabs
          tabs={orderTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          {activeTab === "order-details" && <div>Order Details Content</div>}
          {activeTab === "tracking-status" && (
            <div>Tracking Status Content</div>
          )}
          {activeTab === "customer-history" && (
            <div>Customer History Content</div>
          )}
        </div>
      </div>

      {/* Pills Variant */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Pills Tabs</h3>
        <Tabs tabs={dashboardTabs} variant="pills" />
      </div>

      {/* Uncontrolled (Internal State) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Uncontrolled Tabs</h3>
        <Tabs tabs={orderTabs} />
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
                Array of tab objects with id and label
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">activeTab</code>{" "}
                - Currently active tab id (controlled)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  onTabChange
                </code>{" "}
                - Tab change handler function
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">variant</code> -
                Style variant: "underline" | "pills"
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Two style variants (underline and pills)</li>
              <li>Controlled or uncontrolled mode</li>
              <li>Smooth transitions</li>
              <li>Keyboard navigation</li>
              <li>Responsive design</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import Tabs from "@/components/ui/Tabs";

const tabs = [
  { id: "tab1", label: "Tab 1" },
  { id: "tab2", label: "Tab 2" }
];

<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  variant="underline"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsExample;
