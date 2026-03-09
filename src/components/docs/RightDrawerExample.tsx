import React, { useState } from "react";
import RightDrawer from "@/components/ui/RightDrawer";
import Button from "@/components/ui/Button";
import { ShoppingCart, Bell, FileText } from "lucide-react";

const RightDrawerExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="space-y-8">
      {/* Basic Drawer */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Right Drawer</h3>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Cart
        </Button>

        <RightDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Shopping Cart"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 border-b">
              <ShoppingCart size={20} />
              <div>
                <p className="font-semibold">Product 1</p>
                <p className="text-sm text-gray-600">$29.99</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border-b">
              <ShoppingCart size={20} />
              <div>
                <p className="font-semibold">Product 2</p>
                <p className="text-sm text-gray-600">$49.99</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>$79.98</span>
              </div>
            </div>
          </div>
        </RightDrawer>
      </div>

      {/* Notifications Drawer */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Notifications Drawer</h3>
        <Button variant="secondary" onClick={() => setIsOpen2(true)}>
          View Notifications
        </Button>

        <RightDrawer
          isOpen={isOpen2}
          onClose={() => setIsOpen2(false)}
          title="Notifications"
          className="w-96"
        >
          <div className="p-6 space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg flex gap-3">
              <Bell size={20} className="text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">New Order</p>
                <p className="text-xs text-gray-600">
                  You have a new order #1234
                </p>
                <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg flex gap-3">
              <FileText size={20} className="text-green-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Report Ready</p>
                <p className="text-xs text-gray-600">
                  Your monthly report is ready
                </p>
                <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
              </div>
            </div>
          </div>
        </RightDrawer>
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
              <li>Slides in from right with smooth animation</li>
              <li>Backdrop overlay with blur effect</li>
              <li>Click outside or ESC to close</li>
              <li>Customizable width</li>
              <li>Scrollable content area</li>
              <li>Perfect for carts, notifications, filters</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import RightDrawer from "@/components/ui/RightDrawer";
import { useState } from "react";

const [isOpen, setIsOpen] = useState(false);

<RightDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Shopping Cart"
  className="w-96"
>
  <div className="p-6">
    {/* Your content here */}
  </div>
</RightDrawer>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightDrawerExample;
