import React, { useState } from "react";
import Table, { TableColumn } from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogFooter from "@/components/modals/DialogFooter";
import CommonTextInput from "@/components/forms/CommonTextInput";
import ModalDropdown from "@/components/ui/DropDown";
import { FormProvider, useForm } from "react-hook-form";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}

interface UserFormData {
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const TableExample = () => {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Sample data
  const [users, setUsers] = useState<User[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ["Admin", "User", "Manager"][i % 3],
      status: (i % 3 === 0 ? "inactive" : "active") as "active" | "inactive",
      joinDate: new Date(2023, i % 12, (i % 28) + 1).toLocaleDateString(),
    }))
  );

  const roleOptions = [
    { id: "Admin", name: "Admin" },
    { id: "User", name: "User" },
    { id: "Manager", name: "Manager" },
  ];

  const statusOptions = [
    { id: "active", name: "Active" },
    { id: "inactive", name: "Inactive" },
  ];

  const addFormMethods = useForm<UserFormData>({
    defaultValues: {
      name: "",
      email: "",
      role: "User",
      status: "active",
    },
  });

  const editFormMethods = useForm<UserFormData>();

  const handleOpenAddDialog = () => {
    addFormMethods.reset({
      name: "",
      email: "",
      role: "User",
      status: "active",
    });
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (user: User) => {
    setSelectedUser(user);
    editFormMethods.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleAddUser = (data: UserFormData) => {
    const newUser: User = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      ...data,
      joinDate: new Date().toLocaleDateString(),
    };
    setUsers([newUser, ...users]);
    setIsAddDialogOpen(false);
    addFormMethods.reset();
    console.log("✅ User Added:", newUser);
  };

  const handleEditUser = (data: UserFormData) => {
    if (!selectedUser) return;

    setUsers(
      users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...data } : user
      )
    );
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    console.log("✅ User Updated:", { id: selectedUser.id, ...data });
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setIsDeleteDialogOpen(false);
    console.log("✅ User Deleted:", selectedUser);
    setSelectedUser(null);
  };

  // Define columns
  const columns: TableColumn<User>[] = [
    {
      key: "id",
      header: "ID",
      width: "80px",
      sortable: true,
      align: "center",
      resizable: true, // Enable column resize
    },
    {
      key: "name",
      header: "Name",
      width: "200px",
      sortable: true,
      resizable: true,
      render: (user) => (
        <div className="font-semibold text-gray-900">{user.name}</div>
      ),
    },
    {
      key: "email",
      header: "Email",
      flex: 1, // Use flex for flexible width
      minWidth: "250px",
      sortable: true,
      resizable: true,
    },
    {
      key: "role",
      header: "Role",
      width: "120px",
      resizable: true,
      render: (user) => (
        <span
          className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${user.role === "Admin" ? "bg-purple-100 text-purple-700" : ""}
                    ${user.role === "Manager" ? "bg-blue-100 text-blue-700" : ""}
                    ${user.role === "User" ? "bg-gray-100 text-gray-700" : ""}
                `}
        >
          {user.role}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      align: "center",
      resizable: true,
      render: (user) => (
        <span
          className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                `}
        >
          {user.status}
        </span>
      ),
    },
    {
      key: "joinDate",
      header: "Join Date",
      width: "150px",
      sortable: true,
      resizable: true,
    },
    {
      key: "actions",
      header: "Actions",
      width: "150px",
      align: "center",
      render: (user) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => handleOpenEditDialog(user)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => handleOpenDeleteDialog(user)}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 space-y-12">
      {/* Full Featured Table with CRUD */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold">
              Full Featured Table with CRUD
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              With Add, Edit, Delete dialogs, pagination, selection, sorting,
              and resizable columns
            </p>
          </div>
          <Button
            type="button"
            variant="primary-blue"
            size="sm"
            startIcon={<Plus size={16} />}
            onClick={handleOpenAddDialog}
          >
            Add User
          </Button>
        </div>
        <Table
          columns={columns}
          data={users}
          keyExtractor={(user) => user.id}
          pagination={true}
          pageSize={10}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          selectable={true}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          striped={true}
          hoverable={true}
          onSort={(key, direction) =>
            console.log(`Sort by ${key} ${direction}`)
          }
        />
        {selectedRows.size > 0 && (
          <p className="mt-4 text-sm text-gray-600">
            Selected {selectedRows.size} row(s)
          </p>
        )}
      </div>

      {/* Compact Table */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Compact Table</h3>
        <Table
          columns={columns.slice(0, 5)}
          data={users.slice(0, 5)}
          keyExtractor={(user) => user.id}
          compact
          bordered
        />
      </div>

      {/* Simple Table */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Simple Table (No Pagination)
        </h3>
        <Table
          columns={columns.slice(0, 4)}
          data={users.slice(0, 8)}
          keyExtractor={(user) => user.id}
          striped={false}
        />
      </div>

      {/* Loading State */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Loading State</h3>
        <Table
          columns={columns}
          data={[]}
          keyExtractor={(user) => user.id}
          loading
        />
      </div>

      {/* Empty State */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Empty State</h3>
        <Table
          columns={columns}
          data={[]}
          keyExtractor={(user) => user.id}
          emptyMessage="No users found. Add your first user to get started."
        />
      </div>

      {/* Add User Dialog */}
      <Dialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      >
        <DialogBody className="w-md lg:w-3xl h-auto p-6">
          <DialogHeader
            title="Add New User"
            subtitle="Enter the user details"
            onClose={() => setIsAddDialogOpen(false)}
          />

          <FormProvider {...addFormMethods}>
            <form
              onSubmit={addFormMethods.handleSubmit(handleAddUser)}
              className="space-y-4 py-4"
            >
              <CommonTextInput
                name="name"
                label="Name"
                placeholder="Enter user name"
                required
              />

              <CommonTextInput
                name="email"
                label="Email"
                placeholder="Enter email address"
                type="email"
                required
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <ModalDropdown
                  items={roleOptions}
                  selectedItem={
                    roleOptions.find(
                      (opt) => opt.id === addFormMethods.watch("role")
                    ) || roleOptions[1]
                  }
                  onSelect={(item) => addFormMethods.setValue("role", item.id)}
                  placeholder="Select role"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <ModalDropdown
                  items={statusOptions}
                  selectedItem={
                    statusOptions.find(
                      (opt) => opt.id === addFormMethods.watch("status")
                    ) || statusOptions[0]
                  }
                  onSelect={(item) =>
                    addFormMethods.setValue(
                      "status",
                      item.id as "active" | "inactive"
                    )
                  }
                  placeholder="Select status"
                />
              </div>

              <DialogFooter
                leftTitle="Cancel"
                rightTitle="Add User"
                onCancel={() => setIsAddDialogOpen(false)}
                onConfirm={addFormMethods.handleSubmit(handleAddUser)}
              />
            </form>
          </FormProvider>
        </DialogBody>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <DialogBody className="w-md lg:w-3xl h-auto p-6">
          <DialogHeader
            title="Edit User"
            subtitle="Update the user details"
            onClose={() => setIsEditDialogOpen(false)}
          />

          <FormProvider {...editFormMethods}>
            <form
              onSubmit={editFormMethods.handleSubmit(handleEditUser)}
              className="space-y-4 py-4"
            >
              <CommonTextInput
                name="name"
                label="Name"
                placeholder="Enter user name"
                required
              />

              <CommonTextInput
                name="email"
                label="Email"
                placeholder="Enter email address"
                type="email"
                required
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <ModalDropdown
                  items={roleOptions}
                  selectedItem={
                    roleOptions.find(
                      (opt) => opt.id === editFormMethods.watch("role")
                    ) || roleOptions[1]
                  }
                  onSelect={(item) => editFormMethods.setValue("role", item.id)}
                  placeholder="Select role"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <ModalDropdown
                  items={statusOptions}
                  selectedItem={
                    statusOptions.find(
                      (opt) => opt.id === editFormMethods.watch("status")
                    ) || statusOptions[0]
                  }
                  onSelect={(item) =>
                    editFormMethods.setValue(
                      "status",
                      item.id as "active" | "inactive"
                    )
                  }
                  placeholder="Select status"
                />
              </div>

              <DialogFooter
                leftTitle="Cancel"
                rightTitle="Update User"
                onCancel={() => setIsEditDialogOpen(false)}
                onConfirm={editFormMethods.handleSubmit(handleEditUser)}
              />
            </form>
          </FormProvider>
        </DialogBody>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogBody className="w-full sm:w-sm md:w-md lg:w-2xl h-auto p-6">
          <DialogHeader
            title="Delete User"
            subtitle="Are you sure you want to delete this user?"
            onClose={() => setIsDeleteDialogOpen(false)}
          />

          <div className="py-4">
            <p className="text-gray-700 mb-4">
              You are about to delete the following user:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Name:</span>{" "}
                {selectedUser?.name}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Email:</span>{" "}
                {selectedUser?.email}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Role:</span>{" "}
                {selectedUser?.role}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedUser?.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedUser?.status}
                </span>
              </p>
            </div>
            <p className="text-red-600 text-sm mt-4 font-medium">
              This action cannot be undone.
            </p>
          </div>

          <DialogFooter
            leftTitle="Cancel"
            rightTitle="Delete"
            onCancel={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDeleteUser}
          />
        </DialogBody>
      </Dialog>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-6 rounded-lg mt-12">
        <h3 className="text-xl font-semibold mb-4">Usage</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">columns</code>{" "}
                (required) - Array of column definitions with key, header,
                render, etc.
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">data</code>{" "}
                (required) - Array of data objects to display
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  keyExtractor
                </code>{" "}
                (required) - Function to extract unique key from each row
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  pagination
                </code>{" "}
                - Enable pagination (boolean)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">pageSize</code>{" "}
                - Number of rows per page
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  currentPage
                </code>{" "}
                - Current page number
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  onPageChange
                </code>{" "}
                - Page change handler
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  selectable
                </code>{" "}
                - Enable row selection
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  selectedRows
                </code>{" "}
                - Set of selected row keys
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  onSelectionChange
                </code>{" "}
                - Selection change handler
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">striped</code> -
                Alternate row colors
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">hoverable</code>{" "}
                - Highlight row on hover
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">bordered</code>{" "}
                - Add borders
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">compact</code> -
                Reduce padding
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">loading</code> -
                Show loading state
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">
                  emptyMessage
                </code>{" "}
                - Custom empty state message
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">onSort</code> -
                Sort handler function
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Column Props:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">resizable</code>{" "}
                - Enable drag-to-resize for the column
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">flex</code> -
                Use flexbox for flexible width (e.g., flex: 1)
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">width</code> -
                Fixed width (e.g., "200px")
              </li>
              <li>
                <code className="bg-gray-200 px-2 py-1 rounded">minWidth</code>{" "}
                - Minimum width constraint
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Pagination with customizable page size</li>
              <li>Row selection (single or multiple)</li>
              <li>Sortable columns</li>
              <li>Resizable columns (drag column borders)</li>
              <li>Flexible column widths with flex property</li>
              <li>Custom cell rendering</li>
              <li>Loading and empty states</li>
              <li>Striped and hoverable rows</li>
              <li>Responsive design</li>
              <li>CRUD operations with dialogs (Add, Edit, Delete)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Code:</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
              {`import Table, { TableColumn } from "@/components/ui/Table";

const columns: TableColumn<User>[] = [
  {
    key: "name",
    header: "Name",
    width: "200px",
    sortable: true,
    resizable: true, // Enable column resize
    render: (user) => <div className="font-semibold">{user.name}</div>
  },
  {
    key: "email",
    header: "Email",
    flex: 1, // Flexible width
    minWidth: "250px",
    resizable: true
  }
];

<Table
  columns={columns}
  data={users}
  keyExtractor={(user) => user.id}
  pagination={true}
  pageSize={10}
  selectable={true}
  striped={true}
  hoverable={true}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableExample;
