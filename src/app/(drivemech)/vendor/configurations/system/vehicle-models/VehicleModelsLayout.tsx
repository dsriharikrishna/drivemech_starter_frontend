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
import { Eye, User as UserIcon } from "phosphor-react";
import { Trash2Icon } from "lucide-react";

/* ---------------- TYPES ---------------- */

interface VehicleModel {
  id: number;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleVariant: string;
}

type Mode = "add" | "edit" | "view";
type AssignMode = "assign";

/* ---------------- VALIDATION ---------------- */

const vehicleModelSchema = z.object({
  vehicleBrand: z.string().min(1, "Vehicle brand is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  vehicleVariant: z.string().min(1, "Vehicle variant is required"),
});

type VehicleModelForm = z.infer<typeof vehicleModelSchema>;

/* ---------------- COMPONENT ---------------- */

const VehicleModelsLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number | string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("add");
  const [activeRow, setActiveRow] = useState<VehicleModel | null>(null);

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [assignRow, setAssignRow] = useState<VehicleModel | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<VehicleModel | null>(null);

  /* ---------------- FORM ---------------- */

  const methods = useForm<VehicleModelForm>({
    resolver: zodResolver(vehicleModelSchema),
    defaultValues: {
      vehicleBrand: "",
      vehicleModel: "",
      vehicleVariant: "",
    },
  });

  /* ---------------- SAMPLE DATA ---------------- */

  const vehicleModels: VehicleModel[] = [
    {
      id: 1,
      vehicleBrand: "Mahindra",
      vehicleModel: "Thar",
      vehicleVariant: "LX HARDTOP",
    },
    {
      id: 2,
      vehicleBrand: "Volkswagen",
      vehicleModel: "VIRTUS",
      vehicleVariant: "TOPLINE TSI",
    },
    {
      id: 3,
      vehicleBrand: "Mahindra",
      vehicleModel: "Scorpio",
      vehicleVariant: "N-Z4 4X4",
    },
  ];

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {
    setMode("add");
    setActiveRow(null);
    methods.reset();
    setIsModalOpen(true);
  };

  const openEdit = useCallback(
    (row: VehicleModel) => {
      setMode("edit");
      setActiveRow(row);
      methods.reset(row);
      setIsModalOpen(true);
    },
    [methods]
  );

  const openView = useCallback(
    (row: VehicleModel) => {
      setMode("view");
      setActiveRow(row);
      methods.reset(row);
      setIsModalOpen(true);
    },
    [methods]
  );

  const openAssign = useCallback((row: VehicleModel) => {
    setAssignRow(row);
    setIsAssignOpen(true);
  }, []);

  const handleDelete = useCallback((row: VehicleModel) => {
    setRowToDelete(row);
    setIsDeleteOpen(true);
  }, []);

  const confirmDelete = () => {
    if (!rowToDelete) return;

    console.log("DELETE CONFIRMED:", rowToDelete);

    // 👉 API delete call here

    setIsDeleteOpen(false);
    setRowToDelete(null);
  };

  const onSubmit = (data: VehicleModelForm) => {
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

  const columns: TableColumn<VehicleModel>[] = [
    { key: "vehicleBrand", header: "Vehicle Brand", minWidth: "200px" },
    { key: "vehicleModel", header: "Vehicle Model", minWidth: "200px" },
    { key: "vehicleVariant", header: "Vehicle Variant", minWidth: "220px" },
    {
      key: "actions",
      header: "Action",
      width: "240px",
      align: "center",
      render: (item) => (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => openAssign(item)}
            className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center"
          >
            <UserIcon size={16} />
          </button>

          <button
            onClick={() => openEdit(item)}
            className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center"
          >
            <EditIcon size={16} />
          </button>

          <button
            onClick={() => openView(item)}
            className="w-8 h-8 rounded-full bg-sky-400 text-white flex items-center justify-center"
          >
            <Eye size={16} />
          </button>

          <button
            onClick={() => handleDelete(item)}
            className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center"
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
        title="Manage Vehicle Models"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsModalOpen={openAdd}
      />

      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{
        height: "calc(100vh - 250px)"
      }}>
        <Table
          columns={columns}
          data={vehicleModels}
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
        <DialogBody className="w-full md:max-w-2xl p-2 h-auto">
          <DialogHeader
            title={
              mode === "add"
                ? "Add Vehicle Model"
                : mode === "edit"
                  ? "Edit Vehicle Model"
                  : "View Vehicle Model"
            }
            subtitle="Vehicle model details"
            onClose={() => setIsModalOpen(false)}
          />

          <FormProvider {...methods}>
            <form className="p-4 grid grid-cols-2 gap-4">
              <CommonTextInput
                name="vehicleBrand"
                label="Vehicle Brand"
                disabled={mode === "view"}
              />
              <CommonTextInput
                name="vehicleModel"
                label="Vehicle Model"
                disabled={mode === "view"}
              />
              <CommonTextInput
                name="vehicleVariant"
                label="Vehicle Variant"
                disabled={mode === "view"}
              />

              {mode !== "view" && (
                <div className="col-span-2">
                  <DialogFooter
                    leftTitle="Cancel"
                    rightTitle={mode === "edit" ? "Update" : "Save"}
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={methods.handleSubmit(onSubmit)}
                  />
                </div>
              )}
            </form>
          </FormProvider>
        </DialogBody>
      </Dialog>

      {/* ---------------- ASSIGN DIALOG ---------------- */}

      <Dialog isOpen={isAssignOpen} onClose={() => setIsAssignOpen(false)}>
        <DialogBody className="w-full md:max-w-md p-2 h-auto">
          <DialogHeader
            title="Assign Vehicle Model"
            subtitle={assignRow?.vehicleModel}
            onClose={() => setIsAssignOpen(false)}
          />

          <div className="p-4">
            <p className="text-sm text-gray-700">
              Assignment flow goes here (vendor / category / service mapping).
            </p>

            <DialogFooter
              leftTitle="Cancel"
              rightTitle="Assign"
              onCancel={() => setIsAssignOpen(false)}
              onConfirm={() => {
                console.log("ASSIGNED:", assignRow);
                setIsAssignOpen(false);
              }}
            />
          </div>
        </DialogBody>
      </Dialog>

      {/* ---------------- DELETE CONFIRMATION ---------------- */}

      <Dialog isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <DialogBody className="w-full md:max-w-md p-2 h-auto">
          <DialogHeader
            title="Delete Vehicle Model"
            subtitle="This action cannot be undone"
            onClose={() => setIsDeleteOpen(false)}
          />

          <div className="p-4 space-y-4">
            <p className="text-sm">
              Are you sure you want to delete this vehicle model?
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

export default VehicleModelsLayout;
