"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  useForm,
  Controller,
  SubmitHandler,
  FormProvider,
} from "react-hook-form";

import ModalDropdown from "@/components/ui/DropDown";
import CommonTextArea from "@/components/forms/CommonTextArea";
import ConfirmReturn from "@/components/customer/profile/orders/tabs/spares/ConfirmReturn";
import ReturnSubmitted from "./ReturnSubmitted";
import LeftLayout from "@/components/Layout/LeftLayout";
import RightLayout from "@/components/Layout/RightLayout";
import Dialog from "@/components/modals/Dialog";
import DialogBody from "@/components/modals/DialogBody";
import DialogHeader from "@/components/modals/DialogHeader";
import Button from "@/components/ui/Button";

type FormData = {
  product: string;
  reason: string;
  comments: string;
  files: FileList | null;
};

export default function ReturnRequest({ id }: { id: string }) {
  const router = useRouter();
  const [stage, setStage] = useState<"form" | "confirm" | "success">("form");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const products = [
    { id: "p1", name: "Bosch Brake Pad Set", amount: 118, img: "/images/spares/brakepad.png" },
    { id: "p2", name: "Bosch Air Filter", amount: 28, img: "/images/spares/airfilter.png" },
    { id: "p3", name: "Wiper Blades Set", amount: 22, img: "/images/spares/wiper.png" },
  ];

  const reasons = [
    { id: "wrong", name: "Wrong Item Delivered" },
    { id: "damaged", name: "Damaged Product" },
    { id: "desc", name: "Not as Described" },
    { id: "missing", name: "Missing Items" },
    { id: "other", name: "Other" },
  ];

  const methods = useForm<FormData>({
    defaultValues: {
      product: "",
      reason: "",
      comments: "",
      files: null,
    },
  });

  const { control, handleSubmit, watch, setValue } = methods;

  const selectedProduct = products.find((p) => p.id === watch("product"));
  const selectedReason = reasons.find((r) => r.id === watch("reason"));

  // ------------------------------
  // FILE UPLOAD HANDLER (RHF Safe)
  // ------------------------------
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileList = Array.from(e.target.files);
    setSelectedFiles(fileList);
    setValue("files", e.target.files, { shouldValidate: true });
  };

  // ------------------------------
  // SUBMIT FORM → GO TO CONFIRM
  // ------------------------------
  const onSubmit: SubmitHandler<FormData> = () => {
    // ensure product selected (RHF rules should already validate)
    if (!watch("product")) return;
    setStage("confirm");
  };

  // Dialog open flags
  const isConfirmOpen = stage === "confirm";
  const isSuccessOpen = stage === "success";

  // ------------------------------
  // RENDER
  // ------------------------------
  return (
    <FormProvider {...methods}>
      <div className="flex w-full h-full">
        <LeftLayout>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-4 flex flex-col gap-4">
            {/* HEADER */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-semibold">Return or Replace</h1>
            </div>

            {/* PRODUCT SUMMARY LIST */}
            <div className="border border-gray-200 rounded-xl p-2 bg-white">
              <p className="font-semibold text-gray-700">Product Details</p>
              <p className="text-xs text-gray-500">Order ID: {id}</p>

              {products.map((item) => (
                <div key={item.id} className="flex justify-between border-b border-gray-200 py-3 px-1">
                  <div className="flex items-center gap-3">
                    <Image src={item.img} width={40} height={40} alt="product" />
                    <p>{item.name}</p>
                  </div>
                  <p className="text-orange-500 font-semibold">${item.amount}</p>
                </div>
              ))}
            </div>

            {/* SELECT PRODUCT (RHF + Dropdown) */}
            <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-2">
              <label className="text-sm font-medium">Select Product to Return *</label>

              <Controller
                name="product"
                control={control}
                rules={{ required: "Please select a product" }}
                render={({ field }) => (
                  <ModalDropdown
                    items={products.map((p) => ({ id: p.id, name: p.name }))}
                    selectedItem={products.find((p) => p.id === field.value) || null}
                    onSelect={(item) => field.onChange(item.id)}
                    placeholder="Choose a product"
                  />
                )}
              />
            </div>

            {/* REASON DROPDOWN (RHF Controlled) */}
            <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-2">
              <label className="text-sm font-medium">Reason for Return *</label>

              <Controller
                name="reason"
                control={control}
                rules={{ required: "Reason is required" }}
                render={({ field }) => (
                  <ModalDropdown
                    items={reasons}
                    selectedItem={reasons.find((r) => r.id === field.value) || null}
                    onSelect={(item) => field.onChange(item.id)}
                    placeholder="Select a reason"
                  />
                )}
              />
            </div>

            {/* COMMENTS (CommonTextArea) */}
            <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-2">
              <CommonTextArea
                label="Additional Comments"
                name="comments"
                placeholder="Describe the issue…"
              />
            </div>

            {/* FILE UPLOAD */}
            <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 text-center space-y-3">
              <Upload className="mx-auto text-gray-600" />

              <label className="px-4 py-2 bg-white border border-gray-200 rounded-lg cursor-pointer text-sm font-medium">
                Upload Photos
                <input type="file" multiple className="hidden" onChange={handleFileUpload} />
              </label>

              {selectedFiles.length > 0 && (
                <p className="text-sm text-gray-600">{selectedFiles.length} file(s) selected</p>
              )}
            </div>
          </form>
        </LeftLayout>

        <RightLayout>
          <div className="flex flex-col gap-4 p-2 mt-2">
            {/* PICKUP ADDRESS */}
            <div className="border border-gray-200 rounded-xl p-5 bg-white">
              <p className="font-semibold text-gray-800">Pickup Address</p>

              <p className="text-sm text-gray-700">123 Main Street, Apartment 4B</p>
              <p className="text-sm text-gray-500 -mt-1">Downtown, City, State 12345</p>

              <button className="text-xs text-blue-600 mt-1">Change Address</button>
            </div>

            {/* REFUND METHOD */}
            <div className="border border-gray-200 rounded-xl p-5 bg-white space-y-3">
              <p className="font-semibold text-gray-800">Refund Method</p>

              <div className="border border-orange-300 rounded-lg p-3 bg-orange-50">
                <p className="text-sm font-medium text-gray-800">Original Payment Method</p>
                <p className="text-xs text-gray-600">Refund to card ending in ****1234</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <p className="text-sm font-medium text-gray-800">DriveMech Wallet</p>
                <p className="text-xs text-gray-600">Instant credit to your wallet</p>
              </div>
            </div>

            {/* REFUND AMOUNT */}
            <div className="border border-gray-200 rounded-xl p-5 bg-white">
              <p className="text-sm font-medium text-gray-700">Refund Amount</p>

              <p className="text-green-600 font-semibold text-xl mt-1">
                {selectedProduct ? `$${selectedProduct.amount}` : "$0.00"}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Refund will be processed within 5–7 business days
              </p>
            </div>

            {/* IMPORTANT NOTES */}
            <div className="border border-gray-200 rounded-xl p-5 bg-blue-50 text-sm">
              <p className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
                🛈 Important Notes
              </p>

              <div className="flex flex-col text-gray-700 gap-2">
                <p>• Pickup will be scheduled within 2–3 business days</p>
                <p>• Product should be in original condition with packaging</p>
                <p>• Return shipping is free for damaged/wrong items</p>
                <p>• Quality check takes 2–3 days after pickup</p>
              </div>
            </div>

            {/* Right-panel submit: run RHF validation then go to confirm */}
            <Button
              type="button"
              onClick={() => handleSubmit(onSubmit)()}
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold mt-2"
            >
              Submit Return Request
            </Button>
          </div>
        </RightLayout>
      </div>

      {/* Confirm Dialog */}
      <Dialog isOpen={isConfirmOpen} onClose={() => setStage("form")}>
        <DialogBody className="p-4">
          <DialogHeader
            title={"Confirm Return Request"}
            onClose={() => setStage("form")}
          />
          {selectedProduct && (
            <ConfirmReturn
              payload={{
                productName: selectedProduct.name,
                amount: selectedProduct.amount,
                reason: selectedReason?.name || "",
                comments: watch("comments"),
                files: selectedFiles,
                refundMethod: "original",
                address: "123 Main Street, Apartment 4B",
              }}
              onBack={() => setStage("form")}
              onSubmit={() => setStage("success")}
            />
          )}
        </DialogBody>
      </Dialog>

      {/* Success Dialog */}
      <Dialog isOpen={isSuccessOpen} onClose={() => { setStage("form"); router.push("/customer/profile/my-orders/spares"); }}>
        <DialogBody className="p-4">
          <DialogHeader
            title={"Return Submitted"}
            onClose={() => { setStage("form"); router.push("/customer/profile/my-orders/spares"); }}
          />
          <ReturnSubmitted
            returnId={id}
            onClose={() => router.push("/customer/profile/my-orders/spares")}
          />
        </DialogBody>
      </Dialog>
    </FormProvider>
  );
}
