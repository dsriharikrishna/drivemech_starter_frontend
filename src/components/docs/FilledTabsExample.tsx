import React, { useState } from "react";
import FilledTabs from "@/components/ui/FilledTabs";

const FilledTabsExample = () => {
  const [activeTab, setActiveTab] = useState("services-booked");

  const serviceTabs = [
    { id: "services-booked", label: "Services Booked" },
    { id: "customer-notes", label: "Customer Notes" },
    { id: "workshop-notes", label: "Workshop Notes" },
  ];

  const orderTabs = [
    { id: "pending", label: "Pending" },
    { id: "in-progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="p-8 space-y-12">
      {/* Services Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Service Tabs</h3>
        <FilledTabs
          tabs={serviceTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg">
          {activeTab === "services-booked" && (
            <div>
              <h4 className="font-semibold mb-2">Services Booked</h4>
              <p className="text-gray-600">List of all booked services...</p>
            </div>
          )}
          {activeTab === "customer-notes" && (
            <div>
              <h4 className="font-semibold mb-2">Customer Notes</h4>
              <p className="text-gray-600">Customer notes and comments...</p>
            </div>
          )}
          {activeTab === "workshop-notes" && (
            <div>
              <h4 className="font-semibold mb-2">Workshop Notes</h4>
              <p className="text-gray-600">Internal workshop notes...</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Status Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Order Status Tabs</h3>
        <FilledTabs tabs={orderTabs} />
      </div>

      {/* Uncontrolled Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Uncontrolled Tabs</h3>
        <FilledTabs tabs={serviceTabs} />
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
                - Currently active tab id
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
              <li>Filled background style for active tab</li>
              <li>Smooth transitions</li>
              <li>Controlled or uncontrolled mode</li>
              <li>Responsive design</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import FilledTabs from "@/components/ui/FilledTabs";

const tabs = [
  { id: "tab1", label: "Tab 1" },
  { id: "tab2", label: "Tab 2" }
];

<FilledTabs
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

export default FilledTabsExample;
