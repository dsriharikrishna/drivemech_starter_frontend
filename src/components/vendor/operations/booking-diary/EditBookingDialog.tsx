"use client";

import { useState, useEffect } from "react";
import { BookingEvent } from "@/types/vendor/operations/booking";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogFooter from "@/components/modals/DialogFooter";
import Button from "@/components/ui/Button";

interface EditBookingDialogProps {
  isOpen: boolean;
  booking: BookingEvent | null;
  onClose: () => void;
  onConfirm: (bookingId: string, newTitle: string) => void;
  onDelete: (bookingId: string) => void;
}

export default function EditBookingDialog({
  isOpen,
  booking,
  onClose,
  onConfirm,
  onDelete,
}: EditBookingDialogProps) {
  const [serviceName, setServiceName] = useState("");

  useEffect(() => {
    if (booking) {
      setServiceName(booking.title);
    }
  }, [booking]);

  const handleConfirm = () => {
    if (serviceName.trim() && booking) {
      onConfirm(booking.id, serviceName);
      onClose();
    }
  };

  const handleDelete = () => {
    if (booking && confirm("Are you sure you want to delete this booking?")) {
      onDelete(booking.id);
      onClose();
    }
  };

  const handleCancel = () => {
    if (booking) {
      setServiceName(booking.title);
    }
    onClose();
  };

  if (!booking) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogBody className="max-w-md h-auto p-6">
        <DialogHeader title="Edit Booking" onClose={handleCancel} />

        <div className="py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Name
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Service name..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleConfirm();
              }}
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-3 text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(booking.date).toLocaleDateString("en-GB")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{booking.startTime}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 ">
          <DialogFooter
            leftTitle="Cancel"
            rightTitle="Save"
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            onDelete={handleDelete}
            isDeleteButtonVisible
          />
        </div>
      </DialogBody>
    </Dialog>
  );
}
