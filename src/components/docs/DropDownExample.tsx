import React, { useState } from "react";
import DropDown from "@/components/ui/DropDown";

interface DropdownItem {
  id: string;
  name: string;
  description?: string;
}

const DropDownExample = () => {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  const items: DropdownItem[] = [
    { id: "1", name: "Option 1", description: "First option description" },
    { id: "2", name: "Option 2", description: "Second option description" },
    { id: "3", name: "Option 3", description: "Third option description" },
    { id: "4", name: "Option 4", description: "Fourth option description" },
  ];

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Dropdown</h3>
        <DropDown
          items={items}
          selectedItem={selectedItem}
          onSelect={setSelectedItem}
          placeholder="Choose an option..."
        />
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">
          Selected:{" "}
          <span className="font-semibold">{selectedItem?.name || "None"}</span>
        </p>
        {selectedItem?.description && (
          <p className="text-xs text-gray-500 mt-1">
            {selectedItem.description}
          </p>
        )}
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">items</code> -
                Array of dropdown items with id and name
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  selectedItem
                </code>{" "}
                - Currently selected item
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">onSelect</code>{" "}
                - Selection handler function
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  placeholder
                </code>{" "}
                - Placeholder text
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Searchable dropdown</li>
              <li>Keyboard navigation</li>
              <li>Click outside to close</li>
              <li>Optional descriptions for items</li>
              <li>Smooth animations</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import DropDown from "@/components/ui/DropDown";

const items = [
  { id: "1", name: "Option 1" },
  { id: "2", name: "Option 2" }
];

<DropDown
  items={items}
  selectedItem={selected}
  onSelect={setSelected}
  placeholder="Choose..."
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownExample;
