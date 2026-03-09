import React, { useState } from "react";
import CopyClipboard from "@/components/ui/CopyClipboard";

const CopyClipboardExample = () => {
  const sampleCode = `npm install @drivemech/components`;
  const apiKey = `sk-1234567890abcdef`;
  const url = `https://api.drivemech.com/v1/services`;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Copy Command</h3>
        <CopyClipboard value={sampleCode} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Copy API Key</h3>
        <CopyClipboard value={apiKey} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Copy URL</h3>
        <CopyClipboard value={url} />
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">value</code> -
                Text to copy to clipboard
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>One-click copy to clipboard</li>
              <li>Visual feedback on copy</li>
              <li>Displays value with copy button</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import CopyClipboard from "@/components/ui/CopyClipboard";

<CopyClipboard value="npm install package" />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyClipboardExample;
