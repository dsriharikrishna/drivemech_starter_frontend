import React from "react";
import Menu from "@/components/ui/Menu";
import { Edit, Trash2, Copy, Download, Eye } from "lucide-react";

const MenuExample = () => {
  const menuItems = [
    {
      id: "view",
      label: "View Details",
      icon: <Eye size={16} />,
      onClick: () => console.log("View clicked"),
    },
    {
      id: "edit",
      label: "Edit",
      icon: <Edit size={16} />,
      onClick: () => console.log("Edit clicked"),
    },
    {
      id: "copy",
      label: "Duplicate",
      icon: <Copy size={16} />,
      onClick: () => console.log("Copy clicked"),
    },
    {
      id: "download",
      label: "Download",
      icon: <Download size={16} />,
      onClick: () => console.log("Download clicked"),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Trash2 size={16} />,
      onClick: () => console.log("Delete clicked"),
    },
  ];

  const disabledMenuItems = [
    {
      id: "edit",
      label: "Edit",
      icon: <Edit size={16} />,
      onClick: () => console.log("Edit clicked"),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Trash2 size={16} />,
      onClick: () => console.log("Delete clicked"),
      disabled: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Basic Menu */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Basic Menu (Right Aligned)
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Click the three dots →</span>
          <Menu items={menuItems} align="right" />
        </div>
      </div>

      {/* Left Aligned Menu */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Left Aligned Menu</h3>
        <div className="flex items-center gap-4">
          <Menu items={menuItems} align="left" />
          <span className="text-gray-600">← Menu opens to the left</span>
        </div>
      </div>

      {/* Custom Width Menu */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Width Menu</h3>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Wider menu →</span>
          <Menu items={menuItems} align="right" width={300} />
        </div>
      </div>

      {/* Menu with Disabled Items */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Menu with Disabled Item</h3>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Delete option is disabled →</span>
          <Menu items={disabledMenuItems} align="right" />
        </div>
      </div>

      {/* Menu in Table Row Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Menu in Table Context</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3">Item 1</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Active
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Menu items={menuItems} data={{ id: 1, name: "Item 1" }} />
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">Item 2</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Menu items={menuItems} data={{ id: 2, name: "Item 2" }} />
                </td>
              </tr>
            </tbody>
          </table>
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
                <code className="bg-gray-200 px-2 py-1 rounded">items</code>{" "}
                (required) - Array of menu options with id, label, icon, onClick
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">data</code> -
                Optional data to pass to onClick handlers
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">align</code> -
                Menu alignment: "left" | "right" (default: "right")
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">width</code> -
                Menu width in pixels (default: 240)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  sideOffset
                </code>{" "}
                - Offset from trigger (default: 8)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">zIndex</code> -
                Z-index for menu (default: 1000)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Kebab menu (three dots) trigger button</li>
              <li>Auto-positioning with flip detection</li>
              <li>Portal rendering (never clipped)</li>
              <li>Click outside to close</li>
              <li>ESC key to close</li>
              <li>Disabled item support</li>
              <li>Icon support for menu items</li>
              <li>Repositions on scroll/resize</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import Menu from "@/components/ui/Menu";
import { Edit, Trash2 } from "lucide-react";

const menuItems = [
  {
    id: "edit",
    label: "Edit",
    icon: <Edit size={16} />,
    onClick: (data) => console.log("Edit", data),
  },
  {
    id: "delete",
    label: "Delete",
    icon: <Trash2 size={16} />,
    onClick: (data) => console.log("Delete", data),
    disabled: false,
  },
];

<Menu 
  items={menuItems} 
  data={{ id: 1, name: "Item" }}
  align="right"
  width={240}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuExample;
