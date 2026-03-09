import React from "react";
import Button from "@/components/ui/Button";

const ToastExample = () => {
  const showSuccessToast = () => {
    if (typeof window !== "undefined" && (window as any).addToast) {
      (window as any).addToast("Operation completed successfully!", "success");
    }
  };

  const showErrorToast = () => {
    if (typeof window !== "undefined" && (window as any).addToast) {
      (window as any).addToast("An error occurred. Please try again.", "error");
    }
  };

  const showWarningToast = () => {
    if (typeof window !== "undefined" && (window as any).addToast) {
      (window as any).addToast("Warning: Low storage space", "warning");
    }
  };

  const showInfoToast = () => {
    if (typeof window !== "undefined" && (window as any).addToast) {
      (window as any).addToast("New update available", "info");
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Types */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Toast Types</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="gradient" onClick={showSuccessToast}>
            Show Success Toast
          </Button>
          <Button variant="danger" onClick={showErrorToast}>
            Show Error Toast
          </Button>
          <Button variant="outline" onClick={showWarningToast}>
            Show Warning Toast
          </Button>
          <Button variant="primary-blue" onClick={showInfoToast}>
            Show Info Toast
          </Button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Click the buttons above to see different toast notifications appear in
          the top-right corner.
        </p>
      </div>

      {/* Multiple Toasts */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Queue Management</h3>
        <Button
          variant="primary"
          onClick={() => {
            if (typeof window !== "undefined" && (window as any).addToast) {
              (window as any).addToast("First notification", "info");
              setTimeout(
                () =>
                  (window as any).addToast("Second notification", "success"),
                100
              );
              setTimeout(
                () => (window as any).addToast("Third notification", "warning"),
                200
              );
            }
          }}
        >
          Show Multiple Toasts
        </Button>
        <p className="mt-2 text-sm text-gray-600">
          Toasts are queued and displayed one at a time with smooth transitions.
        </p>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Global Function:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  window.addToast(message, type)
                </code>{" "}
                - Show a toast notification
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">message</code> -
                Toast message text (string)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">type</code> -
                Toast type: "success" | "error" | "warning" | "info"
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Four toast types with distinct colors and icons</li>
              <li>Auto-dismiss after 2.5 seconds</li>
              <li>Manual dismiss with close button</li>
              <li>Queue management (one at a time)</li>
              <li>Smooth slide-in/out animations</li>
              <li>Fixed position (top-right)</li>
              <li>Accessible with ARIA roles</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Setup:</h4>
            <p className="text-sm text-gray-700 mb-2">
              Add the ToastManager component to your root layout:
            </p>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs mb-4">
              {`// app/layout.tsx
import ToastManager from "@/components/ui/Toast";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ToastManager />
      </body>
    </html>
  );
}`}
            </pre>

            <h4 className="font-semibold mb-2 mt-4">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`// Show success toast
window.addToast("Login successful!", "success");

// Show error toast
window.addToast("Invalid credentials", "error");

// Show warning toast
window.addToast("Warning: Low balance", "warning");

// Show info toast
window.addToast("New update available", "info");`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastExample;
