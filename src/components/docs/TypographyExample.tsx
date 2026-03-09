import React from "react";
import Typography from "@/components/ui/Typography";

const TypographyExample = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Headings</h3>
        <div className="space-y-3">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Body Text</h3>
        <div className="space-y-3">
          <Typography variant="body">
            This is body text variant 1. It's used for regular paragraph
            content.
          </Typography>
          <Typography variant="body">
            This is body text variant 2. It's slightly smaller and used for
            secondary content.
          </Typography>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Caption & Label</h3>
        <div className="space-y-3">
          <Typography variant="caption">This is caption text</Typography>
          <Typography variant="large">This is label text</Typography>
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
                <code className="bg-gray-200 px-2 py-1 rounded">variant</code> -
                Text style variant
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">children</code>{" "}
                - Text content
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">className</code>{" "}
                - Additional CSS classes
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Predefined text styles</li>
              <li>Consistent typography across app</li>
              <li>Customizable with className</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import Typography from "@/components/ui/Typography";

<Typography variant="h1">Heading 1</Typography>
<Typography variant="body">Body text</Typography>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographyExample;
