import React, { useState } from "react";
import LeftDrawer from "@/components/ui/LeftDrawer";
import Button from "@/components/ui/Button";
import { List, User, Settings } from "lucide-react";

const LeftDrawerExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="space-y-8">
      {/* Basic Drawer */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Left Drawer</h3>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Drawer
        </Button>

        <LeftDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Navigation Menu"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <List size={20} />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <User size={20} />
              <span>Profile</span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Settings size={20} />
              <span>Settings</span>
            </div>
          </div>
        </LeftDrawer>
      </div>

      {/* Custom Width Drawer */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Width Drawer</h3>
        <Button variant="secondary" onClick={() => setIsOpen2(true)}>
          Open Wide Drawer
        </Button>

        <LeftDrawer
          isOpen={isOpen2}
          onClose={() => setIsOpen2(false)}
          title="Wide Drawer"
          className="w-96"
        >
          <div className="p-6">
            <p className="text-gray-700">
              This drawer has a custom width of 96 (384px). You can adjust the
              width using the className prop.
            </p>
            <div className="mt-4 space-y-2">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900">Feature 1</h4>
                <p className="text-sm text-blue-700">Description here</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900">Feature 2</h4>
                <p className="text-sm text-green-700">Description here</p>
              </div>
            </div>
          </div>
        </LeftDrawer>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">isOpen</code> -
                Control drawer visibility (boolean)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">onClose</code> -
                Close handler function
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">title</code> -
                Drawer header title
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">className</code>{" "}
                - Custom width class (default: "w-80")
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">children</code>{" "}
                - Drawer content
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Slides in from left with smooth animation</li>
              <li>Backdrop overlay with blur effect</li>
              <li>Click outside or ESC to close</li>
              <li>Customizable width</li>
              <li>Scrollable content area</li>
              <li>Built with Framer Motion</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import LeftDrawer from "@/components/ui/LeftDrawer";
import { useState } from "react";

const [isOpen, setIsOpen] = useState(false);

<LeftDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Navigation"
  className="w-80"
>
  <div className="p-6">
    {/* Your content here */}
  </div>
</LeftDrawer>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftDrawerExample;
