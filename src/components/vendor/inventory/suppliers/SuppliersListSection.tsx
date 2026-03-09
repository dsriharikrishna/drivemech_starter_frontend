"use client";

import React, { useState } from "react";
import { Edit2, FileText, DollarSign, Info, Trash2, Eye } from "lucide-react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Table, { TableColumn } from "@/components/ui/Table";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import CommonTextInput from "@/components/forms/CommonTextInput";
import Button from "@/components/ui/Button";
import {
  supplierFormSchema,
  type SupplierFormValues,
  type Supplier,
} from "@/schemas/vendor/supplier.schema";

type DialogMode = "add" | "edit";

const SuppliersListSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>("add");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  const methods = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: "",
      city: "",
      phone: "",
      website: "",
    },
  });

  // Mock data - replace with actual data from your API/state
  const suppliers: Supplier[] = [
    {
      id: "1",
      name: "Chopra, Rana and Bharadwaj",
      city: "Bhilwara",
      phone: "+91 70007 70007",
      website: "www.website.com",
    },
    {
      id: "2",
      name: "Kapoor-Iyengar",
      city: "Firozabad",
      phone: "+91 70007 70007",
      website: "www.website.com",
    },
    {
      id: "3",
      name: "Sample Corporation",
      city: "New Delhi",
      phone: "+91 70007 70007",
      website: "www.website.com",
    },
    {
      id: "4",
      name: "Sundry Supplier",
      city: "Hyderabad",
      phone: "+91 70007 70007",
      website: "www.website.com",
    },
    {
      id: "5",
      name: "Jagan",
      city: "Kadapa",
      phone: "+91 70007 70007",
      website: "www.website.com",
    },
    {
      id: "6",
      name: "Anji Reddy",
      city: "Guntur",
      phone: "+91 70007 70007",
      website: "www.website.com",
    },
  ];

  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.phone.includes(searchQuery) ||
      supplier.website.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setDialogMode("add");
    methods.reset({
      name: "",
      city: "",
      phone: "",
      website: "",
    });
    setSelectedSupplier(null);
    setIsFormDialogOpen(true);
  };

  const handleEditClick = (supplier: Supplier) => {
    setDialogMode("edit");
    setSelectedSupplier(supplier);
    methods.reset({
      name: supplier.name,
      city: supplier.city,
      phone: supplier.phone,
      website: supplier.website,
    });
    setIsFormDialogOpen(true);
  };

  const handleDeleteClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteDialogOpen(true);
  };

  const onSubmitForm: SubmitHandler<SupplierFormValues> = (data) => {
    if (dialogMode === "add") {
      console.log("Add Supplier:", data);
      // TODO: Dispatch add action or API call
    } else {
      console.log("Edit Supplier:", { id: selectedSupplier?.id, ...data });
      // TODO: Dispatch edit action or API call
    }
    setIsFormDialogOpen(false);
    methods.reset();
  };

  const handleDelete = () => {
    console.log("Delete Supplier:", selectedSupplier?.id);
    // TODO: Dispatch delete action or API call
    setIsDeleteDialogOpen(false);
    setSelectedSupplier(null);
  };

  const columns: TableColumn<Supplier>[] = [
    {
      key: "name",
      header: "Supplier",
      width: "25%",
      sortable: true,
    },
    {
      key: "city",
      header: "City",
      width: "20%",
      sortable: true,
    },
    {
      key: "phone",
      header: "Phone Number",
      width: "20%",
    },
    {
      key: "website",
      header: "Website",
      width: "20%",
    },
    {
      key: "actions",
      header: "",
      width: "15%",
      align: "right",
      render: (supplier) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="icon-edit"
            onClick={() => handleEditClick(supplier)}
          />
          <button
            className="p-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-colors"
            title="View Details"
          >
            <Eye size={14} />
          </button>
          <button
            className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
            title="Invoices"
          >
            <FileText size={14} />
          </button>
          <button
            className="p-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
            title="Payments"
          >
            <DollarSign size={14} />
          </button>
          <Button
            variant="icon-delete"
            onClick={() => handleDeleteClick(supplier)}
          />
          <button
            className="p-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white transition-colors"
            title="Info"
          >
            <Info size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Suppliers</h3>
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Add Button */}
            <button
              onClick={handleAddClick}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 flex items-center gap-1.5"
            >
              <span className="text-base">+</span>
              Add
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden" style={{ height: "calc(100vh - 250px)" }}>
          <Table
            columns={columns}
            data={filteredSuppliers}
            keyExtractor={(supplier) => supplier.id}
            pagination={true}
            pageSize={10}
            striped={false}
            hoverable={true}
            className="h-full"
            style={{ height: "100%" }}
          />
        </div>
      </div>

      {/* Add/Edit Supplier Dialog */}
      <Dialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
      >
        <DialogBody className="w-full lg:w-xl p-4 h-auto">
          <DialogHeader
            title={dialogMode === "add" ? "Add Supplier" : "Edit Supplier"}
            onClose={() => setIsFormDialogOpen(false)}
          />
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmitForm)}
              className="space-y-4"
            >
              <CommonTextInput
                name="name"
                label="Supplier Name"
                placeholder="Enter supplier name"
                required
              />
              <CommonTextInput
                name="city"
                label="City"
                placeholder="Enter city"
                required
              />
              <CommonTextInput
                name="phone"
                label="Phone Number"
                placeholder="Enter phone number"
                required
              />
              <CommonTextInput
                name="website"
                label="Website"
                placeholder="www.example.com"
              />
            </form>
            <DialogFooter
              onCancel={() => setIsFormDialogOpen(false)}
              onConfirm={methods.handleSubmit(onSubmitForm)}
              leftTitle="Cancel"
              rightTitle={dialogMode === "add" ? "Add" : "Save"}
            />
          </FormProvider>
        </DialogBody>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogHeader
          title="Delete Supplier"
          onClose={() => setIsDeleteDialogOpen(false)}
        />
        <DialogBody className="w-full lg:w-md">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedSupplier?.name}</span>?
            This action cannot be undone.
          </p>
        </DialogBody>
        <DialogFooter
          onCancel={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          leftTitle="Cancel"
          rightTitle="Delete"
        />
      </Dialog>
    </>
  );
};

export default SuppliersListSection;
