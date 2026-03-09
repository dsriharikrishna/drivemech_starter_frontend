"use client";

import React from "react";
import Dialog from "./Dialog";
import DeleteDialogBody from "./DeleteDialogBody";
import DialogHeader from "./DialogHeader";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
}) => {
    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className="px-4 py-2 bg-white rounded-xl shadow-xl border border-gray-100 max-w-md w-full">
                <DialogHeader
                    title="Confirm Action"
                    onClose={onClose}
                />
                <div className="px-4 py-2">
                    <DeleteDialogBody
                        title={title || "Delete Item?"}
                        message={description}
                        onCancel={onClose}
                        onConfirm={onConfirm}
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default DeleteModal;
