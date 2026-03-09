"use client";

import { useState, useCallback, useMemo } from "react";
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

const ICON_MAP = {
  home: { size: 20, weight: "duotone" as const, className: "text-orange-500" },
  office: {
    size: 20,
    weight: "duotone" as const,
    className: "text-orange-500",
  },
  pickup: {
    size: 20,
    weight: "duotone" as const,
    className: "text-orange-500",
  },
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

  const ICON = useMemo(
    () => ({
      home: <House {...ICON_MAP.home} />,
      office: <Suitcase {...ICON_MAP.office} />,
      pickup: <MapPin {...ICON_MAP.pickup} />,
    }),
    []
  );

  // DELETE DIALOG CONTROL
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteId) {
      setAddresses((prev) => prev.filter((a) => a.id !== deleteId));
    }
    setDeleteId(null);
  }, [deleteId]);

  const handleAddAddress = useCallback(() => {
    router.push("/customer/profile/my-address/add");
  }, [router]);

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/customer/profile/my-address/edit/${id}`);
    },
    [router]
  );

  const handleDelete = useCallback((id: string) => {
    setDeleteId(id);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDeleteId(null);
  }, []);

  return (
    <div className="bg-white p-3 rounded-xl space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <Typography variant="h4" weight="semibold">
          My Addresses
        </Typography>

        <Button
          variant="gradient"
          className="flex items-center gap-1.5 px-3 text-xs"
          onClick={handleAddAddress}
        >
          <Plus size={16} weight="bold" /> Add New Address
        </Button>
      </div>

      {/* ADDRESS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {addresses.map((a) => (
          <CustomCard
            key={a.id}
            className={`p-3 rounded-xl border transition ${
              a.isDefault ? "border-orange-400" : "border-gray-200"
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                {ICON[a.icon]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <Typography weight="semibold" className="text-xs">
                    {a.label}
                  </Typography>

                  {a.isDefault && (
                    <span className="text-[11px] bg-orange-500 text-white px-1.5 py-0.5 rounded-md font-medium">
                      Default
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-gray-600 mt-1.5">{a.address1}</p>
                {a.address2 && (
                  <p className="text-[11px] text-gray-600">{a.address2}</p>
                )}
                <p className="text-[11px] text-gray-600">
                  {a.city} - {a.postcode}
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-1.5 mt-3 pt-2.5 border-t border-gray-200">
              {/* EDIT */}
              <button
                onClick={() => handleEdit(a.id)}
                className="flex-1 flex items-center justify-center gap-1 border border-gray-300 rounded-lg py-1.5 text-[11px] font-medium hover:bg-gray-50 transition"
              >
                <PencilSimple size={12} />
                Edit
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleDelete(a.id)}
                className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-300 bg-red-50 text-red-600 text-[11px] font-medium hover:bg-red-100 transition"
              >
                <Trash size={12} />
                Delete
              </button>
            </div>
          </CustomCard>
        ))}
      </div>

      {/* QUICK ACCESS BOX */}
      <CustomCard className="bg-blue-50 border border-blue-200 p-3 rounded-xl">
        <div className="flex items-start gap-2.5">
          <div className="text-base">📍</div>
          <div>
            <Typography weight="semibold" className="text-xs">
              Quick Access
            </Typography>
            <p className="text-[11px] text-gray-600 mt-0.5">
              Save frequently used addresses for faster checkout during spare
              parts delivery, service bookings, and towing requests.
            </p>
          </div>
        </div>
      </CustomCard>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog isOpen={!!deleteId} onClose={handleCloseDialog}>
        <DialogBody className="max-h-[30vh] w-xl p-3">
          <DialogHeader title="Delete Address" onClose={handleCloseDialog} />
          <DeleteDialogBody
            title="Delete Address?"
            message="Are you sure you want to remove this address from your account? This action cannot be undone."
            onCancel={handleCloseDialog}
            onConfirm={handleDeleteConfirm}
          />
        </DialogBody>
      </Dialog>
    </div>
  );
}
