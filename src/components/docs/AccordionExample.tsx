"use client";

import React, { useState } from "react";
import Accordion from "@/components/ui/Accordion";
import {
  Building2,
  MapPin,
  Phone,
  Package,
  Settings,
  User,
} from "lucide-react";

const AccordionExample = () => {
  const [expanded1, setExpanded1] = useState(true);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  const [expanded5, setExpanded5] = useState(false);
  const [expanded6, setExpanded6] = useState(false);

  return (
    <div className="space-y-8">
      {/* Default Dark Theme */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Dark Theme</h3>
        <div className="space-y-4">
          <Accordion
            title="Business Information"
            icon={<Building2 size={20} />}
            isExpanded={expanded1}
            onToggle={() => setExpanded1(!expanded1)}
          >
            <div className="space-y-2">
              <p className="text-gray-700">
                This is the default accordion with dark gray header
                (bg-gray-800).
              </p>
              <p className="text-gray-600">
                Perfect for professional business applications and forms.
              </p>
            </div>
          </Accordion>
        </div>
      </div>

      {/* Custom Header Colors */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Header Colors</h3>
        <div className="space-y-4">
          <Accordion
            title="Blue Header"
            icon={<MapPin size={20} />}
            isExpanded={expanded2}
            onToggle={() => setExpanded2(!expanded2)}
            headerClassName="bg-blue-600 text-white hover:bg-blue-700"
          >
            <div className="space-y-2">
              <p className="text-gray-700">
                Custom blue header using headerClassName prop.
              </p>
              <p className="text-gray-600">
                Great for information sections or primary content areas.
              </p>
            </div>
          </Accordion>

          <Accordion
            title="Green Header"
            icon={<Package size={20} />}
            isExpanded={expanded3}
            onToggle={() => setExpanded3(!expanded3)}
            headerClassName="bg-green-600 text-white hover:bg-green-700"
          >
            <div className="space-y-2">
              <p className="text-gray-700">
                Custom green header for success or completed states.
              </p>
              <p className="text-gray-600">
                Ideal for completed tasks or positive status indicators.
              </p>
            </div>
          </Accordion>

          <Accordion
            title="Orange Header"
            icon={<Settings size={20} />}
            isExpanded={expanded4}
            onToggle={() => setExpanded4(!expanded4)}
            headerClassName="bg-orange-600 text-white hover:bg-orange-700"
          >
            <div className="space-y-2">
              <p className="text-gray-700">
                Custom orange header for warnings or pending items.
              </p>
              <p className="text-gray-600">
                Perfect for attention-grabbing sections or alerts.
              </p>
            </div>
          </Accordion>

          <Accordion
            title="Purple Header"
            icon={<User size={20} />}
            isExpanded={expanded5}
            onToggle={() => setExpanded5(!expanded5)}
            headerClassName="bg-purple-600 text-white hover:bg-purple-700"
          >
            <div className="space-y-2">
              <p className="text-gray-700">
                Custom purple header for special or premium sections.
              </p>
              <p className="text-gray-600">
                Great for highlighting premium features or special content.
              </p>
            </div>
          </Accordion>
        </div>
      </div>

      {/* With Custom Container Styling */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Container Styling</h3>
        <div className="space-y-4">
          <Accordion
            title="Custom Border"
            icon={<Phone size={20} />}
            isExpanded={expanded6}
            onToggle={() => setExpanded6(!expanded6)}
            className="border-2 border-indigo-500"
            headerClassName="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <div className="space-y-2">
              <p className="text-gray-700">
                This accordion has both custom header color and container
                border.
              </p>
              <p className="text-gray-600">
                Use className prop to customize the container styling.
              </p>
            </div>
          </Accordion>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">title</code> -
                Accordion header title (string)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">icon</code> -
                Icon element to display in header (React.ReactNode)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  isExpanded
                </code>{" "}
                - Control expanded state (boolean)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">onToggle</code>{" "}
                - Toggle handler function
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">children</code>{" "}
                - Content to display when expanded
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">className</code>{" "}
                - Optional custom classes for container
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  headerClassName
                </code>{" "}
                - Optional custom classes for header (overrides default dark
                theme)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Smooth expand/collapse animation</li>
              <li>Icon support with customizable icons</li>
              <li>Default dark theme header (bg-gray-800)</li>
              <li>Customizable header colors via headerClassName</li>
              <li>Customizable container styling via className</li>
              <li>Automatic chevron icon rotation</li>
              <li>Cursor pointer on hover</li>
              <li>Fully accessible with proper button semantics</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
              {`import Accordion from "@/components/ui/Accordion";
import { Building2 } from "lucide-react";
import { useState } from "react";

// Default dark theme
const [expanded, setExpanded] = useState(true);

<Accordion
  title="Business Information"
  icon={<Building2 size={20} />}
  isExpanded={expanded}
  onToggle={() => setExpanded(!expanded)}
>
  <div>Your content here</div>
</Accordion>

// Custom blue header
<Accordion
  title="Contact Details"
  icon={<Phone size={20} />}
  isExpanded={expanded}
  onToggle={() => setExpanded(!expanded)}
  headerClassName="bg-blue-600 text-white hover:bg-blue-700"
>
  <div>Your content here</div>
</Accordion>

// Custom container and header
<Accordion
  title="Special Section"
  icon={<Star size={20} />}
  isExpanded={expanded}
  onToggle={() => setExpanded(!expanded)}
  className="border-2 border-purple-500"
  headerClassName="bg-purple-600 text-white hover:bg-purple-700"
>
  <div>Your content here</div>
</Accordion>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionExample;
