import React, { useState } from "react";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";
import type { Option } from "@/components/ui/MultiSelectDropdown";

const MultiSelectDropdownExample = () => {
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);

  const categories: Option[] = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Books" },
    { id: "4", name: "Home & Garden" },
    { id: "5", name: "Sports" },
    { id: "6", name: "Toys" },
  ];

  const tags: Option[] = [
    { id: "1", name: "Featured" },
    { id: "2", name: "New Arrival" },
    { id: "3", name: "Best Seller" },
    { id: "4", name: "On Sale" },
    { id: "5", name: "Limited Edition" },
  ];

  const skills: Option[] = [
    { id: "1", name: "JavaScript" },
    { id: "2", name: "TypeScript" },
    { id: "3", name: "React" },
    { id: "4", name: "Node.js" },
    { id: "5", name: "Python" },
    { id: "6", name: "Java" },
    { id: "7", name: "C++" },
    { id: "8", name: "SQL" },
  ];

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Basic Multi-Select */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Multi-Select</h3>
        <MultiSelectDropdown
          label="Select Categories"
          options={categories}
          selectedValues={selectedCategories}
          onChange={setSelectedCategories}
          placeholder="Choose categories..."
          required
        />
        {selectedCategories.length > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selectedCategories.map((c) => c.name).join(", ")}
          </p>
        )}
      </div>

      {/* With Search */}
      <div>
        <h3 className="text-lg font-semibold mb-4">With Search</h3>
        <MultiSelectDropdown
          label="Select Tags"
          options={tags}
          selectedValues={selectedTags}
          onChange={setSelectedTags}
          placeholder="Choose tags..."
          searchPlaceholder="Search tags..."
          showSearch={true}
        />
      </div>

      {/* Secondary Variant */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Secondary Variant</h3>
        <MultiSelectDropdown
          label="Select Skills"
          options={skills}
          selectedValues={selectedSkills}
          onChange={setSelectedSkills}
          placeholder="Choose your skills..."
          variant="secondary"
          showSearch={true}
        />
      </div>

      {/* Without Search */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Without Search</h3>
        <MultiSelectDropdown
          label="Quick Select"
          options={categories.slice(0, 3)}
          selectedValues={[]}
          onChange={() => {}}
          placeholder="Select options..."
          showSearch={false}
        />
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">label</code>{" "}
                (required) - Label text
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">options</code>{" "}
                (required) - Array of options with id and name
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  selectedValues
                </code>{" "}
                (required) - Array of selected options
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">onChange</code>{" "}
                (required) - Change handler function
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  placeholder
                </code>{" "}
                - Placeholder text
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  searchPlaceholder
                </code>{" "}
                - Search input placeholder
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">variant</code> -
                Style variant: "primary" | "secondary"
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  showSearch
                </code>{" "}
                - Show search input (default: true)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">required</code>{" "}
                - Mark as required field
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">error</code> -
                Error message to display
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Multiple selection with checkboxes</li>
              <li>Search/filter options</li>
              <li>Selected items displayed as chips</li>
              <li>Remove individual selections</li>
              <li>Clear all button</li>
              <li>Click outside to close</li>
              <li>Keyboard navigation</li>
              <li>Two style variants</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";
import { useState } from "react";

const [selected, setSelected] = useState([]);

const options = [
  { id: "1", name: "Option 1" },
  { id: "2", name: "Option 2" },
  { id: "3", name: "Option 3" }
];

<MultiSelectDropdown
  label="Select Options"
  options={options}
  selectedValues={selected}
  onChange={setSelected}
  placeholder="Choose..."
  showSearch={true}
  required
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectDropdownExample;
