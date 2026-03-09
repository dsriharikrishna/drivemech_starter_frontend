"use client";

import { useState } from "react";
import Dialog from "../../../modals/Dialog";
import DialogHeader from "../../../modals/DialogHeader";
import DialogBody from "../../../modals/DialogBody";
import DialogFooter from "../../../modals/DialogFooter";

interface AddBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (serviceName: string) => void;
}

export default function AddBookingDialog({
  isOpen,
  onClose,
  onConfirm,
}: AddBookingDialogProps) {
  const [serviceName, setServiceName] = useState("");

  const handleConfirm = () => {
    if (serviceName.trim()) {
      onConfirm(serviceName);
      setServiceName("");
      onClose();
    }
  };

  const handleCancel = () => {
    setServiceName("");
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogBody className="max-w-md h-auto p-6">
        <DialogHeader title="Enter Service Name" onClose={handleCancel} />

        <div className="py-4">
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

        <DialogFooter
          leftTitle="Cancel"
          rightTitle="Okay"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </DialogBody>
    </Dialog>
  );
}
