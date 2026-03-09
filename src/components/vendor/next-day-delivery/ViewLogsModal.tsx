"use client";

import React from "react";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import { Clock, CheckCircle, Truck, Package, AlertCircle, User } from "lucide-react";

interface LogEntry {
    id: string;
    timestamp: string;
    event: string;
    description: string;
    actor?: string;
    status: "success" | "info" | "warning" | "error";
}

interface ViewLogsModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        id: string;
        orderNumber: string;
        customer: {
            name: string;
        };
        status: string;
    };
}

const STATUS_ICON_MAP: Record<LogEntry["status"], React.ReactNode> = {
    success: <CheckCircle size={16} className="text-green-500" />,
    info: <Clock size={16} className="text-blue-500" />,
    warning: <AlertCircle size={16} className="text-yellow-500" />,
    error: <AlertCircle size={16} className="text-red-500" />,
};

const STATUS_DOT_MAP: Record<LogEntry["status"], string> = {
    success: "bg-green-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
};

// Generates mock log entries based on the order
function generateLogs(orderNumber: string): LogEntry[] {
    return [
        {
            id: "1",
            timestamp: "Today, 09:00 AM",
            event: "Order Created",
            description: `Order ${orderNumber} was created and confirmed.`,
            actor: "System",
            status: "success",
        },
        {
            id: "2",
            timestamp: "Today, 09:15 AM",
            event: "Payment Initiated",
            description: "Payment link sent to customer's email and mobile.",
            actor: "Staff",
            status: "info",
        },
        {
            id: "3",
            timestamp: "Today, 10:00 AM",
            event: "Parts Order Placed",
            description: "Required parts ordered from supplier.",
            actor: "Staff",
            status: "info",
        },
        {
            id: "4",
            timestamp: "Today, 11:30 AM",
            event: "Payment Received",
            description: "Customer payment confirmed successfully.",
            actor: "System",
            status: "success",
        },
        {
            id: "5",
            timestamp: "Today, 02:00 PM",
            event: "Order Dispatched",
            description: "Package picked up and dispatched for next-day delivery.",
            actor: "Delivery Partner",
            status: "info",
        },
    ];
}

const ViewLogsModal: React.FC<ViewLogsModalProps> = ({ isOpen, onClose, data }) => {
    const logs = generateLogs(data.orderNumber);

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className="bg-white rounded-xl w-2xl p-4 flex flex-col gap-4">
                <DialogHeader title={`Order Log — ${data.orderNumber}`} onClose={onClose} />

                {/* Order Meta */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600">
                    <User size={14} className="text-gray-400 shrink-0" />
                    <span>
                        Customer:{" "}
                        <span className="font-medium text-gray-800">{data.customer.name}</span>
                    </span>
                    <span className="ml-auto px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full capitalize">
                        {data.status}
                    </span>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-0 max-h-[380px] overflow-y-auto pr-1">
                    {logs.map((log, index) => (
                        <div key={log.id} className="flex gap-3">
                            {/* Timeline line + dot */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-3 h-3 rounded-full mt-1 shrink-0 ${STATUS_DOT_MAP[log.status]}`}
                                />
                                {index < logs.length - 1 && (
                                    <div className="w-px flex-1 bg-gray-200 mt-1" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="pb-5 flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5">
                                        {STATUS_ICON_MAP[log.status]}
                                        <span className="text-sm font-semibold text-gray-800">
                                            {log.event}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-400 shrink-0">{log.timestamp}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">{log.description}</p>
                                {log.actor && (
                                    <span className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                        <User size={10} />
                                        {log.actor}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 border-t border-gray-100 pt-3">
                    Showing all activity logs for order {data.orderNumber}
                </p>
            </div>
        </Dialog>
    );
};

export default ViewLogsModal;
