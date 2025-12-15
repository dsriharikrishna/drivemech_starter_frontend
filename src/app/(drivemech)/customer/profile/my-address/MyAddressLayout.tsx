"use client";

import { useState } from "react";
import {
  House,
  Suitcase,
  MapPin,
  Plus,
  PencilSimple,
  Trash,
  WarningCircle,
} from "phosphor-react";

import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import CustomCard from "@/components/ui/CustomCard";
import { useRouter } from "next/navigation";

// DIALOG COMPONENTS
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";
import DeleteDialogBody from "@/components/modals/DeleteDialogBody";

type Address = {
  id: string;
  label: string;
  icon: "home" | "office" | "pickup";
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  isDefault?: boolean;
};

const ICON = {
  home: <House size={24} weight="duotone" className="text-orange-500" />,
  office: <Suitcase size={24} weight="duotone" className="text-orange-500" />,
  pickup: <MapPin size={24} weight="duotone" className="text-orange-500" />,
};

export default function MyAddressLayout() {
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "Home",
      icon: "home",
      address1: "123 Main Street, Apartment 4B",
      city: "Downtown, City",
      postcode: "10001",
      isDefault: true,
    },
    {
      id: "2",
      label: "Office",
      icon: "office",
      address1: "456 Business Park, Floor 8",
      city: "Commercial District, City",
      postcode: "10020",
    },
    {
      id: "3",
      label: "Garage Pickup",
      icon: "pickup",
      address1: "456 Business Park, Floor 8",
      city: "Commercial District, City",
      postcode: "10020",
    },
  ]);

  // DELETE DIALOG CONTROL
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function handleDeleteConfirm() {
    if (deleteId) {
      setAddresses((prev) => prev.filter((a) => a.id !== deleteId));
    }
    setDeleteId(null);
  }

  return (
    <div className="bg-white p-4 rounded-xl space-y-5">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <Typography variant="h4" weight="semibold">My Addresses</Typography>

        <Button
          variant="gradient"
          className="flex items-center gap-2 px-4 text-sm"
          onClick={() => router.push("/customer/profile/my-address/add")}
        >
          <Plus size={18} weight="bold" /> Add New Address
        </Button>
      </div>

      {/* ADDRESS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {addresses.map((a) => (
          <CustomCard
            key={a.id}
            className={`p-4 rounded-xl border transition ${a.isDefault ? "border-orange-400" : "border-gray-200"
              }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                {ICON[a.icon]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Typography weight="semibold" className="text-sm">{a.label}</Typography>

                  {a.isDefault && (
                    <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-md font-medium">
                      Default
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600 mt-2">{a.address1}</p>
                {a.address2 && <p className="text-xs text-gray-600">{a.address2}</p>}
                <p className="text-xs text-gray-600">{a.city} - {a.postcode}</p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
              {/* EDIT */}
              <button
                onClick={() => router.push(`/customer/profile/my-address/edit/${a.id}`)}
                className="flex-1 flex items-center justify-center gap-1.5 border border-gray-300 rounded-lg py-2 text-xs font-medium hover:bg-gray-50 transition"
              >
                <PencilSimple size={14} />
                Edit
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => setDeleteId(a.id)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-red-300 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition"
              >
                <Trash size={14} />
                Delete
              </button>
            </div>
          </CustomCard>
        ))}
      </div>

      {/* QUICK ACCESS BOX */}
      <CustomCard className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="text-lg">📍</div>
          <div>
            <Typography weight="semibold" className="text-sm">Quick Access</Typography>
            <p className="text-xs text-gray-600 mt-1">
              Save frequently used addresses for faster checkout during spare parts
              delivery, service bookings, and towing requests.
            </p>
          </div>
        </div>
      </CustomCard>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog isOpen={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogBody className="max-h-[35vh] w-xl p-4">
          <DialogHeader title="Delete Address" onClose={() => setDeleteId(null)} />
          <DeleteDialogBody
            title="Delete Address?"
            message="Are you sure you want to remove this address from your account? This action cannot be undone."
            onCancel={() => setDeleteId(null)}
            onConfirm={handleDeleteConfirm}
          />
        </DialogBody>
      </Dialog>

    </div>
  );
}
