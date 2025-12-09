"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import Button from "@/components/ui/Button";
import { partnerSchema, type RegisterFormData } from "@/schemas/partner.schemas";
import PartnerSuccessPage from "./PartnerSuccessPage";

interface PartnerApplicationProps {
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
  data: RegisterFormData | null;
  setData: (value: RegisterFormData | null) => void;
}

export function PartnerApplicationForm({ isSubmitted, setIsSubmitted, data, setData }: PartnerApplicationProps) {
  const [submittedData, setSubmittedData] = useState<RegisterFormData | null>(null);

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(partnerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Form submitted:", data);
      // TODO: Implement API call to submit partner application
      // Example: await submitPartnerApplication(data);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store submitted data and show success page
      setSubmittedData(data);
      setData(data); // Update parent state
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      // TODO: Handle error (show error message to user)
    }
  };

  // Show success page if form was submitted successfully
  if (isSubmitted && submittedData) {
    return <PartnerSuccessPage data={submittedData} />;
  }

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-center text-2xl font-semibold text-gray-heading">
          Apply to Become a Partner
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Fill out the form below and our partnership team will contact you within 24 hours
        </p>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mt-10 bg-white p-8 rounded-2xl border border-gray-200 space-y-5"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <CommonTextInput
                name="company"
                label="Company Name*"
                placeholder="Enter Company Name"
              />
              <CommonTextInput
                name="contactName"
                label="Contact Name*"
                placeholder="John Doe"
              />

              <CommonTextInput
                name="email"
                label="Email Address*"
                placeholder="contact@company.com"
                type="email"
              />
              <CommonTextInput
                name="phoneNumber"
                label="Phone Number*"
                placeholder="X XX XX XX XX"
              />

              <CommonTextInput
                name="serviceArea"
                label="Service Area*"
                placeholder="contact@cpmpany.com"
              />
              <CommonTextInput
                name="vehicleCount"
                label="No. of Vehicles in Fleet*"
                placeholder="2"
              />
            </div>

            <CommonTextArea
              name="additionalInfo"
              label="Additional Information"
              placeholder="Tell us about your business, experience, and why you'd like to partner with DriveMech..."
              rows={4}
            />

            <Button variant="gradient" fullWidth type="submit" disabled={methods.formState.isSubmitting}>
              {methods.formState.isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>

            <p className="text-center text-gray-500 text-xs mt-2">
              By submitting, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </FormProvider>

      </div>
    </section>
  );
}


