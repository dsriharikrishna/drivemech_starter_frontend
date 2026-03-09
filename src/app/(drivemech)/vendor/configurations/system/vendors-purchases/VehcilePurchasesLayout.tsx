"use client";

import React, { useState } from "react";
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

/* ---------------- TYPES ---------------- */

interface VendorPurchase {
  id: number;
  vendorName: string;
  vendorRefCode: string;
  contactNumber: string;
  email: string;
  gstin: string;
  address: string;
  city: string;
  state: string;
  registerDate: string;
  totalAmount: number;
  totalPaid: number;
  totalDue: number;
}

/* ---------------- VALIDATION ---------------- */

const vendorSchema = z.object({
  vendorName: z.string().min(1),
  vendorRefCode: z.string().min(1),
  contactNumber: z.string().min(10),
  email: z.string().email(),
  gstin: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
});

type VendorForm = z.infer<typeof vendorSchema>;

/* ---------------- COMPONENT ---------------- */

const VehcilePurchasesLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ---------------- FORM ---------------- */

  const methods = useForm<VendorForm>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      vendorName: "",
      vendorRefCode: "",
      contactNumber: "",
      email: "",
      gstin: "",
      address: "",
      city: "",
      state: "",
    },
  });

  /* ---------------- SAMPLE DATA ---------------- */

  const vendors: VendorPurchase[] = Array.from({ length: 3 }).map((_, i) => ({
    id: i + 1,
    vendorName: "Cars 24",
    vendorRefCode: "GSTIN1234567890",
    contactNumber: "+91 70007 70007",
    email: "example@email.com",
    gstin: "Yes",
    address: "1-2-345/AB, Somewhere",
    city: "Hyderabad",
    state: "Telangana",
    registerDate: "12-May-2025",
    totalAmount: 1000,
    totalPaid: 1000,
    totalDue: 1000,
  }));

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {
    methods.reset();
    setIsModalOpen(true);
  };

  const onSubmit = (data: VendorForm) => {
    console.log("SAVE VENDOR:", data);
    setIsModalOpen(false);
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="space-y-6">
      <ConfigurationHeader
        title="Manage Vendors & Purchases"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsModalOpen={openAdd}
      />

      {/* ---------------- VENDOR CARDS ---------------- */}

      <div className="space-y-4">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white border border-gray-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-sm"
          >
            <div>
              <p className="font-semibold">Vendor Name</p>
              <p>{vendor.vendorName}</p>
            </div>

            <div>
              <p className="font-semibold">Vendor Ref Code</p>
              <p>{vendor.vendorRefCode}</p>
            </div>

            <div>
              <p className="font-semibold">Contact Number</p>
              <p>{vendor.contactNumber}</p>
            </div>

            <div>
              <p className="font-semibold">Email ID</p>
              <p>{vendor.email}</p>
            </div>

            <div>
              <p className="font-semibold">GSTIN No.</p>
              <p>{vendor.gstin}</p>
            </div>

            <div className="flex items-center">
              <button className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                <EditIcon size={16} />
              </button>
            </div>

            <div>
              <p className="font-semibold">Address</p>
              <p>{vendor.address}</p>
            </div>

            <div>
              <p className="font-semibold">City</p>
              <p>{vendor.city}</p>
            </div>

            <div>
              <p className="font-semibold">State</p>
              <p>{vendor.state}</p>
            </div>

            <div>
              <p className="font-semibold">Register Date</p>
              <p>{vendor.registerDate}</p>
            </div>

            <div>
              <p className="font-semibold">Total Amount</p>
              <p>₹ {vendor.totalAmount.toFixed(2)}</p>
            </div>

            <div />

            <div>
              <p className="font-semibold">Total Paid</p>
              <p>₹ {vendor.totalPaid.toFixed(2)}</p>
            </div>

            <div>
              <p className="font-semibold">Total Due</p>
              <p>₹ {vendor.totalDue.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- PAGINATION ---------------- */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600">
        <p>Showing data 1 to 5 of 256 entries</p>

        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded">&lt;</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">4</button>
          <span className="px-2">…</span>
          <button className="px-3 py-1 border rounded">20</button>
          <button className="px-3 py-1 border rounded">&gt;</button>
        </div>
      </div>

      {/* ---------------- ADD / EDIT DIALOG ---------------- */}

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogBody className="w-full md:max-w-2xl p-2">
          <DialogHeader
            title="Add Vendor"
            subtitle="Vendor & purchase details"
            onClose={() => setIsModalOpen(false)}
          />

          <FormProvider {...methods}>
            <form className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CommonTextInput name="vendorName" label="Vendor Name" />
              <CommonTextInput name="vendorRefCode" label="Vendor Ref Code" />
              <CommonTextInput name="contactNumber" label="Contact Number" />
              <CommonTextInput name="email" label="Email ID" />
              <CommonTextInput name="gstin" label="GSTIN No." />
              <CommonTextInput name="address" label="Address" />
              <CommonTextInput name="city" label="City" />
              <CommonTextInput name="state" label="State" />

              <div className="col-span-2">
                <DialogFooter
                  leftTitle="Cancel"
                  rightTitle="Save"
                  onCancel={() => setIsModalOpen(false)}
                  onConfirm={methods.handleSubmit(onSubmit)}
                />
              </div>
            </form>
          </FormProvider>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default VehcilePurchasesLayout;
