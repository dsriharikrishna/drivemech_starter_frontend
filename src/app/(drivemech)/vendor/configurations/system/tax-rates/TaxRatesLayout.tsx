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

interface TaxRate {
  id: number;
  taxType: string;
  taxCategory: string;
  hsn: string;
  taxCriteria: string;
  taxValue: number;
  startDate: string;
  endDate: string;
}

type Mode = "add" | "edit" | "view";

/* ---------------- VALIDATION ---------------- */

const taxRateSchema = z.object({
  taxType: z.string().min(1, "Tax type is required"),
  taxCategory: z.string().min(1, "Tax category is required"),
  hsn: z.string().optional(),
  taxCriteria: z.string().optional(),
  taxValue: z.number().min(0, "Tax value must be 0 or more"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

type TaxRateForm = z.infer<typeof taxRateSchema>;

/* ---------------- COMPONENT ---------------- */

const TaxRatesLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number | string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("add");
  const [activeRow, setActiveRow] = useState<TaxRate | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<TaxRate | null>(null);

  /* ---------------- FORM ---------------- */

  const methods = useForm<TaxRateForm>({
    resolver: zodResolver(taxRateSchema),
    defaultValues: {
      taxType: "",
      taxCategory: "",
      hsn: "",
      taxCriteria: "",
      taxValue: 0,
      startDate: "",
      endDate: "",
    },
  });

  /* ---------------- SAMPLE DATA ---------------- */

  const taxRates: TaxRate[] = Array.from({ length: 9 }).map((_, index) => ({
    id: index + 1,
    taxType: "GST-PR",
    taxCategory: "HSN NA",
    hsn: "NA",
    taxCriteria: "NA",
    taxValue: 0,
    startDate: "01-05-25",
    endDate: "01-05-25",
  }));

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {
    setMode("add");
    setActiveRow(null);
    methods.reset();
    setIsModalOpen(true);
  };

  const openEdit = useCallback(
    (row: TaxRate) => {
      setMode("edit");
      setActiveRow(row);
      methods.reset(row);
      setIsModalOpen(true);
    },
    [methods]
  );

  const openView = useCallback(
    (row: TaxRate) => {
      setMode("view");
      setActiveRow(row);
      methods.reset(row);
      setIsModalOpen(true);
    },
    [methods]
  );

  const handleDelete = useCallback((row: TaxRate) => {
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

  const onSubmit = (data: TaxRateForm) => {
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

  const columns: TableColumn<TaxRate>[] = [
    { key: "taxType", header: "Tax Type", minWidth: "150px" },
    { key: "taxCategory", header: "Tax Category", minWidth: "160px" },
    { key: "hsn", header: "HSN", width: "100px" },
    { key: "taxCriteria", header: "Tax Criteria", minWidth: "140px" },
    { key: "taxValue", header: "Tax Value", width: "100px", align: "center" },
    { key: "startDate", header: "Start Date", width: "130px" },
    { key: "endDate", header: "End Date", width: "130px" },
    {
      key: "actions",
      header: "Action",
      width: "200px",
      align: "center",
      render: (item) => (
        <div className="flex items-center justify-center gap-3">
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
        title="Manage Tax Rates / HSN Code"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsModalOpen={openAdd}
      />

      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{
        height: "calc(100vh - 250px)"
      }}>
        <Table
          columns={columns}
          data={taxRates}
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
                ? "Add Tax Rate"
                : mode === "edit"
                  ? "Edit Tax Rate"
                  : "View Tax Rate"
            }
            subtitle="Tax rate details"
            onClose={() => setIsModalOpen(false)}
          />

          <FormProvider {...methods}>
            <form className="p-4 grid grid-cols-2 gap-4">
              <CommonTextInput
                name="taxType"
                label="Tax Type"
                disabled={mode === "view"}
              />
              <CommonTextInput
                name="taxCategory"
                label="Tax Category"
                disabled={mode === "view"}
              />
              <CommonTextInput
                name="hsn"
                label="HSN"
                disabled={mode === "view"}
              />
              <CommonTextInput
                name="taxCriteria"
                label="Tax Criteria"
                disabled={mode === "view"}
              />
              <CommonTextInput
                name="taxValue"
                label="Tax Value"
                type="number"
                disabled={mode === "view"}
                rules={{ valueAsNumber: true }}
              />
              <CommonTextInput
                name="startDate"
                label="Start Date"
                disabled={mode === "view"}
              />
              <CommonTextInput
                name="endDate"
                label="End Date"
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

      {/* ---------------- DELETE CONFIRMATION ---------------- */}

      <Dialog isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <DialogBody className="w-full md:max-w-md p-2 h-auto">
          <DialogHeader
            title="Delete Tax Rate"
            subtitle="This action cannot be undone"
            onClose={() => setIsDeleteOpen(false)}
          />

          <div className="p-4 space-y-4">
            <p className="text-sm">
              Are you sure you want to delete this tax rate?
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

export default TaxRatesLayout;
