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
import { Eye, Trash } from "phosphor-react";
import { Trash2Icon } from "lucide-react";

/* ---------------- TYPES ---------------- */

interface TermsConditions {
  id: number;
  invoiceBillTnc: string;
  jobCardTnc: string;
  insuranceBillTnc: string;
  bankDetailsTnc: string;
}

type Mode = "add" | "edit" | "view";

/* ---------------- VALIDATION ---------------- */

const termsConditionsSchema = z.object({
  invoiceBillTnc: z.string().min(1, "Invoice Bill TnC is required"),
  jobCardTnc: z.string().min(1, "Job Card TnC is required"),
  insuranceBillTnc: z.string().min(1, "Insurance Bill TnC is required"),
  bankDetailsTnc: z.string().min(1, "Bank Details TnC is required"),
});

type TermsConditionsForm = z.infer<typeof termsConditionsSchema>;

/* ---------------- COMPONENT ---------------- */

const TermsConditionsLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number | string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("add");
  const [activeRow, setActiveRow] = useState<TermsConditions | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<TermsConditions | null>(null);

  /* ---------------- FORM ---------------- */

  const methods = useForm<TermsConditionsForm>({
    resolver: zodResolver(termsConditionsSchema),
    defaultValues: {
      invoiceBillTnc: "",
      jobCardTnc: "",
      insuranceBillTnc: "",
      bankDetailsTnc: "",
    },
  });

  /* ---------------- SAMPLE DATA ---------------- */

  const termsConditionsList: TermsConditions[] = [
    {
      id: 1,
      invoiceBillTnc: "Invoice terms available",
      jobCardTnc: "Job card terms",
      insuranceBillTnc: "Insurance bill terms",
      bankDetailsTnc: "Bank details terms",
    },
    {
      id: 2,
      invoiceBillTnc: "Invoice TnC",
      jobCardTnc: "Job card TnC",
      insuranceBillTnc: "Insurance TnC",
      bankDetailsTnc: "Bank TnC",
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
    (row: TermsConditions) => {
      setMode("edit");
      setActiveRow(row);
      methods.reset(row);
      setIsModalOpen(true);
    },
    [methods]
  );

  const openView = useCallback(
    (row: TermsConditions) => {
      setMode("view");
      setActiveRow(row);
      methods.reset(row);
      setIsModalOpen(true);
    },
    [methods]
  );

  const handleDelete = useCallback((row: TermsConditions) => {
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

  const onSubmit = (data: TermsConditionsForm) => {
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

  const columns: TableColumn<TermsConditions>[] = [
    { key: "invoiceBillTnc", header: "Invoice Bill TnC", minWidth: "200px" },
    { key: "jobCardTnc", header: "Job Card TnC", minWidth: "200px" },
    {
      key: "insuranceBillTnc",
      header: "Insurance Bill TnC",
      minWidth: "220px",
    },
    { key: "bankDetailsTnc", header: "Bank Details TnC", minWidth: "200px" },
    {
      key: "actions",
      header: "Actions",
      width: "160px",
      align: "center",
      render: (item) => (
        <div className="flex  items-center justify-center gap-3">
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
        title="Manage Term & Conditions"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsModalOpen={openAdd}
      />

      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{
        height: "calc(100vh - 250px)"
      }}>
        <Table
          columns={columns}
          data={termsConditionsList}
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
                ? "Add Terms & Conditions"
                : mode === "edit"
                  ? "Edit Terms & Conditions"
                  : "View Terms & Conditions"
            }
            subtitle="Terms & Conditions details"
            onClose={() => setIsModalOpen(false)}
          />

          <FormProvider {...methods}>
            <form className="p-4 flex flex-col gap-4">
              <CommonTextInput
                name="invoiceBillTnc"
                label="Invoice Bill TnC"
                disabled={mode === "view"}
              />
              <CommonTextInput
                name="jobCardTnc"
                label="Job Card TnC"
                disabled={mode === "view"}
              />
              <CommonTextInput
                name="insuranceBillTnc"
                label="Insurance Bill TnC"
                disabled={mode === "view"}
              />
              <CommonTextInput
                name="bankDetailsTnc"
                label="Bank Details TnC"
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
        <DialogBody className="w-full md:max-w-2xl p-2 h-auto">
          <DialogHeader
            title="Delete Terms & Conditions"
            subtitle="This action cannot be undone"
            onClose={() => setIsDeleteOpen(false)}
          />

          <div className="p-4 space-y-4">
            <p className="text-sm">
              Are you sure you want to delete this Terms & Conditions record?
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

export default TermsConditionsLayout;
