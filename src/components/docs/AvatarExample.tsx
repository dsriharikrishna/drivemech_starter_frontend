import React from "react";
import Avatar from "@/components/ui/Avatar";

const AvatarExample = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Avatar Sizes</h3>
        <div className="flex items-center gap-6">
          <Avatar name="John Doe" size="sm" />
          <Avatar name="Jane Smith" size="md" />
          <Avatar name="Bob Wilson" size="lg" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Images</h3>
        <div className="flex items-center gap-6">
          <Avatar name="User One" src="/images/avatar1.jpg" size="md" />
          <Avatar name="User Two" src="/images/avatar2.jpg" size="md" />
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
                <code className="bg-gray-200 px-2 py-1 rounded">name</code>{" "}
                (required) - User's name for initials
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">src</code> -
                Image URL (optional)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">size</code> -
                Avatar size: "sm" | "md" | "lg"
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Displays initials when no image provided</li>
              <li>Three size options</li>
              <li>Fallback to initials if image fails</li>
              <li>Rounded design</li>
              <li>Colorful background for initials</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import Avatar from "@/components/ui/Avatar";

<Avatar name="John Doe" size="md" />
<Avatar name="Jane Smith" src="/avatar.jpg" size="lg" />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarExample;
