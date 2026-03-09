"use client";

import React, { useCallback, useState } from "react";
import Table, { TableColumn } from "@/components/ui/Table";
import Button from "@/components/ui/Button";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import ConfigurationHeader from "@/components/vendor/configurations/system/ConfigurationHeader";
import { EditIcon } from "@/components/icons/ManageWorkshopIcons";

/* ---------------- TYPES ---------------- */

interface InsuranceProvider {
  id: number;
  name: string;
  gstNumber: string;
  contactNumber: string;
  email: string;
  address: string;
}

/* ---------------- VALIDATION ---------------- */

const insuranceProviderSchema = z.object({
  name: z.string().min(1, "Provider name is required"),
  gstNumber: z.string().min(1, "GST number is required"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
});

type InsuranceProviderFormValues = z.infer<typeof insuranceProviderSchema>;

/* ---------------- COMPONENT ---------------- */

const InsuranceProviderLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProvider, setEditingProvider] =
    useState<InsuranceProvider | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- FORM ---------------- */

  const methods = useForm<InsuranceProviderFormValues>({
    resolver: zodResolver(insuranceProviderSchema),
    defaultValues: {
      name: "",
      gstNumber: "",
      contactNumber: "",
      email: "",
      address: "",
    },
  });

  /* ---------------- SAMPLE DATA ---------------- */

  const providers: InsuranceProvider[] = [
    {
      id: 1,
      name: "Paisa Bazaar",
      gstNumber: "GSTIN1234567890",
      contactNumber: "+91 9876543210",
      email: "example@email.com",
      address: "Hyderabad",
    },
    {
      id: 2,
      name: "Policy Bazaar",
      gstNumber: "GSTIN0987654321",
      contactNumber: "+91 9876500000",
      email: "support@policy.com",
      address: "Bangalore",
    },
  ];

  /* ---------------- HANDLERS ---------------- */

  const handleAdd = () => {
    setIsEditMode(false);
    setEditingProvider(null);
    methods.reset();
    setIsModalOpen(true);
  };

  const handleEdit = useCallback(
    (provider: InsuranceProvider) => {
      setIsEditMode(true);
      setEditingProvider(provider);
      setIsModalOpen(true);

      methods.reset({
        name: provider.name,
        gstNumber: provider.gstNumber,
        contactNumber: provider.contactNumber,
        email: provider.email,
        address: provider.address,
      });
    },
    [methods]
  );

  const onSubmit = (data: InsuranceProviderFormValues) => {
    if (isEditMode && editingProvider) {
      console.log("UPDATE PROVIDER:", {
        id: editingProvider.id,
        ...data,
      });
    } else {
      console.log("CREATE PROVIDER:", data);
    }

    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingProvider(null);
    methods.reset();
  };

  /* ---------------- TABLE COLUMNS ---------------- */

  const columns: TableColumn<InsuranceProvider>[] = [
    {
      key: "name",
      header: "Insurance Provider Name",
      minWidth: "200px",
      sortable: true,
    },
    {
      key: "gstNumber",
      header: "GST Number",
      width: "180px",
      sortable: true,
    },
    {
      key: "contactNumber",
      header: "Contact Number",
      width: "150px",
    },
    {
      key: "email",
      header: "Email ID",
      minWidth: "220px",
    },
    {
      key: "address",
      header: "Address",
      width: "150px",
    },
    {
      key: "actions",
      header: "Action",
      width: "100px",
      align: "center",
      render: (item) => (
        <button
          onClick={() => handleEdit(item)}
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
      <ConfigurationHeader
        title="Insurance Provider"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsModalOpen={handleAdd}
      />

      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" style={{
        height: "calc(100vh - 250px)"
      }}>
        <Table
          columns={columns}
          data={providers}
          keyExtractor={(provider) => provider.id}
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

      {/* ---------------- MODAL ---------------- */}

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogBody className="w-full md:max-w-2xl h-auto p-2">
          <DialogHeader
            title={
              isEditMode ? "Edit Insurance Provider" : "Add Insurance Provider"
            }
            subtitle="Enter the details of the insurance provider"
            onClose={() => setIsModalOpen(false)}
          />

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="p-4 flex flex-col gap-4"
            >
              <CommonTextInput
                name="name"
                label="Insurance Provider Name"
                placeholder="Enter provider name"
                required
              />

              <CommonTextInput
                name="gstNumber"
                label="GST Number"
                placeholder="Enter GST number"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <CommonTextInput
                  name="contactNumber"
                  label="Contact Number"
                  placeholder="+91 9876543210"
                  required
                />

                <CommonTextInput
                  name="email"
                  label="Email ID"
                  type="email"
                  placeholder="provider@example.com"
                  required
                />
              </div>

              <CommonTextInput
                name="address"
                label="Address"
                placeholder="Enter address"
                required
              />

              <DialogFooter
                leftTitle="Cancel"
                rightTitle={isEditMode ? "Update Provider" : "Save Provider"}
                onCancel={() => setIsModalOpen(false)}
                onConfirm={methods.handleSubmit(onSubmit)}
              />
            </form>
          </FormProvider>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default InsuranceProviderLayout;
