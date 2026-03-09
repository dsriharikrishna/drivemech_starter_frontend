import React from "react";
import Timeline, { TimelineItem } from "@/components/ui/Timeline";
import { Check, Clock, Package } from "lucide-react";

const TimelineExample = () => {
  // Basic timeline
  const basicTimeline: TimelineItem[] = [
    {
      id: 1,
      title: "Order Placed",
      description: "Your order has been successfully placed",
      date: "Jan 1, 2024",
      time: "10:00 AM",
      completed: true,
    },
    {
      id: 2,
      title: "Processing",
      description: "Order is being processed",
      date: "Jan 2, 2024",
      time: "2:00 PM",
      completed: true,
    },
    {
      id: 3,
      title: "Shipped",
      description: "Order has been shipped",
      completed: false,
    },
  ];

  // Timeline with custom icons
  const iconTimeline: TimelineItem[] = [
    {
      id: 1,
      title: "Order Confirmed",
      description: "Payment received and order confirmed",
      date: "Jan 1, 2024",
      completed: true,
      icon: <Check size={16} className="text-white" />,
    },
    {
      id: 2,
      title: "In Transit",
      description: "Package is on the way",
      date: "Jan 3, 2024",
      completed: true,
      icon: <Package size={16} className="text-white" />,
    },
    {
      id: 3,
      title: "Pending Delivery",
      description: "Estimated delivery tomorrow",
      completed: false,
      icon: <Clock size={16} className="text-gray-400" />,
    },
  ];

  // Timeline with custom content
  const customContentTimeline: TimelineItem[] = [
    {
      id: 1,
      title: "",
      completed: true,
      customContent: (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900">Custom Event</h4>
          <p className="text-sm text-blue-700 mt-1">
            You can render any custom content here
          </p>
          <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">
            View Details
          </button>
        </div>
      ),
    },
    {
      id: 2,
      title: "Standard Item",
      description: "This uses the default rendering",
      completed: false,
    },
  ];

  return (
    <div className="p-8 space-y-12">
      {/* Basic Timeline */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Basic Timeline</h3>
        <Timeline items={basicTimeline} />
      </div>

      {/* Compact Variant */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Compact Timeline</h3>
        <Timeline items={basicTimeline} variant="compact" />
      </div>

      {/* Detailed Variant */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Detailed Timeline</h3>
        <Timeline items={basicTimeline} variant="detailed" />
      </div>

      {/* With Header */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Timeline with Header</h3>
        <Timeline items={basicTimeline} showHeader headerTitle="Order Status" />
      </div>

      {/* Custom Colors */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Custom Colors</h3>
        <Timeline
          items={basicTimeline}
          completedColor="bg-blue-500"
          pendingColor="border-blue-300 bg-blue-50"
          lineColor="bg-blue-200"
        />
      </div>

      {/* With Custom Icons */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Timeline with Icons</h3>
        <Timeline items={iconTimeline} />
      </div>

      {/* With Custom Content */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Custom Content</h3>
        <Timeline items={customContentTimeline} />
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-12">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">items</code>{" "}
                (required) - Array of timeline items
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">variant</code> -
                "default" | "compact" | "detailed"
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  completedColor
                </code>{" "}
                - Tailwind class for completed items (default: "bg-green-500")
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  pendingColor
                </code>{" "}
                - Tailwind class for pending items
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">lineColor</code>{" "}
                - Tailwind class for timeline line
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  showHeader
                </code>{" "}
                - Show optional header
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  headerTitle
                </code>{" "}
                - Header text
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">TimelineItem Interface:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">id</code> -
                Optional unique identifier
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">title</code> -
                Item title
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  description
                </code>{" "}
                - Optional description
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">date</code> -
                Optional date string
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">time</code> -
                Optional time string
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">completed</code>{" "}
                - Boolean status
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">icon</code> -
                Optional custom icon (React node)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  customContent
                </code>{" "}
                - Optional custom content (React node)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import Timeline, { TimelineItem } from "@/components/ui/Timeline";

const items: TimelineItem[] = [
  {
    id: 1,
    title: "Order Placed",
    description: "Your order has been placed",
    date: "Jan 1, 2024",
    time: "10:00 AM",
    completed: true,
  },
  {
    id: 2,
    title: "Processing",
    description: "Order is being processed",
    completed: false,
  },
];

<Timeline 
  items={items}
  variant="default"
  showHeader
  headerTitle="Order Status"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineExample;
