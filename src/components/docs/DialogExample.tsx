import React, { useState } from "react";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";

const DialogExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6 ">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Open Dialog
      </button>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogBody className="max-w-md h-auto p-6">
          <DialogHeader
            title="Example Dialog"
            subtitle="This is a subtitle for the dialog"
            onClose={() => setIsOpen(false)}
          />

          <div className="py-4">
            <p className="text-gray-700">
              This is an example dialog component. You can put any content here.
              The dialog includes a header with a close button, a body section
              for content, and a footer with action buttons.
            </p>
          </div>

          <DialogFooter
            leftTitle="Cancel"
            rightTitle="Confirm"
            onCancel={() => setIsOpen(false)}
            onConfirm={() => {
              // Handle confirm action
              console.log("Confirmed!");
              setIsOpen(false);
            }}
          />
        </DialogBody>
      </Dialog>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Components:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">Dialog</code> -
                Main dialog wrapper with backdrop
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  DialogBody
                </code>{" "}
                - Content container with styling
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  DialogHeader
                </code>{" "}
                - Header with title, subtitle, and close button
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  DialogFooter
                </code>{" "}
                - Footer with action buttons
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">isOpen</code> -
                Control dialog visibility (boolean)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">onClose</code> -
                Close handler function
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">title</code> -
                Dialog header title
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">subtitle</code>{" "}
                - Optional subtitle text
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">leftTitle</code>{" "}
                - Left button text (default: "Cancel")
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  rightTitle
                </code>{" "}
                - Right button text (default: "Save")
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Modal overlay with backdrop blur</li>
              <li>ESC key to close</li>
              <li>Click outside to close</li>
              <li>Customizable header and footer</li>
              <li>Responsive sizing</li>
              <li>Prevents background scrolling</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogFooter from "@/components/modals/DialogFooter";

const [isOpen, setIsOpen] = useState(false);

<Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <DialogBody className="w-md lg:w-3xl h-auto p-6">
    <DialogHeader
      title="Dialog Title"
      subtitle="Optional subtitle"
      onClose={() => setIsOpen(false)}
    />
    
    <div className="py-4">
      {/* Your content here */}
    </div>
    
    <DialogFooter
      leftTitle="Cancel"
      rightTitle="Confirm"
      onCancel={() => setIsOpen(false)}
      onConfirm={() => handleConfirm()}
    />
  </DialogBody>
</Dialog>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogExample;
