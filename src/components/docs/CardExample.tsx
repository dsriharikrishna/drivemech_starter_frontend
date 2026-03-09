import React from "react";
import CustomCard from "../ui/CustomCard";

const CardExample = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CustomCard>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Basic Card</h3>
        <p className="text-sm text-gray-600">
          This is a simple card with title and description
        </p>
      </CustomCard>

      <CustomCard>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Card with Footer
        </h3>
        <p className="text-sm text-gray-600 mb-3">Card with custom footer</p>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Learn More
          </button>
        </div>
      </CustomCard>

      <CustomCard className="cursor-pointer hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Clickable Card
        </h3>
        <p className="text-sm text-gray-600">
          This card is clickable - click anywhere on this card
        </p>
      </CustomCard>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8 col-span-full">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">children</code>{" "}
                - Card content
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
              <li>Clean, minimal design</li>
              <li>Shadow and border styling</li>
              <li>Flexible content support</li>
              <li>Hover effects (optional)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import CustomCard from "@/components/ui/CustomCard";

<CustomCard>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</CustomCard>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardExample;
