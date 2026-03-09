"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Dialog from "@/components/modals/Dialog";
import DialogHeader from "@/components/modals/DialogHeader";
import CommonTextInput from "@/components/forms/CommonTextInput";
import Button from "@/components/ui/Button";

const paymentLinkSchema = z.object({
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
});

type PaymentLinkFormData = z.infer<typeof paymentLinkSchema>;

interface PaymentLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onSubmit: (data: PaymentLinkFormData) => void;
}

const PaymentLinkModal: React.FC<PaymentLinkModalProps> = ({
  isOpen,
  onClose,
  totalAmount,
  onSubmit,
}) => {
  const methods = useForm<PaymentLinkFormData>({
    resolver: zodResolver(paymentLinkSchema),
    defaultValues: {
      email: "john.wick@example.com",
      mobile: "9876543210",
    },
  });

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-4">
        <DialogHeader title="Customer Contact Details" onClose={onClose} />

        <div className="text-center mb-8">
          <p className="text-xl font-semibold text-red-600">
            Final Amount Due: ${totalAmount.toFixed(2)}
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Customer Email
              </label>
              <CommonTextInput
                name="email"
                type="email"
                placeholder="john.wick@example.com"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Mobile Number (SMS/WhatsApp)
              </label>
              <CommonTextInput
                name="mobile"
                type="tel"
                placeholder="9876543210"
              />
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-4 text-lg"
              >
                Send Payment Link
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full py-4 text-lg"
              >
                Back
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Dialog>
  );
};

export default PaymentLinkModal;
