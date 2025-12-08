"use client";

import { useForm, FormProvider } from "react-hook-form";
import CommonTextInput from "@/components/forms/CommonTextInput";
import CommonTextArea from "@/components/forms/CommonTextArea";
import Button from "@/components/ui/Button";

export function PartnerApplicationForm() {
  const methods = useForm();

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
          <form className="mt-10 bg-white p-8 rounded-2xl border border-gray-200 space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <CommonTextInput name="company" label="Company Name*" placeholder="Enter Company Name" />
              <CommonTextInput name="contactName" label="Contact Name*" placeholder="John Doe" />

              <CommonTextInput name="email" label="Email Address*" placeholder="contact@company.com" />
              <CommonTextInput name="phone" label="Phone Number*" placeholder="+91 XXX XXX XXXX" />

              <CommonTextInput name="serviceArea" label="Service Area*" placeholder="Enter Area" />
              <CommonTextInput name="fleet" label="No. of Vehicles in Fleet*" placeholder="2" />
            </div>

            <CommonTextArea
              name="info"
              label="Additional Information"
              placeholder="Tell us about your business..."
              rows={4}
            />

            <Button variant="gradient" fullWidth>
              Submit Application
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
