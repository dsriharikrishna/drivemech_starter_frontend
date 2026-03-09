import React from "react";
import StatusBadge from "@/components/ui/StatusBadge";

const StatusBadgeExample = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Status Variants</h3>
        <div className="flex flex-wrap gap-4">
          <StatusBadge status="success" label="Completed" />
          <StatusBadge status="pending" label="Pending" />
          <StatusBadge status="error" label="Failed" />
          <StatusBadge status="warning" label="Warning" />
          <StatusBadge status="info" label="Information" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <StatusBadge status="success" label="Small" size="sm" />
          <StatusBadge status="success" label="Medium" size="md" />
          <StatusBadge status="success" label="Large" size="lg" />
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
                <code className="bg-gray-200 px-2 py-1 rounded">status</code> -
                Badge variant: "success" | "pending" | "error" | "warning" |
                "info"
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">label</code> -
                Badge text
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">size</code> -
                Badge size: "sm" | "md" | "lg"
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Five status variants with distinct colors</li>
              <li>Three size options</li>
              <li>Rounded pill design</li>
              <li>Semantic color coding</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import StatusBadge from "@/components/ui/StatusBadge";

<StatusBadge status="success" label="Completed" />
<StatusBadge status="pending" label="In Progress" size="lg" />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBadgeExample;
