"use client";

import React, { useState, useCallback, useEffect } from "react";
import RichTextEditor from "@/components/forms/RichTextEditor";
import { FormProvider, useForm } from "react-hook-form";
import ModalDropdown from "@/components/ui/DropDown";
import Button from "@/components/ui/Button";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import DialogBody from "@/components/modals/DialogBody";
import DialogFooter from "@/components/modals/DialogFooter";
import CommonTextArea from "@/components/forms/CommonTextArea";
import DatePicker from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";
import { XCircle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const WorkshopNotesTab: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [selectedInspector, setSelectedInspector] = useState<{ id: string; name: string } | null>(null);
  const [isReassignDialogOpen, setIsReassignDialogOpen] = useState(false);
  const [isAssignToTestDriveDialogOpen, setIsAssignToTestDriveDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const [reassignReason, setReassignReason] = useState<{ id: string; name: string } | null>(null);
  const [reassignEmployee, setReassignEmployee] = useState<{ id: string; name: string } | null>(null);
  const [reassignDate, setReassignDate] = useState<Date | null>(null);
  const [reassignTime, setReassignTime] = useState<string>("");

  const methods = useForm({
    defaultValues: {
      workshopNotes: "",
      reassignCustomReason: "",
    },
  });

  const router = useRouter();

  // Inspector options
  const inspectorOptions = [
    { id: "john", name: "John Smith" },
    { id: "jane", name: "Jane Doe" },
    { id: "mike", name: "Mike Johnson" },
    { id: "sarah", name: "Sarah Williams" },
  ];

  const reassignReasonOptions = [
    { id: "technical", name: "Technical Complexity" },
    { id: "scheduling", name: "Scheduling Conflict" },
    { id: "expertise", name: "Specialized Expertise Required" },
    { id: "personal", name: "Employee Leave/Emergency" },
  ];

  const employeeOptions = [
    { id: "peter", name: "Peter Parker" },
    { id: "bruce", name: "Bruce Wayne" },
    { id: "tony", name: "Tony Stark" },
    { id: "clark", name: "Clark Kent" },
  ];

  const handleImagesChange = useCallback((images: File[]) => {
    setUploadedImages(images);
  }, []);

  // Get data for console logging
  const getWorkshopData = () => {
    return {
      workshopNotes: methods.getValues("workshopNotes"),
      uploadedImages: uploadedImages.map((img) => ({
        fileName: img.name,
        fileSize: img.size,
        fileType: img.type,
      })),
      assignedInspector: selectedInspector,
    };
  };

  // Expose data to parent
  useEffect(() => {
    console.log("workshopData", getWorkshopData());
  }, [methods.watch("workshopNotes"), uploadedImages, selectedInspector]);

  const handleHomePage = useCallback(() => {
    setIsSuccessDialogOpen(false);
    router.push("/vendor/dashboard");
  }, [router]);

  return (
    <div className="mt-0 pb-2 space-y-4">
      {/* Instructions */}
      <p className="text-sm text-gray-500">
        Provide instructions, observations, or warnings for the assigning
        mechanic.
      </p>

      {/* Rich Text Editor with Image Upload */}
      <FormProvider {...methods}>
        <RichTextEditor
          name="workshopNotes"
          placeholder="Type your workshop notes here..."
          onImagesChange={handleImagesChange}
        />
      </FormProvider>

      {/* Show image count if images uploaded */}
      {uploadedImages.length > 0 && (
        <p className="text-sm text-gray-600">
          {uploadedImages.length} image{uploadedImages.length > 1 ? "s" : ""} uploaded
        </p>
      )}

      {/* Dropdown - Only show after images are uploaded */}
      {uploadedImages.length > 0 && (
        <div className="pt-2">
          <p className="text-sm font-medium text-green-600 mb-3">
            Vehicle service is complete and ready for quality check.
          </p>
          <ModalDropdown
            label="Assign Test Drive Inspector"
            items={inspectorOptions}
            selectedItem={selectedInspector}
            onSelect={setSelectedInspector}
            placeholder="Select Inspector"
            required
          />
        </div>
      )}

      <div className="flex gap-4 items-center justify-center">
        <Button
          type="button"
          onClick={() => setIsReassignDialogOpen(true)}
          variant="outline"
          className="mt-4"
        >
          Re-Assign
        </Button>

        <Button
          type="button"
          onClick={() => setIsAssignToTestDriveDialogOpen(true)}
          variant="primary"
          className="mt-4"
        >
          Assign To Test Drive
        </Button>
      </div>

      {/* Re-Assign Dialog */}
      <Dialog isOpen={isReassignDialogOpen} onClose={() => setIsReassignDialogOpen(false)}>
        <DialogBody className="h-auto w-2xl max-w-2xl p-4">
          <DialogHeader
            title="Re-Assign Details"
            onClose={() => setIsReassignDialogOpen(false)}
          />
          <FormProvider {...methods}>
            <div className="grid grid-cols-2 gap-6 py-6 font-primary">
              <ModalDropdown
                label="Reason for Re-Assign"
                items={reassignReasonOptions}
                selectedItem={reassignReason}
                onSelect={setReassignReason}
                placeholder="Select Reason"
                required
              />
              <ModalDropdown
                label="Assign to Employee"
                items={employeeOptions}
                selectedItem={reassignEmployee}
                onSelect={setReassignEmployee}
                placeholder="Select Employee"
                required
              />
              <DatePicker
                label="Date"
                value={reassignDate || new Date()}
                onChange={(date: Date | null) => setReassignDate(date)}
                required
                placeholder="Select Date"
              />
              <TimePicker
                label="Time"
                value={reassignTime}
                onChange={(time) => setReassignTime(time)}
                required
                placeholder="Select Time"
              />
              <div className="col-span-2">
                <CommonTextArea
                  name="reassignCustomReason"
                  label="Write Reason"
                  placeholder="Write Reason"
                  rows={4}
                />
              </div>
            </div>
          </FormProvider>

          <div className="flex justify-center gap-4 mt-8 pb-4">
            <Button
              variant="outline"
              onClick={() => setIsReassignDialogOpen(false)}
              className="px-10 border-red-500 text-red-500 hover:bg-red-50 rounded-xl"
              startIcon={<XCircle size={18} />}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                console.log("Re-assigned task submitted");
                setIsReassignDialogOpen(false);
              }}
              className="px-10 rounded-xl"
              endIcon={<CheckCircle size={18} />}
            >
              Submit
            </Button>
          </div>
        </DialogBody>
      </Dialog>

      {/* Assign To Test Drive Dialog */}
      <Dialog isOpen={isAssignToTestDriveDialogOpen} onClose={() => setIsAssignToTestDriveDialogOpen(false)}>
        <DialogBody className="max-w-md h-auto p-4 text-center">
          <DialogHeader
            title="Initiate Test Drive?"
            onClose={() => setIsAssignToTestDriveDialogOpen(false)}
          />
          <div className="py-4 font-primary">
            <p className="text-gray-700 text-sm">
              Are you sure you want to move this vehicle to the test drive phase?
            </p>
          </div>
          <DialogFooter
            leftTitle="Cancel"
            rightTitle="Initiate"
            onCancel={() => setIsAssignToTestDriveDialogOpen(false)}
            onConfirm={() => {
              setIsAssignToTestDriveDialogOpen(false);
              setIsSuccessDialogOpen(true);
            }}
          />
        </DialogBody>
      </Dialog>

      {/* Success Dialog: Test Drive Initiated */}
      <Dialog isOpen={isSuccessDialogOpen} onClose={() => setIsSuccessDialogOpen(false)}>
        <DialogBody className="max-w-md h-auto p-4 text-center rounded-[2.5rem] shadow-2xl">
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl font-bold text-[#0f172a]">Test Drive Initiated</h2>


            <div className="">
              <div className="relative inline-block">
                <div className="bg-[#eff6ff] rounded-[2rem] p-4 flex items-center justify-center hover:animate-spin cursor-pointer">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Three Green Arrows */}
                    <path d="M7 5V1M7 1L5 3M7 1L9 3" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 4V0M12 0L10 2M12 0L14 2" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 5V1L17 1L15 3M17 1L19 3" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Gear / Cog */}
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="#7dd3fc" stroke="#1e3a8a" strokeWidth="1.5" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Inner Circle and Check */}
                    <circle cx="12" cy="12" r="3.5" fill="#bae6fd" stroke="#1e3a8a" strokeWidth="1" />
                    <path d="M10.5 12L11.5 13L13.5 10.5" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <p className="text-[#475569] text-md font-medium px-4 leading-[1.4]">
              Vehicle assigned to <span className="text-[#0f172a] font-bold">Peter</span> for quality check. The status is now in <span className="text-[#0f172a] font-bold">Test Drive</span>
            </p>

            <p className="text-[#3b82f6] text-md font-bold ">
              Vehicle Number: AP03 AR 8778
            </p>

            <Button
              variant="custom"
              size="lg"
              onClick={handleHomePage}
              className="w-full h-16 rounded-xl text-md font-bold bg-[#f97316] text-white hover:bg-[#ea580c] transition-all shadow-lg active:scale-95"
            >
              Homepage
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default WorkshopNotesTab;
