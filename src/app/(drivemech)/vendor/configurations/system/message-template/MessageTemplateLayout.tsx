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

interface MessageTemplate {
  id: number;
  templateName: string;
  subject: string;
  message: string;
}

type Mode = "add" | "edit" | "view";

/* ---------------- VALIDATION ---------------- */

const messageTemplateSchema = z.object({
  templateName: z.string().min(1, "Template name is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message content is required"),
});

type MessageTemplateForm = z.infer<typeof messageTemplateSchema>;

/* ---------------- COMPONENT ---------------- */

const MessageTemplateLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number | string>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("add");
  const [activeRow, setActiveRow] = useState<MessageTemplate | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<MessageTemplate | null>(null);

  /* ---------------- FORM ---------------- */

  const methods = useForm<MessageTemplateForm>({
    resolver: zodResolver(messageTemplateSchema),
    defaultValues: {
      templateName: "",
      subject: "",
      message: "",
    },
  });

  /* ---------------- SAMPLE DATA ---------------- */

  const messageTemplates: MessageTemplate[] = [
    {
      id: 1,
      templateName: "Job Assigned",
      subject: "New Job Assigned",
      message: "A new job has been assigned to you.",
    },
    {
      id: 2,
      templateName: "Invoice Generated",
      subject: "Invoice Ready",
      message: "Your invoice has been generated successfully.",
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
    (row: MessageTemplate) => {
      setMode("edit");
      setActiveRow(row);
      methods.reset(row);
      setIsModalOpen(true);
    },
    [methods]
  );

  const openView = useCallback(
    (row: MessageTemplate) => {
      setMode("view");
      setActiveRow(row);
      methods.reset(row);
      setIsModalOpen(true);
    },
    [methods]
  );

  const handleDelete = useCallback((row: MessageTemplate) => {
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

  const onSubmit = (data: MessageTemplateForm) => {
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

  const columns: TableColumn<MessageTemplate>[] = [
    {
      key: "templateName",
      header: "Template Name",
      minWidth: "200px",
    },
    {
      key: "subject",
      header: "Subject",
      minWidth: "220px",
    },
    {
      key: "message",
      header: "Message",
      minWidth: "300px",
    },
    {
      key: "actions",
      header: "Action",
      width: "180px",
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
        title="Manage Message Template"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsModalOpen={openAdd}
      />

      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{
        height: "calc(100vh - 250px)"
      }}>
        <Table
          columns={columns}
          data={messageTemplates}
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
                ? "Add Message Template"
                : mode === "edit"
                  ? "Edit Message Template"
                  : "View Message Template"
            }
            subtitle="Message template details"
            onClose={() => setIsModalOpen(false)}
          />

          <FormProvider {...methods}>
            <form className="p-4 flex flex-col gap-4">
              <CommonTextInput
                name="templateName"
                label="Template Name"
                disabled={mode === "view"}
              />

              <CommonTextInput
                name="subject"
                label="Subject"
                disabled={mode === "view"}
              />

              <CommonTextInput
                name="message"
                label="Message Content"
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
        <DialogBody className="w-full md:max-w-md p-2 h-auto">
          <DialogHeader
            title="Delete Message Template"
            subtitle="This action cannot be undone"
            onClose={() => setIsDeleteOpen(false)}
          />

          <div className="p-4 space-y-4">
            <p className="text-sm">
              Are you sure you want to delete this message template?
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
    </div >
  );
};

export default MessageTemplateLayout;
