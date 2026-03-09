"use client";

import React, { useCallback, useState } from "react";
import Table, { TableColumn } from "@/components/ui/Table";
import ConfigurationHeader from "@/components/vendor/configurations/system/ConfigurationHeader";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { EditIcon } from "@/components/icons/ManageWorkshopIcons";
import { Eye } from "phosphor-react";
import { Trash2Icon } from "lucide-react";

/* ---------------- TYPES ---------------- */

interface VehicleCategory {
  id: number;
  name: string;
}

type Mode = "add" | "edit" | "view";

/* ---------------- VALIDATION ---------------- */

const vehicleCategorySchema = z.object({
  name: z.string().min(1, "Vehicle category name is required"),
});

type VehicleCategoryForm = z.infer<typeof vehicleCategorySchema>;

/* ---------------- COMPONENT ---------------- */

const VehicleCategoryLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number | string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("add");
  const [activeRow, setActiveRow] = useState<VehicleCategory | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<VehicleCategory | null>(null);

  /* ---------------- FORM ---------------- */

  const methods = useForm<VehicleCategoryForm>({
    resolver: zodResolver(vehicleCategorySchema),
    defaultValues: { name: "" },
  });

  /* ---------------- SAMPLE DATA ---------------- */

  const vehicleCategories: VehicleCategory[] = [
    "HATCHBACK",
    "HOT HATCHBACK",
    "COMPACT SEDAN",
    "SEDAN",
    "EXECUTIVE SEDAN",
    "LUXURY SEDAN",
    "SALOON",
    "SUV",
    "COMPACT SUV",
  ].map((name, index) => ({
    id: index + 1,
    name,
  }));

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {
    setMode("add");
    setActiveRow(null);
    methods.reset({ name: "" });
    setIsModalOpen(true);
  };

  const openEdit = useCallback(
    (row: VehicleCategory) => {
      setMode("edit");
      setActiveRow(row);
      methods.reset({ name: row.name });
      setIsModalOpen(true);
    },
    [methods]
  );

  const openView = useCallback(
    (row: VehicleCategory) => {
      setMode("view");
      setActiveRow(row);
      methods.reset({ name: row.name });
      setIsModalOpen(true);
    },
    [methods]
  );

  const handleDelete = useCallback((row: VehicleCategory) => {
    setRowToDelete(row);
    setIsDeleteOpen(true);
  }, []);

  const confirmDelete = () => {
    if (!rowToDelete) return;

    console.log("DELETE CONFIRMED:", rowToDelete);

    // 👉 API delete call goes here

    setIsDeleteOpen(false);
    setRowToDelete(null);
  };

  const onSubmit = (data: VehicleCategoryForm) => {
    if (mode === "add") {
      console.log("CREATE:", data);
    }

    if (mode === "edit" && activeRow) {
      console.log("UPDATE:", { id: activeRow.id, ...data });
    }

    setIsModalOpen(false);
    setActiveRow(null);
    methods.reset();
  };

  /* ---------------- TABLE COLUMNS ---------------- */

  const columns: TableColumn<VehicleCategory>[] = [
    {
      key: "name",
      header: "Vehicle Category Name",
      minWidth: "300px",
    },
    {
      key: "actions",
      header: "Action",
      width: "220px",
      align: "center",
      render: (item) => (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => openEdit(item)}
            className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
          >
            <EditIcon size={16} />
          </button>

          <button
            onClick={() => openView(item)}
            className="w-8 h-8 rounded-full bg-sky-400 hover:bg-sky-500 text-white flex items-center justify-center"
          >
            <Eye size={16} />
          </button>

          <button
            onClick={() => handleDelete(item)}
            className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
          >
            <Trash2Icon size={16} />
          </button>
        </div>
      ),
    },
  ];

  /* ---------------- RENDER ---------------- */

  return (
    <div className="space-y-6">
      <ConfigurationHeader
        title="Vehicle Category Info"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsModalOpen={openAdd}
      />

      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{
        height: "calc(100vh - 250px)"
      }}>
        <Table
          columns={columns}
          data={vehicleCategories}
          keyExtractor={(row) => row.id}
          pagination
          pageSize={10}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          hoverable
          striped={false}
          className="h-full"
          style={{ height: "100%" }}
        />
      </div>

      {/* ---------------- ADD / EDIT / VIEW DIALOG ---------------- */}

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogBody className="w-full md:max-w-md h-auto p-2">
          <DialogHeader
            title={
              mode === "add"
                ? "Add Vehicle Category"
                : mode === "edit"
                  ? "Edit Vehicle Category"
                  : "View Vehicle Category"
            }
            subtitle="Vehicle category details"
            onClose={() => setIsModalOpen(false)}
          />

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="p-4 flex flex-col gap-4"
            >
              <CommonTextInput
                name="name"
                label="Vehicle Category Name"
                placeholder="Enter category name"
                required
                disabled={mode === "view"}
              />

              {mode !== "view" && (
                <DialogFooter
                  leftTitle="Cancel"
                  rightTitle={mode === "edit" ? "Update" : "Save"}
                  onCancel={() => setIsModalOpen(false)}
                  onConfirm={methods.handleSubmit(onSubmit)}
                />
              )}
            </form>
          </FormProvider>
        </DialogBody>
      </Dialog>

      {/* ---------------- DELETE CONFIRMATION DIALOG ---------------- */}

      <Dialog isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <DialogBody className="w-full md:max-w-md h-auto p-2">
          <DialogHeader
            title="Delete Vehicle Category"
            subtitle="This action cannot be undone"
            onClose={() => setIsDeleteOpen(false)}
          />

          <div className="p-4 space-y-4">
            <p className="text-sm text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{rowToDelete?.name}</span>?
            </p>

            <DialogFooter
              leftTitle="Cancel"
              rightTitle="Delete"
              onCancel={() => setIsDeleteOpen(false)}
              onConfirm={confirmDelete}
            />
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default VehicleCategoryLayout;
