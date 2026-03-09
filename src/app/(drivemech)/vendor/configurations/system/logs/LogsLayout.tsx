"use client";

import React, { useCallback, useState } from "react";
import Table, { TableColumn } from "@/components/ui/Table";
import ConfigurationHeader from "@/components/vendor/configurations/system/ConfigurationHeader";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import { EditIcon } from "@/components/icons/ManageWorkshopIcons";

/* ---------------- TYPES ---------------- */

interface LogItem {
  id: number;
  desc: string;
  type: string;
  category: string;
  changedBy: string;
  changedOn: string;
}

type Mode = "add" | "view";

/* ---------------- VALIDATION ---------------- */

const logSchema = z.object({
  desc: z.string().min(1, "Description is required"),
  type: z.string().min(1, "Type is required"),
  category: z.string().min(1, "Category is required"),
});

type LogForm = z.infer<typeof logSchema>;

/* ---------------- COMPONENT ---------------- */

const LogsLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number | string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("add");
  const [activeRow, setActiveRow] = useState<LogItem | null>(null);

  /* ---------------- FORM ---------------- */

  const methods = useForm<LogForm>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      desc: "",
      type: "",
      category: "",
    },
  });

  /* ---------------- SAMPLE DATA ---------------- */

  const logs: LogItem[] = Array.from({ length: 9 }).map((_, index) => ({
    id: index + 1,
    desc: "Vehicle Ready",
    type: "Vehicle Ready",
    category: "Vehicle Service",
    changedBy: "Workshop Admin",
    changedOn: "2023-04-25 17:48:20",
  }));

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {
    setMode("add");
    setActiveRow(null);
    methods.reset({
      desc: "",
      type: "",
      category: "",
    });
    setIsModalOpen(true);
  };

  const openView = useCallback(
    (row: LogItem) => {
      setMode("view");
      setActiveRow(row);

      // 🔴 THIS WAS MISSING — now edit data shows correctly
      methods.reset({
        desc: row.desc,
        type: row.type,
        category: row.category,
      });

      setIsModalOpen(true);
    },
    [methods]
  );

  const onSubmit = (data: LogForm) => {
    console.log("ADD LOG:", data);
    setIsModalOpen(false);
    methods.reset();
  };

  /* ---------------- TABLE COLUMNS ---------------- */

  const columns: TableColumn<LogItem>[] = [
    { key: "id", header: "Id", width: "80px" },
    { key: "desc", header: "Description", minWidth: "200px" },
    { key: "type", header: "Type", minWidth: "200px" },
    { key: "category", header: "Category", minWidth: "220px" },
    { key: "changedBy", header: "Changed By", minWidth: "200px" },
    { key: "changedOn", header: "Changed On", minWidth: "200px" },
    {
      key: "actions",
      header: "Action",
      width: "120px",
      align: "center",
      render: (item) => (
        <button
          onClick={() => openView(item)}
          className="w-8 h-8 cursor-pointer rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors"
        >
          <EditIcon size={16} />
        </button>
      ),
    },
  ];

  /* ---------------- RENDER ---------------- */

  return (
    <div className="space-y-6">
      {/* ---------- MODULE HEADER ---------- */}
      <ConfigurationHeader
        title="View Logs"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsModalOpen={openAdd}
      />

      {/* ---------- TABLE ---------- */}
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm h-[calc(100vh-250px)]">
        <Table
          columns={columns}
          data={logs}
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

      {/* ---------------- ADD / VIEW DIALOG ---------------- */}

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogBody className="w-full md:max-w-2xl p-2 h-auto">
          <DialogHeader
            title={mode === "add" ? "Add Log" : "Log Details"}
            subtitle={
              mode === "add"
                ? "Create a system log entry"
                : "View system log information"
            }
            onClose={() => setIsModalOpen(false)}
          />

          <FormProvider {...methods}>
            <form className="p-4 grid grid-cols-2 gap-4">
              <CommonTextInput
                name="desc"
                label="Description"
                disabled={mode === "view"}
              />

              <CommonTextInput
                name="type"
                label="Type"
                disabled={mode === "view"}
              />

              <CommonTextInput
                name="category"
                label="Category"
                disabled={mode === "view"}
              />

              {mode === "add" && (
                <div className="col-span-2">
                  <DialogFooter
                    leftTitle="Cancel"
                    rightTitle="Save"
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={methods.handleSubmit(onSubmit)}
                  />
                </div>
              )}
            </form>
          </FormProvider>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default LogsLayout;
