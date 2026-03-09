import React from "react";
import { LucideIcon } from "lucide-react";
import ActionMenu from "./ActionMenu";
import {
  CalendarIcon,
  EmailIcon,
  MessageIcon,
  MessagesIcon,
  PhoneIcon,
  PrintIcon,
} from "../icons/TransactionIcons";
import Button from "../ui/Button";
import Divider from "../ui/Divider";

export interface ActionMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export interface ActionButton {
  id: string;
  icon: LucideIcon | React.ComponentType<{ size?: number; className?: string }>;
  onClick: () => void;
  variant?: "mail" | "phone" | "view" | "text" | "message" | "default";
  label?: string; // For text-based buttons like "View Log"
  className?: string; // Custom styling override
}

export interface AppointmentInfoBarProps {
  appointmentDate: string;
  appointmentTime: string;
  assignedTo?: string;
  onReschedule?: () => void;
  actions?: ActionButton[]; // Dynamic action buttons
  printActions?: ActionMenuItem[];
  printLabel?: string;
  emailActions?: ActionMenuItem[];
  emailLabel?: string;
  smsActions?: ActionMenuItem[];
  smsLabel?: string;
  className?: string;
  inTime?: string;
}

export default function AppointmentInfoBar({
  appointmentDate,
  appointmentTime,
  assignedTo,
  onReschedule,
  actions = [],
  printActions,
  printLabel,
  emailActions,
  emailLabel,
  smsActions,
  smsLabel,
  className = "",
  inTime = "",
}: AppointmentInfoBarProps) {
  const defaultPrintActions: ActionMenuItem[] = [
    {
      id: "print-invoice",
      label: "Print Invoice",
      icon: <PrintIcon size={16} className="text-blue-600" />,
      onClick: () => console.log("Print Invoice"),
    },
    {
      id: "print-cash-invoice",
      label: "Print Cash Invoice",
      icon: <PrintIcon size={16} className="text-blue-600" />,
      onClick: () => console.log("Print Cash Invoice"),
    },
    {
      id: "print-job-card",
      label: "Print Job Card",
      icon: <PrintIcon size={16} className="text-blue-600" />,
      onClick: () => console.log("Print Job Card"),
    },
  ];

  const defaultEmailActions: ActionMenuItem[] = [
    {
      id: "email-invoice",
      label: "Email Invoice",
      icon: <EmailIcon size={16} className="text-blue-600" />,
      onClick: () => console.log("Email Invoice"),
    },
    {
      id: "email-job-card",
      label: "Email Job Card",
      icon: <EmailIcon size={16} className="text-blue-600" />,
      onClick: () => console.log("Email Job Card"),
    },
  ];

  const defaultSmsActions: ActionMenuItem[] = [
    {
      id: "sms-invoice",
      label: "SMS Invoice",
      icon: <MessageIcon size={16} className="text-blue-600" />,
      onClick: () => console.log("SMS Invoice"),
    },
    {
      id: "sms-job-card",
      label: "SMS Job Card",
      icon: <MessageIcon size={16} className="text-blue-600" />,
      onClick: () => console.log("SMS Job Card"),
    },
  ];

  // Determine what to show based on provided props
  const finalPrintActions =
    printActions && printActions.length > 0
      ? printActions
      : defaultPrintActions;
  const finalEmailActions =
    emailActions && emailActions.length > 0
      ? emailActions
      : defaultEmailActions;
  const finalSmsActions =
    smsActions && smsActions.length > 0 ? smsActions : defaultSmsActions;

  // Show action menus if any action array is provided
  const showActionMenus = !!(printActions || emailActions || smsActions);

  // Extract specific actions for the fixed layout logic
  const messageAction = actions.find(
    (a) => a.variant === "message" || a.id === "message"
  );
  const phoneAction = actions.find(
    (a) => a.variant === "phone" || a.id === "phone"
  );
  const viewLogAction = actions.find(
    (a) => a.label?.toLowerCase().includes("log") || a.id === "view-log"
  );

  return (
    <div
      className={`bg-blue-50 rounded-lg p-3 my-2 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 ${className}`}
    >
      {/* Left Section - Appointment Details */}
      <div className="flex flex-col lg:flex-row flex-wrap items-start lg:items-center gap-4 w-full lg:w-auto">
        <div className="flex flex-row gap-2">
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-blue-100">
            <CalendarIcon size={24} className="text-gray-600" />
          </div>
          <div className="text-sm font-medium text-wrap text-gray-900">
            <span className="block text-wrap">{appointmentDate}</span>
            <span className="block text-green-600 text-wrap">
              {appointmentTime}
            </span>
          </div>
          <Divider orientation="vertical" className="h-4 bg-gray-200" />
          <div className="flex items-center gap-2">
            {onReschedule ? (
              <Button
                onClick={onReschedule}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-600 border border-red-600 rounded-lg"
              >
                Reschedule
              </Button>
            ) : (
              inTime && (
                <span className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:text-blue-600 text-sm font-medium mr-1">
                  {inTime}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Right Section - Assigned To & Actions */}
      <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-start lg:justify-end">
        {/* Assigned Group (Text + Msg + Phone) */}
        {(assignedTo || messageAction || phoneAction) && (
          <div className="flex items-center gap-2 bg-[#F0F4FA] rounded-lg px-3 py-1 border border-blue-100">
            {assignedTo && (
              <span className="text-red-700 hover:text-red-700 text-sm font-medium mr-1">
                Assigned To {assignedTo}
              </span>
            )}

            {messageAction && (
              <button
                key={messageAction.id}
                onClick={messageAction.onClick}
                className="p-1.5 text-blue-600 transition-colors flex flex-col justify-center items-center"
              >
                {messageAction.icon && (
                  <MessagesIcon size={14} className="text-blue-600 hover:text-blue-600" />
                )}
              </button>
            )}

            {phoneAction && (
              <button
                key={phoneAction.id}
                onClick={phoneAction.onClick}
                className="p-1.5 text-red-600 transition-colors flex flex-col justify-center items-center"
              >
                {phoneAction.icon && (
                  <PhoneIcon size={14} className="text-red-600 hover:text-red-600" />
                )}
              </button>
            )}
          </div>
        )}

        {/* View Log Button */}
        {viewLogAction && (
          <button
            key={viewLogAction.id}
            onClick={viewLogAction.onClick}
            className="bg-white border border-blue-200 hover:bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ml-2"
          >
            {viewLogAction.icon && (
              <viewLogAction.icon size={16} className="text-blue-600 hover:text-blue-600" />
            )}
            {viewLogAction.label}
          </button>
        )}

        {/* Action Menus */}
        {showActionMenus && (
          <div className={`flex items-center gap-1 ml-2 bg-[#2B7FFF] ${printLabel ? "rounded-lg" : "rounded-full"} p-1 shadow-sm`}>
            {/* Print Dropdown */}
            {printActions && (
              <ActionMenu
                items={finalPrintActions}
                trigger={
                  <div className={`flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 ${printLabel ? "rounded-lg" : "rounded-full"} transition-all cursor-pointer text-white`}>
                    <PrintIcon size={18} className="text-white" />
                    {printLabel && (
                      <span className="text-sm font-semibold whitespace-nowrap leading-none pt-0.5">
                        {printLabel}
                      </span>
                    )}
                  </div>
                }
              />
            )}

            {/* Email Dropdown */}
            {emailActions && (
              <ActionMenu
                items={finalEmailActions}
                trigger={
                  <div className={`flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-full transition-all cursor-pointer text-white`}>
                    <EmailIcon size={18} className="text-white" />
                    {emailLabel && (
                      <span className="text-sm font-semibold whitespace-nowrap leading-none pt-0.5">
                        {emailLabel}
                      </span>
                    )}
                  </div>
                }
              />
            )}

            {/* SMS Dropdown */}
            {smsActions && (
              <ActionMenu
                items={finalSmsActions}
                trigger={
                  <div className={`flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-full transition-all cursor-pointer text-white`}>
                    <MessageIcon size={18} className="text-white" />
                    {smsLabel && (
                      <span className="text-sm font-semibold whitespace-nowrap leading-none pt-0.5">
                        {smsLabel}
                      </span>
                    )}
                  </div>
                }
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
