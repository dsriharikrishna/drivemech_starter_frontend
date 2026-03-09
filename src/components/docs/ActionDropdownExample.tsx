import React from "react";
import ActionDropdown from "@/components/ui/ActionDropdown";
import { Eye, Edit, Trash, Plus, MoreHorizontal } from "lucide-react";

const ActionDropdownExample = () => {
    const actions = [
        {
            id: 1,
            label: "View Profile",
            icon: <Eye size={16} />,
            onClick: () => alert("Viewing Profile"),
        },
        {
            id: 2,
            label: "Edit Customer",
            icon: <Edit size={16} />,
            onClick: () => alert("Editing Customer"),
        },
        {
            id: 3,
            label: "Add Vehicle",
            icon: <Plus size={16} />,
            onClick: () => alert("Adding Vehicle"),
            color: "#ff5c00",
        },
        {
            id: 4,
            label: "Delete Customer",
            icon: <Trash size={16} />,
            onClick: () => alert("Deleting Customer"),
            color: "#ef4444",
        },
    ];

    return (
        <div className="space-y-6 max-w-2xl min-h-[400px]">
            <div>
                <h3 className="text-lg font-semibold mb-4">Action Dropdown</h3>
                <div className="flex justify-start">
                    <ActionDropdown
                        trigger={
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                                <MoreHorizontal size={20} className="text-gray-500" />
                            </button>
                        }
                        items={actions}
                        width={180}
                    />
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-semibold mb-4">Usage</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Component:</h4>
                        <p className="text-sm text-gray-700">
                            <code className="bg-gray-200 px-2 py-1 rounded">ActionDropdown</code> - A portal-based dropdown menu for row-level or item-level actions.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Example Code:</h4>
                        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                            {`import ActionDropdown from "@/components/ui/ActionDropdown";

const items = [
  { id: 1, label: "Edit", icon: <Edit size={16} />, onClick: () => {} },
  { id: 2, label: "Delete", color: "#ef4444", onClick: () => {} }
];

<ActionDropdown 
  trigger={<button>Actions</button>} 
  items={items} 
/>`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionDropdownExample;
