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
import { Trash2Icon } from "lucide-react";

/* ---------------- TYPES ---------------- */

interface VehicleChecklist {
  id: number;
  checklist: string;
  vehicleCategory: string;
  noOfItems: number;
  amount: number;
}

type Mode = "add" | "edit" | "view";

/* ---------------- VALIDATION ---------------- */

const vehicleChecklistSchema = z.object({
  checklist: z.string().min(1, "Checklist name is required"),
  vehicleCategory: z.string().min(1, "Vehicle category is required"),
  noOfItems: z.number().min(1, "No of items is required"),
  amount: z.number().min(0, "Amount must be 0 or more"),
});

type VehicleChecklistForm = z.infer<typeof vehicleChecklistSchema>;

/* ---------------- COMPONENT ---------------- */

const VehicleCheckListLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number | string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("add");
  const [activeRow, setActiveRow] = useState<VehicleChecklist | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<VehicleChecklist | null>(null);

  /* ---------------- FORM ---------------- */

  const methods = useForm<VehicleChecklistForm>({
    resolver: zodResolver(vehicleChecklistSchema),
    defaultValues: {
      checklist: "",
      vehicleCategory: "",
      noOfItems: 0,
      amount: 0,
    },
  });

  /* ---------------- SAMPLE DATA ---------------- */

  const vehicleChecklists: VehicleChecklist[] = [
    {
      id: 1,
      checklist: "POST SERVICE CHECKLIST (ADVANCE 55)",
      vehicleCategory: "STATION WAGON",
      noOfItems: 55,
      amount: 1500,
    },
    {
      id: 2,
      checklist: "PRE-SERVICE CHECKLIST (ADVANCE 55)",
      vehicleCategory: "STATION WAGON",
      noOfItems: 55,
      amount: 1500,
    },
    {
      id: 3,
      checklist: "101 POINT CHECKLIST",
      vehicleCategory: "FASTBACK",
      noOfItems: 55,
      amount: 1500,
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
    (row: VehicleChecklist) => {
      setMode("edit");
      setActiveRow(row);
      methods.reset(row);
      setIsModalOpen(true);
    },
    [methods]
  );

  const handleDelete = useCallback((row: VehicleChecklist) => {
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

  const onSubmit = (data: VehicleChecklistForm) => {
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

  const columns: TableColumn<VehicleChecklist>[] = [
    {
      key: "checklist",
      header: "Checklist",
      minWidth: "300px",
    },
    {
      key: "vehicleCategory",
      header: "Vehicle Category",
      minWidth: "220px",
    },
    {
      key: "noOfItems",
      header: "No of Items",
      width: "130px",
      align: "center",
    },
    {
      key: "amount",
      header: "Amount",
      width: "130px",
      align: "right",
      render: (row) => <span>{row.amount.toFixed(2)}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      width: "140px",
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
        title="Manage Vehicle Checklists"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsModalOpen={openAdd}
      />

      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{
        height: "calc(100vh - 250px)"
      }}>
        <Table
          columns={columns}
          data={vehicleChecklists}
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

      {/* ---------------- ADD / EDIT DIALOG ---------------- */}

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogBody className="w-full md:max-w-2xl p-2 h-auto">
          <DialogHeader
            title={
              mode === "add"
                ? "Add Vehicle Checklist"
                : "Edit Vehicle Checklist"
            }
            subtitle="Vehicle checklist details"
            onClose={() => setIsModalOpen(false)}
          />

          <FormProvider {...methods}>
            <form className="p-4 grid grid-cols-2 gap-4">
              <CommonTextInput name="checklist" label="Checklist Name" />
              <CommonTextInput
                name="vehicleCategory"
                label="Vehicle Category"
              />
              <CommonTextInput
                name="noOfItems"
                label="No of Items"
                type="number"
                rules={{ valueAsNumber: true }}
              />
              <CommonTextInput
                name="amount"
                label="Amount"
                type="number"
                rules={{ valueAsNumber: true }}
              />

              <div className="col-span-2">
                <DialogFooter
                  leftTitle="Cancel"
                  rightTitle={mode === "edit" ? "Update" : "Save"}
                  onCancel={() => setIsModalOpen(false)}
                  onConfirm={methods.handleSubmit(onSubmit)}
                />
              </div>
            </form>
          </FormProvider>
        </DialogBody>
      </Dialog>

      {/* ---------------- DELETE CONFIRMATION ---------------- */}

      <Dialog isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <DialogBody className="w-full md:max-w-md p-2 h-auto">
          <DialogHeader
            title="Delete Vehicle Checklist"
            subtitle="This action cannot be undone"
            onClose={() => setIsDeleteOpen(false)}
          />

          <div className="p-4 space-y-4">
            <p className="text-sm">
              Are you sure you want to delete this vehicle checklist?
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

export default VehicleCheckListLayout;
